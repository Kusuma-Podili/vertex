import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CartService } from './services/cart.service';
import { AddToCartDto, UpdateCartItemDto } from '@enterprise/types';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  async getCart(@Req() req: any) {
    const cartId = req.headers['x-cart-id'] || 'default-cart';
    return this.cartService.getCartSummary(cartId);
  }

  @Post('items')
  async addItem(@Body() dto: AddToCartDto, @Req() req: any) {
    const cartId = req.headers['x-cart-id'] || 'default-cart';
    return this.cartService.addItem(cartId, dto);
  }

  @Put('items')
  async updateItem(@Body() dto: UpdateCartItemDto, @Req() req: any) {
    const cartId = req.headers['x-cart-id'] || 'default-cart';
    return this.cartService.updateItem(cartId, dto);
  }

  @Delete('items/:itemId')
  async removeItem(@Param('itemId') itemId: string, @Req() req: any) {
    const cartId = req.headers['x-cart-id'] || 'default-cart';
    return this.cartService.removeItem(cartId, itemId);
  }

  @Post('coupon')
  async applyCoupon(@Body('code') code: string, @Req() req: any) {
    const cartId = req.headers['x-cart-id'] || 'default-cart';
    return this.cartService.applyCoupon(cartId, code);
  }
}
