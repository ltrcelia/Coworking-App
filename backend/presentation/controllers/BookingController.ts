import { Request, Response } from "express";
import { BookingService } from "../../domain/services/BookingService";

export class BookingController {
    constructor(private readonly bookingService: BookingService) { }

    /**
     * Ajouter une nouvelle réservation
     */
    addBooking = (req: Request, res: Response): void => {
        try {
            const booking = this.bookingService.newBooking(req.body);
            res.status(201).json({ success: true, data: booking });
        } catch (error) {
            res.status(400).json({ success: false, message: (error as Error).message });
        }
    };

    /**
     * Mettre à jour une réservation
     */
    updateBooking = (req: Request, res: Response): void => {
        try {
            const { bookingId } = req.params;
            this.bookingService.updateBooking(bookingId, req.body);
            res.json({ success: true, message: "Événement mis à jour avec succès" });
        } catch (error) {
            res.status(404).json({ success: false, message: (error as Error).message });
        }
    };

    /**
     * Supprimer une réservation
     */
    deleteBooking = (req: Request, res: Response): void => {
        try {
            const { bookingId } = req.params;
            this.bookingService.deleteBooking(bookingId);
            res.json({ success: true, message: "Événement supprimé" });
        } catch (error) {
            res.status(404).json({ success: false, message: (error as Error).message });
        }
    };

    /**
     * Liste de toutes les réservations
     */
    getBookings = (_req: Request, res: Response): void => {
        const bookings = this.bookingService.displayBookingList();
        res.json({ success: true, data: bookings });
    };

    /**
     * Filtrer les réservations
     */
    filterBookings = (req: Request, res: Response): void => {
        const bookings = this.bookingService.filterBooking(req.query);
        res.json({ success: true, data: bookings });
    };
}
