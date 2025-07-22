import { render, screen } from '@/test/utils';
import MainLayout from './MainLayout';

describe('MainLayout', () => {
  it('renders children correctly', () => {
    render(
      <MainLayout>
        <div>Test Content</div>
      </MainLayout>
    );

    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders skip links for accessibility', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    expect(
      screen.getByText('Pular para o conteúdo principal')
    ).toBeInTheDocument();
    expect(screen.getByText('Pular para a navegação')).toBeInTheDocument();
  });

  it('renders navigation when showNavigation is true', () => {
    render(
      <MainLayout showNavigation={true}>
        <div>Content</div>
      </MainLayout>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('hides navigation when showNavigation is false', () => {
    render(
      <MainLayout showNavigation={false}>
        <div>Content</div>
      </MainLayout>
    );

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('renders accessibility controls by default', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    expect(
      screen.getByLabelText(/controles de acessibilidade/i)
    ).toBeInTheDocument();
  });

  it('hides accessibility controls when showAccessibilityControls is false', () => {
    render(
      <MainLayout showAccessibilityControls={false}>
        <div>Content</div>
      </MainLayout>
    );

    expect(
      screen.queryByLabelText(/controles de acessibilidade/i)
    ).not.toBeInTheDocument();
  });

  it('renders scroll progress by default', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('hides scroll progress when showScrollProgress is false', () => {
    render(
      <MainLayout showScrollProgress={false}>
        <div>Content</div>
      </MainLayout>
    );

    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('renders footer with correct content', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(screen.getByText('AcolheMente')).toBeInTheDocument();
    expect(
      screen.getByText(/Plataforma digital para a comunidade autista/)
    ).toBeInTheDocument();
  });

  it('has proper semantic HTML structure', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument(); // header
    expect(screen.getByRole('main')).toBeInTheDocument(); // main
    expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // footer
  });

  it('applies correct CSS classes', () => {
    render(
      <MainLayout>
        <div>Content</div>
      </MainLayout>
    );

    const mainElement = screen.getByRole('main');
    expect(mainElement).toHaveClass('relative');
    expect(mainElement).toHaveAttribute('id', 'main-content');
  });
});
