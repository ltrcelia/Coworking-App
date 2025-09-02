import { Request, Response } from 'express';
import { Member } from '../../domain/entities/Member';
import { MemberFilters } from '../../domain/interfaces/MemberRepository';

/**
 * Interface pour le service des membres
 * TODO: À implémenter dans la couche application
 */
interface MemberService {
  getAllMembers(): Promise<Member[]>;
  getMemberById(id: string): Promise<Member | null>;
  getRandomMember(excludeId?: string): Promise<Member | null>;
  createMember(data: any): Promise<Member>;
  updateMember(id: string, data: any): Promise<Member | null>;
  deleteMember(id: string): Promise<boolean>;
  filterMembers(filters: MemberFilters): Promise<Member[]>;
  getCommunityStats(): Promise<any>;
}

/**
 * DTO pour la création d'un membre
 */
export interface CreateMemberDTO {
  gender: 'male' | 'female';
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  birthdate: string;
  city: string;
  country: string;
  photo?: string;
  profession: string;
  company: string;
  skills: string[];
  membershipType: 'Basic' | 'Premium' | 'Enterprise';
  bio: string;
  linkedinUrl?: string;
  isManager?: boolean;
}

/**
 * DTO pour la mise à jour d'un membre
 */
export interface UpdateMemberDTO {
  gender?: 'male' | 'female';
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
  phone?: string;
  birthdate?: string;
  city?: string;
  country?: string;
  photo?: string;
  profession?: string;
  company?: string;
  skills?: string[];
  membershipType?: 'Basic' | 'Premium' | 'Enterprise';
  bio?: string;
  linkedinUrl?: string;
  isManager?: boolean;
}

/**
 * MemberController - Couche Présentation
 * Gère les requêtes HTTP relatives aux membres du coworking
 */
export class MemberController {
  constructor(private memberService: MemberService) {}

  /**
   * Récupère tous les membres de la communauté
   */
  async getAllMembers(req: Request, res: Response): Promise<void> {
    try {
      // TODO: Implémentez cette méthode
      // 1. Appeler le service pour récupérer tous les membres
      // 2. Retourner la liste au format JSON
      
      const members = await this.memberService.getAllMembers();
      res.status(200).json({
        success: true,
        data: members.map(member => member.toJSON()),
        count: members.length
      });
      
    } catch (error) {
      console.error('Erreur lors de la récupération des membres:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur serveur lors de la récupération des membres'
      });
    }
  }

  /**
   * Récupère un membre aléatoire pour le networking
   */
  async getRandomMember(req: Request, res: Response): Promise<void> {
    try {
      // TODO: Implémentez cette méthode
      // 1. Appeler le service pour récupérer un membre aléatoire
      // 2. S'assurer qu'on ne retourne pas le membre connecté
      // 3. Retourner le membre au format JSON

      const currentMemberId = req.member?.id;
      const randomMember = await this.memberService.getRandomMember(currentMemberId);

      if (!randomMember) {
        res.status(404).json({
          success: false,
          message: 'Aucun membre trouvé pour le networking'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: randomMember.toJSON()
      });

    } catch (error) {
      console.error('Erreur lors de la récupération du membre aléatoire:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur serveur'
      });
    }
  }

  /**
   * Récupère un membre par son ID
   */
  async getMemberById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          message: 'ID du membre requis'
        });
        return;
      }

      const member = await this.memberService.getMemberById(id);

      if (!member) {
        res.status(404).json({
          success: false,
          message: 'Membre non trouvé'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: member.toJSON()
      });

    } catch (error) {
      console.error('Erreur lors de la récupération du membre:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur serveur'
      });
    }
  }

  /**
   * Crée un nouveau membre (gestionnaire uniquement)
   */
  async createMember(req: Request, res: Response): Promise<void> {
    try {
      // TODO: Implémentez cette méthode
      // 1. Valider les données reçues
      // 2. Vérifier que l'email n'existe pas déjà
      // 3. Hacher le mot de passe
      // 4. Appeler le service pour créer le membre
      // 5. Retourner le membre créé (sans le mot de passe)

      const memberData: CreateMemberDTO = req.body;

      // Validation basique
      if (!memberData.email || !memberData.password || !memberData.firstname || !memberData.lastname) {
        res.status(400).json({
          success: false,
          message: 'Champs obligatoires manquants'
        });
        return;
      }

      const newMember = await this.memberService.createMember(memberData);

      res.status(201).json({
        success: true,
        data: newMember.toJSON(),
        message: 'Membre créé avec succès'
      });

    } catch (error) {
      console.error('Erreur lors de la création du membre:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la création du membre'
      });
    }
  }

  /**
   * Met à jour un membre existant
   */
  async updateMember(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateMemberDTO = req.body;
      const currentMember = req.member;

      if (!currentMember) {
        res.status(401).json({
          success: false,
          message: 'Authentification requise'
        });
        return;
      }

      // Vérifier les permissions
      if (!currentMember.canModifyMember(id)) {
        res.status(403).json({
          success: false,
          message: 'Vous ne pouvez modifier que votre propre profil'
        });
        return;
      }

      const updatedMember = await this.memberService.updateMember(id, updateData);

      if (!updatedMember) {
        res.status(404).json({
          success: false,
          message: 'Membre non trouvé'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: updatedMember.toJSON(),
        message: 'Membre mis à jour avec succès'
      });

    } catch (error) {
      console.error('Erreur lors de la mise à jour du membre:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour'
      });
    }
  }

  /**
   * Supprime un membre (gestionnaire uniquement)
   */
  async deleteMember(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const currentMember = req.member;

      if (!currentMember) {
        res.status(401).json({
          success: false,
          message: 'Authentification requise'
        });
        return;
      }

      // Empêcher la suppression de son propre compte
      if (currentMember.id === id) {
        res.status(400).json({
          success: false,
          message: 'Vous ne pouvez pas supprimer votre propre compte'
        });
        return;
      }

      const deleted = await this.memberService.deleteMember(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Membre non trouvé'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Membre supprimé avec succès'
      });

    } catch (error) {
      console.error('Erreur lors de la suppression du membre:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression'
      });
    }
  }

  /**
   * Filtre les membres selon des critères
   */
  async filterMembers(req: Request, res: Response): Promise<void> {
    try {
      const filters: MemberFilters = {
        name: req.query.name as string,
        profession: req.query.profession as string,
        membershipType: req.query.membershipType as any,
        city: req.query.city as string
      };

      // Nettoyer les filtres vides
      Object.keys(filters).forEach(key => {
        if (!filters[key as keyof MemberFilters]) {
          delete filters[key as keyof MemberFilters];
        }
      });

      const members = await this.memberService.filterMembers(filters);

      res.status(200).json({
        success: true,
        data: members.map(member => member.toJSON()),
        count: members.length,
        filters
      });

    } catch (error) {
      console.error('Erreur lors du filtrage des membres:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors du filtrage'
      });
    }
  }

  /**
   * Récupère les statistiques de la communauté
   */
  async getCommunityStats(req: Request, res: Response): Promise<void> {
    try {
      // TODO: Implémentez cette méthode (bonus)
      // 1. Calculer le nombre total de membres
      // 2. Répartition par type d'abonnement
      // 3. Top des professions
      // 4. Nouveaux membres du mois

      const stats = await this.memberService.getCommunityStats();

      res.status(200).json({
        success: true,
        data: stats
      });

    } catch (error) {
      console.error('Erreur lors de la récupération des statistiques:', error);
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des statistiques'
      });
    }
  }
}
