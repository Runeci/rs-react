import { describe, expect } from 'vitest';
import { render } from '@testing-library/react';
import MainPage from '../components/MainPage.tsx';
import { BrowserRouter } from 'react-router-dom';
import PeopleProvider from '../components/PeopleListContext.tsx';

describe('Main page.tsx', () => {
  it('should define component', function () {
    const component = render(
      <PeopleProvider>
        <MainPage />
      </PeopleProvider>,
      {
        wrapper: BrowserRouter,
      }
    );
    expect(component).toBeDefined();
  });
});
