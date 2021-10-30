import React, { Component } from 'react';
import './App.css';
import TodoList from 'components/TodoList';

import initialTodos from './data/todos.json';
class App extends Component{
  state={
    todos: initialTodos,
  };
  deleteTodo=(todoId)=>{
    this.setState(prevState=>({
      todos: prevState.todos.filter(todo=>todoId!==todo.id)
    }))
  }
  render(){
    const {todos}=this.state;
    const completedTodoCount = todos.reduce((acc,todo)=>
(todo.completed? acc+1:acc),0)
    return( 
    <>
    <p>Общее количество:{todos.length}</p>
    <p>Количество выполненых:{completedTodoCount}</p>
      <TodoList  todos={todos} onDeleteTodo={this.deleteTodo}/>
      </>)
  }
};
export default App;