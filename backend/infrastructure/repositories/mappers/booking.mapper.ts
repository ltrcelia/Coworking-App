import {Booking as BookingModel} from "../../..//generated/prisma/client";
import {Booking, BookingStatus} from "@domain/entities/Booking";

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

    static toCore(model: BookingModel) {
        return new Booking({
            ...model,
            status: model.status as BookingStatus,
        })
    }
}
