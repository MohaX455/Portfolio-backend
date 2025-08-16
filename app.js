import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';
import database from './database/db.js';
import mailRoutes from './routes/mailRoutes.js';

const app = express();
dotenv.config({ debug: true });
const PORT = process.env.PORT || 3000;

// Pour gérer __dirname avec les modules ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());

// Connexion à la base de données MongoDB
database();

// Routes API
app.use('/mail', mailRoutes);

// Sert les fichiers React buildés
app.use(express.static(path.join(__dirname, 'dist')));

//  Redirige toutes les routes vers index.html (SPA)
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`✅ Backend en écoute sur http://localhost:${PORT}`);
});
