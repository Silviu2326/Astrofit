import React from 'react';
import { Users, MessageSquare, Globe, Lock, EyeOff, Shield, Crown, Calendar } from 'lucide-react';
import { CommunityGroup } from '../types';

interface GroupCardProps {
  group: CommunityGroup;
  onClick: () => void;
}

const GroupCard: React.FC<GroupCardProps> = ({ group, onClick }) => {
  const getPrivacyIcon = () => {
    switch (group.privacy) {
      case 'public':
        return <Globe className="w-4 h-4" />;
      case 'private':
        return <Lock className="w-4 h-4" />;
      case 'secret':
        return <EyeOff className="w-4 h-4" />;
    }
  };

  const getPrivacyLabel = () => {
    switch (group.privacy) {
      case 'public':
        return 'Público';
      case 'private':
        return 'Privado';
      case 'secret':
        return 'Secreto';
    }
  };

  const getCategoryColor = () => {
    const colors: Record<string, string> = {
      technology: 'bg-blue-500',
      gaming: 'bg-purple-500',
      art: 'bg-pink-500',
      music: 'bg-indigo-500',
      sports: 'bg-green-500',
      education: 'bg-yellow-500',
      business: 'bg-red-500',
      lifestyle: 'bg-teal-500',
      entertainment: 'bg-orange-500',
      other: 'bg-gray-500',
    };
    return colors[group.category] || colors.other;
  };

  return (
    <div
      onClick={onClick}
      className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 hover:bg-white/15 transition-all cursor-pointer group"
    >
      {/* Cover Image */}
      <div className="relative h-32 overflow-hidden">
        <img
          src={group.coverImage}
          alt={group.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Privacy Badge */}
        <div className="absolute top-3 right-3 px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full flex items-center gap-2 text-white text-sm">
          {getPrivacyIcon()}
          <span>{getPrivacyLabel()}</span>
        </div>

        {/* Icon */}
        <div className="absolute -bottom-6 left-4 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg border-4 border-purple-600">
          {group.icon}
        </div>

        {/* Admin/Moderator Badge */}
        {(group.isAdmin || group.isModerator) && (
          <div className="absolute top-3 left-3 px-3 py-1 bg-yellow-500/90 backdrop-blur-sm rounded-full flex items-center gap-1 text-white text-sm font-semibold">
            {group.isAdmin ? <Crown className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
            <span>{group.isAdmin ? 'Admin' : 'Mod'}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 pt-8">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`px-2 py-1 ${getCategoryColor()} text-white text-xs rounded-full font-semibold capitalize`}>
            {group.category}
          </span>
          {group.isJoined && (
            <span className="px-2 py-1 bg-green-500 text-white text-xs rounded-full font-semibold">
              Miembro
            </span>
          )}
        </div>

        {/* Name and Description */}
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
          {group.name}
        </h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-2">
          {group.description}
        </p>

        {/* Tags */}
        {group.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {group.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-lg"
              >
                #{tag}
              </span>
            ))}
            {group.tags.length > 3 && (
              <span className="px-2 py-1 bg-white/10 text-white/80 text-xs rounded-lg">
                +{group.tags.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <div className="flex items-center gap-4 text-white/70 text-sm">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{group.memberCount.toLocaleString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{group.postCount.toLocaleString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-white/60 text-xs">
            <Calendar className="w-3 h-3" />
            <span>
              {new Date(group.createdAt).toLocaleDateString('es-ES', {
                month: 'short',
                year: 'numeric'
              })}
            </span>
          </div>
        </div>

        {/* Join Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            // Handle join/leave
          }}
          className={`w-full mt-4 py-2 rounded-lg font-semibold transition-colors ${
            group.isJoined
              ? 'bg-white/10 text-white hover:bg-white/20'
              : 'bg-white text-purple-600 hover:bg-white/90'
          }`}
        >
          {group.isJoined ? 'Unirse' : 'Unirse al Grupo'}
        </button>
      </div>
    </div>
  );
};

export default GroupCard;
