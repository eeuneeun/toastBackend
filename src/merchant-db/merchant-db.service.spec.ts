import { Test, TestingModule } from '@nestjs/testing';
import { OwnerDbService } from './merchant-db.service';

describe('OwnerDbService', () => {
  let service: OwnerDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OwnerDbService],
    }).compile();

    service = module.get<OwnerDbService>(OwnerDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
