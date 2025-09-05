import {Member} from "@domain/entities/Member";
import {Member as MemberModel} from "../../../generated/prisma/client";

export class MemberMapper {
    static toPersistence(member: any) {
        return {
            id: member.id,
            email: member.email,
            firstName: member.firstName,
            lastName: member.lastName,
            membershipType: member.membershipType,
            isManager: member.isManager,
            password: member.password,
        }
    }

    private static mapPrismaToMemberData(model: any): any {
        const { id, email, firstName, lastName, membershipType, isManager, password } = model;
        return {
            id,
            email,
            firstName,
            lastName,
            membershipType,
            isManager,
            password
        };
    }

    static toCore(model: MemberModel) {
        const data = MemberMapper.mapPrismaToMemberData(model);
        return new Member(data);
    }
}
