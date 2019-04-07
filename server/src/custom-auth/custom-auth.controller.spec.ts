import { Test, TestingModule } from '@nestjs/testing';
import { CustomAuthController } from './custom-auth.controller';

describe('CustomAuth Controller', () => {
  let controller: CustomAuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomAuthController],
    }).compile();

    controller = module.get<CustomAuthController>(CustomAuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
