export interface IAuthenticator {
    authenticate(username: string, password: string): Promise<null | boolean>;
}
