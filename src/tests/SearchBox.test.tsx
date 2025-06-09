import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchBox from '../components/SearchBox';
import { useNavigate } from 'react-router-dom';
import { describe, expect, it, vi, type MockedFunction } from 'vitest';

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

const mockUseNavigate = useNavigate as MockedFunction<typeof useNavigate>;

describe('SearchBox Component', () => {
  it('redirige correctamente al realizar una búsqueda', async () => {
    const mockNavigate = vi.fn();
    mockUseNavigate.mockReturnValue(mockNavigate);
    const user = userEvent.setup();

    render(<SearchBox />);
    
    const input = screen.getByPlaceholderText('Buscar productos...');
    const button = screen.getByRole('button', { name: /buscar/i });

    await user.type(input, 'laptop');
    await user.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/items?search=laptop');
  });

  it('no redirige con input vacío', async () => {
    const mockNavigate = vi.fn();
    mockUseNavigate.mockReturnValue(mockNavigate);
    const user = userEvent.setup();

    render(<SearchBox />);
    await user.click(screen.getByRole('button', { name: /buscar/i }));

    expect(mockNavigate).not.toHaveBeenCalled();
  });
});