# Gerenciador de Tarefas
Este projeto é uma aplicação de gerenciamento de tarefas que permite ao usuário criar, editar, deletar e marcar tarefas como concluídas. Ele foi desenvolvido com tecnologias modernas para proporcionar uma experiência fluida e responsiva, tanto em navegadores quanto em dispositivos móveis.

Instalação e Execução
Pré-requisitos:
  -Node.js instalado (versão 16 ou superior recomendada).
  -Docker e Docker Compose instalados (opcional, caso deseje executar via containers).
  -Banco de dados MySQL configurado.

Clone o repositório :

git clone https://github.com/DaniloCalado/To-Do-list-Stoix-Challenge.git
cd To-Do-list-Stoix-Challenge

Crie o banco de dados MySQL Execute o comando abaixo no terminal para criar um banco de dados MySQL:
CREATE DATABASE nome_do_banco;
Configure o arquivo .env Na raiz da pasta backend, crie um arquivo chamado .env com as informações de acesso ao banco de dados:

DB_HOST=localhost
DB_USER=nome_do_usuario
DB_PASSWORD=senha
DB_NAME=nome_do_banco
Instale as dependências

Acesse a pasta backend e instale as dependências:
cd backend
npm install
Inicie o backend:
npm run dev

Acesse a pasta frontend e instale as dependências:
cd frontend
npm install
Inicie o frontend:
npm start

Acesse o aplicativo no navegador em http://localhost:3000.

Execução via Docker
Suba os containers com Docker Compose Na raiz do projeto, execute:
docker-compose up
O backend será iniciado na porta 4000, e o frontend na porta 3000.

Acesse o aplicativo no navegador Abra http://localhost:3000.


Funcionalidades
Gerenciamento de Tarefas

Criar, editar, deletar e listar tarefas.
As tarefas possuem:
Data (quando foram criadas).
Título e Descrição.
Checkbox para marcar como concluídas.
Modais de Confirmação

Edição:
O botão "Confirmar Edição" só é habilitado se houver alterações nos campos de título ou descrição.
Deleção:
Modal com o nome da tarefa para confirmar ou cancelar a exclusão.

Notificações (Toast) para melhor visualização do usuário nas ações que ele realizar.


Utilizei Tailwind CSS para uma interface moderna e responsiva, garantindo uma ótima experiência em dispositivos móveis e desktops.

Tecnologias Utilizadas

Backend
Node.js com TypeScript
MySQL para o banco de dados
Express para gerenciamento de rotas

Frontend
React.js com TypeScript
Axios para comunicação com a API
Tailwind CSS para estilização
