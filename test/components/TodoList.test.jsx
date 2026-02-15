import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import TodoList from '../../src/components/TodoList.jsx';

describe('TodoList Component', () => {
  it('should render empty list correctly', () => {
    const { container } = render(
      <TodoList todos={[]} onToggleTodo={vi.fn()} onDeleteTodo={vi.fn()} />
    );
    
    const todoList = container.querySelector('.todo-list');
    expect(todoList).toBeInTheDocument();
    expect(todoList.children).toHaveLength(0);
  });

  it('should render multiple TodoItems', () => {
    const todos = [
      { id: 1, text: 'First task', completed: false },
      { id: 2, text: 'Second task', completed: true },
      { id: 3, text: 'Third task', completed: false },
    ];
    
    render(<TodoList todos={todos} onToggleTodo={vi.fn()} onDeleteTodo={vi.fn()} />);
    
    expect(screen.getByText('First task')).toBeInTheDocument();
    expect(screen.getByText('Second task')).toBeInTheDocument();
    expect(screen.getByText('Third task')).toBeInTheDocument();
  });

  it('should pass props correctly to TodoItem', () => {
    const todos = [{ id: 1, text: 'Test task', completed: false }];
    const onToggleTodo = vi.fn();
    const onDeleteTodo = vi.fn();
    
    render(
      <TodoList todos={todos} onToggleTodo={onToggleTodo} onDeleteTodo={onDeleteTodo} />
    );
    
    // Verify TodoItem is rendered with correct props
    expect(screen.getByText('Test task')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByTitle('Eliminar tarea')).toBeInTheDocument();
  });

  it('should render all completed tasks', () => {
    const todos = [
      { id: 1, text: 'Completed 1', completed: true },
      { id: 2, text: 'Completed 2', completed: true },
    ];
    
    render(<TodoList todos={todos} onToggleTodo={vi.fn()} onDeleteTodo={vi.fn()} />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => {
      expect(checkbox).toBeChecked();
    });
  });

  it('should render all pending tasks', () => {
    const todos = [
      { id: 1, text: 'Pending 1', completed: false },
      { id: 2, text: 'Pending 2', completed: false },
    ];
    
    render(<TodoList todos={todos} onToggleTodo={vi.fn()} onDeleteTodo={vi.fn()} />);
    
    const checkboxes = screen.getAllByRole('checkbox');
    checkboxes.forEach(checkbox => {
      expect(checkbox).not.toBeChecked();
    });
  });

  it('should render mixed completed and pending tasks', () => {
    const todos = [
      { id: 1, text: 'Pending task', completed: false },
      { id: 2, text: 'Completed task', completed: true },
    ];
    
    render(<TodoList todos={todos} onToggleTodo={vi.fn()} onDeleteTodo={vi.fn()} />);
    
    expect(screen.getByText('Pending task')).toBeInTheDocument();
    expect(screen.getByText('Completed task')).toBeInTheDocument();
  });
});
