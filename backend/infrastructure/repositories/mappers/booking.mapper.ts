import {Booking as BookingModel} from "../../..//generated/prisma/client";
import {Booking, BookingData, BookingStatus, BookingType} from "@domain/entities/Booking";

export class BookingMapper {
    static toPersistence(booking: any) {
        return {
            id: booking.id,
            email: booking.email,
            startDate: booking.startDate,
            endDate: booking.endDate,
            type: booking.type,
            roomId: booking.roomId,
            status: booking.status
        }
    }

    private static mapPrismaToBookingData(model: BookingModel): BookingData {
        const { id, memberId, startDate, endDate, type, roomId, status } = model;

        return {
            id,
            memberId,
            startDate,
            endDate,
            type: type as unknown as BookingType,
            roomId,
            status: status as BookingStatus,
        };
    }

    static toCore(model: BookingModel) {
        const data = BookingMapper.mapPrismaToBookingData(model);
        return new Booking(data);
    }

}
