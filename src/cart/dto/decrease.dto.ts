import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional } from "class-validator";

export class DecreaseDto {
    @ApiProperty()
    @IsNotEmpty()
    id: string;
    
    @ApiProperty()
    @IsOptional()
    qty: number=1;
}