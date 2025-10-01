import React from 'react';
import './VistaResponsive.css'; // Assuming a CSS file for styling

interface VistaResponsiveProps {
  children: React.ReactNode;
}

const VistaResponsive: React.FC<VistaResponsiveProps> = ({ children }) => {
  return (
    <div className="vista-responsive-container">
      <h3>Vista Móvil Optimizada</h3>
      <div className="responsive-scroll-area">
        {children}
      </div>
      <p>Vista responsive móvil con scroll horizontal para horarios.</p>
    </div>
  );
};

export default VistaResponsive;
