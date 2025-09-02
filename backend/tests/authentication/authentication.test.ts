import {AuthenticateUseCase} from "../../application/use-cases/AuthenticateUseCase";
import {Member} from "../../domain/entities/Member";
import {InMemoryMemberRepository} from "../../infrastructure/repositories/InMemoryMemberRepository";

describe("Use case: member authentication", () => {
    let memberRepository = new InMemoryMemberRepository();
    let useCase = new AuthenticateUseCase(memberRepository)
    const testMember = new Member({
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
        photo: "",
        profession: "",
        skills: [],
    })

    it('should not authenticate a unknown member', async () => {
        expect(useCase.execute(testMember))
    })
});
