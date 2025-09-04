import { IAuthenticator } from "@domain/interfaces/authenticator.interface";

export class InfosAuthenticator implements IAuthenticator {
    async authenticate(email: string, password: string): Promise<boolean> {
        if (email === "user@exemple.fr" && password === "password") {
            return true;
        }
        return false;
    }
}