import React, { Component } from 'react';
import './App.css';
import shortid from 'shortid';
import TodoList from 'components/TodoList';
import TodoEditor from 'components/TodoList/TodoEitor';
import initialTodos from './data/todos.json';
import Filter from './components/TodoList/Filter';
import Modal from './components/Modal/Modal';
import IconButton from 'components/IconButton/IconButton';
import { ReactComponent as AddIcon } from './components/icons/add.svg';
class App extends Component {
  state = {
    todos: initialTodos,
    filter: '',
    showModal: false,
  };
  componentDidUpdate(prevProps, prevState) {
    if (this.state.todos !== prevState.todos) {
      localStorage.setItem('todos', JSON.stringify(this.state.todos));
    }
    // if(
    //   this.state.todos.length>prevState.todos.length &&
    //   prevState.todos.length !==0){
    //     this.toggleModal();
    //   }
  }
  componentDidMount() {
    const todos = localStorage.getItem('todos');
    const parseTodos = JSON.parse(todos);
    console.log(parseTodos);
    if (parseTodos) {
      this.setState({ todos: parseTodos });
    }
  }
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
  calculateCompletedTodos = () => {
    const { todos } = this.state;
    return todos.reduce((acc, todo) => (todo.completed ? acc + 1 : acc), 0);
  };
  getVisibleTodos = () => {
    const { filter, todos } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return todos.filter(todo =>
      todo.text.toLowerCase().includes(normalizedFilter),
    );
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { filter, todos, showModal } = this.state;
    const completedTodoCount = this.calculateCompletedTodos();
    const visibleTodos = this.getVisibleTodos();
    return (
      <>
        <IconButton onClick={this.toggleModal} aria-label="Добавить todo">
          <AddIcon width="32" fill="#fff" />
        </IconButton>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <button type="button" className="btn" onClick={this.toggleModal}>
              Close
            </button>{' '}
            <TodoEditor onSubmit={this.addTodo} />
          </Modal>
        )}
        <p>Общее количество:{todos.length}</p>
        <p>Количество выполненых:{completedTodoCount}</p>
        <TodoList
          todos={visibleTodos}
          onDeleteTodo={this.deleteTodo}
          onToggleCompleted={this.toggleCompleted}
        />

        <Filter value={filter} onChange={this.changeFilter} />
      </>
    );
  }
}
export default App;
