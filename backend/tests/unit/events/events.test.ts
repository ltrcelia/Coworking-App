
import { EventService } from '../../../domain/services/EventService';
import { EventData } from '../../../domain/entities/Event';

describe('Use case: Manage events', () => {
    let eventService: EventService;

    beforeEach(() => {
        eventService = new EventService();
    });

    test('Add a new event', () => {
        const eventData: EventData = {
            id: '1',
            title: 'Formation React',
            startDate: '2025-09-10T10:00',
            endDate: '2025-09-10T12:00',
            seatsAvailable: 10,
            participants: []
        };

        const event = eventService.addEvent(eventData);

        expect(event).toBeDefined();
        expect(event.id).toBe('1');
        expect(event.title).toBe('Formation React');

        const allEvents = eventService.displayEventsList();
        expect(allEvents).toContain(event);
        expect(allEvents.length).toBe(1);
    });
});
