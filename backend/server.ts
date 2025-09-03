/**
 * Point d'entrée de l'application CoworkSpace TypeScript
 * Configuration du serveur Express avec architecture en couches
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { setupRoutes } from './presentation/routes/index';

// Chargement des variables d'environnement
dotenv.config();

// Types pour l'application
interface AppConfig {
  port: number;
  nodeEnv: string;
  frontendUrl: string;
  corsOrigin: string | string[];
}

interface ServerError extends Error {
  status?: number;
}

const app = express();

// Configuration de l'application
const config: AppConfig = {
  port: parseInt(process.env.PORT || '3001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  corsOrigin: process.env.CORS_ORIGIN?.split(',') || process.env.FRONTEND_URL || 'http://localhost:5173'
};

// Middlewares de sécurité
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Middlewares de parsing
app.use(express.json({
  limit: '10mb',
  type: 'application/json'
}));
app.use(express.urlencoded({
  extended: true,
  limit: '10mb'
}));

// Logging des requêtes
if (config.nodeEnv === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Middleware pour ajouter des headers de réponse personnalisés
app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.setHeader('X-API-Version', '1.0.0');
  res.setHeader('X-Powered-By', 'CoworkSpace-API');
  next();
});

// TODO: Configuration de la base de données
// import { connectDatabase } from './infrastructure/database/index';
// await connectDatabase();

// Configuration des routes
setupRoutes(app);

// Middleware de gestion des erreurs 404
app.use('*', (req: express.Request, res: express.Response) => {
  res.status(404).json({
    success: false,
    message: 'Route non trouvée',
    error: {
      path: req.originalUrl,
      method: req.method,
      timestamp: new Date().toISOString()
    }
  });
});

// Middleware de gestion des erreurs globales
app.use((error: ServerError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Erreur globale:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  const statusCode = error.status || 500;
  const isDevelopment = config.nodeEnv === 'development';

  res.status(statusCode).json({
    success: false,
    message: error.message || 'Erreur interne du serveur',
    error: {
      status: statusCode,
      timestamp: new Date().toISOString(),
      path: req.url,
      method: req.method,
      ...(isDevelopment && {
        stack: error.stack,
        details: error
      })
    }
  });
});

// Gestion des promesses non gérées
process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  console.error('Promesse non gérée détectée:', {
    reason,
    promise,
    timestamp: new Date().toISOString()
  });
});

process.on('uncaughtException', (error: Error) => {
  console.error('Exception non gérée:', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });

  // Arrêt propre du serveur en cas d'exception critique
  process.exit(1);
});

// Démarrage du serveur
const server = app.listen(config.port, () => {
  console.log(`🚀 Serveur CoworkSpace (TypeScript) démarré`);
  console.log(`📍 Port: ${config.port}`);
  console.log(`🌍 Environnement: ${config.nodeEnv}`);
  console.log(`📡 API: http://localhost:${config.port}/api`);
  console.log(`🏥 Health: http://localhost:${config.port}/api/health`);
  if (config.nodeEnv === 'development') {
    console.log(`📚 Docs: http://localhost:${config.port}/api/docs`);
    console.log(`📊 Metrics: http://localhost:${config.port}/api/metrics`);
  }
  console.log(`⚡ TypeScript compilé et prêt !`);
});

// Gestion propre de l'arrêt du serveur
const gracefulShutdown = (signal: string) => {
  console.log(`💤 Signal ${signal} reçu, arrêt du serveur CoworkSpace...`);

  server.close((err) => {
    if (err) {
      console.error('Erreur lors de la fermeture du serveur:', err);
      process.exit(1);
    }

    console.log('✅ Serveur fermé proprement');

    // TODO: Fermer les connexions à la base de données
    // await disconnectDatabase();

    process.exit(0);
  });

  // Force l'arrêt après 30 secondes
  setTimeout(() => {
    console.error('⚠️ Arrêt forcé du serveur (timeout)');
    process.exit(1);
  }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;
