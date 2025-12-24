"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ShoppingCart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Premium Analytics Plan",
    price: "$99.00",
    description: "Advanced insights for your business.",
  },
  {
    id: 2,
    name: "CRM Pro License",
    price: "$49.00",
    description: "Unlimited contacts and pipeline stages.",
  },
  {
    id: 3,
    name: "Marketing Automation Bundle",
    price: "$199.00",
    description: "Email campaigns and automation tools.",
  },
  {
      id: 4,
      name: "Enterprise Suite",
      price: "$499.00",
      description: "Everything you need, all in one."
  }
]

export default function ShopPage() {
  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Shop</h1>
          <Button variant="outline">
              <ShoppingCart className="mr-2 h-4 w-4" /> Cart (0)
          </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="flex flex-col justify-between">
            <CardHeader>
              <CardTitle>{product.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-40 bg-muted rounded-md flex items-center justify-center mb-4">
                  <span className="text-muted-foreground">Image Placeholder</span>
              </div>
              <p className="text-2xl font-bold">{product.price}</p>
              <p className="text-muted-foreground mt-2 text-sm">{product.description}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
