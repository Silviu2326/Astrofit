import React from 'react';
import FeedArticulos from './components/FeedArticulos';
import CategoriasFiltro from './components/CategoriasFiltro';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ArticuloCompleto from './components/ArticuloCompleto';

const BlogNoticiasPage: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Blog de Noticias</h1>
        <CategoriasFiltro />
        <Routes>
          <Route path="/" element={<FeedArticulos />} />
          <Route path="/articulo/:id" element={<ArticuloCompleto />} />
        </Routes>
      </div>
    </Router>
  );
};

export default BlogNoticiasPage;
