"use client";

import { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import type { Layout } from "react-grid-layout";

import { Button } from "@/components/ui/button";
import { GripVertical } from "lucide-react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import TodoCard from "./TodoCard";

const ResponsiveGridLayout = WidthProvider(Responsive);

type Todo = {
  id: string;
  content: string;
  done: boolean;
};

type Todolist = {
  id: string;
  name: string;
  todos: Todo[];
};

const initialLists: Todolist[] = [
  {
    id: "1",
    name: "Liste 1",
    todos: [{ id: "a", content: "Faire du React", done: false }],
  },
];

export default function Dashboard() {
  const [lists, setLists] = useState<Todolist[]>(initialLists);
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({});

  useEffect(() => {
    const defaultLayout: Layout[] = lists.map((list, i) => ({
      i: list.id,
      x: (i % 3) * 4,
      y: Math.floor(i / 3) * 6,
      w: 4,
      h: 8,
      minW: 2,
      minH: 6,
    }));

    setLayouts({ lg: defaultLayout });
  }, [lists]);

  const handleLayoutChange = (_: Layout[], allLayouts: { [key: string]: Layout[] }) => {
    setLayouts(allLayouts);
  };

  const updateList = (updated: Todolist) => {
    setLists((prev) =>
      prev.map((list) => (list.id === updated.id ? updated : list))
    );
  };

  const addNewList = () => {
    const newList: Todolist = {
      id: Date.now().toString(),
      name: `Nouvelle liste`,
      todos: [],
    };
    setLists([...lists, newList]);
  };

  return (
    <main className="sm:p-4">
      <div className="mb-4">
        <Button onClick={addNewList}>+ Ajouter une liste</Button>
      </div>

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
        {lists.map((list) => (
          <div key={list.id} className="bg-card rounded-2xl shadow p-4 flex flex-col h-full">
            <div className="flex items-center justify-between mb-2 drag-handle cursor-move">
              <GripVertical className="opacity-50" />
            </div>
            <TodoCard todolist={list} onUpdate={updateList} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </main>
  );
}
