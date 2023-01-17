import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";


export class ReviewDto{
    @ApiProperty()
    @IsUUID()
    transaction_id: string;

    @ApiProperty()
    @IsString()
    message: string;

    @ApiProperty()
    @IsNotEmpty()
    rating: number;
}