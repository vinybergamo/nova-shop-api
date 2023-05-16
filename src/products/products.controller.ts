import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Get } from '@nestjs/common';
import { CreateProductDto } from './dto/create.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id, ['categories']);
  }

  @Post()
  create(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: CreateProductDto) {
    return this.productsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productsService.remove(id);
  }

  @Put(':product_id/:category_id')
  addCategory(
    @Param('product_id') product_id: number,
    @Param('category_id') category_id: number,
  ) {
    return this.productsService.addProductToCategory(product_id, category_id);
  }

  @Delete(':product_id/:category_id')
  removeCategory(
    @Param('product_id') product_id: number,
    @Param('category_id') category_id: number,
  ) {
    return this.productsService.removeProductToCategory(
      product_id,
      category_id,
    );
  }
}
