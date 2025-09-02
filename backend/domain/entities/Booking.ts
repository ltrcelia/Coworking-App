/**
 * Entité Booking - Couche Domaine
 * Représente une réservation
 */

export type BookingType = 'meetingRoom_booking' | 'privateRoom_booking' | 'event_registration';

export interface BookingData {
    id: string;
    memberId: string;
    startDate: string;
    endDate: string;
    type: BookingType;
    roomId: string;
}

export class Booking {
    public readonly id: string;
    public readonly memberId: string;
    public startDate: string;
    public endDate: string;
    public type: BookingType;
    public readonly roomId: string;

    constructor(data: BookingData) {
        this.id = data.id;
        this.memberId = data.memberId;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.type = data.type;
        this.roomId = data.roomId;
    }
}