import express from 'express';
import { MemberController } from '../controllers/MemberController';
import { isAuthenticated, isManager } from '../middlewares/authMiddleware';

const router = express.Router();

/**
 * Routes pour la gestion des membres du coworking
 * @param memberController - Contrôleur des membres
 */
export default (memberController: MemberController) => {
  /**
   * @route GET /api/members
   * @desc Récupère tous les membres de la communauté
   * @access Privé (membres authentifiés)
   */
  router.get('/', isAuthenticated, (req, res) => {
    memberController.getAllMembers(req, res);
  });

  /**
   * @route GET /api/members/random
   * @desc Récupère un membre aléatoire pour le networking
   * @access Privé (membres authentifiés)
   */
  router.get('/random', isAuthenticated, (req, res) => {
    memberController.getRandomMember(req, res);
  });

  /**
   * @route GET /api/members/stats
   * @desc Récupère les statistiques de la communauté
   * @access Privé (membres authentifiés)
   */
  router.get('/stats', isAuthenticated, (req, res) => {
    memberController.getCommunityStats(req, res);
  });

  /**
   * @route GET /api/members/filter
   * @desc Filtre les membres selon des critères
   * @query {string} name - Nom à rechercher (optionnel)
   * @query {string} profession - Profession à filtrer (optionnel)
   * @query {string} membershipType - Type d'abonnement (optionnel)
   * @query {string} city - Ville à filtrer (optionnel)
   * @access Privé (membres authentifiés)
   */
  router.get('/filter', isAuthenticated, (req, res) => {
    memberController.filterMembers(req, res);
  });

  /**
   * @route POST /api/members
   * @desc Crée un nouveau membre
   * @access Privé (gestionnaires uniquement)
   */
  router.post('/', isAuthenticated, isManager, (req, res) => {
    memberController.createMember(req, res);
  });

  /**
   * @route GET /api/members/:id
   * @desc Récupère un membre par son ID
   * @access Privé (membres authentifiés)
   */
  router.get('/:id', isAuthenticated, (req, res) => {
    memberController.getMemberById(req, res);
  });

  /**
   * @route PUT /api/members/:id
   * @desc Met à jour un membre existant
   * @access Privé (membre lui-même ou gestionnaire)
   */
  router.put('/:id', isAuthenticated, (req, res) => {
    memberController.updateMember(req, res);
  });

  /**
   * @route DELETE /api/members/:id
   * @desc Supprime un membre
   * @access Privé (gestionnaires uniquement)
   */
  router.delete('/:id', isAuthenticated, isManager, (req, res) => {
    memberController.deleteMember(req, res);
  });

  return router;
};
