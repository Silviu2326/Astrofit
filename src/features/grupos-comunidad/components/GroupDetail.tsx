import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  MessageSquare,
  Settings,
  UserPlus,
  Share2,
  MoreVertical,
  Shield,
  Crown,
  Globe,
  Lock,
  EyeOff,
  Calendar,
  Activity,
} from 'lucide-react';
import { CommunityGroup } from '../types';
import GroupFeed from './GroupFeed';
import GroupMembers from './GroupMembers';
import GroupRules from './GroupRules';

interface GroupDetailProps {
  group: CommunityGroup;
  onBack: () => void;
}

const GroupDetail: React.FC<GroupDetailProps> = ({ group, onBack }) => {
  const [activeTab, setActiveTab] = useState<'feed' | 'members' | 'about'>('feed');

  const getPrivacyIcon = () => {
    switch (group.privacy) {
      case 'public':
        return <Globe className="w-5 h-5" />;
      case 'private':
        return <Lock className="w-5 h-5" />;
      case 'secret':
        return <EyeOff className="w-5 h-5" />;
    }
  };

  const getPrivacyLabel = () => {
    switch (group.privacy) {
      case 'public':
        return 'Grupo Público';
      case 'private':
        return 'Grupo Privado';
      case 'secret':
        return 'Grupo Secreto';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-lg border-b border-white/20">
        {/* Cover Image */}
        <div className="relative h-64">
          <img
            src={group.coverImage}
            alt={group.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Back Button */}
          <button
            onClick={onBack}
            className="absolute top-6 left-6 p-3 bg-black/40 backdrop-blur-sm rounded-xl text-white hover:bg-black/60 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Actions */}
          <div className="absolute top-6 right-6 flex gap-3">
            <button className="p-3 bg-black/40 backdrop-blur-sm rounded-xl text-white hover:bg-black/60 transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            {(group.isAdmin || group.isModerator) && (
              <button className="p-3 bg-black/40 backdrop-blur-sm rounded-xl text-white hover:bg-black/60 transition-colors">
                <Settings className="w-5 h-5" />
              </button>
            )}
            <button className="p-3 bg-black/40 backdrop-blur-sm rounded-xl text-white hover:bg-black/60 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Group Info */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-end gap-6">
              {/* Icon */}
              <div className="w-24 h-24 bg-white rounded-2xl flex items-center justify-center text-5xl shadow-lg border-4 border-purple-600 flex-shrink-0">
                {group.icon}
              </div>

              {/* Info */}
              <div className="flex-1 pb-2">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white">{group.name}</h1>
                  {group.isAdmin && (
                    <span className="px-3 py-1 bg-yellow-500 rounded-full text-white text-sm font-semibold flex items-center gap-1">
                      <Crown className="w-4 h-4" />
                      Admin
                    </span>
                  )}
                  {group.isModerator && !group.isAdmin && (
                    <span className="px-3 py-1 bg-blue-500 rounded-full text-white text-sm font-semibold flex items-center gap-1">
                      <Shield className="w-4 h-4" />
                      Moderador
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 text-white/90 text-sm">
                  <div className="flex items-center gap-2">
                    {getPrivacyIcon()}
                    <span>{getPrivacyLabel()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{group.memberCount.toLocaleString()} miembros</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    <span>{group.postCount.toLocaleString()} publicaciones</span>
                  </div>
                </div>
              </div>

              {/* Join Button */}
              <button
                className={`px-8 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2 ${
                  group.isJoined
                    ? 'bg-white/20 text-white hover:bg-white/30'
                    : 'bg-white text-purple-600 hover:bg-white/90'
                }`}
              >
                {group.isJoined ? (
                  <>
                    <Users className="w-5 h-5" />
                    Miembro
                  </>
                ) : (
                  <>
                    <UserPlus className="w-5 h-5" />
                    Unirse
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="px-6">
          <div className="flex gap-1">
            {[
              { id: 'feed', label: 'Publicaciones', icon: MessageSquare },
              { id: 'members', label: 'Miembros', icon: Users },
              { id: 'about', label: 'Acerca de', icon: Activity },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-6 py-4 font-semibold transition-all flex items-center gap-2 border-b-2 ${
                  activeTab === tab.id
                    ? 'text-white border-white'
                    : 'text-white/60 border-transparent hover:text-white/80'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {activeTab === 'feed' && <GroupFeed group={group} />}
            {activeTab === 'members' && <GroupMembers group={group} />}
            {activeTab === 'about' && (
              <div className="space-y-6">
                {/* Description */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <h3 className="text-xl font-bold text-white mb-4">Descripción</h3>
                  <p className="text-white/80 leading-relaxed">{group.description}</p>
                </div>

                {/* Tags */}
                {group.tags.length > 0 && (
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                    <h3 className="text-xl font-bold text-white mb-4">Etiquetas</h3>
                    <div className="flex flex-wrap gap-2">
                      {group.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-white/20 text-white rounded-lg font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Rules */}
                {group.rules.length > 0 && <GroupRules rules={group.rules} />}

                {/* Created Date */}
                <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
                  <div className="flex items-center gap-3 text-white/80">
                    <Calendar className="w-5 h-5" />
                    <span>
                      Creado el{' '}
                      {new Date(group.createdAt).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">Estadísticas</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/80">
                    <Users className="w-4 h-4" />
                    <span>Miembros</span>
                  </div>
                  <span className="text-white font-semibold">
                    {group.memberCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/80">
                    <MessageSquare className="w-4 h-4" />
                    <span>Publicaciones</span>
                  </div>
                  <span className="text-white font-semibold">
                    {group.postCount.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-white/80">
                    <Activity className="w-4 h-4" />
                    <span>Actividad</span>
                  </div>
                  <span className="text-green-400 font-semibold">Alta</span>
                </div>
              </div>
            </div>

            {/* Admins */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">Administración</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Admins</div>
                    <div className="text-white/60 text-sm">{group.admins.length} administradores</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-white font-medium">Moderadores</div>
                    <div className="text-white/60 text-sm">{group.moderators.length} moderadores</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Category */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
              <h3 className="text-lg font-bold text-white mb-4">Categoría</h3>
              <span className="px-4 py-2 bg-white/20 text-white rounded-lg font-medium capitalize">
                {group.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupDetail;
