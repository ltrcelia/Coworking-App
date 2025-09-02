import {Member} from "@domain/entities/Member";
import {MemberRepository} from "@domain/interfaces/MemberRepository";
import {BasicAuthenticator} from "../../infrastructure/auth/basic-authenticator";

type PayloadUseCase = {
    password: string,
    email: string
}

export class AuthenticateUseCase {
    constructor(private memberRepository: MemberRepository) {
    }

    async execute(payload: {
        password: any,
        email: any,
    }): Promise<Member | null> {
        const member = await this.memberRepository.findByEmail(payload.email);
        let authenticator = new BasicAuthenticator(this.memberRepository);

        if (!member) {
            throw new Error('Could not find member with email: ' + payload.email);
        }

        member.validOrThrow();

        if (!await authenticator.authenticate(payload.email, payload.password)) {
            throw new Error('Invalid credentials');
        }
        return member;
    }
}
