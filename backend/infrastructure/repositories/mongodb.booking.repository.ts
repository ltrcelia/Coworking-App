import {Booking, BookingData} from "@domain/entities/Booking";
import {BookingRepository} from "@domain/interfaces/BookingRepository";
import {BookingMapper} from "@infrastructure/repositories/mappers/booking.mapper";
import PrismaClient from "../../generated/prisma/client";

export class MongoDbBookingRepository implements BookingRepository {
    constructor(private prismaClient: PrismaClient) {}

    async save(bookingData: BookingData) {
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
}
