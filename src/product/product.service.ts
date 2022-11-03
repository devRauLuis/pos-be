import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    return await this.prisma.product.create({ data: { ...createProductDto } });
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.product.findUniqueOrThrow({ where: { id } });
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    return await this.prisma.product.update({ where: { id }, data: { ...updateProductDto } });
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.product.delete({ where: { id } });
      return deleted;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new ForbiddenException('Product not found');
        }
      }
      throw error;
    }
  }
}
