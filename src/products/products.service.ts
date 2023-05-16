import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create.dto';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async addProductToCategory(product_id: number, category_id: number) {
    const categoryId = Number(category_id);

    const product = await this.findOne(product_id, ['categories']);

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!product || !category) throw new HttpException('Error', 500);

    const productCategories = product.categories.map((c) => c.id);

    if (productCategories.includes(categoryId))
      throw new HttpException('Product already in category', 400);

    product.categories.push(category);
    return this.productRepository.save(product);
  }

  async removeProductToCategory(product_id: number, category_id: number) {
    const categoryId = Number(category_id);

    const product = await this.findOne(product_id, ['categories']);

    product.categories = product.categories.filter((c) => c.id !== categoryId);

    return this.productRepository.save(product);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOne(id: number, relations?: string[]): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations,
    });

    if (!product) throw new HttpException('Product not found', 404);

    return product;
  }

  async create(body: CreateProductDto) {
    const product = await this.productRepository.save(body);

    if (!product) throw new HttpException('Create product Error', 500);

    return product;
  }

  async update(product_id: number, body: CreateProductDto): Promise<Product> {
    const product = await this.findOne(product_id);

    return this.productRepository.save({
      ...product,
      ...body,
      updated_at: new Date(),
    });
  }

  async remove(product_id: number): Promise<Product> {
    const product = await this.findOne(product_id);

    return this.productRepository.remove(product);
  }
}
