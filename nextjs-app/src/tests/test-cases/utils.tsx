import { transformApiProductData } from '@/shared/utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactNode } from 'react';
import { act } from 'react-dom/test-utils';
import { Product } from '../../components/entities/Product';
import { ApiProductData } from '../../shared/data/types';

export const renderWithStore = (children: ReactNode) => {
  const user = userEvent.setup();

  render(<>{children}</>);
  return { user };
};

export const arrangeProduct = (product: ApiProductData) => {
  const user = userEvent.setup();
  const data = transformApiProductData(product);
  render(<Product view="card" data={data} />);

  const actionClick = async () => {
    const elem = await screen.findByText(product.title);
    await act(async () => {
      await user.click(elem);
    });
  };

  return { user, actionClick };
};
