import React, { useState } from 'react';
import { Users, Plus, Search, Filter, TrendingUp, Clock, Globe, Lock, EyeOff } from 'lucide-react';
import { CommunityGroup, GroupCategory } from '../types';
import GroupCard from './GroupCard';
import CreateGroupModal from './CreateGroupModal';
import GroupDetail from './GroupDetail';

const GruposComunidad: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState<'discover' | 'my-groups' | 'trending'>('discover');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<GroupCategory | 'all'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<CommunityGroup | null>(null);

  // Mock data
  const mockGroups: CommunityGroup[] = [
    {
      id: '1',
      name: 'Desarrolladores Web',
      description: 'Comunidad para desarrolladores web que comparten conocimientos, proyectos y oportunidades.',
      category: 'technology',
      coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop',
      icon: '💻',
      privacy: 'public',
      memberCount: 15420,
      postCount: 3240,
      createdAt: new Date('2024-01-15'),
      createdBy: 'user1',
      admins: ['user1'],
      moderators: ['user2', 'user3'],
      rules: [
        { id: '1', title: 'Respeto mutuo', description: 'Trata a todos con respeto y profesionalismo', order: 1 },
        { id: '2', title: 'Contenido relevante', description: 'Comparte solo contenido relacionado con desarrollo web', order: 2 },
      ],
      tags: ['javascript', 'react', 'nodejs', 'frontend'],
      isJoined: true,
      isAdmin: false,
      isModerator: false,
    },
    {
      id: '2',
      name: 'Gamers Unidos',
      description: 'El mejor lugar para gamers. Comparte experiencias, forma equipos y discute sobre tus juegos favoritos.',
      category: 'gaming',
      coverImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop',
      icon: '🎮',
      privacy: 'public',
      memberCount: 28350,
      postCount: 12450,
      createdAt: new Date('2024-02-01'),
      createdBy: 'user4',
      admins: ['user4'],
      moderators: ['user5'],
      rules: [],
      tags: ['gaming', 'esports', 'streaming'],
      isJoined: false,
      isAdmin: false,
      isModerator: false,
    },
    {
      id: '3',
      name: 'Arte Digital',
      description: 'Artistas digitales compartiendo sus obras, técnicas y feedback constructivo.',
      category: 'art',
      coverImage: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop',
      icon: '🎨',
      privacy: 'public',
      memberCount: 8920,
      postCount: 5630,
      createdAt: new Date('2024-03-10'),
      createdBy: 'user6',
      admins: ['user6'],
      moderators: [],
      rules: [],
      tags: ['art', 'digital', 'illustration', 'design'],
      isJoined: true,
      isAdmin: false,
      isModerator: false,
    },
    {
      id: '4',
      name: 'Emprendedores Tech',
      description: 'Red de emprendedores tecnológicos compartiendo experiencias y oportunidades de negocio.',
      category: 'business',
      coverImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=400&fit=crop',
      icon: '🚀',
      privacy: 'private',
      memberCount: 3450,
      postCount: 890,
      createdAt: new Date('2024-04-05'),
      createdBy: 'user7',
      admins: ['user7'],
      moderators: ['user8'],
      rules: [],
      tags: ['startup', 'business', 'tech', 'networking'],
      isJoined: false,
      isAdmin: false,
      isModerator: false,
    },
  ];

  const categories: { value: GroupCategory | 'all'; label: string; icon: string }[] = [
    { value: 'all', label: 'Todos', icon: '🌐' },
    { value: 'technology', label: 'Tecnología', icon: '💻' },
    { value: 'gaming', label: 'Gaming', icon: '🎮' },
    { value: 'art', label: 'Arte', icon: '🎨' },
    { value: 'music', label: 'Música', icon: '🎵' },
    { value: 'sports', label: 'Deportes', icon: '⚽' },
    { value: 'education', label: 'Educación', icon: '📚' },
    { value: 'business', label: 'Negocios', icon: '💼' },
    { value: 'lifestyle', label: 'Estilo de vida', icon: '🌟' },
    { value: 'entertainment', label: 'Entretenimiento', icon: '🎬' },
  ];

  const filteredGroups = mockGroups.filter(group => {
    const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         group.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || group.category === selectedCategory;
    const matchesTab = selectedTab === 'discover' ? true :
                      selectedTab === 'my-groups' ? group.isJoined :
                      true; // trending logic
    return matchesSearch && matchesCategory && matchesTab;
  });

  if (selectedGroup) {
    return <GroupDetail group={selectedGroup} onBack={() => setSelectedGroup(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-white/20 rounded-2xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-1">Grupos de Comunidad</h1>
                <p className="text-white/80">Únete a comunidades y comparte intereses</p>
              </div>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Crear Grupo
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            {[
              { id: 'discover', label: 'Descubrir', icon: Globe },
              { id: 'my-groups', label: 'Mis Grupos', icon: Users },
              { id: 'trending', label: 'Tendencias', icon: TrendingUp },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                  selectedTab === tab.id
                    ? 'bg-white text-purple-600'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
              <input
                type="text"
                placeholder="Buscar grupos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="appearance-none pl-12 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30 cursor-pointer"
              >
                {categories.map(cat => (
                  <option key={cat.value} value={cat.value} className="bg-purple-600">
                    {cat.icon} {cat.label}
                  </option>
                ))}
              </select>
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">Total de Grupos</p>
                <p className="text-3xl font-bold text-white">{mockGroups.length}</p>
              </div>
              <Globe className="w-8 h-8 text-white/60" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">Mis Grupos</p>
                <p className="text-3xl font-bold text-white">
                  {mockGroups.filter(g => g.isJoined).length}
                </p>
              </div>
              <Users className="w-8 h-8 text-white/60" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">Miembros Totales</p>
                <p className="text-3xl font-bold text-white">
                  {mockGroups.reduce((acc, g) => acc + g.memberCount, 0).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-white/60" />
            </div>
          </div>
        </div>

        {/* Groups Grid */}
        {filteredGroups.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroups.map(group => (
              <GroupCard
                key={group.id}
                group={group}
                onClick={() => setSelectedGroup(group)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-12 border border-white/20 text-center">
            <Users className="w-16 h-16 text-white/40 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No se encontraron grupos</h3>
            <p className="text-white/60 mb-6">
              Intenta ajustar tus filtros o crea un nuevo grupo
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-white/90 transition-colors inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Crear Grupo
            </button>
          </div>
        )}
      </div>

      {/* Create Group Modal */}
      {showCreateModal && (
        <CreateGroupModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export default GruposComunidad;
