import { useState, useEffect } from 'react';
import { CartSummaryDto } from '@enterprise/types';

export function useCart() {
  const [cart, setCart] = useState<CartSummaryDto | null>(null);
  const [loading, setLoading] = useState(false);

  const refreshCart = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/v1/cart');
      if (res.ok) {
        const data = await res.json();
        setCart(data);
      }
    } catch (e) {
      console.error('Cart sync error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return { cart, loading, refreshCart };
}
