import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoInput from '../../src/components/TodoInput.jsx';

describe('TodoInput Component', () => {
  it('should render input and button', () => {
    render(<TodoInput onAddTodo={vi.fn()} />);
    
    expect(screen.getByPlaceholderText('¿Qué necesitas hacer hoy?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument();
  });

  it('should not allow adding empty tasks', async () => {
    const onAddTodo = vi.fn();
    const user = userEvent.setup();
    
    render(<TodoInput onAddTodo={onAddTodo} />);
    
    const button = screen.getByRole('button', { name: /agregar/i });
    await user.click(button);
    
    expect(onAddTodo).not.toHaveBeenCalled();
  });

  it('should not allow adding tasks with only whitespace', async () => {
    const onAddTodo = vi.fn();
    const user = userEvent.setup();
    
    render(<TodoInput onAddTodo={onAddTodo} />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, '   ');
    
    const button = screen.getByRole('button', { name: /agregar/i });
    await user.click(button);
    
    expect(onAddTodo).not.toHaveBeenCalled();
  });

  it('should call onAddTodo with trimmed text', async () => {
    const onAddTodo = vi.fn();
    const user = userEvent.setup();
    
    render(<TodoInput onAddTodo={onAddTodo} />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, '  Nueva tarea  ');
    
    const button = screen.getByRole('button', { name: /agregar/i });
    await user.click(button);
    
    expect(onAddTodo).toHaveBeenCalledWith('Nueva tarea');
  });

  it('should clear input after adding task', async () => {
    const onAddTodo = vi.fn();
    const user = userEvent.setup();
    
    render(<TodoInput onAddTodo={onAddTodo} />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Nueva tarea');
    
    const button = screen.getByRole('button', { name: /agregar/i });
    await user.click(button);
    
    expect(input).toHaveValue('');
  });

  it('should add task when pressing Enter', async () => {
    const onAddTodo = vi.fn();
    const user = userEvent.setup();
    
    render(<TodoInput onAddTodo={onAddTodo} />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Nueva tarea{Enter}');
    
    expect(onAddTodo).toHaveBeenCalledWith('Nueva tarea');
    expect(input).toHaveValue('');
  });

  it('should disable button when input is empty', () => {
    render(<TodoInput onAddTodo={vi.fn()} />);
    
    const button = screen.getByRole('button', { name: /agregar/i });
    expect(button).toBeDisabled();
  });

  it('should enable button when input has text', async () => {
    const user = userEvent.setup();
    
    render(<TodoInput onAddTodo={vi.fn()} />);
    
    const button = screen.getByRole('button', { name: /agregar/i });
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    
    await user.type(input, 'Nueva tarea');
    
    expect(button).not.toBeDisabled();
  });
});
