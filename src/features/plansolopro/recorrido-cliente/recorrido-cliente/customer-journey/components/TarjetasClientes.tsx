
import React, { useState, useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
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
    <div
      ref={drag}
      className={`p-3 mb-2 bg-white border rounded-lg shadow-sm cursor-grab ${isDragging ? 'opacity-50' : ''}`}
    >
      <p className="font-semibold">{customer.name}</p>
      <p className="text-sm text-gray-600">Etapa: {customer.stage}</p>
      <p className="text-xs text-gray-500">Tiempo en etapa: {customer.timeInStage} d??as</p>
    </div>
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

  const stageColors = {
    'Lead': 'bg-blue-100 border-blue-300',
    'Cliente nuevo': 'bg-green-100 border-green-300',
    'Activo': 'bg-yellow-100 border-yellow-300',
    'Fiel': 'bg-purple-100 border-purple-300',
  };

  return (
    <div
      ref={drop}
      className={`flex-1 p-4 rounded-lg border-2 ${stageColors[stage]} ${isOver ? 'border-dashed border-gray-500' : ''}`}
    >
      <h4 className="font-bold text-md mb-3">{stage}</h4>
      {customers.map((customer) => (
        <CustomerCard key={customer.id} customer={customer} onDropCustomer={onDropCustomer} />
      ))}
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
      <div className="bg-white p-4 rounded-lg shadow-md mt-6">
        <h3 className="font-bold text-lg mb-4">Tablero Kanban de Clientes</h3>
        <div className="flex space-x-4">
          {stages.map((stage) => (
            <StageColumn
              key={stage}
              stage={stage}
              customers={customers.filter((c) => c.stage === stage)}
              onDropCustomer={handleDropCustomer}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default TarjetasClientes;
