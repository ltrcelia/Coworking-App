import { Room } from "../entities/Room";
import { Member } from "../entities/Member";

export class PrivateRoom extends Room {
    private rooms: PrivateRoom[] = [];
    private assignedMember?: Member;

    book(memberId: string, date: string): string {
        if (this.status !== "available") {
            return `Le bureau privé "${this.name}" n’est pas disponible.`;
        }
        this.status = "occupied";
        return `Bureau privé "${this.name}" réservé avec succès par ${memberId} pour le ${date}.`;
    }

    assignMember(member: Member): void {
        this.assignedMember = member;
        this.status = "occupied";
    }

    getAssignedMember(): Member | undefined {
        return this.assignedMember;
    }
}
