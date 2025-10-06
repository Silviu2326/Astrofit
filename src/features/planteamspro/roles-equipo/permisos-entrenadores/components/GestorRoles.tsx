import React from 'react';
import { Users, Crown, UserCheck, Eye } from 'lucide-react';

const GestorRoles: React.FC = () => {
  const roles = [
    { id: 1, name: 'Administrador', level: 'admin', users: 3, color: 'from-red-500 to-orange-500', icon: Crown },
    { id: 2, name: 'Moderador', level: 'moderator', users: 8, color: 'from-blue-500 to-indigo-500', icon: UserCheck },
    { id: 3, name: 'Lectura', level: 'read', users: 15, color: 'from-gray-500 to-slate-500', icon: Eye },
  ];

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden border border-white/50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Users className="w-6 h-6" />
          </div>
          Gestor de Roles
        </h3>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                className="relative overflow-hidden bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-gray-100 hover:shadow-lg transition-all duration-300 group"
              >
                <div className={`absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br ${role.color} opacity-10 rounded-full blur-2xl`}></div>

                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white mb-3 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h4 className="text-lg font-bold text-gray-900 mb-1">{role.name}</h4>

                  <div className="flex items-center gap-2 mb-3">
                    <span className={`text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${role.color} text-white`}>
                      {role.level.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    <span className="font-bold text-gray-900">{role.users}</span> usuarios
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GestorRoles;
