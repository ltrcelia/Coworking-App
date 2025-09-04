import { EventService } from "../../../../domain/services/EventService";

describe("EventService", () => {
    let eventService: EventService;

    beforeEach(() => {
        eventService = new EventService();
    });

    it("crée un événement avec succès", () => {
        const event = eventService.addEvent({
            id: "e1",
            title: "Formation React",
            startDate: "2025-09-10",
            endDate: "2025-09-12",
            seatsAvailable: 12,
            participants: [],
        });

        expect(event).toEqual(event);
        expect(eventService.displayEventsList()).toHaveLength(1);
    });

    it("modifie un événement avec succès", () => {
        const event = eventService.addEvent({
            id: "e1",
            title: "Formation React",
            startDate: "2025-09-10",
            endDate: "2025-09-12",
            seatsAvailable: 12,
            participants: [],
        });

        eventService.updateEvent(event.id, { startDate: "2025-09-15", endDate: "2025-09-16" });

        const updatedEvent = eventService.displayEventsList().find(b => b.id === event.id);
        expect(updatedEvent?.startDate).toBe("2025-09-15");
        expect(updatedEvent?.endDate).toBe("2025-09-16");
    });

    it("supprime un événement existant", () => {
        const event = eventService.addEvent({
            id: "e1",
            title: "Formation React",
            startDate: "2025-09-10",
            endDate: "2025-09-12",
            seatsAvailable: 12,
            participants: [],
        });

        eventService.deleteEvent(event.id);
        expect(eventService.displayEventsList()).toHaveLength(0);
    });

    it("retourne tous les événements", () => {
        eventService.addEvent({
            id: "e1",
            title: "Formation React",
            startDate: "2025-09-10",
            endDate: "2025-09-12",
            seatsAvailable: 12,
            participants: [],
        });

        eventService.addEvent({
            id: "e1",
            title: "Formation React",
            startDate: "2025-09-10",
            endDate: "2025-09-12",
            seatsAvailable: 12,
            participants: [],
        });

        const allEvents = eventService.displayEventsList();
        expect(allEvents.length).toBe(2);
    });

    it("filtre les événements selon un critère", () => {
        eventService.addEvent({
            id: "e1",
            title: "Formation React",
            startDate: "2025-09-10",
            endDate: "2025-09-12",
            seatsAvailable: 12,
            participants: [],
        });

        eventService.addEvent({
            id: "e1",
            title: "Formation React",
            startDate: "2025-09-13",
            endDate: "2025-09-14",
            seatsAvailable: 12,
            participants: [],
        });

        const filtered = eventService.filterEvents({ startDate: "2025-09-13" });
        expect(filtered.length).toBe(1);
        expect(filtered[0].startDate).toBe("2025-09-13");
    });
});
