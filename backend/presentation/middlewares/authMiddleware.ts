import { Request, Response, NextFunction } from 'express';
import { Member } from '../../domain/entities/Member';

/**
 * Extension de l'interface Request pour inclure le membre
 */
declare global {
  namespace Express {
    interface Request {
      member?: Member;
    }
  }
}

/**
 * Interface pour le service d'authentification
 * TODO: À implémenter dans la couche infrastructure
 */
interface AuthService {
  verifyToken(token: string): { id: string; email: string; isManager: boolean };
}

/**
 * Interface pour le repository des membres
 * TODO: À implémenter dans la couche infrastructure
 */
interface MemberRepository {
  findById(id: string): Promise<Member | null>;
}

// Instances des services - En production, utilisez l'injection de dépendances
let authService: AuthService;
let memberRepository: MemberRepository;

/**
 * Vérifie si le membre est authentifié
 */
export const isAuthenticated = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // TODO: Implémentez la vérification d'authentification
    // 1. Récupérer le token depuis les headers Authorization
    // 2. Vérifier que le token commence par "Bearer "
    // 3. Extraire et vérifier le token JWT
    // 4. Récupérer le membre depuis la base de données
    // 5. Ajouter le membre à req.member
    // 6. Appeler next()

    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({ 
        success: false,
        message: 'Token d\'authentification requis' 
      });
      return;
    }

    const token = authHeader.split(' ')[1];
    
    if (!authService) {
      // Temporaire pour les tests - à supprimer
      console.warn('AuthService non configuré - authentification désactivée en mode développement');
      next();
      return;
    }

    // Vérification du token
    const decoded = authService.verifyToken(token);
    
    // Récupération du membre
    const member = await memberRepository.findById(decoded.id);
    
    if (!member) {
      res.status(401).json({ 
        success: false,
        message: 'Membre non trouvé' 
      });
      return;
    }

    // Ajout du membre à la requête
    req.member = member;
    next();
    
  } catch (error) {
    console.error('Erreur d\'authentification:', error);
    res.status(401).json({ 
      success: false,
      message: 'Token invalide',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    });
  }
};

/**
 * Vérifie si le membre connecté est un gestionnaire
 */
export const isManager = (req: Request, res: Response, next: NextFunction): void => {
  try {
    if (!req.member) {
      res.status(401).json({ 
        success: false,
        message: 'Authentification requise' 
      });
      return;
    }

    if (!req.member.isManagerRole()) {
      res.status(403).json({ 
        success: false,
        message: 'Accès refusé - Droits gestionnaire requis' 
      });
      return;
    }

    next();
  } catch (error) {
    console.error('Erreur lors de la vérification des permissions:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la vérification des permissions',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    });
  }
};

/**
 * Vérifie si le membre peut modifier les données d'un autre membre
 * (soit il s'agit de ses propres données, soit il est gestionnaire)
 */
export const canModifyMember = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const targetMemberId = req.params.id;
    const currentMember = req.member;

    if (!currentMember) {
      res.status(401).json({ 
        success: false,
        message: 'Authentification requise' 
      });
      return;
    }

    if (!currentMember.canModifyMember(targetMemberId)) {
      res.status(403).json({ 
        success: false,
        message: 'Vous ne pouvez modifier que votre propre profil' 
      });
      return;
    }

    next();
  } catch (error) {
    console.error('Erreur lors de la vérification des permissions:', error);
    res.status(500).json({ 
      success: false,
      message: 'Erreur lors de la vérification des permissions',
      error: process.env.NODE_ENV === 'development' ? (error as Error).message : undefined
    });
  }
};

/**
 * Middleware de validation des types d'abonnement
 */
export const validateMembershipType = (req: Request, res: Response, next: NextFunction): void => {
  const validTypes = ['Basic', 'Premium', 'Enterprise'];
  const membershipType = req.body.membershipType;

  if (membershipType && !validTypes.includes(membershipType)) {
    res.status(400).json({
      success: false,
      message: `Type d'abonnement invalide. Types valides: ${validTypes.join(', ')}`
    });
    return;
  }

  next();
};

/**
 * Middleware de validation du genre
 */
export const validateGender = (req: Request, res: Response, next: NextFunction): void => {
  const validGenders = ['male', 'female'];
  const gender = req.body.gender;

  if (gender && !validGenders.includes(gender)) {
    res.status(400).json({
      success: false,
      message: `Genre invalide. Genres valides: ${validGenders.join(', ')}`
    });
    return;
  }

  next();
};

/**
 * Configure les services d'authentification
 */
export const setupAuthMiddleware = (
  authServiceInstance: AuthService,
  memberRepositoryInstance: MemberRepository
): void => {
  authService = authServiceInstance;
  memberRepository = memberRepositoryInstance;
};
