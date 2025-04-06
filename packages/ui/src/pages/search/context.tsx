import React, { createContext, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';
import { graphql } from '../../gql';
import { useQuery } from '@apollo/client';
import { useSearchStore } from './store';
import { NOT_IMPLEMENTED_ERROR } from '../../app';
import { useSearchParams } from 'react-router-dom';

const FETCH_VINYLS = graphql(`
    query GetVinyl($query: String!, $genre: [String!], $artist: [String!]) {
        search(query: $query, genre: $genre, artist: $artist) {
            items
            page
            pages
            perPage
            results {
                id
                title
                artist
                genre
                year
                coverImage
            }
        }
    }
`);

export type View = 'grid' | 'list';

interface SearchContextProps {
    loading: boolean;
    view: View;
    setView: (view: View) => void;
}

const SearchContext = createContext<SearchContextProps>({
    loading: false,
    view: 'grid',
    setView: () => {
        throw NOT_IMPLEMENTED_ERROR;
    },
});

export const SearchProvider = React.memo<PropsWithChildren>(({ children }) => {
    const query = useSearchStore(state => state.query);
    const genre = useSearchStore(state => state.genre);
    const artist = useSearchStore(state => state.artist);
    const [view, setView] = useState<View>('grid');

    const setSearchResult = useSearchStore(state => state.setSearchResult);
    const setFakeSearchResult = useSearchStore(state => state.setFakeSearchResult);
    const setEmptySearchResult = useSearchStore(state => state.setEmptySearchResult);

    const filterAvailable = useMemo<boolean>(() => {
        return !!query || artist.length > 0 || genre !== 'empty';
    }, [query, artist, genre]);

    const { data, loading } = useQuery(FETCH_VINYLS, {
        variables: {
            query,
            genre: genre !== 'empty' ? [genre] : undefined,
            artist,
        },
        skip: !filterAvailable,
    });

    useEffect(() => {
        if (loading) {
            setFakeSearchResult();
            return;
        }
        if (!data?.search) {
            setEmptySearchResult();
            return;
        }
        setSearchResult(data.search);
    }, [loading, data]);

    const [searchParams, setSearchParams] = useSearchParams();

    function setSearchParamsWithFilters() {
        const params = new URLSearchParams({
            ...(query && { query }),
            ...(artist.length > 0 && { artist: artist.join(',') }),
            ...(genre !== 'empty' && { genre }),
        });
        setSearchParams(params);
    }

    useEffect(() => {
        if (filterAvailable) {
            setSearchParamsWithFilters();
        }
    }, [query, genre, artist]);

    useEffect(() => {
        if (searchParams.size === 0 && filterAvailable) {
            setSearchParamsWithFilters();
        }
    }, [searchParams]);

    const context = useMemo<SearchContextProps>(
        () => ({
            loading,
            view,
            setView,
        }),
        [loading, view],
    );

    return <SearchContext.Provider value={context}>{children}</SearchContext.Provider>;
});

export const useSearchContext = () => useContext(SearchContext);
