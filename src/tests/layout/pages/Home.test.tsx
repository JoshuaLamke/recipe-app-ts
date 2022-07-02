import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../../../layout/pages/Home';

describe('Home Page', () => {
  it('Renders correctly', async () => {
    render(<Home />);
    expect(screen.getByText('Recipe App')).toBeInTheDocument();
  });
});
