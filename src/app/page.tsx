import { Container, Section } from '../components/ui';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '../components/ui';

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <Section
        spacing="xl"
        background="transparent"
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-secondary-50 to-accent-50 opacity-60" />
        <Container size="lg" className="relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-hero font-bold text-neutral-900 mb-6">
              Bem-vindos ao{' '}
              <span className="text-primary-600">AcolheMente</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
              Plataforma digital para a comunidade autista e neurodivergente na
              América Latina. Conectando famílias, profissionais e clínicas com
              segurança e acolhimento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" size="lg">
                Começar Agora
              </Button>
              <Button variant="outline" size="lg">
                Saiba Mais
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features Preview */}
      <Section spacing="lg" background="neutral">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Design System e Acessibilidade
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Desenvolvido com princípios de neurodesign e acessibilidade para
              proporcionar uma experiência inclusiva e acolhedora.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card variant="interactive">
              <CardHeader>
                <CardTitle>🎨 Neurodesign</CardTitle>
                <CardDescription>
                  Cores calmas e contrastes adequados para reduzir sobrecarga
                  sensorial
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex space-x-2 mb-4">
                  <div
                    className="w-8 h-8 bg-primary-500 rounded-full"
                    title="Azul primário"
                  />
                  <div
                    className="w-8 h-8 bg-secondary-500 rounded-full"
                    title="Verde secundário"
                  />
                  <div
                    className="w-8 h-8 bg-accent-500 rounded-full"
                    title="Roxo accent"
                  />
                </div>
                <p className="text-sm text-neutral-600">
                  Paleta de cores desenvolvida especificamente para usuários
                  neurodivergentes
                </p>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>♿ Acessibilidade</CardTitle>
                <CardDescription>
                  Navegação por teclado, leitores de tela e controles
                  personalizáveis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-success-500 rounded-full mr-2" />
                    Navegação por teclado
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-success-500 rounded-full mr-2" />
                    Compatível com leitores de tela
                  </div>
                  <div className="flex items-center text-sm">
                    <span className="w-2 h-2 bg-success-500 rounded-full mr-2" />
                    Controles de movimento e contraste
                  </div>
                </div>
                <p className="text-sm text-neutral-600">
                  Seguindo diretrizes WCAG 2.1 AA
                </p>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>🧪 Testado</CardTitle>
                <CardDescription>
                  Componentes testados com cobertura completa e qualidade
                  garantida
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-neutral-100 rounded-lg p-3 mb-4">
                  <div className="text-2xl font-bold text-success-600">68</div>
                  <div className="text-sm text-neutral-600">
                    Testes passando
                  </div>
                </div>
                <p className="text-sm text-neutral-600">
                  Testes unitários, de integração e acessibilidade
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Component Showcase */}
      <Section spacing="lg" background="transparent">
        <Container size="lg">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Componentes do Sistema
            </h2>
            <p className="text-lg text-neutral-600">
              Explore os componentes que compõem nossa base de design acessível
            </p>
          </div>

          <div className="space-y-8">
            {/* Buttons */}
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Botões
              </h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primário</Button>
                <Button variant="secondary">Secundário</Button>
                <Button variant="accent">Accent</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="primary" loading>
                  Carregando
                </Button>
                <Button variant="primary" disabled>
                  Desabilitado
                </Button>
              </div>
            </div>

            {/* Navigation Demo */}
            <div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                Navegação
              </h3>
              <Card>
                <CardContent className="p-6">
                  <p className="text-neutral-600 mb-4">
                    ✨ <strong>Navegação responsiva</strong> com menu mobile,
                    navegação por teclado e indicador de progresso
                  </p>
                  <p className="text-neutral-600 mb-4">
                    🎛️ <strong>Controles de acessibilidade</strong> disponíveis
                    no canto superior direito
                  </p>
                  <p className="text-neutral-600">
                    📊 <strong>Barra de progresso</strong> no topo da página
                    mostra o progresso de leitura
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Call to Action */}
      <Section spacing="lg" background="primary" className="text-white">
        <Container size="md" centerContent>
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
            <p className="text-xl text-primary-100 mb-8">
              Junte-se à nossa comunidade e faça parte de uma plataforma
              verdadeiramente inclusiva
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Cadastre-se Gratuitamente
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary-600"
              >
                Fale Conosco
              </Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
