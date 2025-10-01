export const searchContent = async (query: string, filters: any) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResults = [
        { id: 1, title: 'Artículo sobre React', type: 'Artículo', duration: '10 min', topic: 'Frontend', category: 'Desarrollo Web' },
        { id: 2, title: 'Video tutorial de TailwindCSS', type: 'Video', duration: '30 min', topic: 'Diseño UI', category: 'Desarrollo Web' },
        { id: 3, title: 'Ebook de Marketing Digital', type: 'Ebook', duration: '60 min', topic: 'Marketing', category: 'Negocios' },
        { id: 4, title: 'Podcast de Productividad', type: 'Audio', duration: '45 min', topic: 'Productividad', category: 'Desarrollo Personal' },
      ];
      
      const filteredResults = mockResults.filter(item => {
        const matchesQuery = query ? item.title.toLowerCase().includes(query.toLowerCase()) : true;
        const matchesType = filters.type ? item.type === filters.type : true;
        const matchesTopic = filters.topic ? item.topic === filters.topic : true;
        return matchesQuery && matchesType && matchesTopic;
      });

      resolve(filteredResults);
    }, 500);
  });
};

export const getSearchSuggestions = async (query: string) => {
  // Simulate API call for suggestions
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockSuggestions = [
        'React Hooks',
        'TailwindCSS responsive design',
        'Marketing digital para principiantes',
        'Gestión del tiempo',
      ];
      const filteredSuggestions = mockSuggestions.filter(s => s.toLowerCase().includes(query.toLowerCase()));
      resolve(filteredSuggestions);
    }, 200);
  });
};
