import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(public orderService: OrdersService) {}

  @Post()
  async create(@Body() order: any): Promise<any> {
    return this.orderService.create(order);
  }

  @Get()
  async findAll(): Promise<any[]> {
    return this.orderService.findAll();
  }

  // get orders by user id
  @Get('user/:id')
  async findOrdersByUserId(@Param('id') id: string): Promise<any[]> {
    return this.orderService.findOrdersByUserId(id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<any> {
    return this.orderService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() order: any): Promise<any> {
    return this.orderService.update(id, order);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<any> {
    return this.orderService.delete(id);
  }
}
