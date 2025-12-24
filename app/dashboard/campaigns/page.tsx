import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Plus } from "lucide-react"

export default function CampaignsPage() {
  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Email Campaigns</h2>
          <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Campaign
          </Button>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
              <CardHeader>
                  <CardTitle>Welcome Series</CardTitle>
                  <CardDescription>Automated • Sent to 120 users</CardDescription>
              </CardHeader>
              <CardContent>
                  <div className="text-2xl font-bold">45%</div>
                  <p className="text-xs text-muted-foreground">Open Rate</p>
              </CardContent>
          </Card>
          
           <Card>
              <CardHeader>
                  <CardTitle>Monthly Newsletter</CardTitle>
                  <CardDescription>Draft • Last edited 2 hours ago</CardDescription>
              </CardHeader>
              <CardContent>
                  <Button variant="outline" className="w-full">Edit</Button>
              </CardContent>
          </Card>
       </div>
    </div>
  )
}
