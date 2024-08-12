
# Meu Site

Este projeto é uma aplicação Next.js que inclui páginas básicas, navegação, integração com APIs, autenticação de usuários e testes unitários.

## Funcionalidades

- Autenticação de usuários (login e registro)
- Proteção de rotas com HOC (Higher-Order Component)
- Integração com APIs para dados dinâmicos
- Navegação entre páginas com `next/link`
- Testes unitários utilizando Jest e Testing Library

## Pré-requisitos

- Node.js >= 14.x
- npm >= 6.x

## Instalação

1. Clone o repositório:

    \`\`\`bash
    git clone [https://github.com/lzhgf/quality-challenge.git]
    \`\`\`

2. Navegue até o diretório do projeto:

    \`\`\`bash
    cd meu-site
    \`\`\`

3. Instale as dependências:

    \`\`\`bash
    npm install
    \`\`\`

## Executando o Projeto

Para iniciar o projeto localmente:

\`\`\`bash
npm run dev
\`\`\`

O site estará disponível em [http://localhost:3000](http://localhost:3000).

## Testes

Os testes unitários podem ser executados com:

\`\`\`bash
npm run test
\`\`\`

## Estrutura do Projeto

- **/pages**: Contém as páginas da aplicação.
- **/components**: Componentes reutilizáveis de UI.
- **/context**: Contexto de autenticação e provedores.
- **/hooks**: Hooks customizados.
- **/utils**: Funções utilitárias.


## PS

Existe um arquivo chamado `testApi.js` na raixa do projeto que é um script em Node.js criado para mensurar o tempo das requisições da paginação de usuários. O tempo de resposta no navegador estava me incomodando, então criei este arquivo para comparar e entender se existe algum problema com a lógica. 

Apesar de os tempos do script também serem altos, ainda estou desconfiado e continuo investigando.

para rodar o test  `node testApi.js`