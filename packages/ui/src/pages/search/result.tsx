import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { AspectRatio, Badge, DropdownMenu, Flex, IconButton, Link, Skeleton, Text } from '@radix-ui/themes';
import React, { createContext, useContext, useMemo } from 'react';
import type { ListVinyl, Vinyl } from '../../gql/graphql';
import { useListActions } from '../../hooks/list-actions';
import { useListStore } from '../list/store';
import { getListVinyl } from '../list/utils';
import { useSearchContext } from './context';
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

const ActionsMenu = React.memo<SavedButtonProps>(({ vinyl, hidden }) => {
    const { listVinyl } = useSearchResultContext();
    const { save, unSave, update } = useListActions();

    const iconSize = 18;

    if (hidden) return null;
    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <IconButton variant="ghost">
                    <DotsHorizontalIcon width={iconSize} height={iconSize} />
                </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                {(listVinyl?.status !== 'have' || !listVinyl) && (
                    <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger>Ajouter</DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                            {!listVinyl && (
                                <DropdownMenu.Item onClick={() => save(vinyl)}>à la liste</DropdownMenu.Item>
                            )}
                            {listVinyl?.status !== 'have' && (
                                <DropdownMenu.Item
                                    onClick={async () => {
                                        if (listVinyl) {
                                            await update(listVinyl._id, 'have');
                                            return;
                                        }
                                        save(vinyl, 'have');
                                    }}
                                >
                                    à la collection
                                </DropdownMenu.Item>
                            )}
                        </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                )}

                {listVinyl && (
                    <DropdownMenu.Item onClick={() => unSave([listVinyl._id])} color="red">
                        Supprimer
                    </DropdownMenu.Item>
                )}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
});

export const VinylCover = React.memo<{ url?: string }>(({ url }) => {
    const coverImageEmpty = useMemo<boolean>(() => {
        if (!url) return true;
        return url.includes('spacer.gif');
    }, [url]);

    return (
        <img
            src={!coverImageEmpty ? url : 'src/assets/image-not-found.png'}
            alt="Cover"
            style={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                borderRadius: 'var(--radius-2)',
            }}
        />
    );
});

const SearchResult = React.memo<SearchResultProps>(({ vinyl }) => {
    const { loading } = useSearchContext();
    const { saved, listVinyl } = useSearchResultContext();
    const addArtist = useSearchStore(state => state.addArtist);

    return (
        <Flex direction="column" gap="2">
            <Skeleton loading={loading}>
                <AspectRatio ratio={1} style={{ width: '100%' }}>
                    {saved && (
                        <Badge
                            variant="solid"
                            color={listVinyl?.status === 'have' ? 'green' : undefined}
                            style={{
                                position: 'absolute',
                                top: '8px',
                                left: '8px',
                            }}
                        >
                            {listVinyl?.status === 'have' ? 'Collection' : 'Liste'}
                        </Badge>
                    )}
                    <VinylCover url={vinyl.coverImage as string} />
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
                    <ActionsMenu vinyl={vinyl} />
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
