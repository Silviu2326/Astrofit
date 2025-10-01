import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { UserPlus, Phone, Calendar, CheckCircle, XCircle, Plus } from 'lucide-react';
import { Lead, updateLeadStatus } from '../leadsListadoApi';
import LeadCard from './LeadCard';

interface LeadsKanbanProps {
  leads: Lead[];
}

const LeadsKanban: React.FC<LeadsKanbanProps> = ({ leads: initialLeads }) => {
  const columnsConfig = {
    'Nuevo contacto': {
      id: 'Nuevo contacto',
      title: 'Nuevo Contacto',
      icon: <UserPlus className="w-5 h-5" />,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-600',
      leadIds: [] as string[]
    },
    'Contactado': {
      id: 'Contactado',
      title: 'Contactado',
      icon: <Phone className="w-5 h-5" />,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-600',
      leadIds: [] as string[]
    },
    'Cita agendada': {
      id: 'Cita agendada',
      title: 'Cita Agendada',
      icon: <Calendar className="w-5 h-5" />,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-600',
      leadIds: [] as string[]
    },
    'Ganado': {
      id: 'Ganado',
      title: 'Ganado',
      icon: <CheckCircle className="w-5 h-5" />,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-green-600',
      leadIds: [] as string[]
    },
    'Perdido': {
      id: 'Perdido',
      title: 'Perdido',
      icon: <XCircle className="w-5 h-5" />,
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-600',
      leadIds: [] as string[]
    }
  };

  // Populate columns with initial leads
  initialLeads.forEach(lead => {
    if (columnsConfig[lead.status]) {
      columnsConfig[lead.status].leadIds.push(lead.id);
    }
  });

  const [boardColumns, setBoardColumns] = useState(columnsConfig);
  const [allLeads, setAllLeads] = useState<Record<string, Lead>>(
    initialLeads.reduce((acc, lead) => ({ ...acc, [lead.id]: lead }), {})
  );

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same column
      const column = boardColumns[source.droppableId as keyof typeof boardColumns];
      const newLeadIds = Array.from(column.leadIds);
      newLeadIds.splice(source.index, 1);
      newLeadIds.splice(destination.index, 0, draggableId);

      setBoardColumns({
        ...boardColumns,
        [column.id]: { ...column, leadIds: newLeadIds }
      });
      return;
    }

    const startColumn = boardColumns[source.droppableId as keyof typeof boardColumns];
    const endColumn = boardColumns[destination.droppableId as keyof typeof boardColumns];

    // Remove from start column
    const newStartLeadIds = Array.from(startColumn.leadIds);
    newStartLeadIds.splice(source.index, 1);
    const newStartColumn = { ...startColumn, leadIds: newStartLeadIds };

    // Add to end column
    const newEndLeadIds = Array.from(endColumn.leadIds);
    newEndLeadIds.splice(destination.index, 0, draggableId);
    const newEndColumn = { ...endColumn, leadIds: newEndLeadIds };

    setBoardColumns({
      ...boardColumns,
      [newStartColumn.id]: newStartColumn,
      [newEndColumn.id]: newEndColumn,
    });

    // Update lead status in mock data
    const updatedLead = await updateLeadStatus(draggableId, destination.droppableId as Lead['status']);
    if (updatedLead) {
      setAllLeads(prev => ({ ...prev, [updatedLead.id]: updatedLead }));
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4 overflow-x-auto pb-6 px-2">
        {Object.values(boardColumns).map((column, columnIndex) => (
          <motion.div
            key={column.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: columnIndex * 0.1 }}
            className="flex-shrink-0 w-80"
          >
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`rounded-2xl border-2 ${column.borderColor} overflow-hidden transition-all duration-300 ${
                    snapshot.isDraggingOver ? 'shadow-2xl scale-105 border-opacity-100' : 'shadow-md border-opacity-50'
                  }`}
                >
                  {/* Column Header */}
                  <div className={`bg-gradient-to-r ${column.color} p-4 relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="bg-white/20 p-2 rounded-lg">
                          {column.icon}
                        </div>
                        <div>
                          <h2 className="text-base font-bold text-white">{column.title}</h2>
                          <p className="text-xs text-white/80">
                            {column.leadIds.length} lead{column.leadIds.length !== 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotate: 90 }}
                        whileTap={{ scale: 0.9 }}
                        className="bg-white/20 hover:bg-white/30 p-2 rounded-lg transition-colors"
                      >
                        <Plus className="w-4 h-4 text-white" />
                      </motion.button>
                    </div>

                    {/* Progress bar */}
                    <div className="relative mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(column.leadIds.length / initialLeads.length) * 100}%` }}
                        transition={{ duration: 0.5, delay: columnIndex * 0.1 }}
                        className="h-full bg-white/60 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Column Body */}
                  <div
                    className={`min-h-[400px] max-h-[calc(100vh-300px)] overflow-y-auto p-3 space-y-3 ${column.bgColor} ${
                      snapshot.isDraggingOver ? 'bg-opacity-70' : 'bg-opacity-30'
                    }`}
                  >
                    {column.leadIds.length === 0 && (
                      <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                        <div className={`${column.bgColor} p-4 rounded-full mb-2`}>
                          {column.icon}
                        </div>
                        <p className="text-sm font-medium">No hay leads</p>
                      </div>
                    )}

                    {column.leadIds.map((leadId, index) => {
                      const lead = allLeads[leadId];
                      return (
                        <Draggable key={lead.id} draggableId={lead.id} index={index}>
                          {(provided, snapshot) => (
                            <motion.div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              initial={{ opacity: 0, scale: 0.9 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              className={`${
                                snapshot.isDragging
                                  ? 'shadow-2xl rotate-2 scale-105'
                                  : ''
                              } transition-transform duration-200`}
                            >
                              <LeadCard lead={lead} />
                            </motion.div>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </div>

                  {/* Column Footer */}
                  <div className={`${column.bgColor} border-t-2 ${column.borderColor} p-3`}>
                    <button className={`w-full py-2 px-4 ${column.textColor} bg-white hover:bg-opacity-80 font-medium text-sm rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 shadow-sm`}>
                      <Plus className="w-4 h-4" />
                      <span>Agregar Lead</span>
                    </button>
                  </div>
                </div>
              )}
            </Droppable>
          </motion.div>
        ))}
      </div>
    </DragDropContext>
  );
};

export default LeadsKanban;
