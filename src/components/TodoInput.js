import React, { useState } from 'react';
import './TodoInput.css';

function TodoInput({ onAddTodo }) {
  const [inputValue, setInputValue] = useState('');

  // Manejar el cambio en el input
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Manejar el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validar que el input no esté vacío
    const trimmedValue = inputValue.trim();
    if (trimmedValue === '') {
      return;
    }

    // Agregar la tarea
    onAddTodo(trimmedValue);
    
    // Limpiar el input
    setInputValue('');
  };

  // Manejar la tecla Enter
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form className="todo-input-container" onSubmit={handleSubmit}>
      <input
        type="text"
        className="todo-input"
        placeholder="¿Qué necesitas hacer hoy?"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        autoFocus
      />
      <button 
        type="submit" 
        className="add-button"
        disabled={inputValue.trim() === ''}
      >
        ➕ Agregar
      </button>
    </form>
  );
}

export default TodoInput;
