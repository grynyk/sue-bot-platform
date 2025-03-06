import { Test, TestingModule } from '@nestjs/testing';
import { BotUserService } from './bot-user.service';

describe('BotUserService', () => {
  let service: BotUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BotUserService],
    }).compile();

    service = module.get<BotUserService>(BotUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
