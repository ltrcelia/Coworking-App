import {Member, MemberData, MembershipType} from "../../domain/entities/Member";
import {MemberRepository, MemberFilters} from "@domain/interfaces/MemberRepository";

export class InMemoryMemberRepository implements MemberRepository {
    private members: Member[] = [];

    async findAll(): Promise<Member[]> {
        return this.members;
    }

    async findById(id: string): Promise<Member | null> {
        return this.members.find(m => m.id === id) ?? null;
    }

    async findByEmail(email: string): Promise<Member | null> {
        return this.members.find(m => m.email === email) ?? null;
    }

    async save(memberData: MemberData): Promise<Member> {
        const member = new Member(memberData);
        this.members.push(member);
        return member;
    }

    async update(id: string, memberData: Partial<MemberData>): Promise<Member | null> {
        const member = await this.findById(id);
        if (!member) return null;

        Object.assign(member, memberData);
        return member;
    }

    async delete(id: string): Promise<boolean> {
        const index = this.members.findIndex(m => m.id === id);
        if (index === -1) return false;
        this.members.splice(index, 1);
        return true;
    }

    async findRandom(excludeId?: string): Promise<Member | null> {
        const pool = this.members.filter(m => m.id !== excludeId);
        if (pool.length === 0) return null;
        return pool[Math.floor(Math.random() * pool.length)];
    }

    async findByFilters(filters: MemberFilters): Promise<Member[]> {
        return this.members.filter(m => {
            return (
                (!filters.name || m.firstname.includes(filters.name) || m.lastname.includes(filters.name)) &&
                (!filters.profession || m.profession === filters.profession) &&
                (!filters.membershipType || m.membershipType === filters.membershipType) &&
                (!filters.city || m.city === filters.city) &&
                (!filters.skills || filters.skills.every(skill => m.skills.includes(skill)))
            );
        });
    }

    async findByProfession(profession: string): Promise<Member[]> {
        return this.members.filter(m => m.profession === profession);
    }

    async findByMembershipType(membershipType: MembershipType): Promise<Member[]> {
        return this.members.filter(m => m.membershipType === membershipType);
    }

    async findByCity(city: string): Promise<Member[]> {
        return this.members.filter(m => m.city === city);
    }

    async count(): Promise<number> {
        return this.members.length;
    }

    async emailExists(email: string, excludeId?: string): Promise<boolean> {
        return this.members.some(m => m.email === email && m.id !== excludeId);
    }
}
