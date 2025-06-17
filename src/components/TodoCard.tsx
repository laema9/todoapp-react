"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

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

type Props = {
  todolist: Todolist;
  onUpdate: (updated: Todolist) => void;
};

export default function TodoCard({ todolist, onUpdate }: Props) {
  const [todoContent, setTodoContent] = useState("");

  const addTodo = () => {
    const content = todoContent.trim();
    if (!content) return;

    const newTodo = {
      id: Date.now().toString(),
      content,
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
