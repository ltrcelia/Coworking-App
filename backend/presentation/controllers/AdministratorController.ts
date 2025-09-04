import { Request, Response } from "express";
import { AdministratorService } from "../../domain/services/AdministratorService";
import { MembershipType } from "../../domain/entities/Member";

export class AdministratorController {
    constructor(private readonly adminService: AdministratorService) { }

    /**
     * Assigner un membre en tant qu'administrateur
     */
    assignAdminRole = async (req: Request, res: Response) => {
        try {
            const { memberId } = req.params;
            const result = await this.adminService.assignAdminRole(memberId);
            res.json({ success: result });
        } catch (error) {
            res.status(400).json({ success: false, message: (error as Error).message });
        }
    };

    /**
     * Mettre à jour les adhésions
     */
    updateMembership = async (req: Request, res: Response) => {
        try {
            const { memberId } = req.params;
            const { membershipType } = req.body as { membershipType: MembershipType };
            const result = await this.adminService.updateMembership(memberId, membershipType);
            res.json({ success: result });
        } catch (error) {
            res.status(400).json({ success: false, message: (error as Error).message });
        }
    };
}
