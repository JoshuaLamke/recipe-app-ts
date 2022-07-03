import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import LoginForm from '../../../components/Forms/LoginForm';
import userEvent from '@testing-library/user-event';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Login Form', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('Renders correctly', async () => {
    render(<LoginForm />);
    expect(screen.getByText('Recipe App')).toBeInTheDocument();
  });

  it('Form will submit correctly', async () => {
    render(<LoginForm />);
    const emailInput: HTMLElement = screen.getByPlaceholderText('Enter Email');
    const passwordInput: HTMLElement = screen.getByPlaceholderText('Enter Password');
    const loginButton: HTMLElement = screen.getByText('Log In');
    userEvent.type(emailInput, 'email@email.com');
    userEvent.type(passwordInput, 'password');
    userEvent.click(loginButton);
    await waitFor(() => expect(screen.getByTestId('login-loading-spinner')).toBeInTheDocument());
    await waitFor(
      () => {
        expect(mockUseNavigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigate).toHaveBeenCalledWith('/home');
      },
      { timeout: 2000 },
    );
  });

  it('Clicking signup button navigates to signup', async () => {
    render(<LoginForm />);
    const signup: HTMLElement = screen.getByText('Sign Up');
    userEvent.click(signup);
    await waitFor(
      () => {
        expect(mockUseNavigate).toHaveBeenCalledTimes(1);
        expect(mockUseNavigate).toHaveBeenCalledWith('/signup');
      },
      { timeout: 2000 },
    );
  });

  it('Clicking eye icon shows password', async () => {
    render(<LoginForm />);
    const showPasswordButton: HTMLElement = screen.getByTestId('toggle-show-password');
    await waitFor(() =>
      expect(screen.getByPlaceholderText('Enter Password')).toHaveProperty('type', 'password'),
    );
    userEvent.click(showPasswordButton);
    await waitFor(() =>
      expect(screen.getByPlaceholderText('Enter Password')).toHaveProperty('type', 'text'),
    );
  });
});

describe('Login Form Validation', () => {
  it('Empty form validation', async () => {
    render(<LoginForm />);
    const loginButton: HTMLElement = screen.getByText('Log In');
    userEvent.click(loginButton);
    await waitFor(() => {
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Password is required')).toBeInTheDocument();
      expect(screen.queryByTestId('login-loading-spinner')).not.toBeInTheDocument();
    });
  });

  it('Email form validation', async () => {
    render(<LoginForm />);
    const emailInput: HTMLElement = screen.getByPlaceholderText('Enter Email');
    const loginButton: HTMLElement = screen.getByText('Log In');
    userEvent.type(emailInput, 'email@email');
    userEvent.click(loginButton);
    await waitFor(() => {
      expect(screen.getByText('Valid email is required')).toBeInTheDocument();
      expect(screen.queryByTestId('login-loading-spinner')).not.toBeInTheDocument();
    });
  });
});
