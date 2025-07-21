import { render, screen } from '@/test/utils';
import Card, {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';

describe('Card Component', () => {
  it('renders with correct content', () => {
    render(
      <Card>
        <p>Card content</p>
      </Card>
    );
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies default variant styles', () => {
    render(<Card data-testid="card">Default Card</Card>);
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('shadow-soft', 'bg-white', 'rounded-2xl');
  });

  it('applies interactive variant styles', () => {
    render(
      <Card variant="interactive" data-testid="card">
        Interactive Card
      </Card>
    );
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('cursor-pointer', 'hover:shadow-medium');
  });

  it('applies elevated variant styles', () => {
    render(
      <Card variant="elevated" data-testid="card">
        Elevated Card
      </Card>
    );
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('shadow-medium');
  });

  it('handles different padding sizes', () => {
    const { rerender } = render(
      <Card padding="sm" data-testid="card">
        Small Padding
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass('p-4');

    rerender(
      <Card padding="md" data-testid="card">
        Medium Padding
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass('p-6');

    rerender(
      <Card padding="lg" data-testid="card">
        Large Padding
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass('p-8');

    rerender(
      <Card padding="none" data-testid="card">
        No Padding
      </Card>
    );
    expect(screen.getByTestId('card')).not.toHaveClass('p-4', 'p-6', 'p-8');
  });

  it('renders as different HTML elements', () => {
    const { rerender } = render(
      <Card as="article" data-testid="card">
        Article Card
      </Card>
    );
    expect(screen.getByTestId('card').tagName).toBe('ARTICLE');

    rerender(
      <Card as="section" data-testid="card">
        Section Card
      </Card>
    );
    expect(screen.getByTestId('card').tagName).toBe('SECTION');
  });

  it('applies custom className', () => {
    render(
      <Card className="custom-class" data-testid="card">
        Custom Card
      </Card>
    );
    const card = screen.getByTestId('card');
    expect(card).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Card ref={ref}>Ref Card</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardHeader Component', () => {
  it('renders with correct content', () => {
    render(
      <CardHeader>
        <h2>Header Title</h2>
      </CardHeader>
    );
    expect(screen.getByText('Header Title')).toBeInTheDocument();
  });

  it('applies correct spacing classes', () => {
    render(<CardHeader data-testid="header">Header</CardHeader>);
    const header = screen.getByTestId('header');
    expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5');
  });
});

describe('CardTitle Component', () => {
  it('renders with correct content', () => {
    render(<CardTitle>Card Title</CardTitle>);
    expect(screen.getByText('Card Title')).toBeInTheDocument();
  });

  it('renders as h3 by default', () => {
    render(<CardTitle data-testid="title">Default Title</CardTitle>);
    expect(screen.getByTestId('title').tagName).toBe('H3');
  });

  it('renders as different heading levels', () => {
    const { rerender } = render(
      <CardTitle as="h1" data-testid="title">
        H1 Title
      </CardTitle>
    );
    expect(screen.getByTestId('title').tagName).toBe('H1');

    rerender(
      <CardTitle as="h2" data-testid="title">
        H2 Title
      </CardTitle>
    );
    expect(screen.getByTestId('title').tagName).toBe('H2');
  });

  it('applies correct typography classes', () => {
    render(<CardTitle data-testid="title">Title</CardTitle>);
    const title = screen.getByTestId('title');
    expect(title).toHaveClass('text-xl', 'font-semibold', 'text-neutral-900');
  });
});

describe('CardDescription Component', () => {
  it('renders with correct content', () => {
    render(<CardDescription>Card description text</CardDescription>);
    expect(screen.getByText('Card description text')).toBeInTheDocument();
  });

  it('applies correct typography classes', () => {
    render(
      <CardDescription data-testid="description">Description</CardDescription>
    );
    const description = screen.getByTestId('description');
    expect(description).toHaveClass(
      'text-sm',
      'text-neutral-600',
      'leading-relaxed'
    );
  });
});

describe('CardContent Component', () => {
  it('renders with correct content', () => {
    render(
      <CardContent>
        <p>Content text</p>
      </CardContent>
    );
    expect(screen.getByText('Content text')).toBeInTheDocument();
  });

  it('applies correct spacing classes', () => {
    render(<CardContent data-testid="content">Content</CardContent>);
    const content = screen.getByTestId('content');
    expect(content).toHaveClass('pt-0');
  });
});

describe('CardFooter Component', () => {
  it('renders with correct content', () => {
    render(
      <CardFooter>
        <button>Footer Button</button>
      </CardFooter>
    );
    expect(screen.getByText('Footer Button')).toBeInTheDocument();
  });

  it('applies correct layout classes', () => {
    render(<CardFooter data-testid="footer">Footer</CardFooter>);
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('flex', 'items-center', 'pt-6');
  });
});

describe('Card Composition', () => {
  it('renders complete card with all sub-components', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Test Card</CardTitle>
          <CardDescription>This is a test card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>This is the main content of the card.</p>
        </CardContent>
        <CardFooter>
          <button>Action Button</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Test Card')).toBeInTheDocument();
    expect(
      screen.getByText('This is a test card description')
    ).toBeInTheDocument();
    expect(
      screen.getByText('This is the main content of the card.')
    ).toBeInTheDocument();
    expect(screen.getByText('Action Button')).toBeInTheDocument();
  });
});
