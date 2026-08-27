import { Injectable } from '@nestjs/common';
import { AddToCartDto, UpdateCartItemDto, CartSummaryDto } from '@enterprise/types';
import { CartPricingService } from './cart-pricing.service';
import { CouponService } from './coupon.service';

export interface InternalCartItem {
  itemId: string;
  productId: string;
  variantId: string;
  title: string;
  variantName: string;
  sku: string;
  imageUrl: string;
  unitPrice: number;
  quantity: number;
}

@Injectable()
export class CartService {
  private carts = new Map<string, { items: InternalCartItem[]; couponCode?: string }>();

  constructor(
    private readonly pricingService: CartPricingService,
    private readonly couponService: CouponService,
  ) {}

  async getCartSummary(cartId: string): Promise<CartSummaryDto> {
    const cart = this.carts.get(cartId) || { items: [] };
    return this.pricingService.calculateCartTotals(cartId, cart.items, cart.couponCode);
  }

  async addItem(cartId: string, dto: AddToCartDto): Promise<CartSummaryDto> {
    let cart = this.carts.get(cartId);
    if (!cart) {
      cart = { items: [] };
      this.carts.set(cartId, cart);
    }

    const existing = cart.items.find(i => i.variantId === dto.variantId);
    if (existing) {
      existing.quantity += dto.quantity;
    } else {
      cart.items.push({
        itemId: `item-${Date.now()}`,
        productId: dto.productId,
        variantId: dto.variantId,
        title: 'Aurora Pro ANC Wireless Headphones',
        variantName: 'Midnight Black',
        sku: 'AURORA-BLK',
        imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        unitPrice: 349.99,
        quantity: dto.quantity,
      });
    }

    return this.getCartSummary(cartId);
  }

  async updateItem(cartId: string, dto: UpdateCartItemDto): Promise<CartSummaryDto> {
    const cart = this.carts.get(cartId);
    if (!cart) return this.getCartSummary(cartId);

    if (dto.quantity <= 0) {
      cart.items = cart.items.filter(i => i.itemId !== dto.itemId);
    } else {
      const item = cart.items.find(i => i.itemId === dto.itemId);
      if (item) item.quantity = dto.quantity;
    }

    return this.getCartSummary(cartId);
  }

  async removeItem(cartId: string, itemId: string): Promise<CartSummaryDto> {
    const cart = this.carts.get(cartId);
    if (cart) {
      cart.items = cart.items.filter(i => i.itemId !== itemId);
    }
    return this.getCartSummary(cartId);
  }

  async applyCoupon(cartId: string, code: string): Promise<CartSummaryDto> {
    const cart = this.carts.get(cartId);
    if (cart) {
      await this.couponService.validateCoupon(code);
      cart.couponCode = code.toUpperCase();
    }
    return this.getCartSummary(cartId);
  }
}
