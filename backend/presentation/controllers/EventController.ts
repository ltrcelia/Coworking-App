// src/interfaces/http/controllers/EventController.ts
import { Request, Response } from "express";
import { EventService } from "../../domain/services/EventService";

export class EventController {
  constructor(private readonly eventService: EventService) { }

  /**
   * Ajouter un nouvel événement
   */
  addEvent = (req: Request, res: Response): void => {
    try {
      const event = this.eventService.addEvent(req.body);
      res.status(201).json({ success: true, data: event });
    } catch (error) {
      res.status(400).json({ success: false, message: (error as Error).message });
    }
  };

  /**
   * Mettre à jour un événement
   */
  updateEvent = (req: Request, res: Response): void => {
    try {
      const { eventId } = req.params;
      this.eventService.updateEvent(eventId, req.body);
      res.json({ success: true, message: "Événement mis à jour avec succès" });
    } catch (error) {
      res.status(404).json({ success: false, message: (error as Error).message });
    }
  };

  /**
   * Ajouter un participant
   */
  addParticipant = (req: Request, res: Response): void => {
    try {
      const { eventId } = req.params;
      const { memberId } = req.body;
      const added = this.eventService.addParticipant(eventId, memberId);
      res.json({ success: true, added });
    } catch (error) {
      res.status(404).json({ success: false, message: (error as Error).message });
    }
  };

  /**
   * Supprimer un événement
   */
  deleteEvent = (req: Request, res: Response): void => {
    try {
      const { eventId } = req.params;
      this.eventService.deleteEvent(eventId);
      res.json({ success: true, message: "Événement supprimé" });
    } catch (error) {
      res.status(404).json({ success: false, message: (error as Error).message });
    }
  };

  /**
   * Liste des participants
   */
  getParticipants = (req: Request, res: Response): void => {
    try {
      const { eventId } = req.params;
      const participants = this.eventService.displayParticipantsList(eventId);
      res.json({ success: true, data: participants });
    } catch (error) {
      res.status(404).json({ success: false, message: (error as Error).message });
    }
  };

  /**
   * Liste de tous les événements
   */
  getEvents = (_req: Request, res: Response): void => {
    const events = this.eventService.displayEventsList();
    res.json({ success: true, data: events });
  };

  /**
   * Filtrer les événements
   */
  filterEvents = (req: Request, res: Response): void => {
    const events = this.eventService.filterEvents(req.query);
    res.json({ success: true, data: events });
  };
}
