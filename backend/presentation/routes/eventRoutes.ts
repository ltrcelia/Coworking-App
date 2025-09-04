import { Router } from "express";
import { EventService } from "../../domain/services/EventService";
import { EventController } from "../controllers/EventController";

const router = Router();
const eventService = new EventService();
const eventController = new EventController(eventService);

router.post("/", eventController.addEvent);
router.put("/:eventId", eventController.updateEvent);
router.delete("/:eventId", eventController.deleteEvent);
router.post("/:eventId/participants", eventController.addParticipant);
router.get("/:eventId/participants", eventController.getParticipants);
router.get("/", eventController.getEvents);
router.get("/filter", eventController.filterEvents);

export default router;
