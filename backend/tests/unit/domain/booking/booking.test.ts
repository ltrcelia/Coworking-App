import { BookingService } from "../../../../domain/services/BookingService";

describe("BookingService", () => {
    let bookingService: BookingService;

    beforeEach(() => {
        bookingService = new BookingService();
    });

    it("crée une réservation avec succès", () => {
        const booking = bookingService.newBooking({
            startDate: "2025-09-10",
            endDate: "2025-09-12",
            roomId: "room1",
            memberId: "user1",
            type: "meetingRoom_booking",
        });

        expect(booking.type).toBe("meetingRoom_booking");
        expect(bookingService.displayBookingList()).toHaveLength(1);
    });

    it("modifie une réservation avec succès", () => {
        const booking = bookingService.newBooking({
            startDate: "2025-09-10",
            endDate: "2025-09-12",
            roomId: "room1",
            memberId: "user1",
            type: "meetingRoom_booking",
        });

        bookingService.updateBooking(booking.id, "2025-09-15", "2025-09-16");

        const updatedBooking = bookingService.displayBookingList().find(b => b.id === booking.id);
        expect(updatedBooking?.startDate).toBe("2025-09-15");
        expect(updatedBooking?.endDate).toBe("2025-09-16");
    });

    it("supprime une réservation existante", () => {
        const booking = bookingService.newBooking({
            startDate: "2025-09-10",
            endDate: "2025-09-12",
            roomId: "room1",
            memberId: "user1",
            type: "meetingRoom_booking",
        });

        bookingService.deleteBooking(booking.id);
        expect(bookingService.displayBookingList()).toHaveLength(0);
    });

    it("retourne toutes les réservations", () => {
        bookingService.newBooking({
            startDate: "2025-09-10",
            endDate: "2025-09-12",
            roomId: "room1",
            memberId: "user1",
            type: "meetingRoom_booking",
        });

        bookingService.newBooking({
            startDate: "2025-09-13",
            endDate: "2025-09-14",
            roomId: "room2",
            memberId: "user2",
            type: "privateRoom_booking",
        });

        const allBookings = bookingService.displayBookingList();
        expect(allBookings.length).toBe(2);
    });

    it("filtre les réservations selon un critère", () => {
        bookingService.newBooking({
            startDate: "2025-09-10",
            endDate: "2025-09-12",
            roomId: "room1",
            memberId: "user1",
            type: "meetingRoom_booking",
        });

        bookingService.newBooking({
            startDate: "2025-09-13",
            endDate: "2025-09-14",
            roomId: "room2",
            memberId: "user2",
            type: "privateRoom_booking",
        });

        const filtered = bookingService.filterBooking({ memberId: "user1" });
        expect(filtered.length).toBe(1);
        expect(filtered[0].memberId).toBe("user1");
    });
});
