import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/lib/apollo/apollo';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page): ReactNode => page);
    return <ApolloProvider client={apolloClient}>{getLayout(<Component {...pageProps} />)}</ApolloProvider>;
}
