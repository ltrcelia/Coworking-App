import {Booking, BookingData} from "../../domain/entities/Booking";
import {BookingRepository} from "../../domain/interfaces/BookingRepository";

export class InMemoryBookingRepository implements BookingRepository {

    private bookings: Booking[] = [];

    async findAll(): Promise<Booking[]> {
        return this.bookings;
    }

    async count(): Promise<number> {
        return this.bookings.length;
    }

    async save(bookingData: BookingData): Promise<void> {
        const booking = new Booking(bookingData);
        this.bookings.push(booking);
    }

    async delete(id: string): Promise<boolean> {
        const index = this.bookings.findIndex(b => b.id === id);
        if (index === -1) return false;
        this.bookings.splice(index, 1);
        return true;
    }

    async findByStartDate(date: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.startDate === date);
    }

    async findByStartDateAndMemberId(date: string, memberId: string): Promise<Booking | null> {
        return this.bookings.find(b => b.startDate === date && b.memberId === memberId) ?? null;
    }

    async findByStartDateAndRoomId(date: string, roomId: string): Promise<Booking | null> {
        return this.bookings.find(b => b.startDate === date && b.roomId === roomId) ?? null;
    }

    async findById(id: string): Promise<Booking | null> {
        return this.bookings.find(b => b.id === id) ?? null;
    }

    async findByStatus(status: string): Promise<Booking | null> {
        return this.bookings.find(b => b.status === status) ?? null;
    }

    async findByMemberId(memberId: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.memberId === memberId);
    }

    async findByRoomId(roomId: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.roomId === roomId);
    }

    async findByType(type: string): Promise<Booking[]> {
        return this.bookings.filter(b => b.type === type);
    }

    async update(id: string, bookingData: Partial<BookingData>): Promise<Booking | null> {
        const booking = await this.findById(id);
        if (!booking) return null;

        Object.assign(booking, bookingData);
        return booking;
    }
}
