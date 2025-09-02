import { Member, MemberData, MembershipType } from '../entities/Member';

/**
 * Filters pour la recherche de membres
 */
export interface MemberFilters {
  name?: string;
  profession?: string;
  membershipType?: MembershipType;
  city?: string;
  skills?: string[];
}

/**
 * Interface MemberRepository - Couche Domaine
 * Définit le contrat pour l'accès aux données des membres du coworking
 */
export interface MemberRepository {
  /**
   * Récupère tous les membres
   */
  findAll(): Promise<Member[]>;

  /**
   * Récupère un membre par son ID
   * @param id - ID du membre
   * @returns Membre trouvé ou null
   */
  findById(id: string): Promise<Member | null>;

  /**
   * Récupère un membre par son email
   * @param email - Email du membre
   * @returns Membre trouvé ou null
   */
  findByEmail(email: string): Promise<Member | null>;

  /**
   * Sauvegarde un nouveau membre
   * @param memberData - Données du membre à créer
   * @returns Membre créé
   */
  save(memberData: MemberData): Promise<Member>;

  /**
   * Met à jour un membre existant
   * @param id - ID du membre
   * @param memberData - Nouvelles données du membre
   * @returns Membre mis à jour ou null si non trouvé
   */
  update(id: string, memberData: Partial<MemberData>): Promise<Member | null>;

  /**
   * Supprime un membre
   * @param id - ID du membre à supprimer
   * @returns True si suppression réussie
   */
  delete(id: string): Promise<boolean>;

  /**
   * Récupère un membre aléatoire pour le networking
   * @param excludeId - ID du membre à exclure (optionnel)
   * @returns Membre aléatoire
   */
  findRandom(excludeId?: string): Promise<Member | null>;

  /**
   * Filtre les membres selon des critères
   * @param filters - Critères de filtrage
   * @returns Liste des membres filtrés
   */
  findByFilters(filters: MemberFilters): Promise<Member[]>;

  /**
   * Récupère les membres par profession
   * @param profession - Profession recherchée
   * @returns Liste des membres
   */
  findByProfession(profession: string): Promise<Member[]>;

  /**
   * Récupère les membres par type d'abonnement
   * @param membershipType - Type d'abonnement
   * @returns Liste des membres
   */
  findByMembershipType(membershipType: MembershipType): Promise<Member[]>;

  /**
   * Récupère les membres par ville
   * @param city - Ville recherchée
   * @returns Liste des membres
   */
  findByCity(city: string): Promise<Member[]>;

  /**
   * Compte le nombre total de membres
   * @returns Nombre de membres
   */
  count(): Promise<number>;

  /**
   * Vérifie si un email existe déjà
   * @param email - Email à vérifier
   * @param excludeId - ID à exclure de la vérification (pour les mises à jour)
   * @returns True si l'email existe
   */
  emailExists(email: string, excludeId?: string): Promise<boolean>;
}
