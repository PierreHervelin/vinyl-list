import { AspectRatio, Badge, Flex, IconButton, Link, Skeleton, Text, Tooltip } from '@radix-ui/themes';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { useSearchContext } from './context';
import { MinusIcon, PlusIcon } from '@radix-ui/react-icons';
import type { ListVinyl, Vinyl } from '../../gql/graphql';
import { useListStore } from '../list/store';
import { isMobile } from 'react-device-detect';
import { getListVinyl } from '../list/utils';
import { useListActions } from '../../hooks/list-actions';
import { useSearchStore } from './store';

interface SearchResultProps {
    vinyl: Vinyl;
}

interface SearchResultContextProps {
    saved: boolean;
    listVinyl?: ListVinyl;
}

const SearchResultContext = createContext<SearchResultContextProps>({
    saved: false,
});

const SearchResultProvider = React.memo<React.PropsWithChildren<SearchResultProps>>(({ children, vinyl }) => {
    const list = useListStore(state => state.list);
    const listVinyl = useMemo(() => getListVinyl(list, vinyl), [list, vinyl]);
    const context = useMemo<SearchResultContextProps>(() => ({ saved: !!listVinyl, listVinyl }), [listVinyl]);
    return <SearchResultContext.Provider value={context}>{children}</SearchResultContext.Provider>;
});

const useSearchResultContext = () => useContext(SearchResultContext);

interface SavedButtonProps {
    vinyl: Vinyl;
    hidden?: boolean;
}

const SavedButton = React.memo<SavedButtonProps>(({ vinyl, hidden }) => {
    const { listVinyl } = useSearchResultContext();
    const { save, unSave, loading } = useListActions();

    const iconSize = isMobile ? 18 : 22;

    if (hidden) return null;
    return (
        <Tooltip content={listVinyl ? 'Supprimer de la liste' : 'Ajouter à la liste'}>
            <IconButton
                variant={isMobile ? 'soft' : 'solid'}
                loading={loading}
                size={isMobile ? '2' : '3'}
                style={isMobile ? {} : { position: 'absolute', bottom: '8px', right: '8px' }}
                onClick={() => (listVinyl ? unSave([listVinyl._id]) : save(vinyl))}
                color={listVinyl ? 'red' : 'indigo'}
            >
                {listVinyl ? (
                    <MinusIcon width={iconSize} height={iconSize} />
                ) : (
                    <PlusIcon width={iconSize} height={iconSize} />
                )}
            </IconButton>
        </Tooltip>
    );
});

const SearchResult = React.memo<SearchResultProps>(({ vinyl }) => {
    const { loading } = useSearchContext();
    const { saved } = useSearchResultContext();
    const addArtist = useSearchStore(state => state.addArtist);
    const [hovered, setHovered] = useState(false);

    const coverImageEmpty = useMemo<boolean>(() => {
        if (!vinyl.coverImage) return true;
        return vinyl.coverImage.includes('spacer.gif');
    }, [vinyl]);

    return (
        <Flex direction="column" gap="2">
            <Skeleton loading={loading}>
                <AspectRatio
                    ratio={1}
                    style={{ width: '100%' }}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    {saved && (
                        <Badge
                            variant="solid"
                            style={{
                                position: 'absolute',
                                top: '8px',
                                left: '8px',
                            }}
                        >
                            Ajouté
                        </Badge>
                    )}
                    <img
                        src={!coverImageEmpty ? (vinyl.coverImage as string) : 'src/assets/image-not-found.png'}
                        alt="Cover"
                        style={{
                            objectFit: 'cover',
                            width: '100%',
                            height: '100%',
                            borderRadius: 'var(--radius-2)',
                        }}
                    />
                    {!isMobile && <SavedButton vinyl={vinyl} hidden={!hovered} />}
                </AspectRatio>
            </Skeleton>
            <Flex>
                <Flex gap="2" justify="between" align="start" width="100%">
                    <Flex direction="column" width="100%" gap={loading ? '1' : '0'}>
                        <Skeleton loading={loading}>
                            <Text size="3" weight="medium">
                                {vinyl.title}
                            </Text>
                        </Skeleton>
                        <Skeleton loading={loading}>
                            <Link
                                href="#"
                                onClick={e => {
                                    e.preventDefault();
                                    addArtist(vinyl.artist);
                                }}
                            >
                                <Text size="2" color="gray">
                                    {vinyl.artist}
                                </Text>
                            </Link>
                        </Skeleton>
                    </Flex>
                    {isMobile && !loading && <SavedButton vinyl={vinyl} />}
                </Flex>
            </Flex>
        </Flex>
    );
});

export const SearchResultWrapper = React.memo<SearchResultProps>(({ vinyl }) => {
    return (
        <SearchResultProvider vinyl={vinyl}>
            <SearchResult vinyl={vinyl} />
        </SearchResultProvider>
    );
});
