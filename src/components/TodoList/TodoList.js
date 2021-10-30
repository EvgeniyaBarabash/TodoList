import React from "react";

const TodoList=({todos, onDeleteTodo})=>{
return <ul>
{todos.map(({id,text})=>(
    <li key={id}>
        <p>{text}</p>
        <button onClick={()=>onDeleteTodo(id)}>Удалить</button>
    </li>
))}
</ul>
}
export default TodoList;