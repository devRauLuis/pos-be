import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { encodePassword } from 'src/utils/argon';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserParamsDto } from './dto/get-user-params.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hash = await encodePassword(createUserDto.password);
      delete createUserDto.password;
      const saved = await this.prisma.user.create({
        data: { ...createUserDto, hash },
      });

      return saved;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new BadRequestException('Credentials taken');
        }
      }
    }
  }

  findAll(params: GetUserParamsDto) {
    return this.prisma.user.findMany({ where: params });
  }

  findOne(params: GetUserParamsDto) {
    return this.prisma.user.findUniqueOrThrow({ where: params });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: { ...updateUserDto } });
  }
  async remove(id: string) {
    const user = await this.findOne({ id });
    return this.prisma.user.update({ where: user, data: { ...user, inactive: true } });
  }
}
