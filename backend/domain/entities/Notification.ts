/**
 * Entité Notification - Couche Domaine
 * Représente une notification pour la réservation d'une salle ou l'inscription à un événement dans le système
 */

export type NotificationType = 'meetingRoom_booking' | 'privateRoom_booking' | 'event_registration' | 'user_connection';
export type AttendanceStatus = "pending" | "confirmed" | "declined";
export type ConnectionStatus = "pending" | "accepted" | "rejected";

export interface NotificationData {
    id: string;
    memberId: string;
    senderId?: string;
    type: NotificationType;
    message: string;
    createdAt: string;
    read?: boolean;
    attendanceStatus?: AttendanceStatus;
    connectionStatus?: ConnectionStatus;
}

export class Notification {
    public readonly id: string;
    public readonly memberId: string;
    public readonly type: NotificationType;
    public readonly createdAt: string;
    public message: string;
    public _read: boolean;
    public attendanceStatus: AttendanceStatus;
    public connectionStatus?: ConnectionStatus;

    constructor(data: NotificationData) {
        this.id = data.id;
        this.memberId = data.memberId;
        this.type = data.type;
        this.message = data.message;
        this.createdAt = data.createdAt;
        this._read = data.read ?? false;
        this.attendanceStatus = data.attendanceStatus ?? "pending";
        this.connectionStatus = data.connectionStatus ?? "pending";
    }

    get read(): boolean {
        return this._read
    }

    markAsRead(): void {
        this._read = true;
    }

    /**
     * Le membre confirme sa réservation
     */
    confirmAttendance(): void {
        this.attendanceStatus = "confirmed";
    }

    /**
     * Le membre annule sa réservation
     */
    declineAttendance(): void {
        this.attendanceStatus = "declined";
    }

    /**
     * Le membre accepte la demande d’ami
     */
    acceptConnection(): void {
        this.connectionStatus = "accepted";
    }

    rejectConnection(): void {
        this.connectionStatus = "rejected";
    }
}