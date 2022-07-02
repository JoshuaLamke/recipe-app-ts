import React from 'react';
import { render, screen } from '@testing-library/react';
import Signup from '../../../layout/pages/Signup';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Signup Page', () => {
  it('Renders correctly', async () => {
    render(<Signup />);
    expect(screen.getByText('Recipe App')).toBeInTheDocument();
  });
});
