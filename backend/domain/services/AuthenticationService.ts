import {IAuthenticator} from "@domain/interfaces/authenticator.interface";
import {MemberRepository} from "@domain/interfaces/MemberRepository";
import {AuthPayload} from "@domain/interfaces/TokenManager";
import {JwtTokenManager} from "@infrastructure/security/JwtTokenManager";

export class AuthenticationService {
    constructor(
        private readonly authenticator: IAuthenticator,
        private readonly tokenManager: JwtTokenManager,
        private readonly memberRepository: MemberRepository
    ) {
    }

    async login(email: string, password: string): Promise<string> {
        const authenticated = await this.authenticator.authenticate(email, password);

        if (!authenticated) {
            throw new Error("Invalid credentials");
        }

        const member = await this.memberRepository.findByEmail(email);
        if (!member) throw new Error("Member not found");

        return this.tokenManager.generateToken({
            id: member.id,
            email: member.email,
            isManager: member.isManager
        });
    }

    logout(): void {}

    verifyToken(token: string): AuthPayload {
        return this.tokenManager.verifyToken(token);
    };

}
