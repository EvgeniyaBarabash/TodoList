import React, { Component } from 'react';
import './App.css';
import shortid from 'shortid';
import TodoList from 'components/TodoList';
import TodoEditor from 'components/TodoList/TodoEitor';
import initialTodos from './data/todos.json';
import Filter from './components/TodoList/Filter';
class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
  };
  addTodo = text => {
    const todo = {
      id: shortid.generate(),
      text,
      completed: false,
    };
    // this.setState(prevState => ({
    //   todos: [todo, ...prevState.todos],
    // }));
    this.setState(({ todos }) => ({
      todos: [todo, ...todos],
    }));
  };

  deleteTodo = todoId => {
    this.setState(prevState => ({
      todos: prevState.todos.filter(todo => todoId !== todo.id),
    }));
  };
  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  toggleCompleted = todoId => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  };
  calculateCompletedTodos=()=>{
    const { todos} = this.state;
    return todos.reduce(
      (acc, todo) => (todo.completed ? acc + 1 : acc),
      0,
    );
  }
  getVisibleTodos=()=>{
const {filter, todos}=this.state;
const normalizedFilter=filter.toLowerCase();
return todos.filter(todo=>
  todo.text.toLowerCase().includes(normalizedFilter))
  };
  render() {
    const {filter, todos}=this.state;
    const completedTodoCount= this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();
    return (
      <>
        <p>Общее количество:{todos.length}</p>
        <p>Количество выполненых:{completedTodoCount}</p>
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />
        <TodoEditor onSubmit={this.addTodo} />
        <Filter value={filter} onChange={this.changeFilter} />
      </>
    );
  }
}
export default App;
