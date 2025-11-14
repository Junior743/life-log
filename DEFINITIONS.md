# Vital Check

## 🚀 Resumo da Stack

O objetivo é construir um PWA (Progressive Web App) simples, instalável e gratuito, focado em permitir que grupos de pessoas confirmem seu "estado vital". A arquitetura escolhida visa o **custo zero** e a **máxima simplicidade de desenvolvimento** ao unificar o backend e o frontend.

**Stack Final em Resumo:**

- **Framework Full Stack:** Next.js (com App Router)
- **Hospedagem:** Vercel (Plano Hobby)
- **Backend (BaaS):** Supabase (PostgreSQL, Auth & Realtime)
- **Estilização:** CSS Modules + `next-themes`
- **Notificações Push:** Firebase Cloud Messaging (FCM)
- **Biblioteca PWA:** `next-pwa`

## 🔧 Detalhamento das Ferramentas e Arquiteturas

Abaixo está o detalhamento de cada escolha, com os motivos, prós e contras.

### 1. Arquitetura Full Stack: Next.js

- **Motivo da Escolha:** Foi o requisito inicial e é ideal para o projeto. O Next.js com App Router permite a criação do frontend (Componentes React) e do backend (API via Route Handlers) no **mesmo projeto**, simplificando o desenvolvimento e o deploy.
- **Prós:**
  - **Produtividade:** Utilização de um único framework, linguagem (TypeScript/JS) e repositório para tudo.
  - **Deploy Simples:** Plataformas como o Vercel (a escolha de hospedagem) entendem essa estrutura nativamente.
  - **Backend Serverless:** Os Route Handlers são "deployados" como Serverless Functions (ex: AWS Lambda), que escalam automaticamente e têm custo zero em baixa demanda.
- **Contras:**
  - **Curva de Aprendizado:** O App Router e os Server Components (RSC) representam uma nova forma de pensar em React, o que pode exigir alguma adaptação.

### 2. Plataforma de Backend (BaaS): Supabase

- **Motivo da Escolha:** Há a necessidade de um banco **SQL gratuito** e uma forma de simplificar a autenticação. O Supabase (baseado em PostgreSQL) é uma plataforma "Backend as a Service" que oferece muito mais do que apenas o banco de dados.
- **Prós:**
  - **Tudo-em-Um:** Fornece **Banco de Dados (Postgres SQL)**, **Autenticação** (substituindo o `NextAuth.js`) e **Realtime** (essencial para o app) em um só lugar.
  - **SQL Serverless:** O plano gratuito é excelente para um projeto inicial e o banco é PostgreSQL, um padrão de mercado robusto.
  - **Realtime Imediato:** A capacidade de "ouvir" mudanças no banco (ex: um status de check mudando de `pending` para `confirmed`) sem configurar websockets é uma vantagem imensa para este caso de uso.
- **Contras:**
  - **Vendor Lock-in (Leve):** Embora o Supabase seja open-source, migrar a infraestrutura de Auth e Realtime para outra solução no futuro exigiria trabalho.
  - **RLS (Row Level Security):** O modelo de segurança do Supabase é o RLS do Postgres. É extremamente poderoso, mas é um conceito novo e que exige atenção para quem está acostumado a escrever a lógica de segurança em um backend tradicional.

### 3. Estilização: CSS Modules + `next-themes`

- **Motivo da Escolha:** Preferência pessoal. O conforto é maior com "CSS puro" do que com frameworks _utility-first_ como o Tailwind CSS.
- **Prós:**
  - **Escopo Automático:** CSS Modules garante que os estilos (ex: `.container`) sejam locais para cada componente, eliminando qualquer risco de conflito global.
  - **HTML Limpo:** Mantém a marcação JSX/HTML limpa e semântica, com poucas classes.
  - **Nativo do Next.js:** Não requer instalação ou configuração; já vem pronto para uso.
- **Contras:**
  - **Prototipação Lenta:** É considerado mais lento para prototipar, pois exige a criação e manutenção de arquivos `.module.css` separados e a alternância constante entre arquivos.
  - **Gerenciamento de Tema:** Exige uma arquitetura de Variáveis CSS (Custom Properties) para gerenciar temas (como o dark mode), o que será resolvido usando a biblioteca `next-themes`.

