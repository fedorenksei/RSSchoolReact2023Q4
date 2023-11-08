import * as matchers from '@testing-library/jest-dom/matchers';
import { afterAll, afterEach, beforeAll, expect } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { HttpResponse, http } from 'msw';
import { setupServer } from 'msw/node';
import { products } from './tests/mock-data';

expect.extend(matchers);

const server = setupServer(
  http.get('https://dummyjson.com/products', () =>
    HttpResponse.json(products, { status: 200 })
  )
);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
