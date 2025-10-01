import React, { useState } from 'react';
import { useCreateArticleMutation, useUpdateArticleMutation } from '../contenidosArticulosApi';
// Assuming a rich text editor library like 'react-quill' or similar
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css'; // ES6

interface EditorArticulosProps {
  article?: any; // Article type from API
  onSave?: () => void;
}

const EditorArticulos: React.FC<EditorArticulosProps> = ({ article, onSave }) => {
  const [title, setTitle] = useState(article?.title || '');
  const [content, setContent] = useState(article?.content || '');
  const [imageUrl, setImageUrl] = useState(article?.imageUrl || '');
  const [categories, setCategories] = useState(article?.categories.join(', ') || '');
  const [tags, setTags] = useState(article?.tags.join(', ') || '');
  const [createArticle] = useCreateArticleMutation();
  const [updateArticle] = useUpdateArticleMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const articleData = {
      title,
      content,
      imageUrl,
      categories: categories.split(',').map(cat => cat.trim()),
      tags: tags.split(',').map(tag => tag.trim()),
    };

    try {
      if (article) {
        await updateArticle({ id: article.id, ...articleData }).unwrap();
      } else {
        await createArticle(articleData).unwrap();
      }
      onSave?.();
      alert('Artículo guardado exitosamente!');
    } catch (err) {
      console.error('Error al guardar el artículo:', err);
      alert('Hubo un error al guardar el artículo.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">{article ? 'Editar Artículo' : 'Crear Nuevo Artículo'}</h2>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Título</label>
        <input
          type="text"
          id="title"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Contenido</label>
        {/* Replace with a rich text editor component */}
        <textarea
          id="content"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-48"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        {/* Example with ReactQuill: */}
        {/* <ReactQuill theme="snow" value={content} onChange={setContent} /> */}
      </div>
      <div className="mb-4">
        <label htmlFor="imageUrl" className="block text-gray-700 text-sm font-bold mb-2">URL de Imagen Destacada</label>
        <input
          type="text"
          id="imageUrl"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="categories" className="block text-gray-700 text-sm font-bold mb-2">Categorías (separadas por coma)</label>
        <input
          type="text"
          id="categories"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label htmlFor="tags" className="block text-gray-700 text-sm font-bold mb-2">Etiquetas (separadas por coma)</label>
        <input
          type="text"
          id="tags"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      {/* File attachment input would go here */}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Guardar Artículo
      </button>
    </form>
  );
};

export default EditorArticulos;
