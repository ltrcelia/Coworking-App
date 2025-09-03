export interface AuthPayload {
    id: string;
    email: string;
    isManager: boolean;
}

export interface ITokenManager {
    generateToken(payload: AuthPayload): string;
    verifyToken(token: string): AuthPayload;
}
