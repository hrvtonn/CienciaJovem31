# 31ª Ciência Jovem - Sistema de Inscrição

Sistema completo para inscrição, submissão de projetos e administração da feira científica "31ª Ciência Jovem".

## ✨ Funcionalidades
- Cadastro de participantes (aluno/professor)
- Cadastro de instituições
- Submissão de projetos
- Login de professores/admins
- Área administrativa para revisão de projetos
- Validação de campos obrigatórios
- Campos condicionais (ex: campos que aparecem apenas em certas datas ou situações)

---

## 🗂️ Estrutura do Projeto
```
projeto/
├── backend/         # API Node.js + Express + MongoDB
│   ├── src/
│   │   ├── models/  # Modelos Mongoose
│   │   ├── routes/  # Rotas da API
│   │   └── index.js # Entrada do servidor
│   ├── .env         # Configurações de ambiente
│   └── package.json
│
├── frontend/        # Front-end React
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/ # Componentes React
│   │   ├── App.js
│   │   ├── index.js
│   │   └── index.css
│   └── package.json
│
└── README.md
```

---

## 🚀 Como rodar o projeto

### Pré-requisitos
- Node.js (v16+)
- MongoDB rodando localmente (ou use MongoDB Atlas)

### 1. Back-end
```bash
cd backend
npm install
# Configure o arquivo .env se necessário
npm run dev
```
O back-end estará em http://localhost:5000

### 2. Front-end
Abra outro terminal:
```bash
cd frontend
npm install
npm start
```
O front-end estará em http://localhost:3000

---

## 📚 Dicas
- Para rodar o MongoDB localmente, basta instalar e iniciar o serviço (ou use o MongoDB Compass para facilitar).
- Para usar MongoDB Atlas (nuvem), troque a variável `MONGODB_URI` no `.env` do backend.
- Para criar usuários admin/professor, use a rota de registro (`/api/auth/register`).
- O campo "Resumo" do projeto pode ser condicionado por data (ex: só aparece em agosto/2025). Peça para o assistente implementar!

---
