"use client"

import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Task {
    id: string;
    title: string;
}

interface Column {
    id: string;
    title: string;
    tasks: Task[];
}

const initialData: Column[] = [
    {
        id: 'todo',
        title: 'Leads',
        tasks: [
            { id: '1', title: 'Call Client A' },
            { id: '2', title: 'Email Prospect B' },
        ],
    },
    {
        id: 'in-progress',
        title: 'In Discussion',
        tasks: [
            { id: '3', title: 'Negotiate Contract C' },
        ],
    },
    {
        id: 'done',
        title: 'Closed',
        tasks: [
            { id: '4', title: 'Onboard Client D' },
        ],
    },
];

function SortableItem(props: any) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="mb-2">
            <Card className="cursor-grab hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                    {props.children}
                </CardContent>
            </Card>
        </div>
    );
}

export function KanbanBoard() {
    const [columns, setColumns] = useState(initialData);
    const [activeId, setActiveId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    function handleDragStart(event: any) {
        setActiveId(event.active.id);
    }

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (active.id !== over.id) {
            // Complex logic needed here for moving between columns
            // For this simplified demo, we just console log the intention
            console.log('Dragged', active.id, 'over', over.id);
            // In a real implementation, we would update the state to move the item between arrays
        }
        
        setActiveId(null);
    }

    return (
        <DndContext 
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
        >
            <div className="flex gap-4 overflow-x-auto pb-4">
                {columns.map((col) => (
                    <div key={col.id} className="min-w-[300px] w-[300px] bg-muted/30 p-4 rounded-lg">
                        <h3 className="font-semibold mb-4 text-lg">{col.title}</h3>
                        <SortableContext 
                            items={col.tasks.map(t => t.id)}
                            strategy={verticalListSortingStrategy}
                        >
                            {col.tasks.map((task) => (
                                <SortableItem key={task.id} id={task.id}>
                                    {task.title}
                                </SortableItem>
                            ))}
                        </SortableContext>
                        <Button variant="ghost" className="w-full mt-2 text-muted-foreground">+ Add Card</Button>
                    </div>
                ))}
            </div>
             <DragOverlay>
                {activeId ? (
                   <Card className="opacity-80">
                        <CardContent className="p-4">
                            Dragging...
                        </CardContent>
                    </Card>
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
