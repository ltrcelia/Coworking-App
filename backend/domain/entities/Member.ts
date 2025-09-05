/**
 * Entité Member - Couche Domaine
 * Représente un membre du coworking dans le système
 */

export type Gender = 'male' | 'female';
export type MembershipType = 'Basic' | 'Premium' | 'Enterprise';

export interface MemberData {
    id: string;
    gender: Gender;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    phone: string;
    birthdate: string;
    city: string;
    country: string;
    photo: string;
    profession: string;
    company: string;
    skills: string[];
    membershipType: MembershipType;
    joinDate: string;
    bio: string;
    linkedinUrl?: string;
    isManager: boolean;
    friendsList?: string[];
}

const REQUIRED_FIELDS: (keyof MemberData)[] = [
    "id",
    "gender",
    "firstname",
    "lastname",
    "email",
    "password",
    "phone",
    "birthdate",
    "city",
    "country",
    "profession",
    "company",
    "membershipType",
    "friendsList"
];

export class Member {
    public readonly id: string;
    public readonly gender: Gender;
    public readonly firstname: string;
    public readonly lastname: string;
    public readonly email: string;
    public readonly password: string;
    public readonly phone: string;
    public readonly birthdate: string;
    public readonly city: string;
    public readonly country: string;
    public readonly photo: string;
    public readonly profession: string;
    public readonly company: string;
    public readonly skills: string[];
    public readonly membershipType: MembershipType;
    public readonly joinDate: string;
    public readonly bio: string;
    public readonly linkedinUrl?: string;
    public readonly isManager: boolean;
    public readonly friendsList?: string[];

    constructor(data: MemberData) {
        this.id = data.id;
        this.gender = data.gender;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.email = data.email;
        this.password = data.password;
        this.phone = data.phone;
        this.birthdate = data.birthdate;
        this.city = data.city;
        this.country = data.country;
        this.photo = data.photo;
        this.profession = data.profession;
        this.company = data.company;
        this.skills = [...data.skills]; // Copie défensive
        this.membershipType = data.membershipType;
        this.joinDate = data.joinDate;
        this.bio = data.bio;
        this.linkedinUrl = data.linkedinUrl;
        this.isManager = data.isManager;
        this.friendsList = data.friendsList;
    }

    /**
     * Retourne le nom complet du membre
     */
    getFullName(): string {
        return `${this.firstname} ${this.lastname}`;
    }

    /**
     * Retourne true si le membre est gestionnaire
     */
    isManagerRole(): boolean {
        return this.isManager;
    }

    /**
     * Retourne les compétences sous forme de chaîne
     */
    getSkillsList(): string {
        return this.skills.join(', ');
    }

    /**
     * Calcule l'ancienneté du membre en jours
     */
    getMembershipDuration(): number {
        if (!this.joinDate) return 0;
        const joinDate = new Date(this.joinDate);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - joinDate.getTime());
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    /**
     * Retourne les données publiques du membre (sans mot de passe)
     */
    getPublicData(): Omit<MemberData, 'password'> {
        const {password, ...publicData} = this;
        return publicData;
    }

    /**
     * Vérifie si le membre peut modifier un autre membre
     */
    canModifyMember(targetMemberId: string): boolean {
        return this.id === targetMemberId || this.isManager;
    }

    /**
     * Retourne une représentation JSON sécurisée (sans mot de passe)
     */
    toJSON(): Omit<MemberData, 'password'> {
        return this.getPublicData();
    }

    validOrThrow(type: string|null = null): void {
        if (type == "authentication") {
            if (this.hasEmptyAuthFields()) {
                throw new Error('Missing required fields');
            }
        } else if (type == "creation") {
            if (this.hasEmptyUserFields()) {
                throw new Error('Please fill all required fields');
            }
        }
    }

    hasEmptyAuthFields() {
        return !this.email.length && !this.password.length;
    }

    hasEmptyUserFields() {
        for (const field of REQUIRED_FIELDS) {
            const value = this[field];

            if (typeof value === "string" && value.trim().length === 0) {
                throw new Error(`Field "${field}" cannot be empty`);
            }

            if (Array.isArray(value) && value.length === 0) {
                throw new Error(`Field "${field}" cannot be empty`);
            }

            if (typeof value === "boolean") continue;

            if (value === null || value === undefined) {
                throw new Error(`Field "${field}" is required`);
            }
        }
        return true;
    }

    hasConflictWith(members: Member[]) {
        return members.some(member => member.email === this.email);
    }

    getFriendsList() {
        return this.friendsList;
    }
}
