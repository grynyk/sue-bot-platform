import { Test, TestingModule } from '@nestjs/testing';
import { BotUserController } from './bot-user.controller';
import { BotUserService } from './bot-user.service';

describe('BotUserController', () => {
  let controller: BotUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BotUserController],
      providers: [BotUserService],
    }).compile();

    controller = module.get<BotUserController>(BotUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
