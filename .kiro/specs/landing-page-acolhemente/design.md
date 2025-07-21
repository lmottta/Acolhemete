# Design Document - Landing Page AcolheMente

## Overview

A landing page do AcolheMente será projetada como uma experiência digital acolhedora e informativa que combate a desinformação sobre autismo na América Latina. O design seguirá rigorosamente os princípios de neurodesign, priorizando clareza, previsibilidade e redução de estímulos visuais excessivos, enquanto apresenta de forma empolgante a proposta de valor da plataforma.

A página será estruturada em seções lineares e progressivas, permitindo que usuários neurodivergentes naveguem confortavelmente enquanto absorvem informações essenciais sobre a plataforma e seus benefícios.

## Architecture

### Estrutura de Seções

A landing page seguirá uma arquitetura vertical linear com as seguintes seções principais:

1. **Hero Section** - Apresentação imediata da proposta de valor
2. **Context Section** - Dados sobre autismo na América Latina
3. **Solution Section** - Como o AcolheMente resolve os problemas identificados
4. **Profiles Section** - Diferentes tipos de usuários e benefícios
5. **Features Section** - Funcionalidades principais da plataforma
6. **Security Section** - Transparência sobre proteção de dados
7. **Community Section** - Depoimentos e impacto social
8. **CTA Section** - Chamada final para ação
9. **Footer** - Informações complementares e links

### Arquitetura Técnica

```
Landing Page
├── Components/
│   ├── Hero/
│   │   ├── HeroSection.tsx
│   │   ├── CTAButton.tsx
│   │   └── ValueProposition.tsx
│   ├── Context/
│   │   ├── StatisticsCard.tsx
│   │   ├── DataVisualization.tsx
│   │   └── RegionalMap.tsx
│   ├── Profiles/
│   │   ├── ProfileCard.tsx
│   │   ├── ProfileModal.tsx
│   │   └── ProfileCarousel.tsx
│   ├── Features/
│   │   ├── FeatureGrid.tsx
│   │   ├── FeatureCard.tsx
│   │   └── FeatureDemo.tsx
│   └── Common/
│       ├── Navigation.tsx
│       ├── AccessibilityControls.tsx
│       └── ProgressIndicator.tsx
├── Hooks/
│   ├── useScrollProgress.ts
│   ├── useAccessibility.ts
│   └── useResponsive.ts
└── Services/
    ├── analytics.ts
    └── accessibility.ts
```

## Components and Interfaces

### Hero Section

**Componente Principal:** `HeroSection.tsx`

```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  backgroundImage?: string;
  accessibilityMode: boolean;
}
```

**Design Visual:**

- Fundo com gradiente suave em tons calmos (azul claro para verde menta)
- Título principal em tipografia legível (Inter ou similar) tamanho 3.5rem desktop / 2.5rem mobile
- Subtítulo explicativo em tom acolhedor mencionando "América Latina" e "neurodivergência"
- CTA button proeminente com contraste adequado
- Ilustração minimalista representando diversidade e inclusão

**Acessibilidade:**

- Contraste mínimo 4.5:1 para textos
- Textos alternativos descritivos
- Navegação por teclado
- Suporte a leitores de tela

### Context Section (Dados Estatísticos)

**Componente Principal:** `StatisticsCard.tsx`

```typescript
interface StatisticData {
  country: string;
  groups: number;
  users: number;
  content: number;
}

interface StatisticsCardProps {
  data: StatisticData[];
  animationEnabled: boolean;
  colorScheme: 'calm' | 'standard';
}
```

**Design Visual:**

- Cards com bordas arredondadas e sombras suaves
- Cores representando dados sem alarmar (tons terrosos e azuis calmos)
- Ícones intuitivos para cada métrica
- Animações sutis de entrada (opcional, desabilitável)
- Gráfico de barras simplificado para comparação regional

**Princípios Aplicados:**

- Apresentação progressiva de informações
- Evita sobrecarga cognitiva com dados organizados hierarquicamente
- Cores calmas mesmo para dados preocupantes

### Profiles Section

**Componente Principal:** `ProfileCard.tsx`

```typescript
interface ProfileType {
  id: string;
  name: string;
  description: string;
  features: string[];
  icon: string;
  color: string;
}

interface ProfileCardProps {
  profile: ProfileType;
  isExpanded: boolean;
  onExpand: (id: string) => void;
  neurodivergentMode: boolean;
}
```

**Design Visual:**

- Grid responsivo 2x2 desktop / 1x4 mobile
- Cards com cores distintas mas harmoniosas
- Ícones representativos para cada perfil (família, profissional, clínica, paciente)
- Expansão suave ao hover/click
- Linguagem técnica apropriada sem intimidar

**Interação:**

- Click/tap para expandir detalhes
- Navegação por teclado entre cards
- Feedback visual sutil
- Modal ou expansão inline para detalhes

