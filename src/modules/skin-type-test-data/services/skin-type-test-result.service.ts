import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSkinTypeTestResultDto } from '../dto/create-result.dto';
import { UpdateSkinTypeTestResultDto } from '../dto/update-result.dto';
import { SkinTypeTestResult } from '../entities/result.entity';

@Injectable()
export class SkinTypeTestResultService {
  constructor(
    @InjectRepository(SkinTypeTestResult)
    private readonly resultRepository: Repository<SkinTypeTestResult>
  ) {}

  async createResult(createResultDto: CreateSkinTypeTestResultDto): Promise<SkinTypeTestResult> {
    const result = this.resultRepository.create(createResultDto);
    return this.resultRepository.save(result);
  }

  async findAllResults(): Promise<SkinTypeTestResult[]> {
    return this.resultRepository.find({ relations: ['products'] });
  }

  async findOneResult(id: string): Promise<SkinTypeTestResult> {
    const result = await this.resultRepository.findOne({ where: { uuid: id }, relations: ['products'] });
    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    return result;
  }

  async updateResult(id: string, updateResultDto: UpdateSkinTypeTestResultDto): Promise<SkinTypeTestResult> {
    const result = await this.resultRepository.preload({
      uuid: id,
      ...updateResultDto,
    });
    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    return this.resultRepository.save(result);
  }

  async removeResult(id: string): Promise<void> {
    const result = await this.resultRepository.findOne({ where: { uuid: id } });
    if (!result) {
      throw new NotFoundException(`Result with ID ${id} not found`);
    }
    await this.resultRepository.remove(result);
  }
}
