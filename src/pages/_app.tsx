import type { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { QueryClient, QueryClientProvider } from 'react-query';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../utils/emotionConfig/createEmotionCache';
import theme from '../theme';
import { SessionProvider } from 'next-auth/react';
import { Layout } from '@/components/Layout';
import { CartContextProvider } from '@/context/CartContext';
import ErrorBoundary from '@/components/ErrorBoundary';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface AppPropsWithEMotion extends AppProps {
  emotionCache?: EmotionCache;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 30000,
    },
  },
});

export default function App(props: AppPropsWithEMotion) {
  const {
    Component,
    emotionCache = clientSideEmotionCache,
    pageProps: { session, ...pageProps },
  } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Italian restaurant" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            {/* Providers */}
            <CssBaseline />
            <SessionProvider session={session}>
              <CartContextProvider>
                <Layout>
                  <Component {...pageProps} />
                </Layout>
              </CartContextProvider>
            </SessionProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </ErrorBoundary>
    </CacheProvider>
  );
}
