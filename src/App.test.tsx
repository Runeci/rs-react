import { describe } from 'vitest';
import { render } from '@testing-library/react';
import App from './App.tsx';
import { BrowserRouter } from 'react-router-dom';

describe('App.test.tsx', () => {
  it('should render app component', function () {
    const app = render(<App />, {
      wrapper: BrowserRouter,
    });
    expect(app).toBeDefined();
  });
});
