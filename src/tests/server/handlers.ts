import { HttpResponse, delay, http } from 'msw';
import { products } from './mock-data';

const searchResponder = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q');
  const limit = url.searchParams.get('limit');
  if (!limit) throw new Error('wrong value of limit query parameter');
  await delay(100);
  return HttpResponse.json(
    {
      products: searchTerm ? [] : products.slice(0, +limit),
      total: searchTerm ? 0 : limit,
    },
    { status: 200 }
  );
};

export const handlers = [
  http.get('https://dummyjson.com/products', searchResponder),
  http.get('https://dummyjson.com/products/search', searchResponder),
];