### 4. Notificações Push: Firebase Cloud Messaging (FCM)

- **Motivo da Escolha:** É um requisito técnico **insubstituível** para PWAs. Para enviar uma notificação push a um navegador (especialmente no Android/Chrome), o servidor _precisa_ enviar a mensagem através do FCM, que é a ponte oficial do Google para isso.
- **Prós:**
  - **Gratuito:** O envio de mensagens (a funcionalidade principal) é gratuito e massivamente escalável.
  - **Padrão da Indústria:** É a única solução confiável e universal para notificações push em PWAs.
- **Contras:**
  - **Dependência Externa:** Adiciona uma dependência do ecossistema Google (exigindo a criação de um projeto no console do Firebase) apenas para essa funcionalidade.
  - **Não é da AWS:** Diferente de outras ferramentas que tinham alternativas na AWS (como o DynamoDB), o AWS SNS não substitui o FCM, ele apenas conversa com o FCM, tornando-o uma camada desnecessária.

### 5. Hospedagem: Vercel (Plano Hobby)

- **Motivo da Escolha:** É a plataforma criada e mantida pela equipe do Next.js. Oferece a experiência de deploy mais simples e otimizada para a stack escolhida.
- **Prós:**
  - **Custo Zero:** O plano Hobby é gratuito e perfeitamente adequado para este projeto de crescimento orgânico.
  - **CI/CD Integrado:** Basta um `git push` para que o site seja "deployado" automaticamente.
  - **Integração Perfeita:** Entende nativamente o Next.js (Server Components, Route Handlers, Otimização de Imagem) sem nenhuma configuração.
- **Contras:**
  - **Limites (Generosos):** O plano gratuito possui limites de execução de Serverless Functions. Para um app de baixo tráfego, é muito improvável que sejam atingidos.
  - **Alternativa (Amplify):** A alternativa na AWS seria o AWS Amplify, que também tem um plano gratuito, mas é universalmente considerado mais complexo de configurar com o Next.js do que o Vercel.

## Casos de Uso

A proposta do "Vital Check" é excelente porque se encaixa em um nicho muito específico: a **verificação de status sob demanda**, que fica entre o "rastreamento passivo constante" (como o Find My) e o "alerta de emergência ativo" (como um botão de pânico).

### 🎯 Possíveis Finalidades para o "Vital Check"

Em essência, uma **rede de segurança digital proativa**. O valor dele está na tranquilidade de poder confirmar o bem-estar de alguém com um toque, sem ser invasivo.

Aqui estão os principais casos de uso (finalidades):

1. **Cuidado de Idosos (Monitoramento Leve):**

   - **Público:** Filhos ou parentes que cuidam de pais idosos que moram sozinhos.
   - **Finalidade:** O idoso não precisa de um sistema complexo de "botão de pânico" (como Life Alert), mas a família quer uma forma de "dar bom dia" e garantir que ele está bem e ativo, apenas com a confirmação na notificação. Se o check-in não for respondido em X horas, a família sabe que precisa ligar ou fazer uma visita.

2. **Saúde Mental (Rede de Apoio "Buddy System"):**

   - **Público:** Pessoas que passam por depressão, ansiedade severa ou crises de pânico.
   - **Finalidade:** Um amigo ou terapeuta pode estar em um grupo de "Vital Check". A pessoa pode enviar um "check" quando está se sentindo bem, ou o amigo pode enviar um "check" para perguntar "Você está bem?" de forma não verbal, sem a pressão de uma ligação ou uma longa mensagem de texto. A simples resposta "OK" já é uma comunicação valiosa.

3. **Segurança Pessoal (Trilhas, Viagens Solo, Encontros):**

   - **Público:** Pessoas que vão fazer uma trilha sozinhas, viajar para um lugar novo, ou até mesmo em um "blind date" (encontro às cegas).
   - **Finalidade:** A pessoa combina com um grupo de amigos de enviar um "check" a cada 2 horas. Se ela falhar em responder a um "check" iniciado pelo grupo, os amigos sabem que algo pode estar errado e podem tomar uma atitude (como checar a última localização conhecida, etc.).

4. **Grupos Familiares (Verificação Rápida):**
   - **Público:** Pais e filhos adolescentes.
   - **Finalidade:** Substituir o "Já chegou?" / "Está tudo bem?". O filho(a) chega na casa do amigo e só confirma o "check" enviado pelos pais. É mais rápido que um WhatsApp e focado apenas no status "cheguei / estou bem".

