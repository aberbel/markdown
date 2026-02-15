import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoItem from '../../src/components/TodoItem.jsx';

describe('TodoItem Component', () => {
  const mockTodo = {
    id: 1,
    text: 'Test todo',
    completed: false,
  };

  it('should render pending task correctly', () => {
    render(<TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={vi.fn()} />);
    
    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('should render completed task correctly', () => {
    const completedTodo = { ...mockTodo, completed: true };
    
    render(<TodoItem todo={completedTodo} onToggle={vi.fn()} onDelete={vi.fn()} />);
    
    expect(screen.getByText('Test todo')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should call onToggle when checkbox is clicked', async () => {
    const onToggle = vi.fn();
    const user = userEvent.setup();
    
    render(<TodoItem todo={mockTodo} onToggle={onToggle} onDelete={vi.fn()} />);
    
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    
    expect(onToggle).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should call onDelete when delete button is clicked', async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    
    render(<TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={onDelete} />);
    
    const deleteButton = screen.getByTitle('Eliminar tarea');
    await user.click(deleteButton);
    
    expect(onDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('should apply completed class when task is completed', () => {
    const completedTodo = { ...mockTodo, completed: true };
    
    const { container } = render(
      <TodoItem todo={completedTodo} onToggle={vi.fn()} onDelete={vi.fn()} />
    );
    
    const todoItem = container.querySelector('.todo-item');
    expect(todoItem).toHaveClass('completed');
  });

  it('should not apply completed class when task is pending', () => {
    const { container } = render(
      <TodoItem todo={mockTodo} onToggle={vi.fn()} onDelete={vi.fn()} />
    );
    
    const todoItem = container.querySelector('.todo-item');
    expect(todoItem).not.toHaveClass('completed');
  });

  it('should display task text correctly', () => {
    const todoWithLongText = {
      ...mockTodo,
      text: 'This is a very long task description that should be displayed correctly',
    };
    
    render(<TodoItem todo={todoWithLongText} onToggle={vi.fn()} onDelete={vi.fn()} />);
    
    expect(screen.getByText(todoWithLongText.text)).toBeInTheDocument();
  });
});
