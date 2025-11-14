# PENSAMENTOS

## TAREFAS

Perfeito. Inicialmente vamos construir um aplicativo com as seguintes features:

- autenticação com conta google;
- um o mais grupos de 2 ou mais pessoas cada grupo;
- espaço de tempo máximo de 24 horas entre as confirmação;
- Push notification lembrando sobre a confirmação;
- Um botão de confirmação no próprio push notification (Sem precisar abrir o aplicativo);

E futuramente:

- Solicitar a confirmação de um usuário de forma extraordinário ou para reformar um lembrete de confirmação do usuário (limitar a quantidade de confirmações que poderão ser enviadas por pessoa);
- Avisar via push notification pessoas ou grupo inteiro quando houver a confirmação (ou não houver a confirmação até o tempo máximo) de determinada pessoa ou do grupo inteiro;
- Autenticação com número de celular e e-mail;
- Autenticação com Facebook e Instagram;
- Possibilitar mudança nas configurações dos grupos:
  - Alterar o intervalo de tempo entre as confirmações;
  - Enviar sms ou e-mail em caso de confimação ou não confirmação de determinada pessoa ou grupo de pessoas em um determinado espaço de tempo;

## RESPOSTA GEMINI

Perfeito, esta é uma excelente definição de MVP (Minimum Viable Product) e de visão de futuro.

Vamos analisar essas features em relação à stack que escolhemos:

### 🚀 Análise do MVP

### Autenticação com conta Google

- Ótima escolha. Isso é mais simples de implementar com o Supabase do que o e-mail/senha que fizemos. Podemos trocar ou adicionar. O Supabase cuida de todo o fluxo OAuth 2.0. É uma configuração de 10 minutos no painel do Supabase.

### Um ou mais grupos de 2 ou mais pessoas

- Perfeito. Nossas tabelas groups e group_members estão prontas exatamente para isso.

### Espaço de tempo máximo de 24 horas entre as confirmações

- Esta é um"a regra de negócio crucial. Isso define o core do app como um "Dead Man's Switch" passivo (semelhante ao app Snug).
- **Implicação Técnica**: Precisamos adicionar uma coluna na nossa tabela group_members chamada last_confirmed_at (do tipo timestamptz). Quando um usuário confirma, atualizamos esse carimbo de data/hora.

- **Desafio**: Precisaremos de um "cron job" (um script agendado) para rodar a cada X minutos/horas, checar todos os membros de todos os grupos e ver se agora() - last_confirmed_at > 24 horas.

- **Solução**: Podemos fazer isso perfeitamente com Supabase Edge Functions (que são Deno/TypeScript) e o Supaba"se pg_cron (agendador do Postgres).

### Push notification lembrando sobre a confirmação

- Perfeito. Isso se divide em dois:

  - Notificação de Lembrete: O "cron job" (item 3) não só detectará a falha, mas também enviará um lembrete (via FCM) antes das 24h expirarem (ex: em 22 horas).
  - Notificação de Solicitação: (Da sua ideia original) Um usuárioA pode pedir um check do usuárioB, e o B recebe um push.

- Nossa stack (FCM + Supabase) está pronta para isso.

### Um botão de confirmação no próprio push notification (Sem precisar abrir o aplicativo)

- Ótima feature. Isso é chamado de "Notification Actions". É um recurso avançado de PWA/Service Worker.

- **Implicação Técnica**: É totalmente possível. O Service Worker (que o next-pwa nos ajuda a criar) precisará "ouvir" o clique nesse botão (mesmo com o app fechado) e fazer uma chamada de API para o nosso Route Handler do Next.js (que por sua vez falará com o Supabase) para registrar a confirmação.

- **Sugestão**: Para o MVP inicial, podemos fazer a notificação abrir o app na página de confirmação. E então, como "MVP v1.1", implementar a ação direta na notificação.

### 🔭 Análise das Features Futuras

- **Avisar sobre confirmação (ou não)**: É para isso que o Supabase Realtime foi feito. Perfeito.
- **Outras autenticações (Celular, Facebook, etc.)**: Supabase suporta todos. É só "ligar" no painel.
- **Configurações de grupo (intervalo de tempo)**: Isso é só adicionar uma coluna check_interval_hours (default 24) na nossa tabela groups. O "cron job" leria esse valor. Simples de fazer.
- **Enviar SMS ou e-mail**: Isso exigirá serviços de terceiros (como Twilio para SMS ou Resend/SendGrid para e-mail), que são chamados a partir das nossas Supabase Edge Functions. É a evolução natural e totalmente viável.

### 💡 Conclusão

A stack (Next.js, Vercel, Supabase, FCM) está 100% validada por esta lista de features. Ela não só dá conta do MVP, como foi feita para as suas "features futuras".

### Próximo Passo Proposto

Vamos ignorar o Passo 8 (Página de Login) anterior (que era de e-mail/senha) e substituí-lo pela implementação do Login com Google, já que essa é sua nova feature de autenticação principal.
