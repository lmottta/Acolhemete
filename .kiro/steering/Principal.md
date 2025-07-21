<!------------------------------------------------------------------------------------
   Add Rules to this file or a short description and have Kiro refine them for you:
------------------------------------------------------------------------------------->

---

## informações gerais sobre a pesquisa e o projeto:

[text](https://www.kimi.com/preview/19829eab-ce11-88cd-9873-dec8d700053e)

## 🧠 Princípios de Neurodesign

- Redução de estímulos visuais excessivos.
- Tipografia legível e confortável.
- Paleta com tons calmos e contrastes moderados.
- Navegação linear e orientada à previsibilidade.
- O projeto dever ser criado em portugues BR

---

### 🧱 Organização do Código

- Utilize **componentes reutilizáveis** e separados por domínio.
- Divida o código em `features`, cada uma com sua lógica isolada.
- Mantenha os **hooks** personalizados em uma pasta própria (`/hooks`).
- Separe chamadas de API em `services/` com tratamento de erros adequado.

## 👥 Perfis de Usuário

- **Pais/Apoiadores**: Cadastro e acompanhamento de pacientes.
- **Profissionais**: Criação de planos, relatórios e registro de evolução.
- **Clínicas**: Gestão de profissionais e vínculo com pacientes.
- **Paciente (perfil vinculado)**: Registro e exibição da evolução.

---

### 🔒 Segurança

- Utilizar Supabase Auth para controle de sessões.
- Validação em frontend e backend (Supabase policies).
- Filtrar todos os dados enviados para evitar injeções e acessos indevidos.
- Dados sensíveis devem estar **criptografados ou ocultos** na UI.

---

## 🧪 Qualidade e Boas Práticas

- Escrever testes unitários para componentes críticos (React Testing Library).
- Aplicar ESLint + Prettier para padronização de código.
- Usar Husky para validações de commit (lint + test).
- Validar responsividade com Lighthouse.
- Monitoramento com Vercel Analytics ou Supabase Logs.

## 🧪 Visão de Qualidade

### 🎯 Testes

- Implementar testes unitários com **Vitest** ou **Jest**.
- Testes E2E com **Cypress** para fluxos críticos: cadastro, login, denúncia, evolução.

### 🧪 Garantia de Qualidade

- Revisão de código (Code Review) obrigatória em PRs.
- A cada entrega:
  - Validar usabilidade em mobile
  - Testar acessibilidade básica
  - Validar regras de segurança e acesso

---

## 📌 Convenções Gerais

### 📁 Nomenclatura de Pastas e Arquivos

- pastas: `kebab-case`
- arquivos de componentes: `PascalCase.tsx`
- hooks: `useNomeDoHook.ts`

### 🧩 Componentes

- Utilizar Tailwind + componentes próprios
- Evitar dependência excessiva de libs externas

### 💬 Comunicação e Documentação

- Documentar cada feature em Markdown (`docs/`)
- Adicionar comentários explicativos em funções complexas
- Manter este documento atualizado a cada sprint

---

## 🌱 Crescimento do Projeto

- Avaliar feedback da comunidade para melhorias contínuas.
- Criar sistema de permissões mais refinado ao longo do tempo.
- Incluir sistema de notificações e agenda de sessões futuras.
- Possibilidade de internacionalização (i18n).

---

## 🙌 Princípios Éticos

- Sempre priorizar o bem-estar e dignidade da pessoa neurodivergente.
- Linguagem acolhedora, sem termos ofensivos ou técnicos desnecessários.
- Moderação ativa contra qualquer tipo de abuso, preconceito ou exclusão.

---

## 🚀 Deploy & CI

- Deploy contínuo via Railway com GitHub Actions.
- Dividir ambiente entre produção e homologação.

---

### 💅 UI/UX

- Interface clara e acolhedora para o público neurodivergente.
- Ícones e elementos visuais com significados compreensíveis.
- Evitar sobrecarga cognitiva: poucos elementos por tela.
- Tipografia legível e adaptável.

## 📎 Anotações Finais

- Acolher é escutar: toda feature deve considerar o impacto emocional e social.
- O projeto é mais que técnico: é humano.
  """
