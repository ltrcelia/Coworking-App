import {AdministratorUseCase} from "../../application/use-cases/AdministratorUseCase";
import {Member} from "../../domain/entities/Member";
import {InMemoryMemberRepository} from "../../infrastructure/repositories/InMemoryMemberRepository";

describe("Use case: administrate coworking space members", () => {
    let memberRepository = new InMemoryMemberRepository();
    let useCase = new AdministratorUseCase(memberRepository);

    const unknownMember = new Member({
        id: "1",
        gender: 'female',
        firstname: 'Jane',
        lastname: 'Doe',
        bio: "",
        birthdate: "",
        city: "",
        company: "",
        country: "",
        email: "jane.doe@gmail.com",
        isManager: false,
        joinDate: "",
        membershipType: "Basic",
        password: "jane.doe",
        phone: "",
        photo: "06-44-66-74-77",
        profession: "",
        skills: [],
    })

    it('should not assign a role to an unknown member', async () => {
        expect(useCase.assignAdminRole(unknownMember))
    });

    it('should not add a membership to an unknown member', async () => {
        expect(useCase.updateMembership(unknownMember))
    });

})
