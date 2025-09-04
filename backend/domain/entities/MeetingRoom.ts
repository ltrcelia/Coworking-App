import { Room, RoomData } from "../entities/Room";

export class MeetingRoom extends Room {
    private rooms: MeetingRoom[] = [];

    book(memberId: string, date: string): string {
        if (this.status !== "available") {
            return `La salle de réunion "${this.name}" n’est pas disponible.`;
        }
        this.status = "occupied";
        return `Salle de réunion "${this.name}" réservée avec succès par ${memberId} pour le ${date}.`;
    }
}
