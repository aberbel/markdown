import React from 'react';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete }) {
  // Manejar el toggle del checkbox
  const handleToggle = () => {
    onToggle(todo.id);
  };

  // Manejar la eliminación
  const handleDelete = () => {
    onDelete(todo.id);
  };

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <label className="checkbox-container">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="checkbox"
        />
        <span className="checkmark"></span>
      </label>
      
      <span className="todo-text">{todo.text}</span>
      
      <button
        className="delete-button"
        onClick={handleDelete}
        title="Eliminar tarea"
      >
        🗑️
      </button>
    </div>
  );
}

export default TodoItem;
