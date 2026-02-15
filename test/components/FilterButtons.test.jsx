import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FilterButtons from '../../src/components/FilterButtons.jsx';

describe('FilterButtons Component', () => {
  it('should render all three filter buttons', () => {
    render(
      <FilterButtons
        currentFilter="all"
        onFilterChange={vi.fn()}
        hasCompleted={false}
        onClearCompleted={vi.fn()}
      />
    );
    
    expect(screen.getByRole('button', { name: /todas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /activas/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /completadas/i })).toBeInTheDocument();
  });

  it('should show "Todas" button as active by default', () => {
    render(
      <FilterButtons
        currentFilter="all"
        onFilterChange={vi.fn()}
        hasCompleted={false}
        onClearCompleted={vi.fn()}
      />
    );
    
    const todasButton = screen.getByRole('button', { name: /todas/i });
    expect(todasButton).toHaveClass('active');
  });

  it('should change filter to "Activas"', async () => {
    const onFilterChange = vi.fn();
    const user = userEvent.setup();
    
    render(
      <FilterButtons
        currentFilter="all"
        onFilterChange={onFilterChange}
        hasCompleted={false}
        onClearCompleted={vi.fn()}
      />
    );
    
    const activasButton = screen.getByRole('button', { name: /activas/i });
    await user.click(activasButton);
    
    expect(onFilterChange).toHaveBeenCalledWith('active');
  });

  it('should change filter to "Completadas"', async () => {
    const onFilterChange = vi.fn();
    const user = userEvent.setup();
    
    render(
      <FilterButtons
        currentFilter="all"
        onFilterChange={onFilterChange}
        hasCompleted={false}
        onClearCompleted={vi.fn()}
      />
    );
    
    const completadasButton = screen.getByRole('button', { name: /completadas/i });
    await user.click(completadasButton);
    
    expect(onFilterChange).toHaveBeenCalledWith('completed');
  });

  it('should show active state for "Activas" filter', () => {
    render(
      <FilterButtons
        currentFilter="active"
        onFilterChange={vi.fn()}
        hasCompleted={false}
        onClearCompleted={vi.fn()}
      />
    );
    
    const activasButton = screen.getByRole('button', { name: /activas/i });
    expect(activasButton).toHaveClass('active');
  });

  it('should show active state for "Completadas" filter', () => {
    render(
      <FilterButtons
        currentFilter="completed"
        onFilterChange={vi.fn()}
        hasCompleted={true}
        onClearCompleted={vi.fn()}
      />
    );
    
    const filterButtons = screen.getAllByRole('button');
    const completadasButton = filterButtons.find(btn => btn.textContent.includes('✅ Completadas'));
    expect(completadasButton).toHaveClass('active');
  });

  it('should show clear completed button when there are completed tasks', () => {
    render(
      <FilterButtons
        currentFilter="all"
        onFilterChange={vi.fn()}
        hasCompleted={true}
        onClearCompleted={vi.fn()}
      />
    );
    
    expect(screen.getByRole('button', { name: /limpiar completadas/i })).toBeInTheDocument();
  });

  it('should not show clear completed button when there are no completed tasks', () => {
    render(
      <FilterButtons
        currentFilter="all"
        onFilterChange={vi.fn()}
        hasCompleted={false}
        onClearCompleted={vi.fn()}
      />
    );
    
    expect(screen.queryByRole('button', { name: /limpiar completadas/i })).not.toBeInTheDocument();
  });

  it('should call onClearCompleted when clear button is clicked', async () => {
    const onClearCompleted = vi.fn();
    const user = userEvent.setup();
    
    render(
      <FilterButtons
        currentFilter="all"
        onFilterChange={vi.fn()}
        hasCompleted={true}
        onClearCompleted={onClearCompleted}
      />
    );
    
    const clearButton = screen.getByRole('button', { name: /limpiar completadas/i });
    await user.click(clearButton);
    
    expect(onClearCompleted).toHaveBeenCalled();
  });

  it('should change filter to "Todas"', async () => {
    const onFilterChange = vi.fn();
    const user = userEvent.setup();
    
    render(
      <FilterButtons
        currentFilter="active"
        onFilterChange={onFilterChange}
        hasCompleted={false}
        onClearCompleted={vi.fn()}
      />
    );
    
    const todasButton = screen.getByRole('button', { name: /todas/i });
    await user.click(todasButton);
    
    expect(onFilterChange).toHaveBeenCalledWith('all');
  });
});
