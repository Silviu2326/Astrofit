import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, XCircle, Crown, ArrowRight } from 'lucide-react';

interface CompetitorRow {
  feature: string;
  us: boolean | string;
  trainerize: boolean | string;
  trucoach: boolean | string;
  excel: boolean | string;
}

interface ComparisonTableProps {
  competitorComparison: CompetitorRow[];
}

export const ComparisonTable: React.FC<ComparisonTableProps> = ({ competitorComparison }) => {
  const navigate = useNavigate();

  return (
    <section id="comparativa" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            TrainerPro vs "La Competencia"
          </h2>
          <p className="text-xl text-gray-600 flex items-center justify-center gap-2">
            Spoiler: No hay competencia real
            <Crown className="w-6 h-6 text-yellow-500" />
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white border-2 border-gray-200 rounded-2xl overflow-hidden shadow-xl">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="px-6 py-4 text-left">Característica</th>
                <th className="px-6 py-4 text-center bg-blue-600">
                  <div className="flex items-center justify-center gap-2">
                    TrainerPro
                    <Crown className="w-5 h-5 text-yellow-400" />
                  </div>
                </th>
                <th className="px-6 py-4 text-center">Trainerize</th>
                <th className="px-6 py-4 text-center">TrueCoach</th>
                <th className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2">
                    Excel
                    <XCircle className="w-5 h-5 text-red-400" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {competitorComparison.map((row, idx) => (
                <tr key={idx} className={`hover:bg-gray-100 transition-colors duration-300 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className="px-6 py-4 font-semibold">{row.feature}</td>
                  <td className="px-6 py-4 text-center bg-blue-50">
                    {typeof row.us === 'boolean' ? (
                      row.us ? <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto hover:scale-110 transition-transform duration-300" /> : <XCircle className="w-6 h-6 text-red-600 mx-auto" />
                    ) : (
                      <span className="font-bold text-blue-600">{row.us}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {typeof row.trainerize === 'boolean' ? (
                      row.trainerize ? <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" /> : <XCircle className="w-6 h-6 text-gray-400 mx-auto" />
                    ) : (
                      <span className="text-gray-700">{row.trainerize}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {typeof row.trucoach === 'boolean' ? (
                      row.trucoach ? <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" /> : <XCircle className="w-6 h-6 text-gray-400 mx-auto" />
                    ) : (
                      <span className="text-gray-700">{row.trucoach}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {typeof row.excel === 'boolean' ? (
                      row.excel ? <CheckCircle2 className="w-6 h-6 text-green-600 mx-auto" /> : <XCircle className="w-6 h-6 text-gray-400 mx-auto" />
                    ) : (
                      <span className="text-gray-700 italic">{row.excel}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="text-center mt-10">
          <p className="text-2xl font-bold text-gray-700 mb-6">
            La pregunta no es "¿cuál elijo?" La pregunta es "¿por qué coño sigo perdiendo tiempo?"
          </p>
          <button
            onClick={() => navigate('/login')}
            className="group px-10 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black text-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl inline-flex items-center gap-2"
          >
            Probar TrainerPro Gratis
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
