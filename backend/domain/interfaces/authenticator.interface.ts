export interface IAuthenticator {
    authenticate(email: string, password: string): Promise<null | boolean>;
}
