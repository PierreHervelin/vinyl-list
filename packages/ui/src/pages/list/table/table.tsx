import { AspectRatio, Badge, Box, Button, Checkbox, Flex, Heading, Table, Text } from '@radix-ui/themes';
import type { ReactNode } from 'react';
import React, { useEffect, useMemo } from 'react';
import { isMobile } from 'react-device-detect';
import { useAppContext } from '../../../app';
import type { ListVinyl } from '../../../gql/graphql';
import { useListActions, type VinylStatus } from '../../../hooks/list-actions';
import { useListStore } from '../store';
import { ListTableContextProvider, useListTableContext } from './context';

interface TableHeader {
    value: ReactNode;
    hideOn?: 'mobile';
    align?: 'center' | 'right' | 'left' | 'justify' | 'char';
}

const HEADERS: TableHeader[] = [
    { value: '' },
    { value: 'Titre' },
    { value: 'Artiste' },
    { value: 'Genre', hideOn: 'mobile' },
    { value: "Date d'ajout", hideOn: 'mobile', align: 'right' },
];

interface ListTableRowProps {
    vinyl: ListVinyl;
}

const ListTableRow = React.memo<ListTableRowProps>(({ vinyl }) => {
    const { selection, toggleSelection } = useListTableContext();
    const checked = useMemo(() => selection.includes(vinyl._id), [selection, vinyl._id]);

    return (
        <Table.Row key={vinyl._id} align="center" style={{ backgroundColor: checked ? 'var(--accent-3)' : 'unset' }}>
            <Table.Cell>
                <Checkbox checked={checked} onClick={() => toggleSelection(vinyl._id)} />
            </Table.Cell>
            <Table.Cell minWidth="90px" width="100px">
                <AspectRatio>
                    {vinyl.coverImage && <img src={vinyl.coverImage} aria-label="decorative" height="100%" />}
                </AspectRatio>
            </Table.Cell>
            <Table.RowHeaderCell>
                <Text weight="medium">{vinyl.title}</Text>
            </Table.RowHeaderCell>
            <Table.Cell>
                <Text size={isMobile ? '1' : '2'}>{vinyl.artist}</Text>
            </Table.Cell>
            {!isMobile && (
                <Table.Cell>
                    <Flex gap="2" wrap="wrap" align="center">
                        {vinyl.genre?.map((genre, index) => <Badge key={index}>{genre}</Badge>)}
                    </Flex>
                </Table.Cell>
            )}
            {!isMobile && (
                <Table.Cell align="right">
                    <Text color="gray">{new Date(vinyl.createdAt ?? '').toLocaleDateString('fr')}</Text>
                </Table.Cell>
            )}
        </Table.Row>
    );
});

const ListTableActions = React.memo(() => {
    const { selection, setSelection } = useListTableContext();
    const { loading, unSave } = useListActions();

    const { scrollTop } = useAppContext();
    const boxRef = React.useRef<HTMLDivElement>(null);
    const [isSticky, setIsSticky] = React.useState(true);

    useEffect(() => {
        if (!boxRef.current) return;
        const rect = boxRef.current.getBoundingClientRect();
        const offsetParent = boxRef.current.offsetParent?.getBoundingClientRect();
        const offsetParentTop = offsetParent?.top ?? 0;
        setIsSticky(rect.top > offsetParentTop + 40);
    }, [scrollTop]);

    return (
        <Box
            ref={boxRef}
            p={isSticky ? '4' : '0'}
            position="sticky"
            top={isMobile ? '2' : '4'}
            minHeight={isSticky ? '64px' : 'unset'}
            style={{
                background: 'var(--color-panel-solid)',
                boxShadow: isSticky ? 'var(--shadow-4)' : 'none',
                borderRadius: 'var(--radius-4)',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            }}
        >
            <Flex gap="2" justify="between" align="center">
                <Text>{`${selection.length} sélectionnés`}</Text>
                {selection.length > 0 && (
                    <Button
                        loading={loading}
                        size="2"
                        color="red"
                        onClick={async () => {
                            unSave(selection, () => setSelection([]));
                        }}
                    >
                        Supprimer
                    </Button>
                )}
            </Flex>
        </Box>
    );
});

const ListTable = React.memo<{ status: VinylStatus }>(({ status }) => {
    const list = useListStore(state => state.list);
    const filteredList = useMemo<ListVinyl[]>(() => {
        return list
            .slice()
            .sort((a, b) => {
                const dateA = new Date(a.createdAt ?? '').getTime();
                const dateB = new Date(b.createdAt ?? '').getTime();
                return dateB - dateA;
            })
            .filter(vinyl => vinyl.status === status);
    }, [list, status]);

    const { selection, toggleAll } = useListTableContext();

    const headers = HEADERS.filter(header => !isMobile || header.hideOn !== 'mobile');

    return (
        <Flex direction="column" position="relative" gap="4">
            <Heading as="h2" size="4">
                {status === 'have' ? 'Ma collection' : 'Ma liste'}
            </Heading>
            <ListTableActions />
            <Table.Root>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>
                            <Checkbox checked={selection.length === list.length} onClick={() => toggleAll()} />
                        </Table.ColumnHeaderCell>
                        {headers.map((header, index) => (
                            <Table.ColumnHeaderCell key={index} align={header.align}>
                                {header.value}
                            </Table.ColumnHeaderCell>
                        ))}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {filteredList.map(vinyl => (
                        <ListTableRow key={vinyl._id} vinyl={vinyl} />
                    ))}
                </Table.Body>
            </Table.Root>
        </Flex>
    );
});

export const ListTableWrapper = React.memo<{ status: VinylStatus }>(({ status }) => {
    return (
        <ListTableContextProvider>
            <ListTable status={status} />
        </ListTableContextProvider>
    );
});
