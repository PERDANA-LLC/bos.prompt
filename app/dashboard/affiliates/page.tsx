import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Copy } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function AffiliatesPage() {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Affiliate Program</h2>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
              <CardHeader>
                  <CardTitle>Total Earnings</CardTitle>
                  <CardDescription>Lifetime commissions</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="text-3xl font-bold text-green-500">$1,240.50</div>
              </CardContent>
          </Card>
           <Card>
              <CardHeader>
                  <CardTitle>Active Referrals</CardTitle>
                  <CardDescription>Click-through conversions</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="text-3xl font-bold">18</div>
              </CardContent>
          </Card>
       </div>

       <Card>
           <CardHeader>
               <CardTitle>Your Affiliate Link</CardTitle>
               <CardDescription>Share this link to earn 20% commission on all sales.</CardDescription>
           </CardHeader>
           <CardContent className="flex gap-2">
               <Input value="https://example.com/ref/user123" readOnly />
               <Button variant="outline" size="icon">
                   <Copy className="h-4 w-4" />
               </Button>
           </CardContent>
       </Card>
    </div>
  )
}
