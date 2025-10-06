const fs = require('fs');

const filePath = 'c:/Users/usuario/Documents/project-bolt-sb1-qekdxfwt/project/src/features/nutrition/nutrition/plantillas-dietas/PlantillasDietasPage.tsx';
let content = fs.readFileSync(filePath, 'utf8');

// 1. Update imports
content = content.replace(
  "import React, { useState } from 'react';",
  "import React, { useState, useEffect } from 'react';"
);

content = content.replace(
  "import PlantillaPreview from './components/PlantillaPreview';",
  "import PlantillaPreview from './components/PlantillaPreview';\nimport { plantillasDietasApi, PlantillaDieta } from './plantillasDietasApi';"
);

// 2. Remove mock interfaces (Meal, DayMenu) and PlantillaDieta interface
const lines = content.split('\n');
let inInterfaceBlock = false;
let braceCount = 0;
let filteredLines = [];
let skipUntilMockEnd = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Skip interface Meal, DayMenu, and export interface PlantillaDieta
  if (line.includes('interface Meal {') || line.includes('interface DayMenu {') || line.includes('export interface PlantillaDieta {')) {
    inInterfaceBlock = true;
    braceCount = 0;
    continue;
  }
  
  if (inInterfaceBlock) {
    for (const char of line) {
      if (char === '{') braceCount++;
      if (char === '}') braceCount--;
    }
    if (braceCount < 0) {
      inInterfaceBlock = false;
    }
    continue;
  }
  
  // Skip mockPlantillas array
  if (line.includes('const mockPlantillas: PlantillaDieta[] = [')) {
    skipUntilMockEnd = true;
    continue;
  }
  
  if (skipUntilMockEnd) {
    if (line.trim() === '];') {
      skipUntilMockEnd = false;
    }
    continue;
  }
  
  filteredLines.push(line);
}

content = filteredLines.join('\n');

// 3. Replace component logic
const componentReplacement = `const PlantillasDietasPage: React.FC = () => {
  const [plantillas, setPlantillas] = useState<PlantillaDieta[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlantilla, setSelectedPlantilla] = useState<PlantillaDieta | null>(null);
  const [activeTab, setActiveTab] = useState<'todas' | 'mis-plantillas' | 'favoritas' | 'publicas' | 'por-objetivo'>('todas');
  const [showNewDietModal, setShowNewDietModal] = useState(false);
  const [filters, setFilters] = useState({
    objective: '',
    dietType: '',
    time_level: '',
    culinary_experience: '',
    caloriesMin: '',
    caloriesMax: '',
    restrictions: [] as string[],
    search: '',
  });
  const [stats, setStats] = useState({
    total: 0,
    miasPlantillas: 0,
    usadas: 0,
    favoritas: 0,
  });

  useEffect(() => {
    loadPlantillas();
  }, [activeTab, filters]);

  const loadPlantillas = async () => {
    try {
      setLoading(true);
      const apiFilters: any = {
        incluirPublicas: 'true',
        q: filters.search || undefined,
        objective: filters.objective || undefined,
        dietType: filters.dietType || undefined,
        time_level: filters.time_level || undefined,
        culinary_experience: filters.culinary_experience || undefined,
        caloriesMin: filters.caloriesMin || undefined,
        caloriesMax: filters.caloriesMax || undefined,
      };

      if (activeTab === 'favoritas') {
        apiFilters.is_favorite = 'true';
      } else if (activeTab === 'publicas') {
        apiFilters.is_public = 'true';
      } else if (activeTab === 'mis-plantillas') {
        apiFilters.is_public = 'false';
      }

      const response = await plantillasDietasApi.getPlantillas(apiFilters);
      setPlantillas(response.data || []);

      if (response.stats) {
        setStats({
          total: response.stats.total || 0,
          miasPlantillas: (response.stats.total || 0) - (response.stats.publicas || 0),
          usadas: response.stats.totalUsos || 0,
          favoritas: response.stats.favoritas || 0,
        });
      }
    } catch (error) {
      console.error('Error loading plantillas:', error);
    } finally {
      setLoading(false);
    }
  };`;

content = content.replace(
  /const PlantillasDietasPage: React\.FC = \(\) => \{[\s\S]*?const stats = \{[\s\S]*?\};/,
  componentReplacement
);

// 4. Replace filtered plantillas usage
content = content.replace(
  /const filteredPlantillas = mockPlantillas\.filter[\s\S]*?\);/,
  ''
);

// 5. Replace PlantillasGrid to use plantillas state instead of filteredPlantillas
content = content.replace(
  'plantillas={filteredPlantillas}',
  'plantillas={plantillas}'
);

// 6. Add loading state to PlantillasGrid
content = content.replace(
  /<PlantillasGrid/,
  `{loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <PlantillasGrid`
);

content = content.replace(
  /onSelectPlantilla=\{setSelectedPlantilla\}/,
  `onSelectPlantilla={setSelectedPlantilla}
            />\n          )}`
);

fs.writeFileSync(filePath, content);
console.log('File updated successfully!');
