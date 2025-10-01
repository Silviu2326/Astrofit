export interface Experiment {
  id: string;
  description: string;
  date: string;
  winner: string;
  notes: string;
  learnings: string;
}

export const getExperiments = async (): Promise<Experiment[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: 'exp1',
          description: 'Cambio en el color del bot??n CTA',
          date: '2023-01-15',
          winner: 'Variante B (azul)',
          notes: 'Se observ?? un incremento del 10% en clics.',
          learnings: 'Los colores c??lidos funcionan mejor para este p??blico.',
        },
        {
          id: 'exp2',
          description: 'Modificaci??n del titular de la p??gina de inicio',
          date: '2023-02-20',
          winner: 'Variante A (original)',
          notes: 'La nueva propuesta gener?? confusi??n.',
          learnings: 'Mantener la claridad en los mensajes principales.',
        },
      ]);
    }, 500);
  });
};

export const searchExperiments = async (query: { type?: string; date?: string }): Promise<Experiment[]> => {
  // Simulate API call with search functionality
  console.log('Searching with:', query);
  return getExperiments(); // For now, return all experiments
};
