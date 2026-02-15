import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App.jsx';

describe('App Component', () => {
  it('should render the App component correctly', () => {
    render(<App />);
    
    expect(screen.getByText('📝 Lista de Tareas')).toBeInTheDocument();
    expect(screen.getByText('Organiza tus tareas de manera eficiente')).toBeInTheDocument();
  });

  it('should render TodoInput component', () => {
    render(<App />);
    
    expect(screen.getByPlaceholderText('¿Qué necesitas hacer hoy?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /agregar/i })).toBeInTheDocument();
  });

  it('should show empty state when no tasks exist', () => {
    render(<App />);
    
    expect(screen.getByText('🎉 ¡No tienes tareas!')).toBeInTheDocument();
    expect(screen.getByText('Agrega una nueva tarea para comenzar')).toBeInTheDocument();
  });

  it('should not render FilterButtons when no tasks exist', () => {
    render(<App />);
    
    expect(screen.queryByRole('button', { name: /todas/i })).not.toBeInTheDocument();
  });

  it('should add a new task', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Nueva tarea de prueba');
    
    const addButton = screen.getByRole('button', { name: /agregar/i });
    await user.click(addButton);
    
    expect(screen.getByText('Nueva tarea de prueba')).toBeInTheDocument();
  });

  it('should show counter when tasks are added', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Primera tarea{Enter}');
    await user.type(input, 'Segunda tarea{Enter}');
    
    expect(screen.getByText(/2 pendientes/i)).toBeInTheDocument();
  });

  it('should mark task as completed', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Tarea a completar{Enter}');
    
    const checkbox = screen.getByRole('checkbox');
    await user.click(checkbox);
    
    expect(checkbox).toBeChecked();
    expect(screen.getByText(/0 pendientes/i)).toBeInTheDocument();
    expect(screen.getByText(/1 completada/i)).toBeInTheDocument();
  });

  it('should delete a task', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Tarea a eliminar{Enter}');
    
    expect(screen.getByText('Tarea a eliminar')).toBeInTheDocument();
    
    const deleteButton = screen.getByTitle('Eliminar tarea');
    await user.click(deleteButton);
    
    expect(screen.queryByText('Tarea a eliminar')).not.toBeInTheDocument();
    expect(screen.getByText('🎉 ¡No tienes tareas!')).toBeInTheDocument();
  });

  it('should filter tasks - show all', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Tarea activa{Enter}');
    await user.type(input, 'Tarea completada{Enter}');
    
    // Mark second task as completed
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);
    
    // Should show both tasks
    expect(screen.getByText('Tarea activa')).toBeInTheDocument();
    expect(screen.getByText('Tarea completada')).toBeInTheDocument();
  });

  it('should filter tasks - show only active', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Tarea activa{Enter}');
    await user.type(input, 'Tarea completada{Enter}');
    
    // Mark second task as completed
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);
    
    // Click on "Activas" filter
    const activasButton = screen.getByRole('button', { name: /activas/i });
    await user.click(activasButton);
    
    // Should only show active task
    expect(screen.getByText('Tarea activa')).toBeInTheDocument();
    expect(screen.queryByText('Tarea completada')).not.toBeInTheDocument();
  });

  it('should filter tasks - show only completed', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Tarea activa{Enter}');
    await user.type(input, 'Tarea completada{Enter}');
    
    // Mark second task as completed
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);
    
    // Click on "Completadas" filter button specifically (not clear button)
    const filterButtons = screen.getAllByRole('button');
    const completadasButton = filterButtons.find(btn => btn.textContent.includes('✅ Completadas') && btn.className.includes('filter-btn'));
    await user.click(completadasButton);
    
    // Should only show completed task
    expect(screen.queryByText('Tarea activa')).not.toBeInTheDocument();
    expect(screen.getByText('Tarea completada')).toBeInTheDocument();
  });

  it('should show counter of pending tasks', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Tarea 1{Enter}');
    await user.type(input, 'Tarea 2{Enter}');
    await user.type(input, 'Tarea 3{Enter}');
    
    expect(screen.getByText(/3 pendientes/i)).toBeInTheDocument();
    
    // Mark one as completed
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);
    
    expect(screen.getByText(/2 pendientes/i)).toBeInTheDocument();
    expect(screen.getByText(/1 completada/i)).toBeInTheDocument();
  });

  it('should persist tasks in localStorage', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Tarea persistente{Enter}');
    
    // Check that localStorage.setItem was called
    expect(localStorage.setItem).toHaveBeenCalled();
    const calls = localStorage.setItem.mock.calls;
    const lastCall = calls[calls.length - 1];
    
    expect(lastCall[0]).toBe('todos');
    const savedTodos = JSON.parse(lastCall[1]);
    expect(savedTodos).toHaveLength(1);
    expect(savedTodos[0].text).toBe('Tarea persistente');
  });

  it('should load tasks from localStorage on mount', () => {
    const mockTodos = [
      { id: 1, text: 'Tarea guardada', completed: false },
    ];
    
    localStorage.getItem.mockReturnValueOnce(JSON.stringify(mockTodos));
    
    render(<App />);
    
    expect(screen.getByText('Tarea guardada')).toBeInTheDocument();
  });

  it('should clear all completed tasks', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Tarea activa{Enter}');
    await user.type(input, 'Tarea completada 1{Enter}');
    await user.type(input, 'Tarea completada 2{Enter}');
    
    // Mark tasks 2 and 3 as completed
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[1]);
    await user.click(checkboxes[2]);
    
    // Click clear completed button
    const clearButton = screen.getByRole('button', { name: /limpiar completadas/i });
    await user.click(clearButton);
    
    // Should only have one active task left
    expect(screen.getByText('Tarea activa')).toBeInTheDocument();
    expect(screen.queryByText('Tarea completada 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Tarea completada 2')).not.toBeInTheDocument();
    expect(screen.getByText(/1 pendiente/i)).toBeInTheDocument();
  });

  it('should show empty state message for active filter when no active tasks', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Tarea a completar{Enter}');
    
    // Mark as completed
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);
    
    // Filter to active - find the specific button
    const allButtons = screen.getAllByRole('button');
    const activasBtn = allButtons.find(btn => btn.textContent.includes('⏳ Activas'));
    await user.click(activasBtn);
    
    expect(screen.getByText(/no hay tareas pendientes/i)).toBeInTheDocument();
  });

  it('should show empty state message for completed filter when no completed tasks', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Tarea activa{Enter}');
    
    // Filter to completed - use getAllByRole and filter to avoid ambiguity
    const filterButtons = screen.getAllByRole('button');
    const completadasButton = filterButtons.find(btn => btn.textContent.includes('✅ Completadas') && btn.className.includes('filter-btn'));
    await user.click(completadasButton);
    
    expect(screen.getByText(/no hay tareas completadas/i)).toBeInTheDocument();
  });

  it('should handle localStorage errors gracefully', () => {
    // Mock console.error to verify error was logged
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    // Mock getItem to return invalid JSON
    localStorage.getItem.mockReturnValueOnce('invalid json{]');
    
    // Should still render the app
    render(<App />);
    expect(screen.getByText('📝 Lista de Tareas')).toBeInTheDocument();
    
    // Error should have been logged
    expect(consoleErrorSpy).toHaveBeenCalled();
    
    consoleErrorSpy.mockRestore();
  });

  it('should render FilterButtons when tasks exist', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Primera tarea{Enter}');
    
    expect(screen.getByRole('button', { name: /todas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /activas/i })).toBeInTheDocument();
    // For Completadas, use getAllByRole to handle potential ambiguity
    const filterButtons = screen.getAllByRole('button');
    const completadasButton = filterButtons.find(btn => btn.textContent.includes('✅ Completadas'));
    expect(completadasButton).toBeInTheDocument();
  });

  it('should use singular form for single pending task', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Una tarea{Enter}');
    
    expect(screen.getByText(/1 pendiente$/i)).toBeInTheDocument();
  });

  it('should use singular form for single completed task', async () => {
    const user = userEvent.setup();
    render(<App />);
    
    const input = screen.getByPlaceholderText('¿Qué necesitas hacer hoy?');
    await user.type(input, 'Una tarea{Enter}');
    
    const checkboxes = screen.getAllByRole('checkbox');
    await user.click(checkboxes[0]);
    
    expect(screen.getByText(/1 completada$/i)).toBeInTheDocument();
  });
});
