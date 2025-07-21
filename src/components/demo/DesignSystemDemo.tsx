import React from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Container,
  Section,
} from '../ui';
import { useAccessibility, useKeyboardNavigation } from '../../hooks';

export default function DesignSystemDemo() {
  const {
    preferences,
    toggleReducedMotion,
    toggleHighContrast,
    setFontSize,
    announceToScreenReader,
  } = useAccessibility();
  const { containerRef } = useKeyboardNavigation({ enableArrowKeys: true });

  const handleAnnouncement = () => {
    announceToScreenReader('Design system demo loaded successfully!');
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Skip Link for Accessibility */}
      <a href="#main-content" className="skip-link">
        Pular para o conteúdo principal
      </a>

      <Section spacing="lg" background="transparent">
        <Container size="lg">
          <div className="text-center mb-12">
            <h1 className="text-hero text-neutral-900 mb-4">
              AcolheMente Design System
            </h1>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Sistema de design focado em neurodesign e acessibilidade para a
              plataforma AcolheMente
            </p>
          </div>

          {/* Accessibility Controls */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Controles de Acessibilidade</CardTitle>
              <CardDescription>
                Ajuste as configurações de acordo com suas necessidades
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  variant={preferences.reducedMotion ? 'primary' : 'outline'}
                  onClick={toggleReducedMotion}
                  className="w-full"
                >
                  {preferences.reducedMotion
                    ? 'Movimento Reduzido: ON'
                    : 'Movimento Reduzido: OFF'}
                </Button>

                <Button
                  variant={preferences.highContrast ? 'primary' : 'outline'}
                  onClick={toggleHighContrast}
                  className="w-full"
                >
                  {preferences.highContrast
                    ? 'Alto Contraste: ON'
                    : 'Alto Contraste: OFF'}
                </Button>

                <Button
                  variant="secondary"
                  onClick={handleAnnouncement}
                  className="w-full"
                >
                  Testar Leitor de Tela
                </Button>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Tamanho da Fonte
                </label>
                <div className="flex gap-2">
                  {(['small', 'medium', 'large'] as const).map(size => (
                    <Button
                      key={size}
                      variant={
                        preferences.fontSize === size ? 'primary' : 'ghost'
                      }
                      size="sm"
                      onClick={() => setFontSize(size)}
                    >
                      {size === 'small'
                        ? 'Pequena'
                        : size === 'medium'
                          ? 'Média'
                          : 'Grande'}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Color Palette */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Paleta de Cores Neurodesign</CardTitle>
              <CardDescription>
                Cores calmas e acessíveis com contrastes adequados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <h4 className="font-medium text-neutral-900 mb-3">
                    Primária
                  </h4>
                  <div className="space-y-2">
                    <div className="w-full h-12 bg-primary-500 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      Primary 500
                    </div>
                    <div className="w-full h-8 bg-primary-300 rounded flex items-center justify-center text-primary-900 text-xs">
                      Primary 300
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-neutral-900 mb-3">
                    Secundária
                  </h4>
                  <div className="space-y-2">
                    <div className="w-full h-12 bg-secondary-500 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      Secondary 500
                    </div>
                    <div className="w-full h-8 bg-secondary-200 rounded flex items-center justify-center text-secondary-800 text-xs">
                      Secondary 200
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-neutral-900 mb-3">Accent</h4>
                  <div className="space-y-2">
                    <div className="w-full h-12 bg-accent-500 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      Accent 500
                    </div>
                    <div className="w-full h-8 bg-accent-200 rounded flex items-center justify-center text-accent-800 text-xs">
                      Accent 200
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-neutral-900 mb-3">Neutros</h4>
                  <div className="space-y-2">
                    <div className="w-full h-12 bg-neutral-800 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                      Neutral 800
                    </div>
                    <div className="w-full h-8 bg-neutral-200 rounded flex items-center justify-center text-neutral-800 text-xs">
                      Neutral 200
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Button Variants */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle>Variações de Botões</CardTitle>
              <CardDescription>
                Botões acessíveis com tamanhos de toque adequados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-neutral-900 mb-3">
                    Variantes
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="primary">Primário</Button>
                    <Button variant="secondary">Secundário</Button>
                    <Button variant="accent">Accent</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-neutral-900 mb-3">
                    Tamanhos
                  </h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button size="sm">Pequeno</Button>
                    <Button size="md">Médio</Button>
                    <Button size="lg">Grande</Button>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-neutral-900 mb-3">Estados</h4>
                  <div className="flex flex-wrap gap-3">
                    <Button>Normal</Button>
                    <Button loading>Carregando</Button>
                    <Button disabled>Desabilitado</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card Variants */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Card Padrão</CardTitle>
                <CardDescription>Card básico com sombra suave</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Este é um card padrão com estilo minimalista e acessível.
                </p>
              </CardContent>
            </Card>

            <Card variant="interactive">
              <CardHeader>
                <CardTitle>Card Interativo</CardTitle>
                <CardDescription>
                  Card com hover e estados de foco
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Este card responde a interações do usuário.
                </p>
              </CardContent>
            </Card>

            <Card variant="elevated">
              <CardHeader>
                <CardTitle>Card Elevado</CardTitle>
                <CardDescription>
                  Card com sombra mais pronunciada
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-neutral-600">
                  Este card tem maior destaque visual.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Keyboard Navigation Demo */}
          <Card>
            <CardHeader>
              <CardTitle>Navegação por Teclado</CardTitle>
              <CardDescription>
                Use as setas do teclado para navegar entre os botões abaixo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                ref={containerRef}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <Button variant="outline">Botão 1</Button>
                <Button variant="outline">Botão 2</Button>
                <Button variant="outline">Botão 3</Button>
                <Button variant="outline">Botão 4</Button>
                <Button variant="outline">Botão 5</Button>
                <Button variant="outline">Botão 6</Button>
                <Button variant="outline">Botão 7</Button>
                <Button variant="outline">Botão 8</Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-sm text-neutral-500">
                Use Tab para navegar ou as setas direcionais quando focado no
                container
              </p>
            </CardFooter>
          </Card>
        </Container>
      </Section>
    </div>
  );
}
