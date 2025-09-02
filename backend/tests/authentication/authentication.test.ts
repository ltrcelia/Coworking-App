import {AuthenticateUseCase} from "../../application/use-cases/AuthenticateUseCase";
import {Member} from "../../domain/entities/Member";
import {InMemoryMemberRepository} from "../../infrastructure/repositories/InMemoryMemberRepository";

describe("Use case: member management", () => {
    let memberRepository = new InMemoryMemberRepository();
    let useCase = new AuthenticateUseCase(memberRepository)
    const validMember = new Member({
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

    it('should not authenticate a unknown member', async () => {
        expect(useCase.authenticateMember(validMember))
    })

    it('should not add a member with an existing email', async () => {
        expect(useCase.addMember({
            ...validMember,
            firstname: 'Clara',
            lastname: 'Lemoine',
            email: "clara.lemoine@example.com",
        }))
    })

    it('should not add a member with incomplete information', async () => {
        expect(useCase.addMember({
            ...validMember,
            firstname: 'Clara',
            lastname: null,
            email: "clara.lemoine@example.com",
        }))
    })

    it('should add a member', async () => {
        expect(useCase.addMember({
            ...validMember,
        }))
    })
});
