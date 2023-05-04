
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDocument } from './orders.schema';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Order') private orderModel: Model<OrderDocument>) {}

  async create(order: any): Promise<any> {
    const createdOrder = new this.orderModel(order);
    return createdOrder.save();
  }

  async findAll(): Promise<any[]> {
    return this.orderModel.find().exec();
  }

  async findOne(id: string): Promise<any> {
    return this.orderModel.findById(id).exec();
  }

  async update(id: string, order: any): Promise<any> {
    return this.orderModel.findByIdAndUpdate(id, order, { new: true }).exec();
  }


  // get orders by user id
  async findOrdersByUserId(id: string): Promise<any[]> {
    return this.orderModel.find({ userId: id }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.orderModel.findByIdAndRemove(id).exec();
  }

}
