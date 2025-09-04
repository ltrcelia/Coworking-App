import {BookingType, BookingStatus, Booking} from "../../domain/entities/Booking";
import {BookingService} from "../../domain/services/BookingService";
import {InMemoryBookingRepository} from "../../infrastructure/repositories/InMemoryBookingRepository";

export type BookingUseCasePayload = {
    id: string,
    startDate: string,
    endDate: string,
    roomId: string,
    memberId: string,
    type: BookingType,
    status: BookingStatus
}

export class BookingUseCase {
    constructor(private bookingRepository: InMemoryBookingRepository) {
    }

    async handleRoomBookingRequest(newBooking: Booking, validatingMemberId: string): Promise<Booking | null> {
        const bookings = this.bookingRepository.findAll();
        const bookingService = new BookingService();

        newBooking.validOrThrow();

        if (!bookings) {throw new Error("No bookings found")}

        if (newBooking.hasConflictWith(await bookings)) {
            throw new Error("Conflicting booking")
        }

        if (!await bookingService.handleRoomBookingRequest(newBooking, validatingMemberId)) {
            throw new Error("Error while handling room booking request");
        }

        await this.bookingRepository.save(newBooking);

        return newBooking;
    }
}
