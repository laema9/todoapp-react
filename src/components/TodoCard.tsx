import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button";

type Todo = {
    id: string;
    content: string;
    done: boolean;
}

type Todolist = {
    id: string; 
    name: string;
    todos: Todo[];
}

export default function TodoCard () {
    
    const [todolist, setTodolist] = useState<Todolist>(
        {
            id: "1", 
            name: "Ma liste",
            todos: [
                { id: "a", content: "Pratiquer FL Studio 21", done: true },
                { id: "b", content: "Pratiquer React", done: false },
                { id: "c", content: "Pratiquer React", done: false },
                { id: "d", content: "Pratiquer React", done: false },
                { id: "e", content: "Pratiquer React", done: false },
            ],
        
        })

    const [todoContent, setNewTodoContent] = useState("");

    return (
        <div>
            <h1 className="mb-2">{todolist.name}</h1>
            <ul>
                {todolist.todos.map((todo) => (
                    <li key={todo.id} className="flex mb-1 items-center gap-2">
                        <Checkbox
                            checked={todo.done}
                            onCheckedChange={() => {
                                
                                const updated = todolist.todos.map((t) => 
                                t.id === todo.id ? {...t, done: !t.done} : t
                                );

                                setTodolist({...todolist, todos: updated})
                            }}
                        /> 
                        <p className={todo.done ? "line-through text-gray-400" : ""}>{todo.content}</p>
                    </li>
                )
            )}
            </ul>
            
            <div className="mt-5 grid w-full gap-2">
            <Textarea 
                placeholder="Ajouter un todo" 
                value={todoContent}
                onChange={(e) => setNewTodoContent(e.target.value)}    
            />
            <Button
                onClick={() => {
                   const content = todoContent.trim();
                   if (!content) return; 

                   const newTodo = {
                    id: Date.now().toString(),
                    content,
                    done: false
                   };

                  const updatedTodos = [...todolist.todos, newTodo];
                  setTodolist({ ...todolist, todos: updatedTodos });
                  
                  setNewTodoContent("");

                }}

            
            
            >Add</Button>
            </div> 

        </div>
    )
   
    

}