import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkinTypeTestProductDto } from '../dto/create-product.dto';
import { UpdateSkinTypeTestProductDto } from '../dto/update-product.dto';
import { SkinTypeTestProduct } from '../entities/product.entity';

@Injectable()
export class SkinTypeTestProductService {
  constructor(
    @InjectRepository(SkinTypeTestProduct)
    private readonly productRepository: Repository<SkinTypeTestProduct>,
  ) {}

  async createProduct(createProductDto: CreateSkinTypeTestProductDto): Promise<SkinTypeTestProduct> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async findAllProducts(): Promise<SkinTypeTestProduct[]> {
    return this.productRepository.find({ relations: ['skinTypeTestResult'] });
  }

  async findOneProduct(id: string): Promise<SkinTypeTestProduct> {
    const product = await this.productRepository.findOne({ where: { uuid: id }, relations: ['skinTypeTestResult'] });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async updateProduct(id: string, updateProductDto: UpdateSkinTypeTestProductDto): Promise<SkinTypeTestProduct> {
    const product = await this.productRepository.preload({
      uuid: id,
      ...updateProductDto,
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return this.productRepository.save(product);
  }

  async removeProduct(id: string): Promise<void> {
    const product = await this.productRepository.findOne({ where: { uuid: id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    await this.productRepository.remove(product);
  }
}