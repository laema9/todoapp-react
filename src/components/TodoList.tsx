"use client";

import { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import type { Layout } from "react-grid-layout";

import { GripVertical } from "lucide-react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const initialWidgets = [
  { id: "1", 
    name: "My list", 
    content: "[Test]",
    todos: [
        { id: "a", content: "Première tâche", done: false },
    ]

},
];

type Todo = {
    id: string;
    content: string;
    done: boolean;
}

type Widget = {
  id: string;
  name: string;
  content: string;
  todos?: Todo[];
};

export default function Dashboard() {
  const [widgets, setWidgets ] = useState<Widget[]>(initialWidgets);
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({});
  const [newTodo, setNewTodo] = useState<{ [key: string]: Layout[] }>({});

  useEffect(() => {
    // Génère un layout par breakpoint
    const defaultLayout: Layout[] = widgets.map((w, i) => ({
      i: w.id,
      x: (i % 3) * 4,
      y: Math.floor(i / 3) * 6,
      w: 4,
      h: 6,
    }));

    setLayouts({
      lg: defaultLayout,
    });
  }, [widgets]);

  const handleLayoutChange = (_: Layout[], allLayouts: { [key: string]: Layout[] }) => {
    setLayouts(allLayouts);
  };

  return (
    <main className="">
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 2 }}
        rowHeight={30}
        margin={[16, 16]}
        isResizable
        isDraggable
        onLayoutChange={handleLayoutChange}
        draggableHandle=".drag-handle"
        compactType="vertical"
      >
        {widgets.map((widget) => (
          <div key={widget.id} className="bg-card rounded-2xl shadow p-4 flex flex-col">
            <div className="flex items-center justify-between mb-2 drag-handle cursor-move">
              <h3 className="text-lg font-semibold">{widget.name}</h3>
              <GripVertical className="opacity-50" />
            </div>
            <div className="text-sm text-muted-foreground">{widget.content}</div>

            <div>
                


            </div>    

          </div>
        ))}
      </ResponsiveGridLayout>
    </main>
  );
}
