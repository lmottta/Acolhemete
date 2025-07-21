import { render, screen } from '@/test/utils';
import Container, { Section } from './Container';

describe('Container Component', () => {
  it('renders with correct content', () => {
    render(
      <Container>
        <p>Container content</p>
      </Container>
    );
    expect(screen.getByText('Container content')).toBeInTheDocument();
  });

  it('applies default size and padding', () => {
    render(<Container data-testid="container">Default Container</Container>);
    const container = screen.getByTestId('container');
    expect(container).toHaveClass(
      'max-w-7xl',
      'mx-auto',
      'px-4',
      'sm:px-6',
      'lg:px-8'
    );
  });

  it('handles different sizes', () => {
    const { rerender } = render(
      <Container size="xs" data-testid="container">
        XS Container
      </Container>
    );
    expect(screen.getByTestId('container')).toHaveClass('max-w-2xl');

    rerender(
      <Container size="sm" data-testid="container">
        SM Container
      </Container>
    );
    expect(screen.getByTestId('container')).toHaveClass('max-w-4xl');

    rerender(
      <Container size="md" data-testid="container">
        MD Container
      </Container>
    );
    expect(screen.getByTestId('container')).toHaveClass('max-w-5xl');

    rerender(
      <Container size="lg" data-testid="container">
        LG Container
      </Container>
    );
    expect(screen.getByTestId('container')).toHaveClass('max-w-7xl');

    rerender(
      <Container size="xl" data-testid="container">
        XL Container
      </Container>
    );
    expect(screen.getByTestId('container')).toHaveClass('max-w-screen-2xl');

    rerender(
      <Container size="full" data-testid="container">
        Full Container
      </Container>
    );
    expect(screen.getByTestId('container')).toHaveClass('max-w-none');
  });

  it('handles different padding sizes', () => {
    const { rerender } = render(
      <Container padding="none" data-testid="container">
        No Padding
      </Container>
    );
    expect(screen.getByTestId('container')).not.toHaveClass(
      'px-4',
      'px-6',
      'px-8'
    );

    rerender(
      <Container padding="sm" data-testid="container">
        Small Padding
      </Container>
    );
    expect(screen.getByTestId('container')).toHaveClass('px-4', 'sm:px-6');

    rerender(
      <Container padding="md" data-testid="container">
        Medium Padding
      </Container>
    );
    expect(screen.getByTestId('container')).toHaveClass(
      'px-4',
      'sm:px-6',
      'lg:px-8'
    );

    rerender(
      <Container padding="lg" data-testid="container">
        Large Padding
      </Container>
    );
    expect(screen.getByTestId('container')).toHaveClass(
      'px-6',
      'sm:px-8',
      'lg:px-12'
    );
  });

  it('centers content when centerContent is true', () => {
    render(
      <Container centerContent data-testid="container">
        Centered Content
      </Container>
    );
    const container = screen.getByTestId('container');
    expect(container).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center'
    );
  });

  it('renders as different HTML elements', () => {
    const { rerender } = render(
      <Container as="main" data-testid="container">
        Main Container
      </Container>
    );
    expect(screen.getByTestId('container').tagName).toBe('MAIN');

    rerender(
      <Container as="section" data-testid="container">
        Section Container
      </Container>
    );
    expect(screen.getByTestId('container').tagName).toBe('SECTION');

    rerender(
      <Container as="article" data-testid="container">
        Article Container
      </Container>
    );
    expect(screen.getByTestId('container').tagName).toBe('ARTICLE');

    rerender(
      <Container as="header" data-testid="container">
        Header Container
      </Container>
    );
    expect(screen.getByTestId('container').tagName).toBe('HEADER');

    rerender(
      <Container as="footer" data-testid="container">
        Footer Container
      </Container>
    );
    expect(screen.getByTestId('container').tagName).toBe('FOOTER');
  });

  it('applies custom className', () => {
    render(
      <Container className="custom-class" data-testid="container">
        Custom Container
      </Container>
    );
    const container = screen.getByTestId('container');
    expect(container).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Container ref={ref}>Ref Container</Container>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('Section Component', () => {
  it('renders with correct content', () => {
    render(
      <Section>
        <p>Section content</p>
      </Section>
    );
    expect(screen.getByText('Section content')).toBeInTheDocument();
  });

  it('applies default spacing and background', () => {
    render(<Section data-testid="section">Default Section</Section>);
    const section = screen.getByTestId('section');
    expect(section).toHaveClass('py-16');
    expect(section.tagName).toBe('SECTION');
  });

  it('handles different spacing sizes', () => {
    const { rerender } = render(
      <Section spacing="none" data-testid="section">
        No Spacing
      </Section>
    );
    expect(screen.getByTestId('section')).not.toHaveClass(
      'py-12',
      'py-16',
      'py-24',
      'py-32'
    );

    rerender(
      <Section spacing="sm" data-testid="section">
        Small Spacing
      </Section>
    );
    expect(screen.getByTestId('section')).toHaveClass('py-12');

    rerender(
      <Section spacing="md" data-testid="section">
        Medium Spacing
      </Section>
    );
    expect(screen.getByTestId('section')).toHaveClass('py-16');

    rerender(
      <Section spacing="lg" data-testid="section">
        Large Spacing
      </Section>
    );
    expect(screen.getByTestId('section')).toHaveClass('py-24');

    rerender(
      <Section spacing="xl" data-testid="section">
        XL Spacing
      </Section>
    );
    expect(screen.getByTestId('section')).toHaveClass('py-32');
  });

  it('handles different background colors', () => {
    const { rerender } = render(
      <Section background="transparent" data-testid="section">
        Transparent
      </Section>
    );
    expect(screen.getByTestId('section')).not.toHaveClass(
      'bg-neutral-50',
      'bg-primary-50',
      'bg-secondary-50'
    );

    rerender(
      <Section background="neutral" data-testid="section">
        Neutral Background
      </Section>
    );
    expect(screen.getByTestId('section')).toHaveClass('bg-neutral-50');

    rerender(
      <Section background="primary" data-testid="section">
        Primary Background
      </Section>
    );
    expect(screen.getByTestId('section')).toHaveClass('bg-primary-50');

    rerender(
      <Section background="secondary" data-testid="section">
        Secondary Background
      </Section>
    );
    expect(screen.getByTestId('section')).toHaveClass('bg-secondary-50');
  });

  it('inherits Container props', () => {
    render(
      <Section size="sm" padding="lg" centerContent data-testid="section">
        Section with Container props
      </Section>
    );
    const section = screen.getByTestId('section');
    expect(section).toHaveClass('max-w-4xl', 'px-6', 'sm:px-8', 'lg:px-12');
    expect(section).toHaveClass(
      'flex',
      'flex-col',
      'items-center',
      'justify-center'
    );
  });

  it('renders as different HTML elements', () => {
    const { rerender } = render(
      <Section as="main" data-testid="section">
        Main Section
      </Section>
    );
    expect(screen.getByTestId('section').tagName).toBe('MAIN');

    rerender(
      <Section as="div" data-testid="section">
        Div Section
      </Section>
    );
    expect(screen.getByTestId('section').tagName).toBe('DIV');

    rerender(
      <Section as="article" data-testid="section">
        Article Section
      </Section>
    );
    expect(screen.getByTestId('section').tagName).toBe('ARTICLE');
  });

  it('applies custom className', () => {
    render(
      <Section className="custom-section" data-testid="section">
        Custom Section
      </Section>
    );
    const section = screen.getByTestId('section');
    expect(section).toHaveClass('custom-section');
  });
});