### Features Section

**Componente Principal:** `FeatureGrid.tsx`

```typescript
interface Feature {
  title: string;
  description: string;
  icon: ReactNode;
  category: 'security' | 'therapy' | 'community' | 'reporting';
  demoAvailable: boolean;
}

interface FeatureGridProps {
  features: Feature[];
  showDemos: boolean;
  accessibilityMode: boolean;
}
```

**Design Visual:**

- Grid masonry responsivo
- Cards com altura variável baseada no conteúdo
- Ícones consistentes e intuitivos
- Cores categorizadas por funcionalidade
- Opção de demo/preview para funcionalidades principais

### Security Section

**Componente Principal:** `SecurityBadges.tsx`

```typescript
interface SecurityFeature {
  name: string;
  description: string;
  certification?: string;
  icon: string;
}

interface SecurityBadgesProps {
  features: SecurityFeature[];
  showTechnicalDetails: boolean;
}
```

**Design Visual:**

- Badges de certificação (LGPD, Supabase, criptografia)
- Explicações em linguagem clara
- Ícones de segurança reconhecíveis
- Seção destacada com fundo diferenciado

## Data Models

### Landing Page Configuration

```typescript
interface LandingPageConfig {
  hero: {
    title: string;
    subtitle: string;
    ctaText: string;
    backgroundImage: string;
  };
  statistics: StatisticData[];
  profiles: ProfileType[];
  features: Feature[];
  security: SecurityFeature[];
  testimonials: Testimonial[];
  accessibility: {
    highContrast: boolean;
    reducedMotion: boolean;
    fontSize: 'small' | 'medium' | 'large';
  };
}
```

### User Interaction Tracking

```typescript
interface InteractionEvent {
  type: 'scroll' | 'click' | 'hover' | 'form_interaction';
  section: string;
  element: string;
  timestamp: Date;
  userAgent: string;
  accessibilityMode: boolean;
}
```

## Error Handling

### Graceful Degradation

**Imagens não carregadas:**

- Placeholders com cores de fundo apropriadas
- Textos alternativos descritivos
- Ícones SVG como fallback

**JavaScript desabilitado:**

- Conteúdo totalmente acessível via HTML/CSS
- Formulários funcionais
- Navegação por âncoras

**Conexão lenta:**

- Carregamento progressivo de imagens
- Conteúdo crítico primeiro
- Indicadores de carregamento sutis

### Acessibilidade de Emergência

```typescript
interface AccessibilityFallback {
  highContrastMode: () => void;
  disableAnimations: () => void;
  increaseFontSize: () => void;
  enableKeyboardNavigation: () => void;
  activateScreenReaderMode: () => void;
}
```

## Testing Strategy

### Testes de Acessibilidade

**Ferramentas:**

- axe-core para testes automatizados
- WAVE para validação manual
- Lighthouse para auditoria de acessibilidade
- Testes com leitores de tela (NVDA, JAWS)

**Cenários de Teste:**

- Navegação apenas por teclado
- Uso com leitor de tela
- Alto contraste
- Zoom até 200%
- Movimento reduzido

### Testes de Usabilidade Neurodivergente

**Grupos de Teste:**

- Pessoas autistas
- Pessoas com TDAH
- Pessoas com dislexia
- Cuidadores e familiares

**Métricas:**

- Tempo para compreender proposta de valor
- Taxa de conclusão de cadastro
- Conforto visual (escala subjetiva)
- Facilidade de navegação

### Testes de Performance

**Métricas Core Web Vitals:**

- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1

**Testes de Dispositivo:**

- Desktop (1920x1080, 1366x768)
- Tablet (768x1024, 1024x768)
- Mobile (375x667, 414x896, 360x640)

### Testes de Conversão

**A/B Testing:**

- Diferentes versões de CTA
- Variações na apresentação de dados
- Posicionamento de elementos de cadastro

**Métricas de Conversão:**

- Taxa de clique em CTAs
- Tempo na página
- Taxa de cadastro iniciado
- Taxa de cadastro completado

## Design System

### Paleta de Cores (Neurodesign)

```css
:root {
  /* Cores Primárias - Tons Calmos */
  --primary-blue: #4a90a4;
  --primary-green: #7fb069;
  --primary-purple: #9b7ede;

  /* Cores Secundárias - Suporte */
  --secondary-cream: #f7f3e9;
  --secondary-sage: #b8c5b0;
  --secondary-lavender: #e6e1f0;

  /* Cores de Estado - Contrastes Moderados */
  --success: #6b8e23;
  --warning: #daa520;
  --error: #cd5c5c;
  --info: #4682b4;

  /* Neutros */
  --gray-50: #fafafa;
  --gray-100: #f5f5f5;
  --gray-200: #eeeeee;
  --gray-600: #757575;
  --gray-900: #212121;
}
```

