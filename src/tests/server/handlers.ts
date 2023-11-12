import { HttpResponse, ResponseResolver, delay, http } from 'msw';
import { products } from './mock-data';
import { HttpRequestResolverExtras } from 'msw/lib/core/handlers/HttpHandler';
import { BASE_URL } from '../../shared/constants';

const searchResponder: ResponseResolver = async ({ request }) => {
  const url = new URL(request.url);
  const searchTerm = url.searchParams.get('q');
  const limit = url.searchParams.get('limit');
  if (!limit) throw new Error('wrong value of limit query parameter');
  await delay(100);
  return HttpResponse.json(
    {
      products: searchTerm ? [] : products.slice(0, +limit),
      total: searchTerm ? 0 : products.length,
    },
    { status: 200 }
  );
};

const detailsResponder: ResponseResolver<
  HttpRequestResolverExtras<{ detailsId: string }>
> = async ({ params }) => {
  const { detailsId } = params;
  const product = products.filter((p) => p.id === +detailsId)[0];
  if (!product) throw new Error('wrong value of detailsId path parameter');
  await delay(100);
  return HttpResponse.json(product, { status: 200 });
};

export const handlers = [
  http.get(`${BASE_URL}products`, searchResponder),
  http.get(`${BASE_URL}products/search`, searchResponder),
  http.get(`${BASE_URL}products/:detailsId`, detailsResponder),
];
