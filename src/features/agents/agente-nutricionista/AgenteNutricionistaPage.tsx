
import React from 'react';
import CalendarioSemanal from './components/CalendarioSemanal';
import SustitucionesInteligentes from './components/SustitucionesInteligentes';
import AlertasNutricionales from './components/AlertasNutricionales';
import RecetasRapidas from './components/RecetasRapidas';
import ExportadorVisual from './components/ExportadorVisual';

const AgenteNutricionistaPage: React.FC = () => {
  // Mock data for demonstration
  const mockWeeklyMeals = [
    { day: 'Lunes', meals: [
      { id: 'm1', name: 'Desayuno: Tostadas con aguacate', calories: 350, protein: 15, carbs: 40, fat: 18 },
      { id: 'm2', name: 'Almuerzo: Ensalada de pollo', calories: 450, protein: 30, carbs: 25, fat: 25 },
      { id: 'm3', name: 'Cena: Salmón al horno con verduras', calories: 550, protein: 40, carbs: 30, fat: 30 },
    ]},
    { day: 'Martes', meals: [
      { id: 'm4', name: 'Desayuno: Avena con frutas', calories: 300, protein: 10, carbs: 50, fat: 8 },
      { id: 'm5', name: 'Almuerzo: Lentejas con arroz', calories: 500, protein: 25, carbs: 60, fat: 15 },
      { id: 'm6', name: 'Cena: Pechuga de pavo con boniato', calories: 400, protein: 35, carbs: 30, fat: 12 },
    ]},
    { day: 'Miércoles', meals: [
      { id: 'm7', name: 'Desayuno: Huevos revueltos con espinacas', calories: 380, protein: 20, carbs: 10, fat: 28 },
      { id: 'm8', name: 'Almuerzo: Pasta integral con pesto', calories: 520, protein: 18, carbs: 70, fat: 20 },
      { id: 'm9', name: 'Cena: Sopa de verduras y tofu', calories: 350, protein: 20, carbs: 30, fat: 15 },
    ]},
    { day: 'Jueves', meals: [
      { id: 'm10', name: 'Desayuno: Batido de proteínas', calories: 280, protein: 25, carbs: 20, fat: 10 },
      { id: 'm11', name: 'Almuerzo: Wrap de atún', calories: 420, protein: 28, carbs: 35, fat: 20 },
      { id: 'm12', name: 'Cena: Pollo al curry con arroz basmati', calories: 600, protein: 45, carbs: 50, fat: 25 },
    ]},
    { day: 'Viernes', meals: [
      { id: 'm13', name: 'Desayuno: Yogur griego con frutos secos', calories: 320, protein: 20, carbs: 25, fat: 15 },
      { id: 'm14', name: 'Almuerzo: Pizza casera integral', calories: 580, protein: 30, carbs: 70, fat: 25 },
      { id: 'm15', name: 'Cena: Hamburguesa de lentejas con ensalada', calories: 480, protein: 22, carbs: 40, fat: 25 },
    ]},
    { day: 'Sábado', meals: [
      { id: 'm16', name: 'Desayuno: Tortitas de avena', calories: 400, protein: 15, carbs: 50, fat: 18 },
      { id: 'm17', name: 'Almuerzo: Paella de marisco', calories: 700, protein: 40, carbs: 80, fat: 30 },
      { id: 'm18', name: 'Cena: Sushi variado', calories: 550, protein: 30, carbs: 60, fat: 20 },
    ]},
    { day: 'Domingo', meals: [
      { id: 'm19', name: 'Desayuno: Smoothie bowl', calories: 350, protein: 12, carbs: 45, fat: 15 },
      { id: 'm20', name: 'Almuerzo: Asado de ternera con patatas', calories: 750, protein: 50, carbs: 60, fat: 40 },
      { id: 'm21', name: 'Cena: Crema de calabaza y semillas', calories: 300, protein: 10, carbs: 30, fat: 15 },
    ]},
  ];

  const mockAlerts = [
    { id: 'a1', type: 'deficit', nutrient: 'Proteína', message: 'Bajo consumo de proteína el Lunes.' },
    { id: 'a2', type: 'excess', nutrient: 'Azúcar', message: 'Exceso de azúcares simples el Viernes.' },
  ];

  const mockQuickRecipes = [
    { id: 'r1', name: 'Ensalada Quinoa y Verduras', calories: 300, protein: 12, carbs: 40, fat: 10 },
    { id: 'r2', name: 'Wrap de Hummus y Vegetales', calories: 280, protein: 10, carbs: 35, fat: 9 },
    { id: 'r3', name: 'Sopa de Lentejas Express', calories: 320, protein: 15, carbs: 45, fat: 8 },
    { id: 'r4', name: 'Tostadas de Aguacate y Huevo', calories: 350, protein: 18, carbs: 30, fat: 18 },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Agente Nutricionista - El Chef de la Salud</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Dashboard Inteligente */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Dashboard Inteligente</h2>
            <p className="text-gray-600">Recomendaciones automáticas y análisis nutricional en tiempo real.</p>
            {/* Placeholder for dashboard content */}
            <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-700">
              <p className="font-bold">Recomendación:</p>
              <p>Considera aumentar la ingesta de fibra en el desayuno del Miércoles.</p>
            </div>
          </div>

          {/* Calendario Semanal */}
          <CalendarioSemanal weeklyMeals={mockWeeklyMeals} />

          {/* Sustituciones Inteligentes (Placeholder for interaction) */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sustituciones Inteligentes</h2>
            <p className="text-gray-600">Haz clic en una comida en el calendario para ver sugerencias de sustitución.</p>
            <SustitucionesInteligentes />
          </div>

          {/* Alertas Nutricionales */}
          <AlertasNutricionales alerts={mockAlerts} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Recetas Rápidas */}
          <RecetasRapidas recipes={mockQuickRecipes} />

          {/* Exportador Visual */}
          <ExportadorVisual />
        </div>
      </div>
    </div>
  );
};

export default AgenteNutricionistaPage;
