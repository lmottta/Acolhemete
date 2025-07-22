import { render, screen, fireEvent } from '@/test/utils';
import { vi } from 'vitest';
import ScrollProgress from './ScrollProgress';

describe('ScrollProgress', () => {
  beforeEach(() => {
    // Mock window properties
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
    });

    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      writable: true,
    });

    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 2000,
      writable: true,
    });

    // Mock requestAnimationFrame
    global.requestAnimationFrame = vi.fn(cb => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders progress bar with correct attributes', () => {
    render(<ScrollProgress />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute(
      'aria-label',
      'Progresso da leitura da página'
    );
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');
    expect(progressBar).toHaveAttribute('aria-valuemin', '0');
    expect(progressBar).toHaveAttribute('aria-valuemax', '100');
  });

  it('calculates scroll progress correctly', () => {
    render(<ScrollProgress />);

    // Simulate scroll to 50% of the page
    Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
    fireEvent.scroll(window);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '50');
  });

  it('updates progress bar width based on scroll', () => {
    render(<ScrollProgress />);

    // Get the progress bar element (the inner div with the color)
    const progressContainer = screen.getByRole('progressbar');
    const progressBar = progressContainer.querySelector('div > div');

    // Initially should be 0%
    expect(progressBar).toHaveStyle({ width: '0%' });

    // Simulate scroll
    Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
    fireEvent.scroll(window);

    // Should update to 50%
    expect(progressBar).toHaveStyle({ width: '50%' });
  });

  it('applies custom color when provided', () => {
    render(<ScrollProgress color="bg-red-500" />);

    const progressContainer = screen.getByRole('progressbar');
    const progressBar = progressContainer.querySelector('div > div');

    expect(progressBar).toHaveClass('bg-red-500');
  });

  it('applies custom height when provided', () => {
    render(<ScrollProgress height={5} />);

    const progressContainer = screen.getByRole('progressbar');
    const background = progressContainer.querySelector('div');

    expect(background).toHaveStyle({ height: '5px' });
  });

  it('applies custom className when provided', () => {
    render(<ScrollProgress className="custom-progress" />);

    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveClass('custom-progress');
  });

  it('handles edge cases correctly', () => {
    render(<ScrollProgress />);

    const progressBar = screen.getByRole('progressbar');

    // Test negative scroll (shouldn't happen but handle gracefully)
    Object.defineProperty(window, 'scrollY', { value: -100, writable: true });
    fireEvent.scroll(window);
    expect(progressBar).toHaveAttribute('aria-valuenow', '0');

    // Test scroll beyond document height
    Object.defineProperty(window, 'scrollY', { value: 5000, writable: true });
    fireEvent.scroll(window);
    expect(progressBar).toHaveAttribute('aria-valuenow', '100');
  });

  it('provides screen reader announcements', () => {
    render(<ScrollProgress />);

    // Simulate scroll to middle
    Object.defineProperty(window, 'scrollY', { value: 600, writable: true });
    fireEvent.scroll(window);

    expect(screen.getByText('Progresso da leitura: 50%')).toBeInTheDocument();

    // Simulate scroll to end
    Object.defineProperty(window, 'scrollY', { value: 1200, writable: true });
    fireEvent.scroll(window);

    expect(
      screen.getByText('Você chegou ao final da página')
    ).toBeInTheDocument();
  });

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = render(<ScrollProgress />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'scroll',
      expect.any(Function)
    );
  });

  it('uses requestAnimationFrame for performance', () => {
    render(<ScrollProgress />);

    fireEvent.scroll(window);

    expect(global.requestAnimationFrame).toHaveBeenCalled();
  });
});
