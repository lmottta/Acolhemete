import { render, screen, fireEvent } from '@/test/utils';
import { vi } from 'vitest';
import Navigation from './Navigation';

// Mock the useKeyboardNavigation hook
vi.mock('../../hooks', () => ({
  useKeyboardNavigation: () => ({
    containerRef: { current: null },
  }),
}));

describe('Navigation', () => {
  beforeEach(() => {
    // Mock window.scrollY
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });
  });

  it('renders navigation with correct structure', () => {
    render(<Navigation />);

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('Navegação principal')).toBeInTheDocument();
  });

  it('renders logo with correct link', () => {
    render(<Navigation />);

    const logo = screen.getByLabelText('AcolheMente - Página inicial');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '#');
  });

  it('renders all navigation items', () => {
    render(<Navigation />);

    expect(screen.getAllByText('Sobre')).toHaveLength(2); // Desktop and mobile
    expect(screen.getAllByText('Perfis')).toHaveLength(2);
    expect(screen.getAllByText('Recursos')).toHaveLength(2);
    expect(screen.getAllByText('Segurança')).toHaveLength(2);
    expect(screen.getAllByText('Contato')).toHaveLength(2);
  });

  it('renders CTA button', () => {
    render(<Navigation />);

    expect(screen.getAllByText('Começar Agora')).toHaveLength(2); // Desktop and mobile
  });

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Navigation />);

    const menuButton = screen.getByLabelText('Abrir menu');
    expect(menuButton).toBeInTheDocument();

    fireEvent.click(menuButton);

    expect(screen.getByLabelText('Fechar menu')).toBeInTheDocument();
    expect(screen.getByRole('button', { expanded: true })).toBeInTheDocument();
  });

  it('closes mobile menu when navigation item is clicked', () => {
    render(<Navigation />);

    // Open menu
    const menuButton = screen.getByLabelText('Abrir menu');
    fireEvent.click(menuButton);

    // Click navigation item
    const aboutLink = screen.getAllByText('Sobre')[1]; // Mobile menu version
    fireEvent.click(aboutLink);

    // Menu should be closed
    expect(screen.getByLabelText('Abrir menu')).toBeInTheDocument();
  });

  it('closes mobile menu on escape key', () => {
    render(<Navigation />);

    // Open menu
    const menuButton = screen.getByLabelText('Abrir menu');
    fireEvent.click(menuButton);

    // Press escape
    fireEvent.keyDown(document, { key: 'Escape' });

    // Menu should be closed
    expect(screen.getByLabelText('Abrir menu')).toBeInTheDocument();
  });

  it('applies scroll styles when scrolled', () => {
    render(<Navigation />);

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    fireEvent.scroll(window);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('bg-white/95', 'backdrop-blur-sm', 'shadow-soft');
  });

  it('has proper accessibility attributes', () => {
    render(<Navigation />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Navegação principal');
    expect(nav).toHaveAttribute('id', 'navigation');

    const menuButton = screen.getByLabelText('Abrir menu');
    expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
  });

  it('renders mobile menu with correct accessibility attributes', () => {
    render(<Navigation />);

    const mobileMenu =
      screen.getByTestId('mobile-menu') ||
      document.getElementById('mobile-menu');
    expect(mobileMenu).toHaveAttribute('id', 'mobile-menu');
    expect(mobileMenu).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies custom className when provided', () => {
    render(<Navigation className="custom-nav" />);

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('custom-nav');
  });
});
