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

  async findAll(params: GetUserParamsDto) {
    return await this.prismaUser.findMany({ where: params });
  }

  async findOne(params: GetUserParamsDto) {
    return await this.prismaUser.findUniqueOrThrow({ where: params });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
