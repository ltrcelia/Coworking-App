import { MemberRepository } from "@domain/interfaces/MemberRepository";
import { Member, MembershipType, MemberData } from "@domain/entities/Member";

// TODO merge with InMemoryMemberRepository
export class MemberRepositoryImpl implements MemberRepository {
    private members: Member[] = [
        new Member({
            id: "1",
            gender: "male",
            firstname: "Martin",
            lastname: "Dupont",
            email: "user@example.com",
            password: "password",
            phone: "123456789",
            birthdate: "1990-01-01",
            city: "Paris",
            country: "France",
            photo: "",
            profession: "Developer",
            company: "ACME",
            skills: ["JS", "React"],
            membershipType: "Basic",
            joinDate: "2022-01-01",
            bio: "Developer",
            isManager: false
        }),
    ];

    async findByEmail(email: string): Promise<Member | null> {
        return this.members.find(m => m.email === email) ?? null;
    }

    async findAll(): Promise<Member[]> { return this.members; }
    async findById(id: string): Promise<Member | null> { return this.members.find(m => m.id === id) ?? null; }
    async save(memberData: MemberData): Promise<Member> { throw new Error("Not implemented"); }
    async update(id: string, memberData: Partial<MemberData>): Promise<Member | null> { throw new Error("Not implemented"); }
    async delete(id: string): Promise<boolean> { throw new Error("Not implemented"); }
    async findRandom(excludeId?: string): Promise<Member | null> { throw new Error("Not implemented"); }
    async findByFilters(filters: any): Promise<Member[]> { throw new Error("Not implemented"); }
    async findByProfession(profession: string): Promise<Member[]> { throw new Error("Not implemented"); }
    async findByMembershipType(membershipType: MembershipType): Promise<Member[]> { throw new Error("Not implemented"); }
    async findByCity(city: string): Promise<Member[]> { throw new Error("Not implemented"); }
    async count(): Promise<number> { return this.members.length; }
    async emailExists(email: string, excludeId?: string): Promise<boolean> { return this.members.some(m => m.email === email && m.id !== excludeId); }
}
