import { render, screen } from '@testing-library/react';
import Login from './Login';

test('renders login button', () => {
    render(<Login />);
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
});
