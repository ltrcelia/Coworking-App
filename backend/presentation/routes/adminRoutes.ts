import { Router } from "express";
import { AdministratorService } from "../../domain/services/AdministratorService";
import { AdministratorController } from "../controllers/AdministratorController";

const router = Router();
const adminService = new AdministratorService();
const adminController = new AdministratorController(adminService);

router.post("/members/:memberId/assign-admin", adminController.assignAdminRole);
router.put("/members/:memberId/membership", adminController.updateMembership);

export default router;
