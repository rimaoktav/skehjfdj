import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as uuid from 'uuid';
import { hashPassword } from 'src/utils/hash-password';
import { Role } from './entities/role.entity';
import { paginate, Paginated, PaginateQuery } from 'nestjs-paginate';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const checkEmail = await this.usersRepository.findOne({
      where: {
        email: createUserDto.email,
      }
    });

    const checkPhone =  await this.usersRepository.findOne({
      where: {
        phone: createUserDto.phone
      }
    })

    if(checkEmail || checkPhone) {
      throw new HttpException(
        {
          statusCode: HttpStatus.NOT_ACCEPTABLE,
          message: 'account is already exist'
        },
        HttpStatus.NOT_FOUND,
      );
    }

    const salt = uuid.v4();
    const user = new User();
    user.fullname =  createUserDto.fullname
    user.email =  createUserDto.email
    user.phone = createUserDto.phone
    user.password = await hashPassword(createUserDto.password, salt)
    user.salt = salt
    user.role = await this.rolesRepository.findOneOrFail({where: {id: createUserDto.roleId}})

    const result = await this.usersRepository.insert(user)

    return this.usersRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  async findAll (query: PaginateQuery): Promise<Paginated<User>>{
    return paginate(query, this.usersRepository, {
      sortableColumns: ['fullname'],
      defaultSortBy: [['fullname', 'ASC']],
      searchableColumns: ['fullname', 'email'],
      defaultLimit: 5,
    })
  }


  async findOne(id: string) {
    try {
      return await this.usersRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  async update(id: string, updateUserDto:UpdateUserDto) {
    try {
      await this.usersRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    const user = new User();
    user.email = updateUserDto.email
    user.fullname = updateUserDto.fullname
    user.phone = updateUserDto.phone
    user.image = updateUserDto.image
    user.address = updateUserDto.address
    await this.usersRepository.update(id, user);

    return this.usersRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.usersRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    await this.usersRepository.delete(id);
  }

  async findByEmail(email:string) {
    try{
      return await this.usersRepository.findOneOrFail({
        where: {
          email,
        },
        relations: ['role']
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
          throw new HttpException({
              statusCode: HttpStatus.NOT_FOUND,
              error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
      );
      } else {
          throw e;
      }
    }
  }

}
