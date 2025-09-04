import { Router } from "express";
import { AuthenticationController } from "../controllers/AuthenticationController";
import { createAuthService } from "../../app";

const router = Router();

const { authService } = createAuthService();
const authController = new AuthenticationController(authService);

router.post("/login", (req, res) => authController.login(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));

export default router;
