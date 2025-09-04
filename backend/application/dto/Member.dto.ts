/**
 * DTO pour la création d'un membre
 */

export class CreateMemberDTO {
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
export class UpdateMemberDTO {
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
