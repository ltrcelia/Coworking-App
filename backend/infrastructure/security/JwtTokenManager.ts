import jwt, { JwtPayload } from 'jsonwebtoken';
import { ITokenManager } from "@domain/interfaces/TokenManager";

export class JwtTokenManager implements ITokenManager {
    private readonly secret: string;

    constructor(secret: string) {
        this.secret = secret;
    }

    generateToken(payload: any): string {
        return jwt.sign(payload, this.secret);
    }

    verifyToken(token: string): JwtPayload | string {
          return jwt.verify(token, this.secret);
    }
}
