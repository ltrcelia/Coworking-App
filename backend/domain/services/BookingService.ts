import { Booking, BookingData, BookingType } from '../entities/Booking';
import { Notification } from '../entities/Notification';

export class BookingService {
    private bookings: Booking[] = [];
    private notifications: Notification[] = [];

    /**
     * Crée une nouvelle réservation pour une salle ou événement
     */
    newBooking(data: { startDate: string, endDate: string, roomId: string, memberId: string, type: BookingType }): Booking {
        const booking = new Booking({
            id: crypto.randomUUID(),
            ...data,
        });

        this.bookings.push(booking);

        // Crée une notification associée
        this.notifications.push(
            new Notification({
                id: crypto.randomUUID(),
                memberId: data.memberId,
                type: data.type,
                message: `Votre réservation pour la salle ${data.roomId} est confirmée du ${data.startDate} au ${data.endDate}`,
                createdAt: new Date().toISOString()
            })
        );

        return booking;
    }

    /**
     * Met à jour les dates d'une réservation existante
     */
    updateBooking(bookingId: string, startDate?: string, endDate?: string): void {
        const booking = this.bookings.find(b => b.id === bookingId);
        if (!booking) throw new Error('Booking non trouvé');

        if (startDate) booking.startDate = startDate;
        if (endDate) booking.endDate = endDate;

        // Mettre à jour la notification correspondante
        const notification = this.notifications.find(n => n.memberId === booking.memberId && n.type === booking.type);
        if (notification) {
            notification.message = `Votre réservation pour la salle ${booking.roomId} est confirmée du ${booking.startDate} au ${booking.endDate}`;
        }
    }

    /**
     * Supprime une réservation
     */
    deleteBooking(bookingId: string): void {
        const bookingIndex = this.bookings.findIndex(b => b.id === bookingId);
        if (bookingIndex === -1) throw new Error('Booking non trouvé');

        const booking = this.bookings[bookingIndex];

        // Supprimer la réservation
        this.bookings.splice(bookingIndex, 1);

        // Supprimer la notification associée
        this.notifications = this.notifications.filter(
            n => !(n.memberId === booking.memberId && n.type === booking.type)
        );
    }

    /**
     * Retourner toutes les réservations
     */
    displayBookingList(): Booking[] {
        return [...this.bookings];
    }

    /**
     * Filtrer les réservations selon un critère
     */
    filterBooking(criteria: Partial<BookingData>): Booking[] {
        return this.bookings.filter(booking =>
            Object.entries(criteria).every(([key, value]) => (booking as any)[key] === value)
        );
    }
}
