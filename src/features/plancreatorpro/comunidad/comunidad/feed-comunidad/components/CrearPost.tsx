import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { feedComunidadApi } from '../../feed-comunidad/feedComunidadApi';
import { Post, User } from '../../feed-comunidad/types';

const CrearPost: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | '' >('');
  const [postType, setPostType] = useState<'text' | 'image' | 'video' | 'poll'>('text');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const currentUser: User = { id: 'user1', name: 'Entrenador Juan', avatar: '🏋️‍♂️' }; // Simulaci??n de usuario actual

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('El archivo es demasiado grande. Máximo 10MB permitido.');
        return;
      }
      
      setMediaFile(file);
      if (file.type.startsWith('image')) {
        setMediaType('image');
        setPostType('image');
        toast.success('Imagen seleccionada');
      } else if (file.type.startsWith('video')) {
        setMediaType('video');
        setPostType('video');
        toast.success('Video seleccionado');
      } else {
        toast.error('Tipo de archivo no soportado');
        return;
      }
    }
  };

  const handleAddPollOption = () => {
    if (pollOptions.length < 6) {
      setPollOptions([...pollOptions, '']);
      toast.success('Opción agregada');
    } else {
      toast.error('Máximo 6 opciones permitidas');
    }
  };

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() && !mediaFile && postType !== 'poll') {
      toast.error('El post no puede estar vacío.');
      return;
    }

    let newPost: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares' | 'isPinned'>;

    if (postType === 'poll') {
      const validOptions = pollOptions.filter(option => option.trim() !== '');
      if (validOptions.length < 2) {
        toast.error('Una encuesta debe tener al menos dos opciones válidas.');
        return;
      }
      newPost = {
        author: currentUser,
        content: content.trim() || 'Encuesta rápida',
        media: [],
        type: 'poll',
        pollOptions: validOptions.map((option, index) => ({ id: `opt-${index}`, text: option, votes: 0 })),
      };
    } else {
      newPost = {
        author: currentUser,
        content: content.trim(),
        media: mediaFile ? [{ type: mediaType as 'image' | 'video', url: URL.createObjectURL(mediaFile) }] : [],
        type: postType,
      };
    }

    const loadingToast = toast.loading('Publicando post...');

    try {
      await feedComunidadApi.createPost(newPost);
      setContent('');
      setMediaFile(null);
      setMediaType('');
      setPostType('text');
      setPollOptions(['', '']);
      
      toast.dismiss(loadingToast);
      toast.success('¡Post publicado exitosamente!');
      
      // Trigger a re-fetch of posts by dispatching a custom event
      window.dispatchEvent(new CustomEvent('postCreated'));
    } catch (error) {
      console.error('Error creating post:', error);
      toast.dismiss(loadingToast);
      toast.error('Hubo un error al crear el post. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Crear Nuevo Post</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          placeholder="??Qu?? tienes en mente, Entrenador Juan?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <div className="flex items-center space-x-4 mb-4">
          <label className="flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full cursor-pointer hover:bg-blue-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-4 4 4 4-4V5h-4v7l-4-4-4 4z" clipRule="evenodd" />
            </svg>
            Foto/Video
            <input type="file" accept="image/*,video/*" className="hidden" onChange={handleFileChange} />
          </label>
          <button
            type="button"
            onClick={() => setPostType('poll')}
            className={`flex items-center px-4 py-2 rounded-full ${postType === 'poll' ? 'bg-purple-200 text-purple-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 00-1.414-1.414L11 10.586V7z" clipRule="evenodd" />
            </svg>
            Encuesta
          </button>
        </div>

        {mediaFile && (
          <div className="mb-4 text-sm text-gray-600">
            Archivo seleccionado: {mediaFile.name} ({mediaType})
          </div>
        )}

        {postType === 'poll' && (
          <div className="mb-4 p-3 bg-gray-50 rounded-md">
            <h4 className="font-semibold mb-2">Opciones de Encuesta:</h4>
            {pollOptions.map((option, index) => (
              <input
                key={index}
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md mb-2"
                placeholder={`Opci??n ${index + 1}`}
                value={option}
                onChange={(e) => handlePollOptionChange(index, e.target.value)}
              />
            ))}
            <button
              type="button"
              onClick={handleAddPollOption}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              + A??adir opci??n
            </button>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
        >
          Publicar
        </button>
      </form>
    </div>
  );
};

export default CrearPost;
