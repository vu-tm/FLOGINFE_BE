import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login form', () => {
  render(<App />);
  const loginButton = screen.getByRole('button', { name: /login/i });
  expect(loginButton).toBeInTheDocument();
});

test('renders products heading', () => {
  render(<App />);
  const productsHeading = screen.getByText(/products/i);
  expect(productsHeading).toBeInTheDocument();
});