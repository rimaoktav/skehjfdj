import { Controller, Post, Body, HttpStatus, ConflictException, Get, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LoginDto } from 'src/users/dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags("Auth")
@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
    ){}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {        
        return {
          statusCode: HttpStatus.OK,
          message: 'Login Successful',
          data: await this.authService.login(loginDto),
        };
      }

    @Post('register')
    async create(@Body() createUserDto: CreateUserDto){
        try{
            return {
                data: await this.userService.create(createUserDto),
                statusCode: HttpStatus.CREATED,
                message: 'success create account',
            };
        } catch(e){
            console.log(e);

            if (e.code === '23505'){
                throw new ConflictException('Email is already exists');

            }
        }
    }
}
