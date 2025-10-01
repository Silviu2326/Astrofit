import React, { useRef, useEffect, useState } from 'react';

const FirmaDigital: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';

    const startDrawing = ({ nativeEvent }: MouseEvent | TouchEvent) => {
      const { offsetX, offsetY } = getCoords(nativeEvent, canvas);
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY);
      setIsDrawing(true);
    };

    const draw = ({ nativeEvent }: MouseEvent | TouchEvent) => {
      if (!isDrawing) return;
      const { offsetX, offsetY } = getCoords(nativeEvent, canvas);
      ctx.lineTo(offsetX, offsetY);
      ctx.stroke();
    };

    const stopDrawing = () => {
      ctx.closePath();
      setIsDrawing(false);
    };

    const getCoords = (event: MouseEvent | TouchEvent, canvas: HTMLCanvasElement) => {
      const rect = canvas.getBoundingClientRect();
      if (event instanceof MouseEvent) {
        return {
          offsetX: event.clientX - rect.left,
          offsetY: event.clientY - rect.top,
        };
      } else {
        const touch = event.touches[0];
        return {
          offsetX: touch.clientX - rect.left,
          offsetY: touch.clientY - rect.top,
        };
      }
    };

    canvas.addEventListener('mousedown', startDrawing as EventListener);
    canvas.addEventListener('mousemove', draw as EventListener);
    canvas.addEventListener('mouseup', stopDrawing as EventListener);
    canvas.addEventListener('mouseleave', stopDrawing as EventListener);

    canvas.addEventListener('touchstart', startDrawing as EventListener);
    canvas.addEventListener('touchmove', draw as EventListener);
    canvas.addEventListener('touchend', stopDrawing as EventListener);

    return () => {
      canvas.removeEventListener('mousedown', startDrawing as EventListener);
      canvas.removeEventListener('mousemove', draw as EventListener);
      canvas.removeEventListener('mouseup', stopDrawing as EventListener);
      canvas.removeEventListener('mouseleave', stopDrawing as EventListener);

      canvas.removeEventListener('touchstart', startDrawing as EventListener);
      canvas.removeEventListener('touchmove', draw as EventListener);
      canvas.removeEventListener('touchend', stopDrawing as EventListener);
    };
  }, [isDrawing]);

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
      <canvas
        ref={canvasRef}
        width={400}
        height={200}
        className="bg-white border border-gray-200 rounded-md cursor-crosshair"
      ></canvas>
      <div className="mt-4">
        <button
          onClick={clearSignature}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Borrar Firma
        </button>
      </div>
    </div>
  );
};

export default FirmaDigital;