### 🗺️ Análise de Concorrentes e Aplicativos Similares

Já existem aplicativos que tocam em partes dessa ideia, mas o seu **conjunto de features (PWA, simples, focado em grupos)** tem um diferencial.

Os concorrentes se dividem em três categorias:

1. **Aplicativos de Localização (O que seu app NÃO é):**

   - **Exemplos:** **Life360**, **Find My (Apple)**, **Encontre Meu Dispositivo (Google)**.
   - **Como funcionam:** Focam no rastreamento **passivo e constante** de localização. São ótimos para saber _onde_ a pessoa está, mas não _como_ ela está.
   - **Diferencial:** App foca no **status consentido** ("Eu estou bem"), não na localização. É muito menos invasivo e focado na privacidade.

2. **Aplicativos de Emergência (Botão de Pânico):**

   - **Exemplos:** **BSafe**, **SOS Nativo do iOS/Android**, **Life Alert** (hardware).
   - **Como funcionam:** São **reativos**. A pessoa _precisa_ estar em uma emergência e _conseguir_ apertar o botão para alertar contatos ou a polícia.
   - **Diferencial:** App é **proativo**. Ele serve para verificar o bem-estar _antes_ que uma emergência se agrave (ex: o idoso que caiu e não consegue levantar, mas estava bem 1 hora antes).

3. **Aplicativos de Check-in (Os mais Próximos):**
   - **Exemplos:** **Snug (Snug Safety)**, **Ok Alone (Lone Worker)**, **Uup**.
   - **Snug:** É o concorrente mais direto para o caso de uso de **idosos**. O usuário (idoso) precisa fazer um check-in _diário_ (para si mesmo) em um horário combinado. Se falhar, o app alerta os contatos de emergência.
   - **Ok Alone:** É um aplicativo B2B (para empresas) focado em "trabalhadores solitários" (ex: guardas noturnos) que precisam confirmar que estão bem durante o turno.
   - **Uup:** Um app social onde você e seus amigos "dão check-in" quando acordam.

### ⭐ O Diferencial (Por que a ideia ainda é boa)

Mesmo com esses apps, o aplicativo tem três diferenciais claros:

1. **Simplicidade (PWA):** A maioria dos concorrentes são apps nativos pesados. Ser um PWA é uma vantagem enorme. É instalável, leve e não exige uma App Store. Um idoso ou alguém não-técnico pode simplesmente adicionar à tela inicial a partir de um link.
2. **Foco no Grupo (Muitos-para-Muitos):** O "Snug" é focado no indivíduo (um-para-muitos). Sua ideia é focada no **grupo**, onde _qualquer um_ pode pedir um "check" a _qualquer outro_ a qualquer momento. Isso o torna muito mais flexível para os casos de uso de amigos, saúde mental e segurança pessoal.
3. **Custo Zero:** Por ser um projeto livre e gratuito, você remove a barreira de entrada que muitos apps de segurança (especialmente os B2B) possuem.

## Tarefas

Perfeito. Inicialmente vamos construir um aplicativo com as seguintes features:

- Autenticação com conta google;
- Um o mais grupos de 2 ou mais pessoas cada grupo;
- Espaço de tempo máximo de 24 horas entre as confirmação;
- Push notification lembrando sobre a confirmação;
- Um botão de confirmação no próprio push notification (Sem precisar abrir o aplicativo);

E futuramente:

- Solicitar a confirmação de um usuário de forma extraordinário ou para reformar um lembrete de confirmação do usuário (limitar a quantidade de confirmações que poderão ser enviadas por pessoa);
- Avisar via push notification pessoas ou grupo inteiro quando houver a confirmação (ou não houver a confirmação até o tempo máximo) de determinada pessoa ou do grupo inteiro;
- Cadastro e alteração de senha em configurações depois de logado;
- Autenticação com Facebook e Instagram;
- Possibilitar mudança nas configurações dos grupos:
  - Alterar o intervalo de tempo entre as confirmações;
  - Enviar sms ou e-mail em caso de confimação ou não confirmação de determinada pessoa ou grupo de pessoas em um determinado espaço de tempo;
