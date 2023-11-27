import { Search } from '@/components/widgets/Search';
import { AppPropsWithLayout } from '@/shared/data/types';
import { store } from '@/shared/store/store';
import '@/styles/globals.css';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { withSearch } = Component;

  return (
    <Provider store={store}>
      <div className="h-full min-h-screen bg-blue-50">
        {withSearch ? (
          <div className="flex">
            <div className="grow p-2 space-y-3">
              <Search {...pageProps} />
            </div>
            <Component {...pageProps} />
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </div>
    </Provider>
  );
}
