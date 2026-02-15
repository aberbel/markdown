import React from 'react';
import './FilterButtons.css';

function FilterButtons({ currentFilter, onFilterChange, hasCompleted, onClearCompleted }) {
  return (
    <div className="filter-container">
      <div className="filter-buttons">
        <button
          className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange('all')}
        >
          📋 Todas
        </button>
        <button
          className={`filter-btn ${currentFilter === 'active' ? 'active' : ''}`}
          onClick={() => onFilterChange('active')}
        >
          ⏳ Activas
        </button>
        <button
          className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`}
          onClick={() => onFilterChange('completed')}
        >
          ✅ Completadas
        </button>
      </div>
      
      {hasCompleted && (
        <button
          className="clear-completed-btn"
          onClick={onClearCompleted}
          title="Eliminar todas las tareas completadas"
        >
          🗑️ Limpiar completadas
        </button>
      )}
    </div>
  );
}

export default FilterButtons;
