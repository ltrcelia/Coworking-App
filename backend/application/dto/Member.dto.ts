/**
 * DTO pour la création d'un membre
 */

export class CreateMemberDTO {
    gender: string | undefined;
    firstname: string | undefined;
    lastname: string | undefined;
    email: string | undefined;
    password: string | undefined;
    phone: string | undefined;
    birthdate: string | undefined;
    city: string | undefined;
    country: string | undefined;
    photo?: string | undefined;
    profession: string | undefined;
    company: string | undefined;
    skills: string[] | undefined;
    membershipType: string | undefined;
    bio: string | undefined;
    linkedinUrl?: string | undefined;
    isManager?: string | undefined;
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