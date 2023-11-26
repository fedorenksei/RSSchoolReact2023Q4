import '@testing-library/jest-dom/vitest';
import { afterAll, afterEach, beforeAll, vi } from 'vitest';
import { server } from './server/server';
import { cleanup } from '@testing-library/react';

beforeAll(() => () => {
  server.listen({ onUnhandledRequest: 'error' });
  vi.mock('next/router', async () => await vi.importActual('next-router-mock'));
});
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

afterEach(cleanup);
