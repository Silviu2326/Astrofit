// Configuración de setup para las pruebas de biblioteca-contenidos
import { vi } from 'vitest';

// Mock de window.location
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000',
    reload: vi.fn(),
  },
  writable: true,
});

// Mock de console para evitar ruido en las pruebas
const originalConsole = console;
global.console = {
  ...originalConsole,
  log: vi.fn(),
  debug: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
};

// Mock de react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/test' }),
  };
});

// Mock de framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    button: 'button',
    input: 'input',
    form: 'form',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock de react-hot-toast
vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
  },
}));

// Mock de componentes UI
vi.mock('../../../../../components/ui/modal', () => ({
  default: ({ children, isOpen }: { children: React.ReactNode; isOpen: boolean }) => 
    isOpen ? <div data-testid="modal">{children}</div> : null,
}));
