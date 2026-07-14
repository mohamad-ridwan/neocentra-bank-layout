import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MfeProviders from './MfeProviders';

describe('MfeProviders Component', () => {
  it('should render children within Providers', () => {
    render(
      <MfeProviders>
        <div data-testid="child-element">Child Content</div>
      </MfeProviders>
    );

    expect(screen.getByTestId('child-element')).toBeInTheDocument();
    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
