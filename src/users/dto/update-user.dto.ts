import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @ApiProperty()
    @IsString()
    @IsOptional()
    address: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    image: string;
}
