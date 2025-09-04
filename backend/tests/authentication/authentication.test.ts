import {AuthenticateUseCase} from "../../application/use-cases/AuthenticateUseCase";
import {Member} from "../../domain/entities/Member";
import {InMemoryMemberRepository} from "../../infrastructure/repositories/memory.member.repository";

describe("Use case: member management", () => {
    let memberRepository = new InMemoryMemberRepository();
    let useCase = new AuthenticateUseCase(memberRepository)
    const validMember = new Member({
        id: "1",
        gender: 'female',
        firstname: 'Jane',
        lastname: 'Doe',
        bio: "N/A",
        birthdate: "1994-10-10",
        company: "Transition",
        city: "London",
        country: "United Kingdom",
        email: "jane.doe@gmail.com",
        isManager: false,
        joinDate: "",
        membershipType: "Basic",
        password: "jane.doe",
        phone: "06-44-66-74-77",
        photo: "https://randomuser.me/api/portraits/women/4.jpg",
        profession: "Developer",
        skills: [],
    })

    it('should not authenticate a unknown member', async () => {
        expect(useCase.authenticateMember(validMember)).rejects.toThrow()
    })

    it('should not add a member with an existing email', async () => {
        await expect(useCase.createMemberAccount({
            ...validMember,
            email: "clara.lemoine@example.com",
        })).rejects.toThrow('A member with the same email already exists')
    })

    it('should not add a member with incomplete information', async () => {
        await expect(useCase.createMemberAccount({
            ...validMember,
            firstname: 'Clara',
            lastname: null,
            email: "clara.lemoine@example.com",
        })).rejects.toThrow("Field \"lastname\" is required")
    })

    it('should add a member', async () => {
        expect(useCase.createMemberAccount({
            ...validMember,
        }))
    })

    // TODO setup the related processes
    // it('should update member information', async () => {
    //     expect(useCase.updateMemberAccount())
    // })
    //
    // it('should delete a member account', async () => {
    //     expect(useCase.deleteMemberAccount())
    // })
});
