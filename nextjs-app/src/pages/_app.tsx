import { Search } from '@/components/widgets/Search';
import { store } from '@/shared/store/store';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <div className="flex">
        <div className="grow p-2 space-y-3">
          <Search {...pageProps} />
        </div>
        <Component {...pageProps} />
      </div>
    </Provider>
  );
}
