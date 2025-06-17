"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useMediaQuery } from "@/components/hooks/use-media-query";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

type Props = {
  todolist: Todolist;
  onUpdate: (updated: Todolist) => void;
};

export default function TodoCard({ todolist, onUpdate }: Props) {
  const [todoContent, setTodoContent] = useState("");
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [priorityInput, setPriorityInput] = useState("");
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const updatePriority = () => {
    if (!selectedTodoId) return;

    const updatedTodos = todolist.todos.map((todo) =>
      todo.id === selectedTodoId ? { ...todo, priority: priorityInput } : todo
    );

    onUpdate({ ...todolist, todos: updatedTodos });
    setOpen(false); 
    setSelectedTodoId(null);
    setPriorityInput("");
  };

  const addTodo = () => {
    const content = todoContent.trim();
    if (!content) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      content,
      priority: "Important",
      done: false,
    };

    onUpdate({ ...todolist, todos: [...todolist.todos, newTodo] });
    setTodoContent("");
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todolist.todos.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    onUpdate({ ...todolist, todos: updatedTodos });
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todolist.todos.filter((t) => t.id !== id);
    onUpdate({ ...todolist, todos: updatedTodos });
  };

  return (
    <div className="flex flex-col h-full">
      <h1 className="mb-2 text-xl font-bold">{todolist.name}</h1>

      <div className="flex-1 overflow-auto pr-1">
        <ul>
          {todolist.todos.map((todo) => (
            <li key={todo.id} className="flex mb-1 items-center gap-2">
              <Checkbox
                checked={todo.done}
                onCheckedChange={() => toggleTodo(todo.id)}
              />
              <p className={todo.done ? "line-through text-gray-400" : ""}>
                {todo.content}
              </p>

              {isDesktop ? (
                // Desktop : Dialog
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Badge
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedTodoId(todo.id);
                        setPriorityInput(todo.priority || "");
                      }}
                    >
                      {todo.priority || "Priorité"}
                    </Badge>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Modifier la priorité</DialogTitle>
                    </DialogHeader>
                    <Input
                      value={priorityInput}
                      onChange={(e) => setPriorityInput(e.target.value)}
                      placeholder="Ex: Urgent, Basse, Moyenne..."
                    />
                    <Button onClick={updatePriority} className="mt-2">
                      Enregistrer
                    </Button>
                  </DialogContent>
                </Dialog>
              ) : (
                // Mobile : Drawer
                <Drawer open={open} onOpenChange={setOpen}>
                  <DrawerTrigger asChild>
                    <Badge
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => {
                        setSelectedTodoId(todo.id);
                        setPriorityInput(todo.priority || "");
                      }}
                    >
                      {todo.priority || "Priorité"}
                    </Badge>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Modifier la priorité</DrawerTitle>
                    </DrawerHeader>
                    <div className="px-4 pb-4 space-y-2">
                      <Input
                        value={priorityInput}
                        onChange={(e) => setPriorityInput(e.target.value)}
                        placeholder="Ex: Urgent, Basse, Moyenne..."
                      />
                      <Button onClick={updatePriority} className="w-full">
                        Enregistrer
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

              <X
                className="text-gray-400 w-[15px] hover:text-white ml-2 cursor-pointer"
                onClick={() => deleteTodo(todo.id)}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-2 border-t">
        <Textarea
          placeholder="Ajouter un todo"
          value={todoContent}
          onChange={(e) => setTodoContent(e.target.value)}
          className="mb-2"
        />
        <Button onClick={addTodo} className="w-full">
          Ajouter
        </Button>
      </div>
    </div>
  );
}
