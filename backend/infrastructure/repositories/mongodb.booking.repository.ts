import {Booking, BookingData} from "@domain/entities/Booking";
import {BookingRepository} from "@domain/interfaces/BookingRepository";
import {BookingMapper} from "@infrastructure/repositories/mappers/booking.mapper";
import {PrismaClient} from ".prisma/client";

export class MongoDbBookingRepository implements BookingRepository {
    constructor(private prismaClient: PrismaClient) {}

    async save(bookingData: BookingData): Promise<void> {
        await this.prismaClient.booking.create({
            data: BookingMapper.toPersistence(bookingData)
        })
    }

    async findByEmail(email: string): Promise<Booking | null> {
        const model = await this.prismaClient.booking.findUnique({
            where: {
                email: email
            }
        })
        if (!model) return null;
        return BookingMapper.toCore(model);
    }

    async count(): Promise<number> {
        const bookings = await this.prismaClient.booking.findMany();
        return bookings.length;
    }

    async findAll(): Promise<Booking[]> {
        return this.prismaClient.booking.findMany();
    }

    async delete(id: string): Promise<boolean> {
        const bookings = await this.prismaClient.booking.findMany();
        const index = bookings.findIndex((b: { id: string; }) => b.id === id);
        if (index === -1) return false;
        bookings.splice(index, 1);
        return true;
    }

    async findByStartDate(date: string): Promise<Booking[]> {
        const bookings = await this.prismaClient.booking.findMany();
        return bookings.filter((b: { startDate: string; }) => b.startDate === date);
    }

    async findByStartDateAndMemberId(date: string, memberId: string): Promise<Booking | null> {
        const bookings = await this.prismaClient.booking.findMany();

        return bookings.find((b: { startDate: string; memberId: string; }) => b.startDate === date && b.memberId === memberId) ?? null;
    }

    async findByStartDateAndRoomId(date: string, roomId: string): Promise<Booking | null> {
        const bookings = await this.prismaClient.booking.findMany();

        return bookings.find((b: { startDate: string; roomId: string; }) => b.startDate === date && b.roomId === roomId) ?? null;
    }

    async findById(id: string): Promise<Booking | null> {
        const bookings = await this.prismaClient.booking.findMany();

        return bookings.find((b: { id: string; }) => b.id === id) ?? null;
    }

    async findByStatus(status: string): Promise<Booking | null> {
        const bookings = await this.prismaClient.booking.findMany();

        return bookings.find((b: { status: string; }) => b.status === status) ?? null;
    }

    async findByMemberId(memberId: string): Promise<Booking[]> {
        const bookings = await this.prismaClient.booking.findMany();

        return bookings.filter((b: { memberId: string; }) => b.memberId === memberId);
    }

    async findByRoomId(roomId: string): Promise<Booking[]> {
        const bookings = await this.prismaClient.booking.findMany();

        return bookings.filter((b: { roomId: string; }) => b.roomId === roomId);
    }

    async findByType(type: string): Promise<Booking[]> {
        const bookings = await this.prismaClient.booking.findMany();

        return bookings.filter((b: { type: string; }) => b.type === type);
    }

    async update(id: string, bookingData: Partial<BookingData>): Promise<Booking | null> {
        const booking = await this.findById(id);
        if (!booking) return null;

        Object.assign(booking, bookingData);
        return booking;
    }

}
