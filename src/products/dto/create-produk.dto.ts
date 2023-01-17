import { ParseUUIDPipe } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateProdukDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsString()
    description: string;

    @ApiProperty()
    @IsNumber()
    stok: number;

    // @ApiProperty()
    // @IsNotEmpty()
    // image: string;

    @ApiProperty()
    @IsNotEmpty()
    categoryId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    userId: string;
}