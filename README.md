My Sales API

🚀 Tecnologias

Node.js

Express

TypeScript

Postgress

📦 Instalação

Clone o repositório e instale as dependências:

git clone [https://github.com/seu-usuario/my_sales.git](https://github.com/IagoNeres55/my_sales.git)
cd my_sales
npm install ou yarn install

▶️ Executando o projeto

Ambiente de desenvolvimento:

npm run dev

Ambiente de produção:

npm run build
npm start

🔧 Configuração

Crie um arquivo .env na raiz do projeto e defina as variáveis necessárias, como exemplo:

PORT=3000
MONGO_URI=mongodb://localhost:27017/my_sales
JWT_SECRET=sua_chave_secreta

📌 Endpoints Principais

🛒 Vendas

GET /sales - Lista todas as vendas

POST /sales - Cria uma nova venda

GET /sales/:id - Retorna uma venda específica

PUT /sales/:id - Atualiza uma venda

DELETE /sales/:id - Remove uma venda

📜 Licença

Este projeto está sob a licença MIT. Sinta-se à vontade para usá-lo e modificá-lo conforme necessário.

