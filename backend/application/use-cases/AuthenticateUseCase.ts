import {Gender, Member, MembershipType} from "../../domain/entities/Member";
import {InMemoryMemberRepository} from "../../infrastructure/repositories/InMemoryMemberRepository";
import {BasicAuthenticator} from "../../infrastructure/auth/basic-authenticator";

type PayloadUseCase = {
    password: string,
    email: string,
    gender: Gender;
    firstname: string;
    lastname: string;
}

export class AuthenticateUseCase {
    constructor(private memberRepository: InMemoryMemberRepository) {
    }

    async authenticateMember(payload: PayloadUseCase): Promise<Member | null> {
        const member = await this.memberRepository.findByEmail(payload.email);
        let authenticator = new BasicAuthenticator(this.memberRepository);

        if (!member) {
            throw new Error('Could not find member with email: ' + payload.email);
        }

        member.validOrThrow("authentication");

        if (!await authenticator.authenticate(payload.email, payload.password)) {
            throw new Error('Invalid credentials');
        }
        return member;
    }

    async createMemberAccount(payload: {
        gender: Gender;
        firstname: string,
        lastname: string,
        password: string,
        email: string,
        bio: string,
        birthdate: string,
        city: string,
        company: string,
        country: string,
        isManager: boolean,
        joinDate: string,
        membershipType: MembershipType,
        phone: string,
        photo: string,
        profession: string,
        skills: string[],
        id: string
    }) {
        const newMember = new Member({
            gender: payload.gender,
            firstname: payload.firstname,
            bio: payload.bio,
            birthdate: payload.birthdate,
            city: payload.city,
            company: payload.company,
            country: payload.country,
            email: payload.email,
            id: payload.id,
            isManager: payload.isManager,
            joinDate: payload.joinDate,
            lastname: payload.lastname,
            membershipType: payload.membershipType,
            password: payload.password,
            phone: payload.phone,
            photo: payload.photo,
            profession: payload.profession,
            skills: payload.skills
        })

        newMember.validOrThrow("creation");
        const members = await this.memberRepository.findAll();

        if (newMember.hasConflictWith(members)) {
            throw new Error('A member with the same email already exists');
        }

        await this.memberRepository.save(newMember);
        return newMember.id;
    }
}
