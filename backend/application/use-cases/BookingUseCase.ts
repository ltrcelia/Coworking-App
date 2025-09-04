import {BookingRepository} from "@domain/interfaces/BookingRepository";
import {MemberRepository} from "@domain/interfaces/MemberRepository";
import {BookingType, BookingStatus, Booking} from "../../domain/entities/Booking";
import {BookingService} from "../../domain/services/BookingService";
import {InMemoryBookingRepository} from "@infrastructure/repositories/memory.booking.repository";

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
    constructor(
        private bookingRepository: BookingRepository,
        private memberRepository: MemberRepository
    ) {
    }

    async handleRoomBookingRequest(newBooking: Booking, validatingMemberId: string): Promise<Booking | null> {
        // Validate booking domain rules first
        newBooking.validOrThrow();

        // Authorization: ensure the validating member exists and is a manager
        const validatingMember = await this.memberRepository.findById(validatingMemberId);
        if (!validatingMember) {
            throw new Error(`Member with ID ${validatingMemberId} not found`);
        }
        if (!validatingMember.isManager) {
            throw new Error('You are not authorized to accept this request');
        }

        // Load existing bookings and check for conflicts
        const bookings = await this.bookingRepository.findAll();
        if (newBooking.hasConflictWith(bookings)) {
            throw new Error("Conflicting booking");
        }

        // Delegate further processing to the domain service if needed
        const bookingService = new BookingService();
        const ok = await bookingService.handleRoomBookingRequest(newBooking, validatingMemberId);
        if (!ok) {
            throw new Error("Error while handling room booking request");
        }

        await this.bookingRepository.save(newBooking);
        return newBooking;
    }
}
