import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';

import { AddressService } from './address.service';

describe('AddressService', () => {
  let service: AddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddressService],
    })
      .useMocker((token) => {
        if (token === Repository) {
          return { findAll: jest.fn().mockResolvedValue({}) };
        }
      })
      .compile();

    service = module.get<AddressService>(AddressService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
