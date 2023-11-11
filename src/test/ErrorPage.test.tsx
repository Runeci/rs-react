import { describe, expect } from 'vitest';
import { render } from '@testing-library/react';
import NoPageFound from '../components/NoPageFound.tsx';
import { BrowserRouter } from 'react-router-dom';

describe('NoPageFound.tsx', () => {
  it('should define a page error component', () => {
    const component = render(<NoPageFound />, {
      wrapper: BrowserRouter,
    });
    expect(component).toBeDefined();
  });
});
