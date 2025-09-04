import { Router } from "express";
import { BookingService } from "../../domain/services/BookingService";
import { BookingController } from "../controllers/BookingController";

const router = Router();
const bookingService = new BookingService();
const bookingController = new BookingController(bookingService);

router.post("/", bookingController.addBooking);
router.put("/:bookingId", bookingController.updateBooking);
router.delete("/:bookingId", bookingController.deleteBooking);
router.get("/", bookingController.getBookings);
router.get("/filter", bookingController.filterBookings);

export default router;
