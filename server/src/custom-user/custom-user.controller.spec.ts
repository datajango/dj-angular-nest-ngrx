import { Test, TestingModule } from '@nestjs/testing';
import { CustomUserController } from './custom-user.controller';

describe('CustomUser Controller', () => {
  let controller: CustomUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomUserController],
    }).compile();

    controller = module.get<CustomUserController>(CustomUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
