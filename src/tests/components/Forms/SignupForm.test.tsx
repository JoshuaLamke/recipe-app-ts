import React from 'react';
import { render, screen } from '@testing-library/react';
import Signup from '../../../layout/pages/Signup';

const mockUseNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}));

describe('Signup Form', () => {
  it('Renders correctly', async () => {
    render(<Signup />);
    expect(screen.getByText('Recipe App')).toBeInTheDocument();
  });
});
