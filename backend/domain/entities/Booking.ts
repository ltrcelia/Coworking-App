/**
 * Entité Booking - Couche Domaine
 * Représente une réservation
 */

export type BookingType = 'meetingRoom_booking' | 'privateRoom_booking' | 'event_registration';
export type BookingStatus = 'pending' | 'confirmed' | 'declined';

export interface BookingData {
    id: string;
    memberId: string;
    startDate: string;
    endDate: string;
    type: BookingType;
    roomId: string;
    status: BookingStatus
}

const REQUIRED_FIELDS: (keyof BookingData)[] = [
    "memberId",
    "startDate",
    "endDate",
    "type",
    "roomId",
]

export class Booking {
    public readonly id: string;
    public memberId: string;
    public startDate: string;
    public endDate: string;
    public type: BookingType;
    public readonly roomId: string;
    public status: BookingStatus;

    constructor(data: BookingData) {
        this.id = data.id;
        this.memberId = data.memberId;
        this.startDate = data.startDate;
        this.endDate = data.endDate;
        this.type = data.type;
        this.roomId = data.roomId;
        this.status = data.status;
    }

    validOrThrow() {
        if(this.hasEmptyFields()) {
            throw new Error('Please fill all required fields');
        }
        if(this.hasPastDate()) {
            throw new Error('Please select a future date');
        }
    }

    hasEmptyFields() {
        for (const field of REQUIRED_FIELDS) {
            const value = this[field];

            if (value.trim().length === 0) {
                throw new Error(`Field "${field}" cannot be empty`);
            }

            if (Array.isArray(value) && value.length === 0) {
                throw new Error(`Field "${field}" cannot be empty`);
            }
        }
        return false;
    }

    hasPastDate() {
        const today = new Date();
        const bookingDate = new Date(this.startDate);
        return bookingDate < today;
    }

    hasConflictWith(bookings: Booking[]) {
        return bookings.some(booking => {
            return (
                booking.startDate === this.startDate &&
                booking.endDate === this.endDate &&
                booking.type === this.type &&
                booking.roomId === this.roomId
            );
        });
    }
}
