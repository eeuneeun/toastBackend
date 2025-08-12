import { Test, TestingModule } from '@nestjs/testing';
import { OwnerDbController } from './owner-db.controller';
import { OwnerDbService } from './owner-db.service';

describe('OwnerDbController', () => {
  let controller: OwnerDbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OwnerDbController],
      providers: [OwnerDbService],
    }).compile();

    controller = module.get<OwnerDbController>(OwnerDbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
