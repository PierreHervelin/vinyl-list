import { useQuery } from '@apollo/client';
import { Box, Flex, Spinner } from '@radix-ui/themes';
import React, { createContext, useContext, useEffect, useMemo, type PropsWithChildren } from 'react';
import { isMobile } from 'react-device-detect';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/navbar';
import { graphql } from './gql';
import { Collection } from './pages/collection/collection';
import { List } from './pages/list/list';
import { useListStore } from './pages/list/store';
import { SearchWrapper } from './pages/search/search';

const GET_LIST = graphql(`
    query GetList {
        list {
            _id
            discogsId
            title
            artist
            genre
            year
            coverImage
            status
            createdAt
        }
    }
`);

interface AppContextProps {
    scrollTop: number;
    setScrollTop: (scrollTop: number) => void;
    loading: boolean;
}

export const NOT_IMPLEMENTED_ERROR = new Error('NOT_IMPLEMENTED');

export const AppContext = createContext<AppContextProps>({
    scrollTop: 0,
    setScrollTop: () => {
        throw NOT_IMPLEMENTED_ERROR;
    },
    loading: false,
});

export const AppProvider = React.memo<PropsWithChildren>(({ children }) => {
    const [scrollTop, setScrollTop] = React.useState<number>(0);
    const setList = useListStore(state => state.setList);
    const { data, loading } = useQuery(GET_LIST, {
        fetchPolicy: 'no-cache',
    });

    useEffect(() => {
        setList(data?.list || []);
    }, [data]);

    const context = useMemo(() => ({ scrollTop, setScrollTop, loading }), [scrollTop, loading]);
    return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
});

export const useAppContext = () => useContext(AppContext);

export const AppWrapper = React.memo(() => {
    return (
        <AppProvider>
            <App />
        </AppProvider>
    );
});

const AppSuspense = React.memo<PropsWithChildren>(({ children }) => {
    const { loading } = useAppContext();
    if (loading) {
        return (
            <Flex direction="column" align="center" justify="center" style={{ height: '100vh' }}>
                <Spinner size="3" />
            </Flex>
        );
    }
    return <>{children}</>;
});

export const App = () => {
    const { setScrollTop } = useAppContext();
    return (
        <AppSuspense>
            <BrowserRouter>
                <Flex style={{ height: '100vh' }}>
                    <Navbar />
                    <Box
                        pb={isMobile ? '100px' : '0'}
                        flexGrow={'1'}
                        overflowY={'auto'}
                        onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
                    >
                        <Routes>
                            <Route path="/" element={<SearchWrapper />} />
                            <Route path="/list" element={<List />} />
                            <Route path="/collection" element={<Collection />} />
                        </Routes>
                    </Box>
                </Flex>
            </BrowserRouter>
        </AppSuspense>
    );
};
