"use client"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/lib/store/cart-store"
import { Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function CartPage() {
    // In a real app we'd handle hydration issues with persist middleware slightly differently or use a client-only wrapper
    const { items, removeItem, clearCart } = useCartStore()

    const [loading, setLoading] = useState(false);

    const onCheckout = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: items,
                }),
            });

            if (!response.ok) {
                // Handle error
                console.error("Checkout failed");
                return;
            }

            const data = await response.json();
            window.location.href = data.url;
        } catch (error) {
            console.error("Something went wrong", error);
        } finally {
            setLoading(false);
        }
    }

    const total = items.reduce((acc, item) => {
        const price = parseFloat(item.price.replace('$', ''))
        return acc + price * item.quantity
    }, 0)

    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
            
            {items.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-muted-foreground mb-4">Your cart is empty.</p>
                    <Link href="/shop">
                        <Button>Continue Shopping</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-4">
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground">{item.price} x {item.quantity}</p>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                </Button>
                            </div>
                        ))}
                         <Button variant="outline" onClick={clearCart} className="mt-4">Clear Cart</Button>
                    </div>
                    
                    <div className="p-6 border rounded-lg h-fit bg-muted/20">
                        <h3 className="text-lg font-semibold mb-4">Summary</h3>
                        <div className="flex justify-between mb-2">
                            <span>Subtotal</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-4 font-bold text-lg">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                        <Button className="w-full" size="lg" onClick={onCheckout} disabled={loading}>
                            {loading ? "Processing..." : "Proceed to Checkout"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