### Tipografia

```css
/* Fonte Principal - Legível e Confortável */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

.typography {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    sans-serif;
  line-height: 1.6;
  letter-spacing: 0.01em;
}

/* Hierarquia Tipográfica */
.text-hero {
  font-size: 3.5rem;
  font-weight: 700;
  line-height: 1.2;
}
.text-h1 {
  font-size: 2.5rem;
  font-weight: 600;
  line-height: 1.3;
}
.text-h2 {
  font-size: 2rem;
  font-weight: 600;
  line-height: 1.4;
}
.text-h3 {
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 1.4;
}
.text-body {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
}
.text-small {
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.5;
}
```

### Componentes Base

```css
/* Botões - Acessíveis e Confortáveis */
.btn-primary {
  background: var(--primary-blue);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
  min-height: 44px; /* Toque confortável */
}

.btn-primary:hover {
  background: #3a7a8a;
  transform: translateY(-1px);
}

.btn-primary:focus {
  outline: 2px solid var(--primary-blue);
  outline-offset: 2px;
}

/* Cards - Suaves e Organizados */
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  transition: all 0.3s ease;
}

.card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}
```

### Responsividade

```css
/* Breakpoints */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

@media (max-width: 768px) {
  .text-hero {
    font-size: 2.5rem;
  }
  .text-h1 {
    font-size: 2rem;
  }
  .container {
    padding: 0 16px;
  }
}

@media (max-width: 480px) {
  .text-hero {
    font-size: 2rem;
  }
  .text-h1 {
    font-size: 1.75rem;
  }
}
```

## Conteúdo e Copywriting

### Hero Section

**Título:** "AcolheMente: Transformando o Cuidado Neurodivergente na América Latina"

**Subtítulo:** "Uma plataforma segura e acolhedora onde famílias, profissionais e pessoas neurodivergentes se conectam, compartilham experiências e acessam cuidado especializado baseado em evidências científicas."

**CTA Principal:** "Fazer Parte da Comunidade"

### Context Section

**Título:** "Por que o AcolheMente é Necessário?"

**Subtítulo:** "A América Latina enfrenta desafios únicos no cuidado neurodivergente"

**Dados Apresentados:**

- 5.3 milhões de pessoas expostas à desinformação sobre autismo
- 1.659 grupos espalhando teorias não científicas
- Tempo médio de 2,5 a 6 anos entre preocupação e diagnóstico
- Escassez de profissionais especializados na região

### Solution Section

**Título:** "Nossa Solução: Ciência, Segurança e Comunidade"

**Pilares:**

1. **Informação Confiável** - Conteúdo baseado em evidências científicas
2. **Comunidade Segura** - Ambiente protegido para troca de experiências
3. **Acompanhamento Especializado** - Ferramentas para profissionais e famílias
4. **Denúncias Protegidas** - Canal seguro para reportar abusos

## Implementação Técnica

### Stack Tecnológico

**Frontend:**

- React 18 com TypeScript
- TailwindCSS para estilização
- Framer Motion para animações sutis
- React Hook Form para formulários
- Axios para requisições HTTP

**Otimização:**

- Next.js para SSG/SSR
- Image optimization automática
- Code splitting por seção
- Service Worker para cache

**Acessibilidade:**

- React Aria para componentes acessíveis
- Focus management automático
- Testes automatizados com axe-core
- Suporte completo a leitores de tela

### Performance

**Estratégias de Carregamento:**

- Critical CSS inline
- Lazy loading para imagens
- Preload para recursos críticos
- Compression (Gzip/Brotli)

**Métricas Alvo:**

- First Contentful Paint < 1.5s
- Largest Contentful Paint < 2.5s
- Time to Interactive < 3s
- Cumulative Layout Shift < 0.1

### SEO e Descoberta

**Meta Tags Otimizadas:**

```html
<title>
  AcolheMente - Plataforma de Cuidado Neurodivergente na América Latina
</title>
<meta
  name="description"
  content="Comunidade segura para famílias, profissionais e pessoas neurodivergentes. Informação confiável, acompanhamento especializado e suporte baseado em evidências científicas."
/>
<meta
  name="keywords"
  content="autismo, neurodivergência, América Latina, cuidado especializado, comunidade, apoio familiar"
/>
```

**Schema Markup:**

- Organization schema para credibilidade
- WebSite schema para busca
- FAQPage schema para perguntas frequentes

**Open Graph:**

- Imagens otimizadas para compartilhamento
- Descrições específicas por seção
- Suporte a Twitter Cards

Esta landing page será uma porta de entrada acolhedora e informativa que reflete os valores do AcolheMente enquanto combate efetivamente a desinformação sobre autismo na América Latina, sempre priorizando a experiência de usuários neurodivergentes.
