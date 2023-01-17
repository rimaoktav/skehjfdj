import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsLowercase, IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  fullname: string;

  @IsEmail()
  @IsNotEmpty()
  @IsLowercase()
  @ApiProperty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  roleId: string;

  @ApiProperty()
  isActive?: boolean;
}
