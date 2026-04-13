import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./data";

// ─── Cart Store ───
export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity }] };
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== productId),
        })),
      updateQuantity: (productId, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.product.id !== productId)
              : state.items.map((i) =>
                  i.product.id === productId ? { ...i, quantity } : i
                ),
        })),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
    }),
    { name: "craftly-cart" }
  )
);

// ─── Auth Store ───
export interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "admin";
  avatar: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}

const dummyUsers: Array<User & { password: string }> = [
  { id: "u1", name: "Jane Buyer", email: "buyer@craftly.com", password: "buyer123", role: "buyer", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop" },
  { id: "u2", name: "John Seller", email: "seller@craftly.com", password: "seller123", role: "seller", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop" },
  { id: "u3", name: "Admin User", email: "admin@craftly.com", password: "admin123", role: "admin", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop" },
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      login: (email, password) => {
        const found = dummyUsers.find((u) => u.email === email && u.password === password);
        if (found) {
          const { password: _, ...user } = found;
          set({ user, isAuthenticated: true });
          return { success: true };
        }
        return { success: false, error: "Invalid email or password" };
      },
      register: (name, email, password) => {
        if (dummyUsers.find((u) => u.email === email)) {
          return { success: false, error: "Email already registered" };
        }
        const newUser: User = {
          id: `u${Date.now()}`,
          name,
          email,
          role: "buyer",
          avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop",
        };
        dummyUsers.push({ ...newUser, password });
        set({ user: newUser, isAuthenticated: true });
        return { success: true };
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    { name: "craftly-auth" }
  )
);

// ─── Orders Store ───
export interface Order {
  id: string;
  items: CartItem[];
  totalPrice: number;
  status: "pending" | "shipped" | "delivered";
  shippingInfo: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    email: string;
  };
  createdAt: string;
}

interface OrdersState {
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => Order;
}

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (orderData) => {
        const order: Order = {
          ...orderData,
          id: `ORD-${Date.now().toString(36).toUpperCase()}`,
          status: "pending",
          createdAt: new Date().toISOString(),
        };
        set((state) => ({ orders: [order, ...state.orders] }));
        return order;
      },
    }),
    { name: "craftly-orders" }
  )
);

// ─── Wishlist Store ───
interface WishlistState {
  items: string[];
  toggle: (productId: string) => void;
  isWished: (productId: string) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (productId) =>
        set((state) => ({
          items: state.items.includes(productId)
            ? state.items.filter((id) => id !== productId)
            : [...state.items, productId],
        })),
      isWished: (productId) => get().items.includes(productId),
    }),
    { name: "craftly-wishlist" }
  )
);
