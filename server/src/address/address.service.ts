import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, FindManyOptions, ILike, Repository } from 'typeorm';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';

import { Address } from '../entity/address.entity';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address) private addressRepository: Repository<Address>,
  ) {}

  findAll({
    searchKey,
    sort,
  }: {
    searchKey?: string;
    sort?: {
      [P in EntityFieldsNames<Address>]?: 'ASC' | 'DESC' | 1 | -1;
    };
  }): Promise<Address[]> {
    const options: FindManyOptions = { order: { id: 'ASC' } };
    if (searchKey) {
      const q = `%${searchKey}%`;
      options.where = [
        { line1: ILike(q) },
        { city: ILike(q) },
        { state: ILike(q) },
        { zip: ILike(q) },
      ];
    }
    if (sort) {
      options.order = sort;
    }
    return this.addressRepository.find(options);
  }

  findOne(id: number): Promise<Address> {
    return this.addressRepository.findOne(id);
  }

  create(address: Partial<Address>): Promise<Address> {
    return this.addressRepository.save(address);
  }

  async update(id: number, partial: Partial<Address>): Promise<Address> {
    partial.id = id;
    const address = await this.addressRepository.findOneOrFail(partial.id);
    if (!address) {
      throw new NotFoundException('Address not found');
    }
    await this.addressRepository.update(partial.id, partial);
    return this.findOne(partial.id);
  }

  delete(id: number): Promise<DeleteResult> {
    return this.addressRepository.delete(id);
  }
}
