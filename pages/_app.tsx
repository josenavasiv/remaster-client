import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '@/lib/apollo/apollo';
import { NextPage } from 'next';
import { ReactElement, ReactNode } from 'react';
import localFont from 'next/font/local';

export const tommysoft = localFont({
    src: [
        {
            path: '../public/fonts/TommySoftThin.otf',
            weight: '100',
        },
        {
            path: '../public/fonts/TommySoftLight.otf',
            weight: '300',
        },
        {
            path: '../public/fonts/TommySoftRegular.otf',
            weight: '400',
        },
        {
            path: '../public/fonts/TommySoftMedium.otf',
            weight: '500',
        },
        {
            path: '../public/fonts/TommySoftBold.otf',
            weight: '700',
        },
        {
            path: '../public/fonts/TommySoftExtraBold.otf',
            weight: '800',
        },
        {
            path: '../public/fonts/TommySoftBlack.otf',
            weight: '900',
        },
    ],
    variable: '--font-tommysoft',
});

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page): ReactNode => page);
    return (
        <main className={`${tommysoft.variable} font-sans text-sm`}>
            <ApolloProvider client={apolloClient}>{getLayout(<Component {...pageProps} />)}</ApolloProvider>
        </main>
    );
}
