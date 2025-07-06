require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const participanteRoutes = require('./routes/participante');
const instituicaoRoutes = require('./routes/instituicao');
const projetoRoutes = require('./routes/projeto');
const setupSwagger = require('./swagger');
const errorHandler = require('./middleware/errorHandler');

setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use('/api/participantes', participanteRoutes);
app.use('/api/instituicoes', instituicaoRoutes);
app.use('/api/projetos', projetoRoutes);

app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB conectado');
  app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando na porta ${process.env.PORT}`);
  });
})
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));