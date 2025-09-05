export namespace MemberModel {
    export type Member = {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
        password: string;
        membershipType: MembershipType;
        isManager: boolean;
    }

    export type Members = Member[];

    export type MemberForm = Member;

    export enum MembershipType {
        BASIC = "BASIC",
        PREMIUM = "PREMIUM",
        ENTREPRISE = "ENTREPRISE"
    }
}
