import express from 'express';
import rotaCertaRoutes from './routes/rotaCertaRoutes.js';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api', rotaCertaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado em http://localhost:${PORT}`);
});