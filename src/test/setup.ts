import '@testing-library/jest-dom/matchers';
import '@testing-library/jest-dom';
import { server } from './server.tsx';

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
