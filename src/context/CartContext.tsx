import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CartItem, Product } from '../types';

interface AddToCartParams {
  product: Product;
  quantity?: number;
  preparation?: string;
  instructions?: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (params: AddToCartParams) => boolean;
  removeFromCart: (itemKey: string) => void;
  updateQuantity: (itemKey: string, delta: number) => void;
  updateInstructions: (itemKey: string, instructions: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  total: number;
  hasItemsWithPendingPrice: boolean;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  lastAddedItem: { product: Product; preparation?: string; timestamp: number } | null;
}

export const getItemKey = (item: { product: Product; selectedPreparation?: string }) => {
  return `${item.product.id}_${item.selectedPreparation || 'def'}`;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'delicias_a_de_cart_v3';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedItem, setLastAddedItem] = useState<{
    product: Product;
    preparation?: string;
    timestamp: number;
  } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn('Could not save cart to localStorage', e);
    }
  }, [cart]);

  const addToCart = ({
    product,
    quantity = 1,
    preparation,
    instructions,
  }: AddToCartParams): boolean => {
    // Validation: if product has preparation options, one must be specified
    if (product.preparationOptions && product.preparationOptions.length > 0 && !preparation) {
      console.warn(`Debe seleccionar una preparación para ${product.name}`);
      return false;
    }

    const itemPrice = product.requiresPriceConfirmation ? 0 : product.price;

    setCart((prevCart) => {
      const keyToFind = `${product.id}_${preparation || 'def'}`;
      const existingIndex = prevCart.findIndex((item) => getItemKey(item) === keyToFind);

      if (existingIndex > -1) {
        const next = [...prevCart];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
          specialInstructions: instructions !== undefined ? instructions : next[existingIndex].specialInstructions,
        };
        return next;
      }

      return [
        ...prevCart,
        {
          product,
          quantity,
          selectedPreparation: preparation,
          itemPrice,
          requiresPriceConfirmation: product.requiresPriceConfirmation,
          specialInstructions: instructions,
        },
      ];
    });

    setLastAddedItem({ product, preparation, timestamp: Date.now() });
    return true;
  };

  const removeFromCart = (itemKey: string) => {
    setCart((prev) => prev.filter((item) => getItemKey(item) !== itemKey));
  };

  const updateQuantity = (itemKey: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (getItemKey(item) === itemKey) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const updateInstructions = (itemKey: string, instructions: string) => {
    setCart((prev) =>
      prev.map((item) =>
        getItemKey(item) === itemKey ? { ...item, specialInstructions: instructions } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Exact calculations without invented fees or taxes
  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0);
  }, [cart]);

  const total = subtotal;

  const hasItemsWithPendingPrice = useMemo(() => {
    return cart.some((item) => item.requiresPriceConfirmation);
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        updateInstructions,
        clearCart,
        totalItems,
        subtotal,
        total,
        hasItemsWithPendingPrice,
        isCartOpen,
        setIsCartOpen,
        lastAddedItem,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
