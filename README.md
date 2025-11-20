# Vital Check

O "Vital Check" é um Progressive Web App (PWA) simples, instalável e gratuito, projetado para permitir que grupos de pessoas confirmem seu "estado vital" uns aos outros. Ele funciona como uma rede de segurança digital proativa, focada em confirmar o bem-estar sob demanda, sem ser invasivo.

O principal objetivo do projeto é proporcionar tranquilidade por meio de um mecanismo de check-in simples, adequado para diversos cenários, como o monitoramento leve de idosos, um sistema de apoio para saúde mental, segurança pessoal durante atividades solo e check-ins familiares rápidos.

## Funcionalidades Principais

- **Autenticação com Google:** Login seguro e fácil com uma conta do Google.
- **Gerenciamento de Grupos:** Crie um ou mais grupos com dois ou mais membros.
- **Check-ins Agendados:** Uma janela máxima de 24 horas para os membros confirmarem seu status.
- **Notificações Push:** Lembretes são enviados aos usuários para que confirmem seu status.

## Funcionalidades Futuras

- **Notificações Acionáveis:** Confirme seu status diretamente pela notificação push, sem precisar abrir o aplicativo.
- **Check-ins Sob Demanda:** Solicite uma atualização de status de um usuário fora do cronograma regular.
- **Alertas de Status:** Notifique os membros do grupo quando um usuário confirmar seu status (ou não o fizer dentro do tempo previsto).
- **Autenticação Aprimorada:**
  - Gerenciamento de senhas (criação/alteração) dentro do aplicativo.
  - Login com Facebook e Instagram.
- **Configuração de Grupos:**
  - Intervalos de check-in personalizáveis.
  - Notificações por SMS ou e-mail para atualizações de status.

## Stack de Tecnologia

O projeto é construído com foco em custo zero e máxima simplicidade de desenvolvimento, unificando o backend e o frontend.

- **Framework Full Stack:** [Next.js](https://nextjs.org/) (com App Router)
- **Hospedagem:** [Vercel](https://vercel.com/) (Plano Hobby)
- **Backend (BaaS):** [Supabase](https://supabase.io/) (PostgreSQL, Auth & Realtime)
- **Estilização:** [CSS Modules](https://github.com/css-modules/css-modules) + [next-themes](https://github.com/pacocoursey/next-themes)
- **Notificações Push:** [Firebase Cloud Messaging (FCM)](https://firebase.google.com/docs/cloud-messaging)
- **PWA:** [next-pwa](https://github.com/shadowwalker/next-pwa)

## Como Começar

Para obter uma cópia local e executá-la, siga estes passos simples.

### Pré-requisitos

- Node.js (v22.20.0)
- npm (v11.6.2)

### Instalação

1. Clone o repositório
   ```sh
   git clone https://github.com/seu_usuario/vital-check.git
   ```
2. Instale os pacotes NPM
   ```sh
   npm install
   ```
3. Execute o servidor de desenvolvimento
   ```sh
   npm run dev
   ```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## Scripts Disponíveis

No diretório do projeto, você pode executar:

- `npm run dev`: Executa o aplicativo em modo de desenvolvimento.
- `npm run build`: Compila o aplicativo para produção.
- `npm run start`: Inicia um servidor de produção.
- `npm run lint`: Executa o linter.
