import { describe } from 'vitest';
import { render } from '@testing-library/react';
import Details from '../components/Details.tsx';
import { BrowserRouter } from 'react-router-dom';

describe('Details', () => {
  it('should ', function () {
    render(<Details />, {
      wrapper: BrowserRouter,
    });
  });
});
