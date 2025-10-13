import React, { useState } from 'react';
import FeedArticulos from './components/FeedArticulos';
import CategoriasFiltro from './components/CategoriasFiltro';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticuloCompleto from './components/ArticuloCompleto';

const BlogNoticiasPage: React.FC = () => {
  const [categoria, setCategoria] = useState<string>('Todas');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleCategoryChange = (category: string) => {
    setCategoria(category);
  };

  const handleSearchChange = (search: string) => {
    setSearchTerm(search);
  };

  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Blog de Noticias</h1>
        <CategoriasFiltro 
          onCategoryChange={handleCategoryChange}
          onSearchChange={handleSearchChange}
        />
        <Routes>
          <Route 
            path="/" 
            element={
              <FeedArticulos 
                categoria={categoria}
                searchTerm={searchTerm}
                onCategoryChange={handleCategoryChange}
                onSearchChange={handleSearchChange}
              />
            } 
          />
          <Route path="/articulo/:id" element={<ArticuloCompleto />} />
        </Routes>
      </div>
    </Router>
  );
};

export default BlogNoticiasPage;
