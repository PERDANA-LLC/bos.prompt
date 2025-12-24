import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
    id: number
    name: string
    price: string
    description: string
}

interface CartItem extends Product {
    quantity: number
}

interface CartState {
    items: CartItem[]
    addItem: (product: Product) => void
    removeItem: (productId: number) => void
    clearCart: () => void
}

export const useCartStore = create<CartState>()(
    persist(
        (set) => ({
            items: [],
            addItem: (product) => set((state) => {
                const existingItem = state.items.find(item => item.id === product.id)
                if (existingItem) {
                    return {
                        items: state.items.map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity + 1 }
                                : item
                        )
                    }
                }
                return { items: [...state.items, { ...product, quantity: 1 }] }
            }),
            removeItem: (productId) => set((state) => ({
                items: state.items.filter(item => item.id !== productId)
            })),
            clearCart: () => set({ items: [] }),
        }),
        {
            name: 'cart-storage',
        }
    )
)
