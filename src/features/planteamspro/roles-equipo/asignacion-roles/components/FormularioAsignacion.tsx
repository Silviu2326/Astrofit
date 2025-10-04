import React, { useState, useEffect } from 'react';
import { assignRoles, getPeople, getAvailableRoles, Person, Role } from '../asignacionRolesApi';

interface AssignedRole {
  personId: string;
  personName: string;
  role: Role;
}

const roleColors: Record<Role, string> = {
  jugador: 'bg-blue-200 text-blue-800',
  capitan: 'bg-yellow-200 text-yellow-800',
  entrenador: 'bg-green-200 text-green-800',
  fisioterapeuta: 'bg-red-200 text-red-800',
  directivo: 'bg-purple-200 text-purple-800',
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
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      {message && (
        <div
          className={`p-3 mb-4 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="mb-4">
        <label htmlFor="person-select" className="block text-gray-700 text-sm font-bold mb-2">
          Seleccionar Persona:
        </label>
        <select
          id="person-select"
          className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Seleccionar Roles:</label>
        <div className="flex flex-wrap gap-2">
          {availableRoles.map((role) => (
            <label
              key={role}
              className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium cursor-pointer ${
                selectedRoles.includes(role) ? roleColors[role] : 'bg-gray-200 text-gray-700'
              }`}
            >
              <input
                type="checkbox"
                value={role}
                checked={selectedRoles.includes(role)}
                onChange={handleRoleChange}
                className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out mr-2"
              />
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={handleAddAssignment}
        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-6"
      >
        Añadir Asignación
      </button>

      {assignmentsPreview.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Vista Previa de Asignaciones:</h2>
          <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
            {assignmentsPreview.map((assignment, index) => (
              <li key={`${assignment.personId}-${assignment.role}-${index}`} className="p-3 flex justify-between items-center">
                <span>
                  <span className="font-medium">{assignment.personName}</span> -' 
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[assignment.role]}`}>
                    {assignment.role.charAt(0).toUpperCase() + assignment.role.slice(1)}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveAssignment(assignment.personId, assignment.role)}
                  className="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="submit"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Confirmar Asignaciones
      </button>
    </form>
  );
};

export default FormularioAsignacion;
