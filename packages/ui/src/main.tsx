import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppWrapper } from './app';
import { Theme } from '@radix-ui/themes';
import { ApolloProvider } from '@apollo/client';
import { client } from './graphql';
import '@radix-ui/themes/styles.css';
import './assets/style.css';

const container = document.getElementById('root');
if (!container) {
    throw new Error('MISSING_ROOT_ELEMENT');
}
createRoot(container).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <Theme accentColor="indigo">
                <AppWrapper />
            </Theme>
        </ApolloProvider>
    </StrictMode>,
);
