# Bingo da Família — DeLunaTech

PWA estática em HTML, CSS e JavaScript, pronta para GitHub Pages e Firebase.

## Estrutura

- `index.html`, `styles.css`: interface responsiva DeLunaTech.
- `js/app.js`: telas, tempo real, sala, sorteio, chat e validação.
- `js/firebase.js`: Firebase Authentication e Firestore.
- `js/bingo.js`: geração e validação de cartelas de 90 bolas.
- `firestore.rules`: regras de segurança para publicar no console.
- `manifest.json` e `sw.js`: instalação PWA/offline da interface.

## Modelo Firestore

`rooms/{codigo}` guarda estado da partida (`status`, `calledNumbers`, `lastNumber`, `selectionEndsAt`, `createdBy`). As subcoleções são `players`, `cards`, `messages` e `victories`. `history/{id}` é o registro imutável final criado pelo administrador.

## Console Firebase (obrigatório)

1. Em **Authentication > Sign-in method**, habilite **Anônimo** para jogadores e **Google** (ou o provedor do administrador).
2. Em **Authentication > Settings > Authorized domains**, inclua seu domínio `*.github.io`.
3. Em **Firestore Database**, crie o banco em modo produção e publique o conteúdo de `firestore.rules`.
4. Depois que o administrador entrar uma vez com Google, abra **Firestore > Dados** e crie manualmente a coleção `adminUsers`. Crie um documento cujo ID seja exatamente o UID da conta e adicione os campos `active` (booleano `true`) e `email` (string). O frontend não consegue ler ou editar essa coleção; as regras a usam apenas para autorizar o painel.
5. Publique esta pasta em uma branch do GitHub Pages.

## Regra de desempate

Quando mais de uma cartela completa for confirmada no mesmo número, todas entram em empate. O administrador inicia uma rodada de desempate: cada empatado recebe uma nova cartela e o sorteio continua sem repetir nenhuma bola já chamada. A primeira cartela completa confirmada vence; o resultado e a ordem são registrados no histórico.

## Nota operacional

A distribuição automática das cartelas depois de 40 segundos é disparada pela tela administrativa enquanto ela estiver aberta. Para execução garantida mesmo sem nenhum navegador do administrador conectado, é necessário um backend confiável (por exemplo, Cloud Functions agendada), que não foi incluído porque este projeto foi definido como GitHub Pages + Firebase sem faturamento.
