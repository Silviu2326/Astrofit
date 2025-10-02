import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { motion } from 'framer-motion';
import { User, Clock, GripVertical, ArrowRight } from 'lucide-react';
import { Customer, fetchCustomers, updateCustomerStage } from '../customerJourneyApi';

interface CustomerCardProps {
  customer: Customer;
  onDropCustomer: (customerId: string, newStage: Customer['stage']) => void;
}

const ItemTypes = {
  CUSTOMER: 'customer',
};

const CustomerCard: React.FC<CustomerCardProps> = ({ customer, onDropCustomer }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CUSTOMER,
    item: { id: customer.id, currentStage: customer.stage },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isDragging ? 0.5 : 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className={`p-4 mb-3 bg-white rounded-2xl shadow-md hover:shadow-xl border-2 border-gray-100 hover:border-emerald-300 cursor-grab active:cursor-grabbing transition-all duration-300 group ${
        isDragging ? 'opacity-50 rotate-3' : ''
      }`}
    >
      <div className="flex items-start gap-3">
        {/* Grip Icon */}
        <div className="text-gray-400 group-hover:text-emerald-600 transition-colors">
          <GripVertical className="w-5 h-5" />
        </div>

        <div className="flex-1">
          {/* Avatar & Name */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center text-white font-bold shadow-lg">
              <User className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-gray-800">{customer.name}</p>
              <p className="text-xs text-gray-500 font-medium">ID: {customer.id}</p>
            </div>
          </div>

          {/* Info pills */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="px-3 py-1 bg-gradient-to-r from-emerald-50 to-green-50 rounded-full border border-emerald-200">
              <span className="text-xs font-bold text-emerald-700">{customer.stage}</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1 bg-gray-50 rounded-full border border-gray-200">
              <Clock className="w-3 h-3 text-gray-600" />
              <span className="text-xs font-semibold text-gray-600">{customer.timeInStage}d</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

interface StageColumnProps {
  stage: Customer['stage'];
  customers: Customer[];
  onDropCustomer: (customerId: string, newStage: Customer['stage']) => void;
}

const StageColumn: React.FC<StageColumnProps> = ({ stage, customers, onDropCustomer }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CUSTOMER,
    drop: (item: { id: string; currentStage: Customer['stage'] }) => {
      if (item.currentStage !== stage) {
        onDropCustomer(item.id, stage);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const stageConfig = {
    'Lead': {
      gradient: 'from-emerald-500 to-green-600',
      bgGradient: 'from-emerald-50 to-green-50',
      borderColor: 'border-emerald-300',
      textColor: 'text-emerald-700',
    },
    'Cliente nuevo': {
      gradient: 'from-green-500 to-lime-600',
      bgGradient: 'from-green-50 to-lime-50',
      borderColor: 'border-green-300',
      textColor: 'text-green-700',
    },
    'Activo': {
      gradient: 'from-lime-500 to-emerald-600',
      bgGradient: 'from-lime-50 to-emerald-50',
      borderColor: 'border-lime-300',
      textColor: 'text-lime-700',
    },
    'Fiel': {
      gradient: 'from-emerald-600 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50',
      borderColor: 'border-emerald-300',
      textColor: 'text-emerald-700',
    },
  };

  const config = stageConfig[stage];

  return (
    <div
      ref={drop}
      className={`flex-1 min-w-[280px] rounded-2xl border-2 transition-all duration-300 ${
        isOver ? 'border-dashed border-emerald-500 bg-emerald-50/50 scale-105' : `${config.borderColor} bg-white/50`
      }`}
    >
      {/* Column Header */}
      <div className={`bg-gradient-to-r ${config.gradient} p-4 rounded-t-2xl`}>
        <div className="flex items-center justify-between text-white">
          <h4 className="font-bold text-lg flex items-center gap-2">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <User className="w-5 h-5" />
            </div>
            {stage}
          </h4>
          <div className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/20">
            <span className="text-sm font-bold">{customers.length}</span>
          </div>
        </div>
      </div>

      {/* Column Body */}
      <div className="p-4 min-h-[400px] max-h-[600px] overflow-y-auto">
        {customers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.gradient} opacity-20 flex items-center justify-center mb-3`}>
              <User className="w-8 h-8 text-white" />
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Arrastra clientes aquí
            </p>
          </div>
        ) : (
          customers.map((customer, index) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CustomerCard customer={customer} onDropCustomer={onDropCustomer} />
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

const TarjetasClientes: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetchCustomers().then(setCustomers);
  }, []);

  const handleDropCustomer = async (customerId: string, newStage: Customer['stage']) => {
    await updateCustomerStage(customerId, newStage);
    setCustomers((prevCustomers) =>
      prevCustomers.map((c) => (c.id === customerId ? { ...c, stage: newStage } : c))
    );
  };

  const stages: Customer['stage'][] = ['Lead', 'Cliente nuevo', 'Activo', 'Fiel'];

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-lime-500 p-6 relative overflow-hidden">
          {/* Pattern de fondo */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <User className="w-6 h-6" />
              </div>
              Tablero Kanban de Clientes
            </h3>
            <p className="text-green-100 text-sm">
              Arrastra y suelta clientes entre etapas para actualizar su estado
            </p>
          </div>
        </div>

        {/* Kanban Board */}
        <div className="p-6">
          <div className="flex gap-4 overflow-x-auto pb-4">
            {stages.map((stage, index) => (
              <React.Fragment key={stage}>
                <StageColumn
                  stage={stage}
                  customers={customers.filter((c) => c.stage === stage)}
                  onDropCustomer={handleDropCustomer}
                />
                {index < stages.length - 1 && (
                  <div className="flex items-center justify-center">
                    <div className="p-2 bg-gradient-to-r from-emerald-100 to-green-100 rounded-full">
                      <ArrowRight className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Footer with tips */}
        <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-t border-emerald-200 p-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <GripVertical className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-sm text-gray-700">
              <span className="font-bold text-emerald-700">Tip:</span> Arrastra las tarjetas de clientes entre columnas para cambiar su etapa en el journey
            </p>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default TarjetasClientes;
