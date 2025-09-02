import { Room, RoomData, RoomStatus } from '../entities/Room';

export class RoomService {
    private rooms: Room[] = [];

    /**
     * Ajouter une salle
     */
    addRoom(room: Room): void {
        const exists = this.rooms.some(r => r.id === room.id);
        if (exists) throw new Error(`La salle avec l'id ${room.id} existe déjà`);
        this.rooms.push(room);
    }

    /**
     * Mettre à jour une salle existante
     */
    updateRoom(roomId: string, updatedData: Partial<RoomData>): void {
        const room = this.rooms.find(r => r.id === roomId);
        if (!room) throw new Error(`Salle avec l'id ${roomId} non trouvée`);

        if (updatedData.name) room.name = updatedData.name;
        if (updatedData.capacity !== undefined) room.capacity = updatedData.capacity;
        if (updatedData.location) room.location = updatedData.location;
        if (updatedData.status) room.status = updatedData.status;
    }

    /**
     * Supprimer une salle
     */
    deleteRoom(roomId: string): void {
        this.rooms = this.rooms.filter(r => r.id !== roomId);
    }

    /**
     * Retourne toutes les salles
     */
    getAllRooms(): Room[] {
        return [...this.rooms];
    }

    /**
     * Filtrer les salles par statut
     */
    getRoomsByStatus(status: RoomStatus): Room[] {
        return this.rooms.filter(r => r.status === status);
    }
}
