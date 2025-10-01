
import React from 'react';
import { Undo, Redo, ZoomIn, ZoomOut, Save } from 'lucide-react';

const Toolbar = () => {
  return (
    <div className="toolbar">
      <button>
        <Undo size={16} />
      </button>
      <button>
        <Redo size={16} />
      </button>
      <button>
        <ZoomIn size={16} />
      </button>
      <button>
        <ZoomOut size={16} />
      </button>
      <button>
        <Save size={16} />
      </button>
    </div>
  );
};

export default Toolbar;
