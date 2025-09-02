/**
 * Entité Event - Couche Domaine
 * Représente un évènement dans le système
 */


export interface EventData {
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    seatsAvailable: number;
    participants: string[];
}

export class Event {
    public readonly id: string;
    public title: string;
    public startDate: string;
    public endDate: string;
    public _seatsAvailable: number;
    public _participants: string[];

    constructor(data: EventData) {
        this.id = data.id;
        this.title = data.title;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this._seatsAvailable = data.seatsAvailable;
        this._participants = [...data.participants];
    }

    get seatsAvailable(): number {
        return this.seatsAvailable;
    }

    get participants(): string[] {
        return [...this._participants];
    }

    /**
     * Ajoute un participant si places disponibles
     */
    addParticipant(memberId: string): boolean {
        if (this._seatsAvailable <= 0) return false;
        if (!this._participants.includes(memberId)) {
            this._participants.push(memberId);
            this._seatsAvailable -= 1;
            return true;
        }
        return false;
    }
}
