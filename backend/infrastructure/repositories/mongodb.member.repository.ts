import {Member, MemberData, MembershipType} from "@domain/entities/Member";
import {MemberFilters, MemberRepository} from "@domain/interfaces/MemberRepository";
import {MemberMapper} from "@infrastructure/repositories/mappers/member.mapper";
import {PrismaClient} from ".prisma/client";

export class MongoDbMemberRepository implements MemberRepository {
    constructor(private prismaClient: PrismaClient) {}

    async count(): Promise<number> {
        const members = await this.prismaClient.booking.findMany();

        return members.length;
    }

    async delete(id: string): Promise<boolean> {
        const members = await this.prismaClient.member.findMany();
        const index = members.findIndex((b: { id: string; }) => b.id === id);
        if (index === -1) return false;
        members.splice(index, 1);
        return true;
    }

    async emailExists(email: string, excludeId?: string): Promise<boolean> {
        const members = await this.prismaClient.member.findMany();
        return members.some((m: { email: string; id: string | undefined; }) => m.email === email && m.id !== excludeId);
    }

    async findAll(): Promise<Member[]> {
        return this.prismaClient.member.findMany();
    }

    async findByCity(city: string): Promise<Member[]> {
        const members = await this.prismaClient.member.findMany();
        return members.filter((m: { city: string; }) => m.city === city);
    }

    async findByEmail(email: string): Promise<Member | null> {
        const members = await this.prismaClient.member.findMany();
        return members.find((m: { email: string; }) => m.email === email) ?? null;
    }

    async findByFilters(filters: MemberFilters): Promise<Member[]> {
        const members = await this.prismaClient.member.findMany();
        return members.find((m: { firstname: string; lastname: string; }) => {filters}) ?? null;
    }

    async findById(id: string): Promise<Member | null> {
        const members = await this.prismaClient.member.findMany();
        return members.find((m: { id: string; }) => m.id === id) ?? null;
    }

    async findByMembershipType(membershipType: MembershipType): Promise<Member[]> {
        const members = await this.prismaClient.member.findMany();
        return members.filter((m: { membershipType: MembershipType; }) => m.membershipType === membershipType);
    }

    async findByProfession(profession: string): Promise<Member[]> {
        const members = await this.prismaClient.member.findMany();
        return members.filter((m: { profession: string; }) => m.profession === profession);
    }

    async findRandom(excludeId?: string): Promise<Member | null> {
        const members = await this.prismaClient.member.findMany();
        const pool = members.filter((m: { id: string | undefined; }) => m.id !== excludeId);
        if (pool.length === 0) return null;
        return pool[Math.floor(Math.random() * pool.length)];
    }

    async save(memberData: MemberData): Promise<Member> {
        await this.prismaClient.member.create({
            data: MemberMapper.toPersistence(memberData)
        })
        return new Member(memberData);
    }

    async update(id: string, memberData: Partial<MemberData>): Promise<Member | null> {
        const member = await this.findById(id);
        if (!member) return null;

        Object.assign(member, memberData);
        return member;
    }
}
