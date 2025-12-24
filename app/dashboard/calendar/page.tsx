"use client"

import { Card } from "@/components/ui/card"

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Calendar</h2>
      <Card className="min-h-[600px] flex items-center justify-center bg-muted/20 border-dashed">
          <div className="text-center">
              <h3 className="text-lg font-medium">Google Calendar Integration</h3>
              <p className="text-muted-foreground">Connect your account to view events.</p>
          </div>
      </Card>
    </div>
  )
}
