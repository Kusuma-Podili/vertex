import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { CreateOrderDto } from '@enterprise/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async createOrder(@Req() req: any, @Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(req.user.userId, dto);
  }

  @Get()
  async getMyOrders(@Req() req: any) {
    return this.ordersService.getUserOrders(req.user.userId);
  }

  @Get(':id')
  async getOrderDetail(@Req() req: any, @Param('id') id: string) {
    return this.ordersService.getOrderDetail(req.user.userId, id);
  }
}
