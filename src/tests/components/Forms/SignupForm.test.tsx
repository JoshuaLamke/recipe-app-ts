import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import SignupForm from '../../../components/Forms/SignupForm';
import userEvent from '@testing-library/user-event';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Signup Form', () => {
  it('Renders correctly', async () => {
    render(<SignupForm />);
    expect(screen.getByText('Recipe App')).toBeInTheDocument();
  });

  it('Form will submit correctly', async () => {
    render(<SignupForm />);
    const emailInput: HTMLElement = screen.getByPlaceholderText('Enter Email');
    const passwordInput: HTMLElement = screen.getByPlaceholderText('Enter Password');
    const confirmInput: HTMLElement = screen.getByPlaceholderText('Confirm Password');
    const signupButton: HTMLElement = screen.getByText('Sign Up');
    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, 'password');
    userEvent.type(confirmInput, 'password');
    userEvent.click(signupButton);
    await waitFor(() => expect(screen.getByTestId('signup-loading-spinner')).toBeInTheDocument());
    await waitFor(
      () => {
        expect(mockUseNavigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigate).toHaveBeenCalledWith('/home');
      },
      { timeout: 2000 },
    );
  });

  it('Clicking login button navigates to login', async () => {
    render(<SignupForm />);
    const loginButton: HTMLElement = screen.getByText('Log In');
    userEvent.click(loginButton);
    await waitFor(
      () => {
        expect(mockUseNavigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigate).toHaveBeenCalledWith('/');
      },
      { timeout: 2000 },
    );
  });

  it('Clicking eye icon shows password and confirm password', async () => {
    render(<SignupForm />);
    const showPasswordButton: HTMLElement = screen.getByTestId('toggle-show-password');
    const showConfirmButton: HTMLElement = screen.getByTestId('toggle-show-confirm');
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter Password')).toHaveProperty('type', 'password');
      expect(screen.getByPlaceholderText('Confirm Password')).toHaveProperty('type', 'password');
    });
    userEvent.click(showPasswordButton);
    userEvent.click(showConfirmButton);
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Enter Password')).toHaveProperty('type', 'text');
      expect(screen.getByPlaceholderText('Confirm Password')).toHaveProperty('type', 'text');
    });
  });
});

describe('Login Form Validation', () => {
  it('Empty form validation', async () => {
    render(<SignupForm />);
    const signupButton: HTMLElement = screen.getByText('Sign Up');
    userEvent.click(signupButton);
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(screen.getByText('Please re-enter password')).toBeInTheDocument();
      expect(screen.queryByTestId('login-loading-spinner')).not.toBeInTheDocument();
    });
  });

  it('Email form validation', async () => {
    render(<SignupForm />);
    const emailInput: HTMLElement = screen.getByPlaceholderText('Enter Email');
    const signupButton: HTMLElement = screen.getByText('Sign Up');
    userEvent.type(emailInput, 'email@email');
    userEvent.click(signupButton);
    await waitFor(() => {
      expect(screen.getByText('Valid email is required')).toBeInTheDocument();
      expect(screen.queryByTestId('login-loading-spinner')).not.toBeInTheDocument();
    });
  });

  it('Passwords must match', async () => {
    render(<SignupForm />);
    const passwordInput: HTMLElement = screen.getByPlaceholderText('Enter Password');
    const confirmInput: HTMLElement = screen.getByPlaceholderText('Confirm Password');
    const signupButton: HTMLElement = screen.getByText('Sign Up');
    userEvent.type(passwordInput, 'password');
    userEvent.type(confirmInput, 'not_password');
    userEvent.click(signupButton);
    await waitFor(() => {
      expect(screen.getByText('Passwords must match')).toBeInTheDocument();
    });
  });
});
