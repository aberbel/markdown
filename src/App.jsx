import React, { useState, useEffect } from 'react';
import './App.css';
import TodoInput from './components/TodoInput.jsx';
import TodoList from './components/TodoList.jsx';
import FilterButtons from './components/FilterButtons.jsx';

function App() {
  // Estado para las tareas
  const [todos, setTodos] = useState([]);
  // Estado para el filtro actual
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Cargar tareas desde localStorage al iniciar la aplicación
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        console.error('Error al cargar tareas:', error);
      }
    }
  }, []);

  // Guardar tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Función para agregar una nueva tarea
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(), // ID único basado en timestamp
      text: text,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  // Función para marcar/desmarcar tarea como completada
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Función para eliminar una tarea
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Función para eliminar todas las tareas completadas
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Filtrar tareas según el filtro actual
  const getFilteredTodos = () => {
    switch (filter) {
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'completed':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  // Contar tareas pendientes
  const activeTodosCount = todos.filter((todo) => !todo.completed).length;
  const completedTodosCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>📝 Lista de Tareas</h1>
          <p className="subtitle">Organiza tus tareas de manera eficiente</p>
        </header>

        {/* Input para agregar nuevas tareas */}
        <TodoInput onAddTodo={addTodo} />

        {/* Contador de tareas */}
        {todos.length > 0 && (
          <div className="counter">
            <span className="counter-item">
              ✅ {activeTodosCount} pendiente{activeTodosCount !== 1 ? 's' : ''}
            </span>
            {completedTodosCount > 0 && (
              <span className="counter-item">
                ✔️ {completedTodosCount} completada{completedTodosCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
        )}

        {/* Botones de filtro */}
        {todos.length > 0 && (
          <FilterButtons
            currentFilter={filter}
            onFilterChange={setFilter}
            hasCompleted={completedTodosCount > 0}
            onClearCompleted={clearCompleted}
          />
        )}

        {/* Lista de tareas */}
        <TodoList
          todos={getFilteredTodos()}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
        />

        {/* Mensaje cuando no hay tareas */}
        {todos.length === 0 && (
          <div className="empty-state">
            <p>🎉 ¡No tienes tareas!</p>
            <p className="empty-subtitle">Agrega una nueva tarea para comenzar</p>
          </div>
        )}

        {/* Mensaje cuando el filtro no tiene resultados */}
        {todos.length > 0 && getFilteredTodos().length === 0 && (
          <div className="empty-state">
            <p>📭 No hay tareas {filter === 'active' ? 'pendientes' : 'completadas'}</p>
          </div>
        )}

        {/* Footer */}
        <footer className="footer">
          <p>Hecho con ❤️ usando React</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
