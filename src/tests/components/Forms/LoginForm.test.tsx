import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginForm from '../../../components/Forms/LoginForm';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Login Form', () => {
  it('Renders correctly', async () => {
    render(<LoginForm />);
    expect(screen.getByText('Recipe App')).toBeInTheDocument();
  });
});
