import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(product_id: string): Promise<Product> {
    const id = Number(product_id);

    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) throw new HttpException('Product not found', 404);

    return product;
  }

  async create(body: CreateProductDto) {
    const product = await this.productRepository.save(body);

    if (!product) throw new HttpException('Create product Error', 500);

    return product;
  }

  async update(product_id: string, body: CreateProductDto) {
    const id = Number(product_id);

    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) throw new HttpException('Product not found', 404);

    return this.productRepository.save({
      ...product,
      ...body,
      updated_at: new Date(),
    });
  }

  async remove(product_id: string) {
    const id = Number(product_id);

    const product = await this.productRepository.findOne({
      where: { id },
    });

    if (!product) throw new HttpException('Product not found', 404);

    return this.productRepository.remove(product);
  }
}
