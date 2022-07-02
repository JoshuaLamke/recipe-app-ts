import React from 'react';
import { render, screen } from '@testing-library/react';
import PageNotFound from '../../../layout/pages/PageNotFound';

describe('Page Not Found', () => {
  it('Renders correctly', async () => {
    render(<PageNotFound />);
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });
});
