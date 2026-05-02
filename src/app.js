import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
// import { corsMiddleware, corsPreFlight } from './config/cors.js'; // si tu as ce fichier

import fournisseurRoutes from './routes/fournisseur.routes.js';
import produitRoutes from './routes/produit.routes.js';
import approvisionnementRoutes from './routes/approvisionnement.routes.js';
import authRoutes from './routes/auth.routes.js';
import errorHandler from './middlewares/error-handler.middleware.js';
import notFound from './middlewares/not-found.middleware.js';
import { corsMiddleware, corsPreFlight } from './config/cors.js';

const app = express();

// Middlewares globaux
app.use(corsMiddleware);
app.options('/{*path}', corsPreFlight);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Documentation Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes principales
app.use('/api/auth', authRoutes);
app.use('/api/fournisseurs', fournisseurRoutes);
app.use('/api/produits', produitRoutes);
app.use('/api/approvisionnements', approvisionnementRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString() 
  });
});

// Middlewares de fin
app.use(notFound);
app.use(errorHandler);

export default app;