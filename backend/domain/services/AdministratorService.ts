import {MembershipType} from "@domain/entities/Member";
import {InMemoryMemberRepository} from "@infrastructure/repositories/memory.member.repository";

export class AdministratorService {

    async assignAdminRole(memberId: string): Promise<null | boolean> {
        let membersRepository = new InMemoryMemberRepository();
        let member = await membersRepository.findById(memberId);

        if (!member) throw new Error("Member not found");
        await membersRepository.update(member.id, {isManager: true});

        return true;
    }

    async updateMembership(memberId: string, membershipType: MembershipType): Promise<null | boolean> {
        let membersRepository = new InMemoryMemberRepository();
        let member = await membersRepository.findById(memberId);

        if (!member) throw new Error("Member not found");
        await membersRepository.update(member.id, {membershipType: membershipType});

        return true;
    }
}
