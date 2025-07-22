import React from 'react';
import { Container } from '../ui';
import Navigation from './Navigation';
import AccessibilityControls from './AccessibilityControls';
import ScrollProgress from './ScrollProgress';

export interface MainLayoutProps {
  children: React.ReactNode;
  showNavigation?: boolean;
  showAccessibilityControls?: boolean;
  showScrollProgress?: boolean;
}

export default function MainLayout({
  children,
  showNavigation = true,
  showAccessibilityControls = true,
  showScrollProgress = true,
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Skip Links for Accessibility */}
      <div className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 z-50">
        <a
          href="#main-content"
          className="skip-link bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Pular para o conteúdo principal
        </a>
        <a
          href="#navigation"
          className="skip-link bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium ml-2"
        >
          Pular para a navegação
        </a>
      </div>

      {/* Scroll Progress Indicator */}
      {showScrollProgress && <ScrollProgress />}

      {/* Main Navigation */}
      {showNavigation && (
        <header role="banner">
          <Navigation />
        </header>
      )}

      {/* Accessibility Controls */}
      {showAccessibilityControls && <AccessibilityControls />}

      {/* Main Content */}
      <main id="main-content" role="main" className="relative">
        {children}
      </main>

      {/* Footer */}
      <footer role="contentinfo" className="bg-neutral-900 text-neutral-100">
        <Container size="lg" padding="lg">
          <div className="py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">AcolheMente</h3>
                <p className="text-neutral-300 text-sm leading-relaxed">
                  Plataforma digital para a comunidade autista e neurodivergente
                  na América Latina. Conectando famílias, profissionais e
                  clínicas com segurança e acolhimento.
                </p>
              </div>

              <div>
                <h4 className="text-base font-medium mb-4">Links Úteis</h4>
                <nav aria-label="Links do rodapé">
                  <ul className="space-y-2 text-sm">
                    <li>
                      <a
                        href="#sobre"
                        className="text-neutral-300 hover:text-white transition-colors"
                      >
                        Sobre Nós
                      </a>
                    </li>
                    <li>
                      <a
                        href="#privacidade"
                        className="text-neutral-300 hover:text-white transition-colors"
                      >
                        Política de Privacidade
                      </a>
                    </li>
                    <li>
                      <a
                        href="#termos"
                        className="text-neutral-300 hover:text-white transition-colors"
                      >
                        Termos de Uso
                      </a>
                    </li>
                    <li>
                      <a
                        href="#acessibilidade"
                        className="text-neutral-300 hover:text-white transition-colors"
                      >
                        Acessibilidade
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              <div>
                <h4 className="text-base font-medium mb-4">Contato</h4>
                <div className="text-sm text-neutral-300 space-y-2">
                  <p>contato@acolhemente.com</p>
                  <p>Suporte técnico disponível</p>
                  <p>Segunda a Sexta, 9h às 18h</p>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-700 mt-8 pt-8 text-center">
              <p className="text-sm text-neutral-400">
                © 2024 AcolheMente. Todos os direitos reservados. Desenvolvido
                com acessibilidade e inclusão em mente.
              </p>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
