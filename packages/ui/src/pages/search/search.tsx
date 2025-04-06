import { Cross1Icon, GridIcon, MagnifyingGlassIcon, MinusIcon, PersonIcon, RowsIcon } from '@radix-ui/react-icons';
import { Button, Flex, Grid, IconButton, SegmentedControl, Select, Text, TextField } from '@radix-ui/themes';
import React, { useEffect, useMemo, useState } from 'react';
import { SearchProvider, useSearchContext, type View } from './context';
import { SearchResultWrapper } from './result';
import { useAppContext } from '../../app';
import { useSearchStore } from './store';
import type { Vinyl } from '../../gql/graphql';
import { useListStore } from '../list/store';
import { getListVinyl } from '../list/utils';

interface Genre {
    label: string;
    value: string;
}

const GENRES: Genre[] = [
    { label: 'Rock', value: 'rock' },
    { label: 'Pop', value: 'pop' },
    { label: 'Hip-Hop', value: 'hip-hop' },
    { label: 'Soul', value: 'soul' },
    { label: 'Jazz', value: 'jazz' },
    { label: 'Classique', value: 'classical' },
    { label: 'Electro', value: 'electronic' },
    { label: 'Reggae', value: 'reggae' },
    { label: 'Country', value: 'country' },
    { label: 'Blues', value: 'blues' },
];

export const SearchWrapper = React.memo(() => {
    return (
        <SearchProvider>
            <Search />
        </SearchProvider>
    );
});

export const DynamicFilterTag = React.memo<{ value: string }>(({ value }) => {
    const removeArtist = useSearchStore(state => state.removeArtist);
    const [hovered, setHovered] = useState(false);
    function getIcon() {
        if (hovered) {
            return <MinusIcon width="16" height="16" />;
        }
        return <PersonIcon width="16" height="16" />;
    }
    return (
        <Button
            variant="soft"
            size="1"
            onClick={() => removeArtist(value)}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {getIcon()}
            {value}
        </Button>
    );
});

export const Search = React.memo(() => {
    const { scrollTop } = useAppContext();

    const query = useSearchStore(state => state.query);
    const genre = useSearchStore(state => state.genre);
    const artist = useSearchStore(state => state.artist);
    const setQuery = useSearchStore(state => state.setQuery);
    const setGenre = useSearchStore(state => state.setGenre);

    const [currentQuery, setCurrentQuery] = useState<string>(query);

    function setQueryAndGenre() {
        setQuery(currentQuery);
    }

    useEffect(() => {
        setCurrentQuery(query);
    }, [query]);

    return (
        <Flex direction="column" gap="4" pb="6">
            <Flex
                position="sticky"
                top="0"
                direction="column"
                gap="4"
                p="6"
                style={{
                    background: 'var(--color-panel-solid)',
                    zIndex: 1,
                    boxShadow: scrollTop > 0 ? 'var(--shadow-4)' : 'none',
                }}
            >
                <Flex align="center" gap="4" wrap="wrap">
                    <TextField.Root
                        placeholder="Rechercher un vinyle"
                        size="3"
                        style={{ maxWidth: '600px', flexGrow: 1 }}
                        value={currentQuery}
                        onChange={e => setCurrentQuery(e.target.value)}
                        onKeyUp={e => {
                            if (e.key === 'Enter') {
                                setQueryAndGenre();
                            }
                        }}
                    >
                        <TextField.Slot>
                            <MagnifyingGlassIcon height="16" width="16" />
                        </TextField.Slot>
                        {currentQuery.length > 0 && (
                            <TextField.Slot>
                                <IconButton variant="soft" size="1" onClick={() => setQuery('')}>
                                    <Cross1Icon />
                                </IconButton>
                            </TextField.Slot>
                        )}
                    </TextField.Root>
                    <Select.Root size="3" value={genre} onValueChange={setGenre} defaultValue="empty">
                        <Select.Trigger />
                        <Select.Content>
                            <Select.Item key="empty" value="empty">
                                <Text color="gray">Genre</Text>
                            </Select.Item>
                            {GENRES.map(genre => (
                                <Select.Item key={genre.value} value={genre.value}>
                                    {genre.label}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>
                </Flex>
                {artist.length > 0 && (
                    <Flex gap="2" wrap="wrap">
                        {artist.map(a => (
                            <DynamicFilterTag key={a} value={a} />
                        ))}
                    </Flex>
                )}
            </Flex>
            <SearchResultList />
        </Flex>
    );
});

const VIEWS: View[] = ['grid', 'list'];

export const SearchResultList = React.memo(() => {
    const { view, setView } = useSearchContext();
    const searchResult = useSearchStore(state => state.searchResult);
    const list = useListStore(state => state.list);

    const filteredResults = useMemo<Vinyl[]>(() => {
        if (!searchResult.results) return [];
        return searchResult.results.slice().sort((a, b) => {
            const aSaved = getListVinyl(list, a);
            const bSaved = getListVinyl(list, b);
            if (aSaved && !bSaved) return -1;
            if (!aSaved && bSaved) return 1;
            if (aSaved && bSaved) {
                return new Date(bSaved.createdAt ?? '').getTime() - new Date(aSaved.createdAt ?? '').getTime();
            }
            return 0;
        });
    }, [searchResult, list]);

    return (
        <Flex direction="column" gap="2" px="6">
            <Flex justify="between" align="end">
                <Text color="gray">{`${searchResult.results?.length ?? 0} vinyles trouvés`}</Text>
                <SegmentedControl.Root defaultValue={view}>
                    {VIEWS.map(v => (
                        <SegmentedControl.Item
                            key={v}
                            value={v}
                            onClick={() => {
                                setView(v);
                            }}
                        >
                            <Flex direction="column" align="center">
                                {v === 'grid' ? <GridIcon /> : <RowsIcon />}
                            </Flex>
                        </SegmentedControl.Item>
                    ))}
                </SegmentedControl.Root>
            </Flex>
            <Grid columns={{ initial: '2', sm: '3', md: '4', lg: '5', xl: '6' }} gap="4" gapY="6">
                {filteredResults?.map((result, index) => <SearchResultWrapper key={index} vinyl={result} />)}
            </Grid>
        </Flex>
    );
});
