import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox"

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
            ],
        
        })

    return (
        <div>
            <h1>{todolist.name}</h1>

            <ul>
                {todolist.todos.map((todo) => (
                    <li key={todo.id} className="flex items-center gap-2">
                        
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
        </div>
    )
   
    

}