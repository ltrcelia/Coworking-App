import {IsDate, IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreateEventDto {
    // TODO delete the 'undefined' type when the merge with frontend is done
    @IsString()
    @IsNotEmpty()
    title: string | undefined;

    @IsDate()
    @IsNotEmpty()
    startDate: string | undefined;

    @IsDate()
    @IsNotEmpty()
    endDate: string | undefined;

    @IsNumber()
    @IsNotEmpty()
    seatsAvailable: number | undefined;

    participants: string[] | undefined;
}

export class UpdateEventDto {
    title?: string;
    startDate?: string;
    endDate?: string;
    seatsAvailable?: number;
    participants?: string[];
}
