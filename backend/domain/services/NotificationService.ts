import { Notification, NotificationData } from "../entities/Notification";

export class NotificationService {
    private notifications: Notification[] = [];

    constructor(initialNotification?: Notification[]) {
        if (initialNotification) {
            this.notifications = [...initialNotification];
        }
    }

    /**
     * Notification pour la réservation d'une salle de réunion
     */
    meetingRoomBookingNotification(memberId: string, roomName: string, date: string): Notification {
        const notificationData: NotificationData = {
            id: crypto.randomUUID(),
            memberId,
            type: "meetingRoom_booking",
            message: `Votre réservation pour la salle "${roomName}" le ${date} a été confirmée.`,
            createdAt: new Date().toISOString(),
            read: false
        };

        return new Notification(notificationData);
    }

    /**
     * Notification pour la réservation d'une salle de réunion privée
     */
    privateRoomBookingNotification(memberId: string, roomName: string, date: string): Notification {
        const notificationData: NotificationData = {
            id: crypto.randomUUID(),
            memberId,
            type: "privateRoom_booking",
            message: `Votre réservation pour la salle privée "${roomName}" le ${date} a été confirmée.`,
            createdAt: new Date().toISOString(),
            read: false
        };

        return new Notification(notificationData);
    }

    /**
     * Notification pour l'inscription à un événement
     */
    eventRegistrationNotification(memberId: string, eventName: string, date: string): Notification {
        const notificationData: NotificationData = {
            id: crypto.randomUUID(),
            memberId,
            type: "event_registration",
            message: `Votre réservation pour l'événement "${eventName}" le ${date} a été confirmée.`,
            createdAt: new Date().toISOString(),
            read: false
        };

        return new Notification(notificationData);
    }

    /**
     * Confirmation pour la réservation d'une salle de réunion
     */
    meetingRoomBookingConfirmation(memberId: string, roomName: string, bookingDate: string): Notification {
        const date = new Date(bookingDate);

        const notificationData: NotificationData = {
            id: crypto.randomUUID(),
            memberId,
            type: "meetingRoom_booking",
            message: `Bonjour, votre réservation pour la salle "${roomName}" est prévue le ${date.toLocaleDateString()}. 
            Serez-vous présent.e ?`,
            createdAt: new Date().toISOString(),
            read: false,
            attendanceStatus: "pending"
        };

        return new Notification(notificationData);
    }

    /**
     * Confirmation pour la réservation d'une salle de réunion privée
     */
    privateRoomBookingConfirmation(memberId: string, roomName: string, bookingDate: string): Notification {
        const date = new Date(bookingDate);

        const notificationData: NotificationData = {
            id: crypto.randomUUID(),
            memberId,
            type: "privateRoom_booking",
            message: `Bonjour, votre réservation pour la salle privée "${roomName}" est prévue le ${date.toLocaleDateString()}. 
            Serez-vous présent.e ?`,
            createdAt: new Date().toISOString(),
            read: false,
            attendanceStatus: "pending"
        };

        return new Notification(notificationData);
    }

    /**
     * Confirmation pour la présence à un événement
     */
    eventRegistrationConfirmation(memberId: string, eventName: string, bookingDate: string): Notification {
        const date = new Date(bookingDate);

        const notificationData: NotificationData = {
            id: crypto.randomUUID(),
            memberId,
            type: "event_registration",
            message: `Bonjour, événement "${eventName}" est prévue le ${date.toLocaleDateString()}. 
            Serez-vous présent.e ?`,
            createdAt: new Date().toISOString(),
            read: false,
            attendanceStatus: "pending"
        };

        return new Notification(notificationData);
    }

    userConnectionNotification(senderId: string, senderName: string, targetMemberId: string): Notification {
        const notificationData: NotificationData = {
            id: crypto.randomUUID(),
            memberId: targetMemberId,
            senderId: senderId,
            type: "user_connection",
            message: `${senderName} souhaite se connecter avec vous. Accepter ou refuser ?`,
            createdAt: new Date().toISOString(),
            read: false,
            connectionStatus: "pending"
        };

        return new Notification(notificationData);
    }

    /**
     * Marque une notification comme lue
     */
    markAsRead(notificationId: string): void {
        const notif = this.notifications.find(n => n.id === notificationId);
        if (notif) notif.markAsRead();
    }
}