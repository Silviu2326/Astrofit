import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import { GroupRule } from '../types';

interface GroupRulesProps {
  rules: GroupRule[];
}

const GroupRules: React.FC<GroupRulesProps> = ({ rules }) => {
  if (rules.length === 0) {
    return null;
  }

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-white/20 rounded-xl">
          <FileText className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Reglas del Grupo</h3>
          <p className="text-white/70 text-sm">Por favor, lee y respeta estas reglas</p>
        </div>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <span className="text-purple-300 font-bold">{rule.order}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-white mb-2 flex items-center gap-2">
                  {rule.title}
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">{rule.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl flex gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-yellow-200 text-sm font-medium mb-1">
            Advertencia importante
          </p>
          <p className="text-yellow-200/80 text-sm">
            El incumplimiento de estas reglas puede resultar en la expulsión del grupo. Los
            administradores y moderadores se reservan el derecho de tomar las acciones necesarias
            para mantener un ambiente positivo y respetuoso.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GroupRules;
