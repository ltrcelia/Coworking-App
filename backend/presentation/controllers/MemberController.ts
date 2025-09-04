import bcrypt from "bcrypt";
import {Request, Response} from 'express';
import {MemberService} from "../../domain/services/MemberService";
import {MemberFilters} from '../../domain/interfaces/MemberRepository';
import {CreateMemberDTO, UpdateMemberDTO} from "../../application/dto/Member.dto";


/**
 * MemberController - Couche Présentation
 * Gère les requêtes HTTP relatives aux membres du coworking
 */
export class MemberController {
  constructor(private memberService: MemberService) {}

  private toSafeMember(obj: unknown) {
    const json = (obj && typeof obj === 'object' && typeof (obj as any).toJSON === 'function')
        ? (obj as any).toJSON()
        : obj;

    if (json && typeof json === 'object') {
      const { password: _ignored, ...rest } = json as Record<string, unknown>;
      return rest;
    }
    return json;
  }


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
        data: members.map(member => this.toSafeMember(member)),
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
        data: this.toSafeMember(member)
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

      memberData.password = await bcrypt.hash(memberData.password, 10);

      const newMember = await this.memberService.createMember(memberData);

      res.status(201).json({
        success: true,
        data: this.toSafeMember(newMember),
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

      // Hachage du mot de passe si fourni dans la mise à jour
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
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
        data: this.toSafeMember(updatedMember),
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
      const rawFilters: MemberFilters = {
        name: req.query.name as string,
        profession: req.query.profession as string,
        membershipType: req.query.membershipType as any,
        city: req.query.city as string
      };

      // Nettoyer les filtres vides sans muter l'objet typé strictement
      const filters = Object.fromEntries(
          Object.entries(rawFilters).filter(([, v]) => v != null && v !== '')
      ) as MemberFilters;

      const members = await this.memberService.filterMembers(filters);

      res.status(200).json({
        success: true,
        data: members.map(member => this.toSafeMember(member)),
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
