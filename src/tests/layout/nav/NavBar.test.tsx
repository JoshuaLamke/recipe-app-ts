import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from '../../../layout/nav/NavBar';

describe('NavBar', () => {
  it('Renders correctly', async () => {
    render(<NavBar />);
    expect(screen.getByText('Navbar')).toBeInTheDocument();
  });
});
