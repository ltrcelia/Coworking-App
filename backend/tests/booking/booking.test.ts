import {BookingUseCase} from "../../application/use-cases/BookingUseCase";
import {Booking} from "../../domain/entities/Booking";
import {Event} from "../../domain/entities/Event";
import {MeetingRoom} from "../../domain/entities/MeetingRoom";
import {Member} from "../../domain/entities/Member";
import {PrivateRoom} from "../../domain/entities/PrivateRoom";
import {InMemoryBookingRepository} from "../../infrastructure/repositories/memory.booking.repository";
import {InMemoryMemberRepository} from "../../infrastructure/repositories/memory.member.repository";

describe('Use case: Booking management', () => {
    let bookingRepository = new InMemoryBookingRepository();
    let memberRepository = new InMemoryMemberRepository();
    let useCase = new BookingUseCase(bookingRepository, memberRepository);

    const manager = new Member({
        id: "21",
        gender: "female",
        firstname: "Chloé",
        lastname: "Fontaine",
        email: "chloe.fontaine@example.com",
        password: "$2b$10$A38Q7tAGDIt80FJK8Rxjqu09PfXNpR4ck2RNXnHc92t3vHlLveT3W",
        phone: "06-12-34-56-78",
        birthdate: "1991-04-03",
        city: "Orléans",
        country: "France",
        photo: "https://randomuser.me/api/portraits/women/11.jpg",
        profession: "Graphiste",
        company: "Studio Créatif",
        skills: [
            "Illustrator",
            "Photoshop",
            "Branding"
        ],
        membershipType: "Premium",
        joinDate: "2023-03-08",
        bio: "Graphiste passionnée par l'identité visuelle et le design d'impact.",
        linkedinUrl: "https://linkedin.com/in/chloe-fontaine",
        isManager: true
    })
    const member = new Member({
        id: "7",
        gender: "female",
        firstname: "Camille",
        lastname: "Durand",
        email: "camille.durand@example.com",
        password: "$2b$10$4VRw/TO49IW37pRkLjjG7OKY7bCLwO55yZs9QEjjPGT6n4.zQtY0C",
        phone: "06-78-90-12-34",
        birthdate: "1993-04-18",
        city: "Lille",
        country: "France",
        photo: "https://randomuser.me/api/portraits/women/4.jpg",
        profession: "Journaliste",
        company: "Media Digital",
        skills: [
            "Rédaction",
            "Investigation",
            "Réseaux sociaux"
        ],
        membershipType: "Basic",
        joinDate: "2023-05-01",
        bio: "Journaliste spécialisée dans les nouvelles technologies et l'innovation.",
        linkedinUrl: "https://linkedin.com/in/camille-durand",
        isManager: false
    })
    const meetingRoom = new MeetingRoom({
        id: "3",
        name: "Ocean",
        capacity: 20,
        location: "3rd floor",
        status: "available"
    });
    const privateRoom = new PrivateRoom({
        id: "10",
        name: "Mountain",
        capacity: 3,
        location: "1st floor",
        status: "available"
    });
    const meetingRoomBooking = new Booking({
        id: "3",
        startDate: "05-05-2026",
        endDate: "05-07-2026",
        memberId: "1",
        roomId: "3",
        status: "pending",
        type: "privateRoom_booking"
    })
    const event = new Event({
        id: "",
        title: "",
        startDate: "",
        endDate: "",
        participants: [],
        seatsAvailable: 0,
    })

    it('should not accept booking if the logged user is not an admin', async () => {
        await memberRepository.save(manager);
        await memberRepository.save(member);

        await expect(
            useCase.handleRoomBookingRequest(meetingRoomBooking, member.id)
        ).rejects.toThrow('You are not authorized to accept this request');
    });

    it('should not accept booking if there are missing information', () => {
    });

    it('should not accept booking with past dates', () => {
    });

    it('should not accept booking for a booked room', () => {
    });

    it('should update booking ?', () => {

    });


    describe('New event booking', () => {
        it('should not accept booking for past event', () => {
        });

        it('should not accept booking for full event', () => {
        });

        it('should not delete booking if there are more than one participant', () => {

        });
    })
})
