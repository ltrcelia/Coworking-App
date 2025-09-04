import {Member} from "@domain/entities/Member";
import {MemberFilters} from "@domain/interfaces/MemberRepository";

/**
 * Interface pour le service des membres
 */
export interface MemberService {
    getAllMembers(): Promise<Member[]>;
    getMemberById(id: string): Promise<Member | null>;
    getRandomMember(excludeId?: string): Promise<Member | null>;
    createMember(data: any): Promise<Member>;
    updateMember(id: string, data: any): Promise<Member | null>;
    deleteMember(id: string): Promise<boolean>;
    filterMembers(filters: MemberFilters): Promise<Member[]>;
    getCommunityStats(): Promise<any>;
}
