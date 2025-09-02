import {IAuthenticator} from "@domain/interfaces/authenticator.interface";
import {MemberRepository} from "@domain/interfaces/MemberRepository";

export class BasicAuthenticator implements IAuthenticator {
    constructor(private memberRepository: MemberRepository) {}

    async authenticate(username: string, password: string): Promise<null | boolean> {
        const decodedPassword = Buffer.from(password, 'base64').toString('utf-8');
        const user = await this.memberRepository.findByEmail(username);
        return user && user.password === decodedPassword;
    }
}
