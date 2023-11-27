import { TestError } from '@/components/features/TestError';
import { ErrorBoundary } from '@/components/widgets/ErrorBoundary';
import { Search } from '@/components/widgets/Search';
import { AppPropsWithLayout } from '@/shared/data/types';
import { store } from '@/shared/store/store';
import '@/styles/globals.css';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { withSearch } = Component;

  return (
    <ErrorBoundary>
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
        <TestError />
      </Provider>
    </ErrorBoundary>
  );
}
