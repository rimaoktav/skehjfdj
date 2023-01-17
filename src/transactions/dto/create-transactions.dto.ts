import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTransactionDto {
    @ApiProperty()
    @IsOptional()
    productId?: string;
}