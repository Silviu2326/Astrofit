import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, CheckCircle, XCircle, Users2 } from 'lucide-react';
import { assignRoles, getPeople, getAvailableRoles, Person, Role } from '../asignacionRolesApi';

interface AssignedRole {
  personId: string;
  personName: string;
  role: Role;
}

const roleColors: Record<Role, string> = {
  jugador: 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white',
  capitan: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white',
  entrenador: 'bg-gradient-to-r from-green-500 to-emerald-500 text-white',
  fisioterapeuta: 'bg-gradient-to-r from-red-500 to-pink-500 text-white',
  directivo: 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white',
};

const roleColorsLight: Record<Role, string> = {
  jugador: 'bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200',
  capitan: 'bg-gradient-to-r from-yellow-50 to-orange-50 text-yellow-700 border-yellow-200',
  entrenador: 'bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200',
  fisioterapeuta: 'bg-gradient-to-r from-red-50 to-pink-50 text-red-700 border-red-200',
  directivo: 'bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-700 border-purple-200',
};

const FormularioAsignacion: React.FC = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [availableRoles, setAvailableRoles] = useState<Role[]>([]);
  const [selectedPersonId, setSelectedPersonId] = useState<string>('');
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);
  const [assignmentsPreview, setAssignmentsPreview] = useState<AssignedRole[]>([]);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPeople = await getPeople();
      const fetchedRoles = await getAvailableRoles();
      setPeople(fetchedPeople);
      setAvailableRoles(fetchedRoles);
    };
    fetchData();
  }, []);

  const handlePersonChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPersonId(e.target.value);
    setSelectedRoles([]); // Reset roles when person changes
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const role = e.target.value as Role;
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  const handleAddAssignment = () => {
    if (!selectedPersonId || selectedRoles.length === 0) {
      setMessage({ type: 'error', text: 'Por favor, selecciona una persona y al menos un rol.' });
      return;
    }

    const person = people.find((p) => p.id === selectedPersonId);
    if (person) {
      const newAssignments: AssignedRole[] = selectedRoles.map((role) => ({
        personId: selectedPersonId,
        personName: person.name,
        role,
      }));

      setAssignmentsPreview((prev) => {
        const existingAssignments = prev.filter(
          (assignment) => assignment.personId !== selectedPersonId || !selectedRoles.includes(assignment.role)
        );
        return [...existingAssignments, ...newAssignments];
      });
      setSelectedRoles([]);
      setMessage(null);
    }
  };

  const handleRemoveAssignment = (personId: string, role: Role) => {
    setAssignmentsPreview((prev) =>
      prev.filter((assignment) => !(assignment.personId === personId && assignment.role === role))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (assignmentsPreview.length === 0) {
      setMessage({ type: 'error', text: 'No hay asignaciones para confirmar.' });
      return;
    }

    // Group assignments by person for the API call
    const groupedAssignments = assignmentsPreview.reduce((acc, current) => {
      if (!acc[current.personId]) {
        acc[current.personId] = { personId: current.personId, roles: [] };
      }
      acc[current.personId].roles.push(current.role);
      return acc;
    }, {} as Record<string, { personId: string; roles: Role[] }>);

    try {
      for (const personId in groupedAssignments) {
        const payload = groupedAssignments[personId];
        const response = await assignRoles(payload);
        if (!response.success) {
          throw new Error(response.message);
        }
      }
      setMessage({ type: 'success', text: 'Roles asignados exitosamente!' });
      setAssignmentsPreview([]);
      setSelectedPersonId('');
    } catch (error: any) {
      setMessage({ type: 'error', text: `Error al asignar roles: ${error.message}` });
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden relative">
      {/* Decoración de fondo */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute -left-10 -bottom-10 w-48 h-48 bg-gradient-to-br from-indigo-200 to-blue-200 rounded-full blur-3xl opacity-20"></div>

      {/* Header con gradiente */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 relative overflow-hidden">
        {/* Pattern de fondo */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <h3 className="text-xl font-bold text-white flex items-center gap-2 relative z-10">
          <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
            <Users2 className="w-6 h-6" />
          </div>
          Formulario de Asignación
        </h3>
      </div>

      <form onSubmit={handleSubmit} className="p-6 relative z-10">
        {/* Mensajes */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 mb-6 rounded-2xl backdrop-blur-sm border-2 flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-green-50/80 border-green-300 text-green-800'
                : 'bg-red-50/80 border-red-300 text-red-800'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            ) : (
              <XCircle className="w-5 h-5 flex-shrink-0" />
            )}
            <span className="font-medium">{message.text}</span>
          </motion.div>
        )}

        {/* Selección de Persona */}
        <div className="mb-6">
          <label htmlFor="person-select" className="block text-gray-700 text-sm font-bold mb-3">
            Seleccionar Persona:
          </label>
          <select
            id="person-select"
            className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all duration-300 outline-none bg-white/80 backdrop-blur-sm"
            value={selectedPersonId}
            onChange={handlePersonChange}
          >
            <option value="">-- Selecciona una persona --</option>
            {people.map((person) => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>
        </div>

        {/* Selección de Roles */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-3">Seleccionar Roles:</label>
          <div className="flex flex-wrap gap-3">
            {availableRoles.map((role) => (
              <motion.label
                key={role}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300 shadow-md ${
                  selectedRoles.includes(role) ? roleColors[role] : 'bg-gray-100 text-gray-700 border-2 border-gray-200'
                }`}
              >
                <input
                  type="checkbox"
                  value={role}
                  checked={selectedRoles.includes(role)}
                  onChange={handleRoleChange}
                  className="sr-only"
                />
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </motion.label>
            ))}
          </div>
        </div>

        {/* Botón Añadir */}
        <motion.button
          type="button"
          onClick={handleAddAssignment}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 mb-6 flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          Añadir Asignación
        </motion.button>

        {/* Vista Previa */}
        {assignmentsPreview.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <h2 className="text-lg font-bold mb-4 text-gray-800 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-600 rounded-full"></div>
              Vista Previa de Asignaciones
            </h2>
            <div className="space-y-2">
              {assignmentsPreview.map((assignment, index) => (
                <motion.div
                  key={`${assignment.personId}-${assignment.role}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-white border-2 border-gray-100 hover:border-indigo-200 transition-all duration-300 flex justify-between items-center group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white font-bold shadow-md">
                      {assignment.personName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 block">{assignment.personName}</span>
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-semibold mt-1 ${roleColorsLight[assignment.role]} border-2`}>
                        {assignment.role.charAt(0).toUpperCase() + assignment.role.slice(1)}
                      </span>
                    </div>
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => handleRemoveAssignment(assignment.personId, assignment.role)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-red-600 hover:text-red-700 font-semibold px-3 py-2 rounded-xl hover:bg-red-50 transition-all duration-300"
                  >
                    Eliminar
                  </motion.button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Botón Confirmar */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-4 px-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-6 h-6" />
          Confirmar Asignaciones
        </motion.button>
      </form>
    </div>
  );
};

export default FormularioAsignacion;
