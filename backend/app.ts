import { MemberRepository } from "@domain/interfaces/MemberRepository";
import { AuthenticationService } from "@domain/services/AuthenticationService";
import { BasicAuthenticator } from "@infrastructure/auth/basic-authenticator";
import { InMemoryMemberRepository } from "@infrastructure/repositories/InMemoryMemberRepository";
import { JwtTokenManager } from "@infrastructure/security/JwtTokenManager";
import { setupAuthMiddleware } from "@presentation/middlewares/authMiddleware";
import adminRoutes from "@presentation/routes/adminRoutes";
import authenticationRoutes from "@presentation/routes/authenticationRoutes";
import bookingRoutes from "@presentation/routes/bookingRoutes";
import eventRoutes from "@presentation/routes/eventRoutes";
import memberRoutes from "@presentation/routes/memberRoutes";
import cors from 'cors';
import express from 'express';

const app = express();

export function createAuthService() {
    const memberRepository: MemberRepository = new InMemoryMemberRepository();
    const authenticator = new BasicAuthenticator(memberRepository);
    const tokenManager = new JwtTokenManager(process.env.JWT_SECRET || "dev-secret");
    const authService = new AuthenticationService(authenticator, tokenManager, memberRepository);
    return { authService, memberRepository };
}

const { authService, memberRepository } = createAuthService();
const authMiddleware = setupAuthMiddleware(authService, memberRepository);


app.use(cors({
    origin: ['http://localhost:5173'],
}))
app.use(express.json());

app.use(authMiddleware)
app.use(adminRoutes)
app.use(authenticationRoutes)
app.use(eventRoutes)
app.use(bookingRoutes)
app.use(memberRoutes)

export default app;