import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Image, Video, Smile, BarChart3, Globe, Users, Lock, X, MapPin } from 'lucide-react';
import { feedComunidadApi } from '../../feed-comunidad/feedComunidadApi';
import { Post, User, PostPrivacy } from '../../feed-comunidad/types';

const CrearPost: React.FC = () => {
  const [content, setContent] = useState<string>('');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video' | '' >('');
  const [postType, setPostType] = useState<'text' | 'image' | 'video' | 'poll'>('text');
  const [pollOptions, setPollOptions] = useState<string[]>(['', '']);
  const [privacy, setPrivacy] = useState<PostPrivacy>('Público');
  const [showPrivacyMenu, setShowPrivacyMenu] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const maxChars = 500;

  const currentUser: User = {
    id: 'user1',
    name: 'Entrenador Juan',
    avatar: 'https://i.pravatar.cc/150?img=12',
    role: 'Entrenador'
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setContent(text);
      setCharCount(text.length);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setMediaFile(file);

      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      if (file.type.startsWith('image')) {
        setMediaType('image');
        setPostType('image');
      } else if (file.type.startsWith('video')) {
        setMediaType('video');
        setPostType('video');
      }
    }
  };

  const handleRemoveMedia = () => {
    setMediaFile(null);
    setMediaPreview(null);
    setMediaType('');
    setPostType('text');
  };

  const handleAddPollOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const handlePollOptionChange = (index: number, value: string) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim() && !mediaFile && postType !== 'poll') {
      alert('El post no puede estar vac??o.');
      return;
    }

    let newPost: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'shares' | 'isPinned'>;

    if (postType === 'poll') {
      const validOptions = pollOptions.filter(option => option.trim() !== '');
      if (validOptions.length < 2) {
        alert('Una encuesta debe tener al menos dos opciones v??lidas.');
        return;
      }
      newPost = {
        author: currentUser,
        content: content.trim() || 'Encuesta r??pida',
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

    try {
      await feedComunidadApi.createPost(newPost);
      setContent('');
      setMediaFile(null);
      setMediaType('');
      setPostType('text');
      setPollOptions(['', '']);
      // Optionally, trigger a re-fetch of posts in TimelinePosts
      window.location.reload(); // Simple reload for demonstration
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Hubo un error al crear el post.');
    }
  };

  const privacyOptions = [
    { value: 'Público' as PostPrivacy, icon: Globe, label: 'Público', description: 'Cualquiera puede ver' },
    { value: 'Amigos' as PostPrivacy, icon: Users, label: 'Amigos', description: 'Solo tus amigos' },
    { value: 'Solo yo' as PostPrivacy, icon: Lock, label: 'Solo yo', description: 'Solo tú' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl p-6 border border-white/50 relative overflow-hidden mb-6"
    >
      {/* Decoración de fondo */}
      <div className="absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br from-pink-200 to-rose-200 rounded-full blur-3xl opacity-20"></div>

      <div className="relative z-10">
        <form onSubmit={handleSubmit}>
          {/* Header con avatar */}
          <div className="flex items-start gap-4 mb-4">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-md flex-shrink-0"
            />
            <div className="flex-1">
              <textarea
                className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm resize-none"
                rows={3}
                placeholder={`¿Qué quieres compartir, ${currentUser.name}?`}
                value={content}
                onChange={handleContentChange}
              />
              {/* Contador de caracteres */}
              <div className="flex justify-end mt-2">
                <span className={`text-xs font-medium ${charCount > maxChars * 0.9 ? 'text-red-500' : 'text-gray-400'}`}>
                  {charCount} / {maxChars}
                </span>
              </div>
            </div>
          </div>

          {/* Preview de media */}
          <AnimatePresence>
            {mediaPreview && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mb-4 relative rounded-2xl overflow-hidden"
              >
                {mediaType === 'image' ? (
                  <img src={mediaPreview} alt="Preview" className="w-full max-h-96 object-cover rounded-2xl" />
                ) : (
                  <video src={mediaPreview} controls className="w-full max-h-96 rounded-2xl" />
                )}
                <button
                  type="button"
                  onClick={handleRemoveMedia}
                  className="absolute top-3 right-3 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-all duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Opciones de encuesta */}
          <AnimatePresence>
            {postType === 'poll' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-200"
              >
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  Opciones de Encuesta
                </h4>
                <div className="space-y-2">
                  {pollOptions.map((option, index) => (
                    <input
                      key={index}
                      type="text"
                      className="w-full px-4 py-2 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all duration-300 outline-none"
                      placeholder={`Opción ${index + 1}`}
                      value={option}
                      onChange={(e) => handlePollOptionChange(index, e.target.value)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={handleAddPollOption}
                  className="mt-3 text-purple-600 hover:text-purple-800 text-sm font-semibold"
                >
                  + Añadir opción
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botones de acciones y privacidad */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-gray-200">
            {/* Botones de multimedia */}
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-xl cursor-pointer hover:shadow-md transition-all duration-300 group border border-blue-200">
                <Image className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-semibold hidden sm:inline">Foto</span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
              </label>

              <label className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 rounded-xl cursor-pointer hover:shadow-md transition-all duration-300 group border border-purple-200">
                <Video className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm font-semibold hidden sm:inline">Video</span>
                <input type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
              </label>

              <button
                type="button"
                onClick={() => {
                  setPostType(postType === 'poll' ? 'text' : 'poll');
                  if (mediaFile) handleRemoveMedia();
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-md ${
                  postType === 'poll'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white'
                    : 'bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 border border-purple-200'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span className="hidden sm:inline">Poll</span>
              </button>

              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-600 rounded-xl hover:shadow-md transition-all duration-300 border border-yellow-200"
              >
                <Smile className="w-5 h-5" />
              </button>
            </div>

            {/* Selector de privacidad y botón publicar */}
            <div className="flex items-center gap-3">
              {/* Selector de privacidad */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowPrivacyMenu(!showPrivacyMenu)}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700 text-sm font-semibold transition-all duration-300"
                >
                  {privacyOptions.find(p => p.value === privacy)?.icon && (
                    React.createElement(privacyOptions.find(p => p.value === privacy)!.icon, { className: "w-4 h-4" })
                  )}
                  <span className="hidden sm:inline">{privacy}</span>
                </button>

                <AnimatePresence>
                  {showPrivacyMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute bottom-full mb-2 right-0 bg-white rounded-2xl shadow-2xl p-2 min-w-[200px] border border-gray-200 z-50"
                    >
                      {privacyOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            setPrivacy(option.value);
                            setShowPrivacyMenu(false);
                          }}
                          className={`w-full flex items-start gap-3 p-3 rounded-xl transition-all duration-300 ${
                            privacy === option.value
                              ? 'bg-gradient-to-r from-pink-50 to-rose-50'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          <option.icon className={`w-5 h-5 flex-shrink-0 ${privacy === option.value ? 'text-pink-600' : 'text-gray-600'}`} />
                          <div className="text-left">
                            <p className="font-semibold text-sm text-gray-800">{option.label}</p>
                            <p className="text-xs text-gray-500">{option.description}</p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Botón publicar */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 via-rose-500 to-red-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Publicar
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default CrearPost;
