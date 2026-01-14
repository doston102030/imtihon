import { create } from 'zustand'; // Bu yerda { create } bo'lishi shart
import { persist } from 'zustand/middleware';

export const useProductStore = create(
  persist(
    (set) => ({
      products: [],
      addProduct: (newProduct) => 
        set((state) => ({ products: [...state.products, newProduct] })),
      removeProduct: (id) => 
        set((state) => ({ 
          products: state.products.filter(p => p.id !== id) 
        })),
    }),
    { name: 'product-storage' } // LocalStorage-ga saqlash
  )
);