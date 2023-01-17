import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { LoginDto } from 'src/users/dto/login.dto';
import { hashPassword } from 'src/utils/hash-password';
import { Role } from 'src/users/entities/role.entity';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        @InjectRepository(User) private readonly repositoryUser: Repository<User>
    ){}

    async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);

    if (user && user.password === (await hashPassword(password, user.salt))) {
      const { password, ...result } = user;

      return result;
    }

    return null;
  }

    async login(loginDto: LoginDto) {
      const user = await this.repositoryUser.findOne({where: {email: loginDto.email}, relations: ['role']})
      console.log(`ini pass dari db ${user.password}, ini pass dari dto ${loginDto.password}`);
            

      if (
        user.password !== (await hashPassword(loginDto.password, user.salt))
      ) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Incorrect Password',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      if (!user) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            message: 'Your account is not active',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      const payload = {
        id: user.id,
        email: user.email,
        fullName: user.fullname,
        role: user.role.name
      };

      return {
        email: user.email,
        role: user.role.name,
        access_token: this.jwtService.sign(payload),
      };
    }
}
