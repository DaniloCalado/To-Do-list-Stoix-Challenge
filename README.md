## 🛠 Deploy realizado
- Acesse: https://to-do-list-stoix-challenge-tphk.vercel.app/

 Backend
- render
  
 Frontend
- Vercel

Banco de dados:
- Supabase

obs: caso você acesse pelo celular, lembre-se de desativar duas opções nas configurações do navegador caso estejam ativadas:
- "Impedir Rastreamento entre Sites"
- "Bloquear Todos os Cookies"

# Gerenciador de Tarefas

Este projeto é uma aplicação de gerenciamento de tarefas que permite ao usuário criar, editar, deletar e marcar tarefas como concluídas. Ele foi desenvolvido com tecnologias modernas para proporcionar uma experiência fluida e responsiva, tanto em navegadores quanto em dispositivos móveis.

---

## 🚀 Clonando o repositório e criando o banco de dados

### 🛠 Pré-requisitos
Antes de começar, verifique se você possui:
- **Node.js** instalado (versão 16 ou superior é recomendada).
- Um **banco de dados MySQL** configurado.

### 📦 Clone o repositório
1. Faça o download do projeto em sua máquina clonando o repositório:
   - Acesse o terminal e digite o comando:
     git clone https://github.com/DaniloCalado/To-Do-list-Stoix-Challenge.git

2. Acesse a pasta do projeto:

### 🗃️ Configuração do Banco de Dados

1. **Crie um banco de dados no MySQL**  
   Abra o terminal ou o cliente SQL de sua preferência e execute o seguinte comando:
   ```sql
   CREATE DATABASE nome_do_banco;
Configure o arquivo .env na raiz da pasta backend</br>
Crie um arquivo chamado .env e adicione as informações de conexão com o banco de dados:

.env
 
DB_HOST=localhost</br>
DB_USER=nome_do_usuario</br>
DB_PASSWORD=senha</br>
DB_NAME=nome_do_banco</br>

Crie a tabela tasks no banco de dados</br>
Para que o backend funcione corretamente, crie a tabela tasks no banco de dados.</br>
Execute o seguinte comando:

</br>
CREATE TABLE tasks (</br>
    id SERIAL PRIMARY KEY,</br>
    title TEXT NOT NULL,</br>
    description TEXT,</br>
    completed BOOLEAN DEFAULT 0,</br>
    created_at TIMESTAMP DEFAULT NOW()</br>
);

### Observações
Substitua nome_do_banco, nome_do_usuario, e senha no arquivo .env com os valores correspondentes ao seu ambiente.</br>
A tabela tasks é obrigatória, pois o modelo do backend depende dela para funcionar corretamente.

---

### 🔧 Instalação e Execução Manual

#### Backend
1. Acesse a pasta `backend`:
cd backend

2. Instale as dependências:
npm install

3. Inicie o servidor backend:
npm run dev



#### Frontend
1. Acesse a pasta `frontend`:
cd frontend

2. Instale as dependências:
npm install

3. Inicie o servidor frontend:
npm start

4. Após isso, o aplicativo estará disponível em:  
**http://localhost:3000**

---

## ✨ Funcionalidades

### 📋 Gerenciamento de Tarefas
- Criação, edição, exclusão e listagem de tarefas.
- Cada tarefa possui:
- **Data de criação** (adicionada automaticamente).
- **Título** e **Descrição**.
- Um **checkbox** para marcar como concluída.

### 🔄 Modais de Confirmação
- **Edição de tarefas**:  
O botão "Confirmar Edição" é habilitado somente quando há alterações no título ou na descrição.
- **Exclusão de tarefas**:  
Um modal exibe o nome da tarefa para confirmação ou cancelamento.

### 🔔 Notificações
- Notificações (Toast) informam o usuário sobre o sucesso ou falha de ações como criar, editar ou excluir uma tarefa.

### 💅 Estilização
O projeto utiliza **Tailwind CSS** para garantir:
- Uma interface moderna e responsiva.
- Experiência de uso fluida em dispositivos móveis e desktops.

---

## 🛠 Tecnologias Utilizadas

### Backend
- **Node.js** com **TypeScript**
- **MySQL** para o banco de dados
- **Express** para gerenciamento de rotas
- CSRF-token

### Frontend
- **React.js** com **TypeScript**
- **Axios** para comunicação com a API
- **Tailwind CSS** para estilização
