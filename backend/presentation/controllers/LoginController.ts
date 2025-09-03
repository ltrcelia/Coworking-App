// src/interfaces/http/controllers/AuthController.ts
import { Request, Response } from "express";
import { AuthenticationService } from "@domain/services/AuthenticationService";

export class LoginController {
    constructor(private readonly authService: AuthenticationService) {}

    async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ success: false, message: "Email et mot de passe requis" });
                return;
            }

            const token = await this.authService.login(email, password);

            if (!token) {
                res.status(401).json({ success: false, message: "Identifiants invalides" });
                return;
            }

            res.cookie("auth_token", token, { httpOnly: true, secure: true });
            res.json({ success: true });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Erreur serveur lors de l'authentification",
                error: process.env.NODE_ENV === "development" ? (error as Error).message : undefined
            });
        }
    }

    async logout(_req: Request, res: Response): Promise<void> {
        this.authService.logout();

        res.clearCookie("auth_token");
        res.json({ success: true, message: "Déconnecté avec succès (token supprimé côté client)" });
    }
}
