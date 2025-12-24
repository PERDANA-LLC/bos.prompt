"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <hr className="border-muted" />
      
      <div className="grid gap-6">
          <Card>
              <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>Update your personal details here.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="grid gap-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" placeholder="John Doe" />
                  </div>
                   <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" placeholder="john@example.com" disabled />
                  </div>
              </CardContent>
              <CardFooter>
                  <Button>Save Changes</Button>
              </CardFooter>
          </Card>
      </div>
    </div>
  )
}
