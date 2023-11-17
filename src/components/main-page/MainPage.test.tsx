import { describe, expect } from 'vitest';
import MainPage from './MainPage.tsx';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '../../test/test-utils.tsx';

describe('Main page.tsx', () => {
  it('should define component', function () {
    const component = renderWithProviders(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );
    expect(component).toBeDefined();
  });
});
