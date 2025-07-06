# Backend - Ciência Jovem

## Instalação

```bash
cd backend
npm install
```

## Variáveis de ambiente

Crie um arquivo `.env` com:

```
MONGODB_URI=seu_mongodb_uri
token=seu_token
PORT=5000
JWT_SECRET=sua_chave_secreta
```

## Rodando o servidor

```bash
npm start
```

## Documentação da API

Acesse `http://localhost:5000/api-docs` para visualizar a documentação Swagger.

## Autenticação

Algumas rotas exigem autenticação JWT. Faça login em `/api/auth/login` para obter um token e envie no header:

```
Authorization: Bearer SEU_TOKEN
```

## Testes automatizados

```bash
npm test
```

## Padrão de código

- ESLint configurado para Node.js
- Use `npm run lint` para checar o código
