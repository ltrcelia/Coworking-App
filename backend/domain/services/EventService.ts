import { Event, EventData } from "../entities/Event";


export class EventService {
    private events: Event[] = [];

    /**
     * Ajouter un nouvel événement
     */
    addEvent(data: EventData): Event {
        const newEvent = new Event(data);
        this.events.push(newEvent);
        return newEvent;
    }

    /**
     * Mettre à jour un événement existant
     */
    updateEvent(eventId: string, updatedData: Partial<EventData>): void {
        const event = this.events.find(e => e.id === eventId);
        if (!event) throw new Error("Événement non trouvé");

        if (updatedData.title) event.title = updatedData.title;
        if (updatedData.startDate) event.startDate = updatedData.startDate;
        if (updatedData.endDate) event.endDate = updatedData.endDate;
        if (updatedData.seatsAvailable !== undefined) event['_seatsAvailable'] = updatedData.seatsAvailable;
    }

    /**
     * Ajouter un participant à un événement
     */
    addParticipant(eventId: string, memberId: string): boolean {
        const event = this.events.find(e => e.id === eventId);
        if (!event) throw new Error("Événement non trouvé");
        return event.addParticipant(memberId);
    }

    /**
     * Supprimer un événement
     */
    deleteEvent(eventId: string): void {
        this.events = this.events.filter(e => e.id !== eventId);
    }

    /**
     * Retourner la liste des participants d'un événement
     */
    displayParticipantsList(eventId: string): string[] {
        const event = this.events.find(e => e.id === eventId);
        if (!event) throw new Error("Événement non trouvé");
        return event.participants;
    }

    /**
     * Retourner tous les événements
     */
    displayEventsList(): Event[] {
        return [...this.events];
    }

    /**
     * Filtrer les événements selon un critère
     */
    filterEvents(criteria: Partial<EventData>): Event[] {
        return this.events.filter(event =>
            Object.entries(criteria).every(([key, value]) => (event as any)[key] === value)
        );
    }
}
