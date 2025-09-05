import {Booking, BookingData} from "@domain/entities/Booking";

export interface BookingRepository {
    save(bookingData: BookingData): Promise<void>;

    update(id: string, booking: Booking): Promise<Booking | null>;

    delete(id: string): Promise<boolean>;

    count(): Promise<number>;

    findAll(): Promise<Booking[]>;

    findById(id: string): Promise<Booking | null>;

    findByType(type: string): Promise<Booking[]>;

    findByStatus(status: string): Promise<Booking | null>;

    findByMemberId(memberId: string): Promise<Booking[]>;

    findByRoomId(roomId: string): Promise<Booking[]>;

    findByStartDate(date: string): Promise<Booking[]>;

    findByStartDateAndRoomId(date: string, roomId: string): Promise<Booking | null>;

    findByStartDateAndMemberId(date: string, memberId: string): Promise<Booking | null>;
}

