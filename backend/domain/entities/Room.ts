export type RoomStatus = "available" | "occupied" | "maintenance";

export interface RoomData {
    id: string;
    name: string;
    capacity: number;
    location: string;
    status: RoomStatus;
}

export abstract class Room {
    public readonly id: string;
    public name: string;
    public capacity: number;
    public location: string;
    public status: RoomStatus;

    constructor(data: RoomData) {
        this.id = data.id;
        this.name = data.name;
        this.capacity = data.capacity;
        this.location = data.location;
        this.status = data.status;
    }

    getDescription(): string {
        return `${this.name} (${this.capacity} places) - ${this.location}`;
    }

    abstract book(memberId: string, date: string): string;
}
