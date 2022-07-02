import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../../../layout/pages/Login';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Login Page', () => {
  it('Renders correctly', async () => {
    render(<Login />);
    expect(screen.getByText('Recipe App')).toBeInTheDocument();
  });
});
