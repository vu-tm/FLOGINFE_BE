import Login from '../components/Login/Login';
import * as authService from '../services/authService';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

beforeEach(() => {
    delete window.location;
    window.location = { href: "" };
    jest.spyOn(window, 'alert').mockImplementation(() => { });
});
jest.mock('../services/authService');
test('Mock: Login thanh cong', async () => {
    authService.loginUser.mockResolvedValue({
        success: true,
        token: 'mock-token-123',
        user: { username: 'admin123' }
    });

    render(<Login />);
    fireEvent.change(screen.getByTestId('username-input'), {
        target: { value: 'admin123' }
    });
    fireEvent.change(screen.getByTestId('password-input'), {
        target: { value: '123@123Cf' }
    });
    fireEvent.click(screen.getByTestId('login-button'));

    expect(authService.loginUser).toHaveBeenCalledWith('admin123', '123@123Cf');
    await waitFor(() => {
        expect(window.alert).toHaveBeenCalledWith('Login thanh cong');
    });
    expect(window.location.href).toBe('/products');
});

// test('Mock: Login that bai', async () => {
//     const mockError = new Error('Invalid credentials');
//     authService.loginUser.mockRejectedValue(mockError);
//     render(<Login />);

//     fireEvent.change(screen.getByTestId('username-input'), {
//         target: { value: 'UsernameSai' }
//     });
//     fireEvent.change(screen.getByTestId('password-input'), {
//         target: { value: 'PasswordSai' }
//     });
//     fireEvent.click(screen.getByTestId('login-button'));

//     expect(authService.loginUser).toHaveBeenCalledWith('UsernameSai', 'PasswordSai');
//     await waitFor(() => {
//         expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
//     });
//     expect(window.location.href).toBe('');
// });