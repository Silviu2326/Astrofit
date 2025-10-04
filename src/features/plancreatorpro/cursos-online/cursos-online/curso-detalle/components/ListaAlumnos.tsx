import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Mail, MoreVertical, Crown, Star, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Curso } from '../../curso-detalle/cursoDetalleApi';

interface ListaAlumnosProps {
  alumnos: Curso['alumnos'];
}

const ListaAlumnos: React.FC<ListaAlumnosProps> = ({ alumnos }) => {
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const handleStudentClick = (studentId: string, studentName: string) => {
    setSelectedStudent(selectedStudent === studentId ? null : studentId);
    toast.success(`Ver perfil de ${studentName}`);
  };

  const handleSendMessage = (studentId: string, studentName: string) => {
    toast.success(`Abriendo chat con ${studentName}`);
    // Navigate to messaging with the specific student chat opened
    navigate(`/mensajeria?chat=${studentId}`);
  };

  const handleSendEmail = (studentName: string) => {
    toast.loading(`Enviando email a ${studentName}...`);
    setTimeout(() => {
      toast.success(`Email enviado a ${studentName}`);
    }, 1500);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
          <Users className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Alumnos Inscritos</h2>
        <div className="ml-auto bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm font-semibold">
          {alumnos.length} estudiantes
        </div>
      </div>
      
      <div className="space-y-3">
        {alumnos.map((alumno, index) => {
          const isSelected = selectedStudent === alumno.id;
          const isTopStudent = index === 0; // Mock: first student is top performer
          const progress = Math.floor(Math.random() * 100) + 1; // Mock progress

          return (
            <motion.div
              key={alumno.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`border rounded-2xl overflow-hidden transition-all duration-200 ${
                isSelected 
                  ? 'border-blue-300 bg-blue-50 shadow-lg' 
                  : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div 
                className="p-4 cursor-pointer"
                onClick={() => handleStudentClick(alumno.id, alumno.nombre)}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img 
                      src={alumno.avatar} 
                      alt={alumno.nombre} 
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md" 
                    />
                    {isTopStudent && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center">
                        <Crown className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">{alumno.nombre}</h3>
                      {isTopStudent && (
                        <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium">
                          <Star className="w-3 h-3" />
                          Top
                        </div>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-500">{progress}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-800">
                        {Math.floor(Math.random() * 50) + 10} lecciones
                      </div>
                      <div className="text-xs text-gray-500">
                        {Math.floor(Math.random() * 20) + 5} horas
                      </div>
                    </div>
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>

              {isSelected && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-100 bg-gray-50"
                >
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-3">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSendMessage(alumno.id, alumno.nombre)}
                        className="flex items-center gap-2 p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-colors duration-200"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">Mensaje</span>
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSendEmail(alumno.nombre)}
                        className="flex items-center gap-2 p-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 transition-colors duration-200"
                      >
                        <Mail className="w-4 h-4" />
                        <span className="text-sm font-medium">Email</span>
                      </motion.button>
                    </div>
                    
                    <div className="mt-3 p-3 bg-white rounded-xl border border-gray-200">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm font-medium text-gray-700">Progreso Reciente</span>
                      </div>
                      <div className="text-xs text-gray-600">
                        Última actividad: {Math.floor(Math.random() * 7) + 1} días atrás
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ListaAlumnos;
