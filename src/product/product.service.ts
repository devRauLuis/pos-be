import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return this.prisma.product.create({ data: { ...createProductDto } });
  }

  findAll() {
    return this.prisma.product.findMany();
  }

  findOne(id: string) {
    return this.prisma.product.findUniqueOrThrow({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({ where: { id }, data: { ...updateProductDto } });
  }

  remove(id: string) {
    try {
      const deleted = this.prisma.product.delete({ where: { id } });
      return deleted;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Product not found');
        }
      }
      throw error;
    }
  }
}
