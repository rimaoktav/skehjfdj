import { ParseUUIDPipe } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, isNumber, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class UpdateProdukDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name?: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price?: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description?: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    stok?: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsNotEmpty()
    image?: string;

    @ApiProperty()
    @IsNotEmpty()
    categoryId?: string;

}