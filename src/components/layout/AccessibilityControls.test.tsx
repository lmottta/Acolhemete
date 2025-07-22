import { render, screen, fireEvent } from '@/test/utils';
import { vi } from 'vitest';
import AccessibilityControls from './AccessibilityControls';

// Mock the useAccessibility hook
const mockUseAccessibility = {
  preferences: {
    reducedMotion: false,
    highContrast: false,
    fontSize: 'medium' as const,
    screenReader: false,
  },
  toggleReducedMotion: vi.fn(),
  toggleHighContrast: vi.fn(),
  setFontSize: vi.fn(),
  announceToScreenReader: vi.fn(),
  resetPreferences: vi.fn(),
};

vi.mock('../../hooks', () => ({
  useAccessibility: () => mockUseAccessibility,
}));

describe('AccessibilityControls', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders toggle button', () => {
    render(<AccessibilityControls />);

    expect(
      screen.getByLabelText(/abrir controles de acessibilidade/i)
    ).toBeInTheDocument();
  });

  it('opens controls panel when toggle button is clicked', () => {
    render(<AccessibilityControls />);

    const toggleButton = screen.getByLabelText(
      /abrir controles de acessibilidade/i
    );
    fireEvent.click(toggleButton);

    expect(screen.getByText('Controles de Acessibilidade')).toBeInTheDocument();
    expect(
      screen.getByLabelText(/fechar controles de acessibilidade/i)
    ).toBeInTheDocument();
  });

  it('announces when controls are opened', () => {
    render(<AccessibilityControls />);

    const toggleButton = screen.getByLabelText(
      /abrir controles de acessibilidade/i
    );
    fireEvent.click(toggleButton);

    expect(mockUseAccessibility.announceToScreenReader).toHaveBeenCalledWith(
      'Controles de acessibilidade abertos'
    );
  });

  it('renders reduced motion toggle', () => {
    render(<AccessibilityControls />);

    const toggleButton = screen.getByLabelText(
      /abrir controles de acessibilidade/i
    );
    fireEvent.click(toggleButton);

    expect(screen.getByText('Movimento Reduzido')).toBeInTheDocument();
    expect(
      screen.getByRole('switch', { name: /movimento reduzido/i })
    ).toBeInTheDocument();
  });

  it('toggles reduced motion when switch is clicked', () => {
    render(<AccessibilityControls />);

    const toggleButton = screen.getByLabelText(
      /abrir controles de acessibilidade/i
    );
    fireEvent.click(toggleButton);

    const reducedMotionSwitch = screen.getByRole('switch', {
      name: /movimento reduzido/i,
    });
    fireEvent.click(reducedMotionSwitch);

    expect(mockUseAccessibility.toggleReducedMotion).toHaveBeenCalled();
    expect(mockUseAccessibility.announceToScreenReader).toHaveBeenCalledWith(
      'Movimento reduzido ativado'
    );
  });

  it('renders high contrast toggle', () => {
    render(<AccessibilityControls />);

    const toggleButton = screen.getByLabelText(
      /abrir controles de acessibilidade/i
    );
    fireEvent.click(toggleButton);

    expect(screen.getByText('Alto Contraste')).toBeInTheDocument();
    expect(
      screen.getByRole('switch', { name: /alto contraste/i })
    ).toBeInTheDocument();
  });

  it('toggles high contrast when switch is clicked', () => {
    render(<AccessibilityControls />);

    const toggleButton = screen.getByLabelText(
      /abrir controles de acessibilidade/i
    );
    fireEvent.click(toggleButton);

    const highContrastSwitch = screen.getByRole('switch', {
      name: /alto contraste/i,
    });
    fireEvent.click(highContrastSwitch);

    expect(mockUseAccessibility.toggleHighContrast).toHaveBeenCalled();
    expect(mockUseAccessibility.announceToScreenReader).toHaveBeenCalledWith(
      'Alto contraste ativado'
    );
  });

  it('renders font size controls', () => {
    render(<AccessibilityControls />);

    const toggleButton = screen.getByLabelText(
      /abrir controles de acessibilidade/i
    );
    fireEvent.click(toggleButton);

    expect(screen.getByText('Tamanho da Fonte')).toBeInTheDocument();
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Tamanho da fonte Pequena')
    ).toBeInTheDocument();
    expect(screen.getByLabelText('Tamanho da fonte Média')).toBeInTheDocument();
    expect(
      screen.getByLabelText('Tamanho da fonte Grande')
    ).toBeInTheDocument();
  });

  it('changes font size when radio button is clicked', () => {
    render(<AccessibilityControls />);

    const toggleButton = screen.getByLabelText(
      /abrir controles de acessibilidade/i
    );
    fireEvent.click(toggleButton);

    const largeButton = screen.getByLabelText('Tamanho da fonte Grande');
    fireEvent.click(largeButton);

    expect(mockUseAccessibility.setFontSize).toHaveBeenCalledWith('large');
    expect(mockUseAccessibility.announceToScreenReader).toHaveBeenCalledWith(
      'Tamanho da fonte alterado para grande'
    );
  });

  it('shows current font size as selected', () => {
    // Mock medium as selected
    mockUseAccessibility.preferences.fontSize = 'medium';

    render(<AccessibilityControls />);

    const toggleButton = screen.getByLabelText(
      /abrir controles de acessibilidade/i
    );
    fireEvent.click(toggleButton);

    const mediumButton = screen.getByLabelText('Tamanho da fonte Média');
    expect(mediumButton).toHaveAttribute('aria-checked', 'true');
  });

  it('closes panel when close button is clicked', () => {
    render(<AccessibilityControls />);

    // Open panel
    const toggleButton = screen.getByLabelText(
      /abrir controles de acessibilidade/i
    );
    fireEvent.click(toggleButton);

    // Close panel
    const closeButton = screen.getByText('Fechar');
    fireEvent.click(closeButton);

    expect(
      screen.getByLabelText(/abrir controles de acessibilidade/i)
    ).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<AccessibilityControls />);

    const toggleButton = screen.getByLabelText(
      /abrir controles de acessibilidade/i
    );
    expect(toggleButton).toHaveAttribute('aria-expanded', 'false');
    expect(toggleButton).toHaveAttribute(
      'aria-controls',
      'accessibility-panel'
    );

    fireEvent.click(toggleButton);

    const panel = screen.getByRole('dialog');
    expect(panel).toHaveAttribute('aria-labelledby', 'accessibility-title');
    expect(panel).toHaveAttribute('id', 'accessibility-panel');
  });

  it('applies custom className when provided', () => {
    render(<AccessibilityControls className="custom-controls" />);

    const container = screen
      .getByLabelText(/abrir controles de acessibilidade/i)
      .closest('div');
    expect(container).toHaveClass('custom-controls');
  });
});
