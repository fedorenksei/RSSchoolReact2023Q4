import { HttpResponse, delay, http } from 'msw';
import { products } from './mock-data';

const productSearchHandler = http.get(
  'https://dummyjson.com/products',
  async ({ request }) => {
    const url = new URL(request.url);
    const limit = url.searchParams.get('limit');
    if (!limit) throw new Error('wrong value of limit query parameter');
    await delay(100);
    return HttpResponse.json(
      { products: products.slice(0, +limit), total: limit },
      { status: 200 }
    );
  }
);

export const handlers = [productSearchHandler];
