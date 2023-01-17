import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateCartDto {
    @ApiProperty()
    @IsOptional()
    qty: number = 1;

    @ApiProperty()
    @IsNotEmpty()
    productId: string;

    @ApiProperty()
    @IsNotEmpty()
    price: number;
}
