import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Address } from '../entity/address.entity';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
  constructor(private addressService: AddressService) {}

  @Post()
  async create(@Body() address: Partial<Address>) {
    return this.addressService.create(address);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: Partial<Address>) {
    return this.addressService.update(id, body);
  }

  @Get()
  findAll(
    @Query('q') q: string,
    @Query('sort') sort = 'id',
    @Query('order') order = 'ASC',
  ) {
    return this.addressService.findAll({
      searchKey: q,
      sort: { [sort]: order },
    });
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.addressService.findOne(id);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.addressService.delete(id);
  }
}
