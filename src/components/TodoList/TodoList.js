import React from 'react';
import './Todolist.scss';
const TodoList = ({ todos, onDeleteTodo, onToggleCompleted }) => {
  return (
    <ul className="TodoList">
      {todos.map(({ id, text, completed }) => (
        <li
          key={id}
          className={completed ? 'TodoList__item TodoList__item--completed' : 'TodoList__item'}
        >
          <input
            type="checkbox"
            className="TodoList__chekbox"
            checked={completed}
            onChange={() => onToggleCompleted(id)}
          />
          <p className="TodoList__text">{text}</p>
          <button
            type="button"
            className="TodoList__btn"
            onClick={() => onDeleteTodo(id)}
          >
            Удалить
          </button>
        </li>
      ))}
    </ul>
  );
};
export default TodoList;
