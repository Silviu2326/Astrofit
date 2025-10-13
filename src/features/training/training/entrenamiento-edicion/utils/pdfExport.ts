import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { TrainingPlan, TrainingDay, ExerciseConfig } from '../types/training.types';

interface PDFExportOptions {
  includeImages?: boolean;
  includeNotes?: boolean;
  includeProgressionPlan?: boolean;
  theme?: 'professional' | 'colorful' | 'minimal';
}

/**
 * Genera un PDF profesional del plan de entrenamiento
 */
export const exportPlanToPDF = (
  plan: TrainingPlan,
  clientName: string,
  trainerName: string,
  exercises: Record<string, { name: string; muscleGroup: string }>,
  options: PDFExportOptions = {}
): void => {
  const {
    includeImages = false,
    includeNotes = true,
    includeProgressionPlan = true,
    theme = 'professional',
  } = options;

  const doc = new jsPDF();
  let yPosition = 20;

  // Colors based on theme
  const colors = {
    professional: { primary: [41, 98, 255], secondary: [100, 116, 139], accent: [34, 197, 94] },
    colorful: { primary: [139, 92, 246], secondary: [236, 72, 153], accent: [251, 146, 60] },
    minimal: { primary: [0, 0, 0], secondary: [100, 116, 139], accent: [75, 85, 99] },
  };

  const themeColors = colors[theme];

  // ============================================================================
  // HEADER
  // ============================================================================
  doc.setFillColor(...themeColors.primary);
  doc.rect(0, 0, 210, 50, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('PLAN DE ENTRENAMIENTO', 105, 20, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(`Cliente: ${clientName}`, 105, 30, { align: 'center' });
  doc.text(`Entrenador: ${trainerName}`, 105, 38, { align: 'center' });

  yPosition = 60;

  // ============================================================================
  // PLAN INFO
  // ============================================================================
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Información del Plan', 14, yPosition);

  yPosition += 10;

  const planInfo = [
    ['Objetivo', translateGoal(plan.goal)],
    ['Tipo', translateType(plan.type)],
    ['Nivel', translateLevel(plan.level)],
    ['Duración', `${plan.duration} semanas`],
    ['Días/semana', plan.daysPerWeek.join(', ')],
    ['Fecha inicio', new Date(plan.startDate).toLocaleDateString('es-ES')],
    ['Fecha fin', new Date(plan.endDate).toLocaleDateString('es-ES')],
    ['Progresión', `${plan.progressionRate}kg/semana`],
  ];

  autoTable(doc, {
    startY: yPosition,
    head: [],
    body: planInfo,
    theme: 'grid',
    headStyles: { fillColor: themeColors.primary },
    styles: { fontSize: 10 },
    columnStyles: {
      0: { fontStyle: 'bold', cellWidth: 50 },
      1: { cellWidth: 'auto' },
    },
  });

  yPosition = (doc as any).lastAutoTable.finalY + 15;

  // ============================================================================
  // TRAINING DAYS
  // ============================================================================
  plan.trainingDays.forEach((day, dayIndex) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }

    // Day Header
    doc.setFillColor(...themeColors.secondary);
    doc.rect(14, yPosition - 7, 182, 10, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(`${day.day} - ${day.name}`, 16, yPosition);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`${day.duration} min | ${day.focus}`, 180, yPosition, { align: 'right' });

    yPosition += 12;

    // Exercises Table
    const exerciseRows = day.exercises.map((ex, idx) => {
      const exerciseData = exercises[ex.exerciseId] || { name: ex.exerciseId, muscleGroup: '-' };
      return [
        (idx + 1).toString(),
        exerciseData.name,
        exerciseData.muscleGroup,
        `${ex.sets}`,
        ex.reps,
        ex.weight ? `${ex.weight}kg` : '-',
        `${ex.rest}s`,
        ex.rpe ? ex.rpe.toString() : '-',
        ex.notes && includeNotes ? ex.notes : '-',
      ];
    });

    autoTable(doc, {
      startY: yPosition,
      head: [['#', 'Ejercicio', 'Grupo Musc.', 'Series', 'Reps', 'Peso', 'Desc.', 'RPE', 'Notas']],
      body: exerciseRows,
      theme: 'striped',
      headStyles: {
        fillColor: themeColors.primary,
        fontSize: 8,
        fontStyle: 'bold',
      },
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      columnStyles: {
        0: { cellWidth: 8 },
        1: { cellWidth: 50 },
        2: { cellWidth: 25 },
        3: { cellWidth: 12 },
        4: { cellWidth: 15 },
        5: { cellWidth: 15 },
        6: { cellWidth: 12 },
        7: { cellWidth: 10 },
        8: { cellWidth: includeNotes ? 30 : 0 },
      },
    });

    yPosition = (doc as any).lastAutoTable.finalY + 10;
  });

  // ============================================================================
  // PROGRESSION PLAN (if enabled)
  // ============================================================================
  if (includeProgressionPlan) {
    doc.addPage();
    yPosition = 20;

    doc.setFillColor(...themeColors.primary);
    doc.rect(0, 10, 210, 15, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PLAN DE PROGRESIÓN', 105, 20, { align: 'center' });

    yPosition = 35;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);
    doc.text(
      `Este plan utiliza progresión lineal de ${plan.progressionRate}kg por semana.`,
      14,
      yPosition
    );

    yPosition += 10;

    doc.setFontSize(9);
    doc.text(
      `Cada ${plan.deloadWeeks} semanas, se recomienda una semana de descarga al 70% del peso.`,
      14,
      yPosition
    );

    yPosition += 15;

    // Sample progression table for first exercise
    const firstDay = plan.trainingDays[0];
    const firstExercise = firstDay?.exercises[0];

    if (firstExercise && firstExercise.weight) {
      const exerciseData = exercises[firstExercise.exerciseId] || { name: firstExercise.exerciseId };

      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text(`Ejemplo: ${exerciseData.name}`, 14, yPosition);

      yPosition += 8;

      const progressionRows = [];
      for (let week = 1; week <= Math.min(plan.duration, 8); week++) {
        const isDeload = week % plan.deloadWeeks === 0;
        const weight = isDeload
          ? Math.round(firstExercise.weight * 0.7 * 4) / 4
          : firstExercise.weight + plan.progressionRate * (week - 1);

        progressionRows.push([
          `Semana ${week}`,
          `${weight}kg`,
          firstExercise.reps,
          firstExercise.sets.toString(),
          isDeload ? 'Descarga' : 'Normal',
        ]);
      }

      autoTable(doc, {
        startY: yPosition,
        head: [['Semana', 'Peso', 'Reps', 'Series', 'Tipo']],
        body: progressionRows,
        theme: 'grid',
        headStyles: { fillColor: themeColors.accent },
        styles: { fontSize: 9 },
      });
    }
  }

  // ============================================================================
  // FOOTER
  // ============================================================================
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Generado con Claude Code - ${new Date().toLocaleDateString('es-ES')}`,
      105,
      290,
      { align: 'center' }
    );
    doc.text(`Página ${i} de ${pageCount}`, 190, 290, { align: 'right' });
  }

  // ============================================================================
  // SAVE
  // ============================================================================
  const fileName = `plan_${clientName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(fileName);
};

// Helper functions
const translateGoal = (goal: string): string => {
  const translations: Record<string, string> = {
    muscle: 'Hipertrofia',
    'fat-loss': 'Pérdida de grasa',
    strength: 'Fuerza',
    endurance: 'Resistencia',
    performance: 'Rendimiento',
    rehab: 'Rehabilitación',
    maintenance: 'Mantenimiento',
  };
  return translations[goal] || goal;
};

const translateType = (type: string): string => {
  const translations: Record<string, string> = {
    strength: 'Fuerza',
    hypertrophy: 'Hipertrofia',
    crossfit: 'CrossFit',
    functional: 'Funcional',
    powerlifting: 'Powerlifting',
    calisthenics: 'Calistenia',
    hiit: 'HIIT',
  };
  return translations[type] || type;
};

const translateLevel = (level: string): string => {
  const translations: Record<string, string> = {
    beginner: 'Principiante',
    intermediate: 'Intermedio',
    advanced: 'Avanzado',
  };
  return translations[level] || level;
};
