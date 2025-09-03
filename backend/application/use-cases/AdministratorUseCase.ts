import {Member, MembershipType} from "../../domain/entities/Member";
import {MemberRepository} from "../../domain/interfaces/MemberRepository";
import {AdministratorService} from "../../domain/services/AdministratorService";

type PayloadUseCase = {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    isManager: boolean;
    membershipType: MembershipType;
}

export class AdministratorUseCase {
    constructor(private readonly memberRepository: MemberRepository) {
    }

    async assignAdminRole(payload: PayloadUseCase): Promise<Member | null> {
        const member = await this.memberRepository.findById(payload.id);
        let administratorService = new AdministratorService();

        if (!member) {
            throw new Error('Could not find member with email: ' + payload.email);
        }

        member.validOrThrow(null);

        if (!await administratorService.assignAdminRole(payload.id)) {
            throw new Error('Invalid credentials');
        }

        return member;
    }

    async updateMembership(payload: PayloadUseCase): Promise<Member | null> {
        const member = await this.memberRepository.findById(payload.id);
        let administratorService = new AdministratorService();

        if (!member) {
            throw new Error('Could not find member with email: ' + payload.email);
        }

        member.validOrThrow(null);

        if (!await administratorService.updateMembership(payload.id, payload.membershipType)) {
            throw new Error('Invalid credentials');
        }

        return member;
    }
}
