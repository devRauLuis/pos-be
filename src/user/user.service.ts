import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { encodePassword } from 'src/utils/bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserParamsDto } from './dto/get-user-params.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private prismaUser: PrismaService['user']) {}

  async create(createUserDto: CreateUserDto) {
    const [password, hash] = await encodePassword(createUserDto.password);
    return await this.prismaUser.create({
      data: { ...createUserDto, password, hash },
    });
  }

  findAll(params: GetUserParamsDto) {
    return this.prismaUser.findMany({ where: params });
  }

  findOne(params: GetUserParamsDto) {
    return this.prismaUser.findUniqueOrThrow({ where: params });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaUser.update({ where: { id }, data: { ...updateUserDto } });
  }

  async remove(id: string) {
    const user = await this.findOne({ id });
    return this.prismaUser.update({ where: user, data: { ...user, inactive: true } });
  }
}
