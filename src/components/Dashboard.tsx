"use client";

import { useEffect, useState } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import type { Layout } from "react-grid-layout";

import { Button } from "@/components/ui/button";
import { GripVertical, X } from "lucide-react";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import TodoCard from "./TodoCard";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/components/hooks/use-media-query";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

const ResponsiveGridLayout = WidthProvider(Responsive);

type Todo = {
  id: string;
  content: string;
  priority: string;
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
    todos: [
      { id: "a", content: "Faire du React", priority: "Important", done: false },
    ],
  },
];

export default function Dashboard() {
  const [lists, setLists] = useState<Todolist[]>(initialLists);
  const [layouts, setLayouts] = useState<{ [key: string]: Layout[] }>({});
  const [newListName, setNewListName] = useState("");
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

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

  const deleteList = (id: string) => {
    setLists((prev) => prev.filter((list) => list.id !== id));
  };

  const createNewList = () => {
    const name = newListName.trim();
    if (!name) return;

    const newList: Todolist = {
      id: Date.now().toString(),
      name,
      todos: [],
    };
    setLists([...lists, newList]);
    setNewListName("");
    setOpen(false);
  };

  return (
    <main className="sm:p-4">
      <div className="flex justify-center mb-4">
        {isDesktop ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button>+ Ajouter une liste</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[400px]">
              <DialogHeader>
                <DialogTitle>Nom de la nouvelle liste</DialogTitle>
              </DialogHeader>
              <Input
                value={newListName}
                onChange={(e) => setNewListName(e.target.value)}
                placeholder="Ex: Liste de travail"
              />
              <Button onClick={createNewList} className="mt-2 w-full">
                Créer
              </Button>
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button>+ Ajouter une liste</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Nom de la nouvelle liste</DrawerTitle>
              </DrawerHeader>
              <div className="px-4 pb-4">
                <Input
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  placeholder="Ex: Courses, Travail..."
                />
                <Button onClick={createNewList} className="mt-2 w-full">
                  Créer
                </Button>
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Annuler</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        )}
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
          <div
            key={list.id}
            className="relative bg-card rounded-2xl shadow p-4 flex flex-col h-full"
          >
            <div className="drag-handle cursor-move mb-2">
              <GripVertical className="opacity-50" />
            </div>

            <X
              className="absolute top-2 right-2 w-5 h-5 text-muted-foreground hover:text-white cursor-pointer z-10"
              onClick={(e) => {
                e.stopPropagation();
                deleteList(list.id);
              }}
            />

            <TodoCard todolist={list} onUpdate={updateList} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </main>
  );
}
