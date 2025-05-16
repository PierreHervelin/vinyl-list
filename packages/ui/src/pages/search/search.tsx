import {
    Cross1Icon,
    GridIcon,
    MagnifyingGlassIcon,
    MinusIcon,
    PersonIcon,
    PlusIcon,
    RowsIcon,
} from '@radix-ui/react-icons';
import { Button, Flex, Grid, IconButton, SegmentedControl, Select, Text, TextField } from '@radix-ui/themes';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useAppContext } from '../../app';
import type { Vinyl } from '../../gql/graphql';
import { useListStore } from '../list/store';
import { getListVinyl } from '../list/utils';
import { SearchProvider, useSearchContext, type View } from './context';
import { SearchResultWrapper } from './result';
import { useSearchStore } from './store';

interface Genre {
    label: string;
    value: string;
}

export type Color =
    | 'ruby'
    | 'blue'
    | 'brown'
    | 'crimson'
    | 'cyan'
    | 'gold'
    | 'gray'
    | 'green'
    | 'indigo'
    | 'lime'
    | 'orange'
    | 'pink'
    | 'plum'
    | 'purple'
    | 'red'
    | 'teal'
    | 'tomato'
    | 'violet'
    | 'yellow';

const GENRES: Genre[] = [
    { label: 'Rock', value: 'Rock' },
    { label: 'Pop', value: 'Pop' },
    { label: 'Hip-Hop', value: 'Hip Hop' },
    { label: 'Soul', value: 'Funk / Soul' },
    { label: 'Jazz', value: 'Jazz' },
    { label: 'Classique', value: 'Classical' },
    { label: 'Electro', value: 'Electronic' },
    { label: 'Reggae', value: 'Reggae' },
    { label: 'Country', value: 'Country' },
    { label: 'Blues', value: 'Blues' },
];

export const SearchWrapper = React.memo(() => {
    return (
        <SearchProvider>
            <Search />
        </SearchProvider>
    );
});

export const DynamicFilterTag = React.memo<{ value: string; type: 'artist' | 'genre' }>(({ value, type }) => {
    const removeArtist = useSearchStore(state => state.removeArtist);
    const removeGenre = useSearchStore(state => state.removeGenre);
    const [hovered, setHovered] = useState(false);
    function getIcon() {
        if (hovered) {
            return <MinusIcon width="16" height="16" />;
        }
        if (type === 'genre') {
            return;
        }
        return <PersonIcon width="16" height="16" />;
    }
    function getColor(): Color {
        if (type === 'artist') {
            return 'indigo';
        }
        return 'orange';
    }
    return (
        <Button
            variant="soft"
            color={getColor()}
            size="1"
            onClick={() => {
                if (type === 'genre') {
                    removeGenre(value);
                    return;
                }
                removeArtist(value);
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {getIcon()}
            {value}
        </Button>
    );
});

export const GenreSelectItem = React.memo<{ genre: Genre }>(({ genre }) => {
    const addGenre = useSearchStore(state => state.addGenre);
    const [hovered, setHovered] = useState(false);

    return (
        <Select.Item
            value={genre.value}
            onClick={() => {
                addGenre(genre.value);
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Flex align="center" gap="1">
                {hovered && <PlusIcon />}
                <Text>{genre.label}</Text>
            </Flex>
        </Select.Item>
    );
});

export const Search = React.memo(() => {
    const { scrollTop } = useAppContext();

    const [searchMode, setSearchMode] = useState<string>('query');
    const query = useSearchStore(state => state.query);
    const genre = useSearchStore(state => state.genre);
    const artist = useSearchStore(state => state.artist);
    const setQuery = useSearchStore(state => state.setQuery);
    const addGenre = useSearchStore(state => state.addGenre);
    const addArtist = useSearchStore(state => state.addArtist);

    const [currentQuery, setCurrentQuery] = useState<string>(query);
    const textFieldRef = useRef<HTMLInputElement>(null);

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
                        ref={textFieldRef}
                        placeholder="Rechercher un vinyle"
                        size="3"
                        style={{ maxWidth: '600px', flexGrow: 1 }}
                        value={currentQuery}
                        onChange={e => setCurrentQuery(e.target.value)}
                        onKeyUp={e => {
                            if (e.key === 'Enter') {
                                if (searchMode === 'query') {
                                    setQuery(currentQuery);
                                    return;
                                }
                                if (searchMode === 'genre') {
                                    addGenre(currentQuery);
                                }
                                if (searchMode === 'artist') {
                                    addArtist(currentQuery);
                                }
                                setQuery('');
                            }
                        }}
                    >
                        <TextField.Slot>
                            <MagnifyingGlassIcon height="16" width="16" />
                        </TextField.Slot>

                        <TextField.Slot>
                            <Select.Root size="1" value={searchMode} onValueChange={setSearchMode} defaultValue="query">
                                <Select.Trigger />
                                <Select.Content>
                                    <Select.Item value="query">
                                        <Text>Mots-clés</Text>
                                    </Select.Item>
                                    <Select.Item value="artist">
                                        <Text>Artiste</Text>
                                    </Select.Item>
                                    <Select.Item value="genre">
                                        <Text>Genre</Text>
                                    </Select.Item>
                                </Select.Content>
                            </Select.Root>
                        </TextField.Slot>

                        {currentQuery.length > 0 && (
                            <TextField.Slot>
                                <IconButton
                                    variant="soft"
                                    size="1"
                                    onClick={() => {
                                        setQuery('');
                                        setCurrentQuery('');
                                        textFieldRef.current?.focus();
                                    }}
                                >
                                    <Cross1Icon />
                                </IconButton>
                            </TextField.Slot>
                        )}
                    </TextField.Root>
                    <Select.Root size="3" value={''} onValueChange={addGenre}>
                        <Select.Trigger placeholder="Genre" />
                        <Select.Content style={{ width: '150px' }}>
                            {GENRES.map(genre => (
                                <GenreSelectItem key={genre.value} genre={genre} />
                            ))}
                        </Select.Content>
                    </Select.Root>
                </Flex>
                {artist.length + genre.length > 0 && (
                    <Flex gap="2" wrap="wrap">
                        {artist.map(a => (
                            <DynamicFilterTag key={a} value={a} type="artist" />
                        ))}
                        {genre.map(g => (
                            <DynamicFilterTag key={g} value={g} type="genre" />
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
            if (aSaved && bSaved) {
                const statusOrder = ['have', 'want'];
                const aStatusIndex = statusOrder.indexOf(aSaved.status ?? '');
                const bStatusIndex = statusOrder.indexOf(bSaved.status ?? '');
                if (aStatusIndex !== bStatusIndex) {
                    return aStatusIndex - bStatusIndex;
                }
                return new Date(bSaved.createdAt ?? '').getTime() - new Date(aSaved.createdAt ?? '').getTime();
            }
            if (aSaved && !bSaved) return -1;
            if (!aSaved && bSaved) return 1;
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
