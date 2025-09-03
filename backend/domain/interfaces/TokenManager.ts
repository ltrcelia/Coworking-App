export interface ITokenManager {
    generateToken(payload: any): string;
    verifyToken(token: string): any;
}
