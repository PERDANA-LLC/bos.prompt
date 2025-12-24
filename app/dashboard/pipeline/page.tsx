"use client"

import { KanbanBoard } from "@/components/dashboard/kanban-board"
import { Button } from "@/components/ui/button"

export default function PipelinePage() {
  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Sales Pipeline</h2>
            <p className="text-muted-foreground">Manage your deals and progress track.</p>
          </div>
          <Button>New Deal</Button>
      </div>
      <div className="flex-1 overflow-hidden">
          <KanbanBoard />
      </div>
    </div>
  )
}
