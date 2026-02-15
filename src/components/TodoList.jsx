import React from 'react';
import './TodoList.css';
import TodoItem from './TodoItem.jsx';

function TodoList({ todos, onToggleTodo, onDeleteTodo }) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggleTodo}
          onDelete={onDeleteTodo}
        />
      ))}
    </div>
  );
}

export default TodoList;
