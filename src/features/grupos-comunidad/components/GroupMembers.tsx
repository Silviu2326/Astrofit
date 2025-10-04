import React, { useState } from 'react';
import {
  Search,
  Crown,
  Shield,
  User,
  MoreVertical,
  UserMinus,
  UserPlus,
  MessageCircle,
  Award,
  Filter,
} from 'lucide-react';
import { CommunityGroup, GroupMember } from '../types';

interface GroupMembersProps {
  group: CommunityGroup;
}

const GroupMembers: React.FC<GroupMembersProps> = ({ group }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'moderator' | 'member'>('all');

  // Mock members data
  const mockMembers: GroupMember[] = [
    {
      id: '1',
      userId: 'user1',
      username: 'Ana García',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ana',
      role: 'admin',
      joinedAt: new Date('2024-01-15'),
      postsCount: 145,
      reputation: 2340,
    },
    {
      id: '2',
      userId: 'user2',
      username: 'Carlos Ruiz',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos',
      role: 'moderator',
      joinedAt: new Date('2024-02-01'),
      postsCount: 89,
      reputation: 1560,
    },
    {
      id: '3',
      userId: 'user3',
      username: 'María López',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Maria',
      role: 'moderator',
      joinedAt: new Date('2024-02-10'),
      postsCount: 67,
      reputation: 980,
    },
    {
      id: '4',
      userId: 'user4',
      username: 'Juan Martínez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Juan',
      role: 'member',
      joinedAt: new Date('2024-03-05'),
      postsCount: 34,
      reputation: 450,
    },
    {
      id: '5',
      userId: 'user5',
      username: 'Laura Sánchez',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Laura',
      role: 'member',
      joinedAt: new Date('2024-03-15'),
      postsCount: 28,
      reputation: 320,
    },
    {
      id: '6',
      userId: 'user6',
      username: 'Pedro González',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Pedro',
      role: 'member',
      joinedAt: new Date('2024-04-01'),
      postsCount: 19,
      reputation: 210,
    },
    {
      id: '7',
      userId: 'user7',
      username: 'Isabel Díaz',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Isabel',
      role: 'member',
      joinedAt: new Date('2024-04-10'),
      postsCount: 12,
      reputation: 145,
    },
    {
      id: '8',
      userId: 'user8',
      username: 'Miguel Torres',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Miguel',
      role: 'member',
      joinedAt: new Date('2024-05-01'),
      postsCount: 8,
      reputation: 89,
    },
  ];

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin':
        return <Crown className="w-4 h-4 text-yellow-400" />;
      case 'moderator':
        return <Shield className="w-4 h-4 text-blue-400" />;
      default:
        return <User className="w-4 h-4 text-white/60" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrador';
      case 'moderator':
        return 'Moderador';
      default:
        return 'Miembro';
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'moderator':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      default:
        return 'bg-white/10 text-white/70 border-white/20';
    }
  };

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = member.username.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || member.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const sortedMembers = filteredMembers.sort((a, b) => {
    // Sort by role priority (admin > moderator > member), then by reputation
    const rolePriority = { admin: 3, moderator: 2, member: 1 };
    const roleA = rolePriority[a.role as keyof typeof rolePriority];
    const roleB = rolePriority[b.role as keyof typeof rolePriority];
    if (roleA !== roleB) return roleB - roleA;
    return b.reputation - a.reputation;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter */}
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type="text"
              placeholder="Buscar miembros..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as any)}
            className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            <option value="all" className="bg-purple-600">Todos los roles</option>
            <option value="admin" className="bg-purple-600">Administradores</option>
            <option value="moderator" className="bg-purple-600">Moderadores</option>
            <option value="member" className="bg-purple-600">Miembros</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-500/20 rounded-xl">
              <Crown className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Admins</p>
              <p className="text-2xl font-bold text-white">
                {mockMembers.filter(m => m.role === 'admin').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/20 rounded-xl">
              <Shield className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Moderadores</p>
              <p className="text-2xl font-bold text-white">
                {mockMembers.filter(m => m.role === 'moderator').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/20 rounded-xl">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white/60 text-sm">Miembros</p>
              <p className="text-2xl font-bold text-white">
                {mockMembers.filter(m => m.role === 'member').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Members List */}
      <div className="space-y-3">
        {sortedMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                {/* Avatar */}
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.username}
                    className="w-16 h-16 rounded-full bg-white/20"
                  />
                  <div className="absolute -bottom-1 -right-1 p-1.5 bg-purple-600 rounded-full border-2 border-white">
                    {getRoleIcon(member.role)}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-white text-lg">{member.username}</h4>
                    <span className={`px-2 py-1 rounded-lg text-xs font-semibold border ${getRoleBadgeColor(member.role)}`}>
                      {getRoleLabel(member.role)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-white/60 text-sm">
                    <span>
                      Miembro desde{' '}
                      {new Date(member.joinedAt).toLocaleDateString('es-ES', {
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span>•</span>
                    <span>{member.postsCount} publicaciones</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Award className="w-4 h-4" />
                      <span>{member.reputation} reputación</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                  <MessageCircle className="w-5 h-5 text-white" />
                </button>
                {(group.isAdmin || group.isModerator) && (
                  <button className="p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-colors">
                    <MoreVertical className="w-5 h-5 text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Invite Members */}
      {(group.isAdmin || group.isModerator) && (
        <button className="w-full py-4 bg-white text-purple-600 rounded-xl font-semibold hover:bg-white/90 transition-colors flex items-center justify-center gap-2">
          <UserPlus className="w-5 h-5" />
          Invitar Miembros
        </button>
      )}
    </div>
  );
};

export default GroupMembers;
