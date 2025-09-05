import {IsDate, IsNotEmpty, IsString} from "class-validator";

export class CreateBookingDto {
    // TODO delete the 'undefined' type when the merge with frontend is done

    @IsString()
    @IsNotEmpty()
    eventId: string | undefined;

    @IsString()
    @IsNotEmpty()
    memberId: string | undefined;

    @IsDate()
    @IsNotEmpty()
    startDate: string | undefined;

    @IsDate()
    @IsNotEmpty()
    endDate: string | undefined;

    @IsString()
    @IsNotEmpty()
    type: string | undefined;

    @IsString()
    @IsNotEmpty()
    roomId: string | undefined;

    @IsString()
    @IsNotEmpty()
    status: string | undefined
}
