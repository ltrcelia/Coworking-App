import jwt from 'jsonwebtoken';
import {AuthPayload, ITokenManager} from "@domain/interfaces/TokenManager";

export class JwtTokenManager implements ITokenManager {
    private readonly secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    generateToken(payload: AuthPayload): string {
        return jwt.sign(payload, this.secret);
    }

    verifyToken(token: string): AuthPayload {
          return jwt.verify(token, this.secret) as AuthPayload;
    }
}
