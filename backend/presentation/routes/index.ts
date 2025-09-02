import express from 'express';
import memberRoutesFactory from './memberRoutes';
// import authRoutesFactory from './authRoutes';
// import { MemberController } from '../controllers/MemberController';
// import { AuthController } from '../controllers/AuthController';

/**
 * Interface pour les statistiques de santé de l'API
 */
interface HealthStats {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  service: string;
  version: string;
  uptime: number;
  environment: string;
}

/**
 * Interface pour les informations de base de l'API
 */
interface ApiInfo {
  message: string;
  version: string;
  endpoints: {
    auth: string;
    members: string;
    health: string;
  };
  documentation?: string;
}

/**
 * Configuration centralisée des routes avec TypeScript
 */
export const setupRoutes = (app: express.Application): void => {
  // TODO: Configuration des services et contrôleurs avec injection de dépendances
  // Dans un projet réel, utilisez un conteneur d'injection de dépendances comme InversifyJS

  // Services (à implémenter)
  // const memberRepository: MemberRepository = new MongoMemberRepository();
  // const memberService: MemberService = new MemberService(memberRepository);
  // const authService: AuthService = new AuthService(memberRepository);

  // Configuration du middleware d'authentification
  // setupAuthMiddleware(authService, memberRepository);

  // Contrôleurs (à implémenter)
  // const memberController = new MemberController(memberService);
  // const authController = new AuthController(authService);

  // Routes principales
  // app.use('/api/auth', authRoutesFactory(authController));
  // app.use('/api/members', memberRoutesFactory(memberController));

  // Route de base pour vérifier que l'API fonctionne
  app.get('/api', (req: express.Request, res: express.Response) => {
    const apiInfo: ApiInfo = {
      message: 'API CoworkSpace - Bienvenue dans notre communauté !',
      version: '1.0.0',
      endpoints: {
        auth: '/api/auth',
        members: '/api/members',
        health: '/api/health'
      },
      documentation: process.env.NODE_ENV === 'development' ? '/api/docs' : undefined
    };

    res.json({
      success: true,
      data: apiInfo
    });
  });

  // Route de santé pour le monitoring
  app.get('/api/health', (req: express.Request, res: express.Response) => {
    const healthStats: HealthStats = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'CoworkSpace API',
      version: '1.0.0',
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development'
    };

    res.json({
      success: true,
      data: healthStats
    });
  });

  // Route pour les métriques (optionnel)
  app.get('/api/metrics', (req: express.Request, res: express.Response) => {
    const metrics = {
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      platform: process.platform,
      nodeVersion: process.version,
      pid: process.pid
    };

    res.json({
      success: true,
      data: metrics
    });
  });

  // Documentation API (en développement uniquement)
  if (process.env.NODE_ENV === 'development') {
    app.get('/api/docs', (req: express.Request, res: express.Response) => {
      res.json({
        success: true,
        data: {
          title: 'CoworkSpace API Documentation',
          version: '1.0.0',
          description: 'API REST pour la gestion d\'un espace de coworking',
          baseUrl: `${req.protocol}://${req.get('host')}/api`,
          endpoints: {
            authentication: {
              login: 'POST /auth/login',
              currentUser: 'GET /auth/me'
            },
            members: {
              list: 'GET /members',
              random: 'GET /members/random',
              filter: 'GET /members/filter',
              stats: 'GET /members/stats',
              getById: 'GET /members/:id',
              create: 'POST /members (admin)',
              update: 'PUT /members/:id',
              delete: 'DELETE /members/:id (admin)'
            },
            utility: {
              health: 'GET /health',
              metrics: 'GET /metrics',
              docs: 'GET /docs'
            }
          }
        }
      });
    });
  }
};
