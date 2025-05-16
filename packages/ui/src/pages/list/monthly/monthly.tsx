import { InfoCircledIcon } from '@radix-ui/react-icons';
import { AspectRatio, Button, Callout, Card, Dialog, Flex, Heading } from '@radix-ui/themes';
import React from 'react';
import { useListActions } from '../../../hooks/list-actions';
import { VinylCover } from '../../search/result';
import { useListStore } from '../store';
import { MonthlyVinylCountDown, MonthlyVinylRollAnimation } from './animations';
import { MonthlyVinylProvider, useMonthlyVinylContext } from './context';

export const MonthlyVinylDialog = React.memo(() => {
    const { monthly, loading } = useListActions();
    const list = useListStore(state => state.list);
    const filteredList = list.filter(item => item.status === 'want');
    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button size="3">Révéler</Button>
            </Dialog.Trigger>
            <Dialog.Content>
                <Flex direction="column" gap="4">
                    <Dialog.Title size="5">Le vinyle du mois</Dialog.Title>
                    <Flex direction="column" align="center" gap="2">
                        <MonthlyVinylRollAnimation duration={5000}>
                            {filteredList.map(item => (
                                <AspectRatio key={item._id} ratio={1}>
                                    <VinylCover url={item.coverImage as string} />
                                </AspectRatio>
                            ))}
                        </MonthlyVinylRollAnimation>
                    </Flex>
                    <Flex gap="2" justify="center">
                        <Dialog.Close>
                            <Button disabled={loading} variant="soft" size="3">
                                Annuler
                            </Button>
                        </Dialog.Close>
                        <Button size="3" loading={loading} onClick={() => monthly()}>
                            Arrêter !
                        </Button>
                    </Flex>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    );
});

export const MonthlyVinyl = React.memo(() => {
    const { current } = useMonthlyVinylContext();
    return (
        <Flex direction="column" gap="4">
            <Heading as="h2" size="4">
                Vinyle du mois
            </Heading>
            {!current && (
                <Callout.Root size="2">
                    <Callout.Icon>
                        <InfoCircledIcon />
                    </Callout.Icon>
                    <Callout.Text>C'est l'heure ! Votre vinyle du mois peut être révélé.</Callout.Text>
                </Callout.Root>
            )}
            <Card>
                <Flex direction={{ initial: 'column', md: 'row' }} justify="between" align="center" gap="2" p="4">
                    <Flex direction="column" gap="2">
                        <Heading as="h2" size="3" weight="medium">
                            Temps restant
                        </Heading>
                        <Flex direction="column">
                            <MonthlyVinylCountDown />
                        </Flex>
                    </Flex>

                    <MonthlyVinylDialog />
                </Flex>
            </Card>
        </Flex>
    );
});

export const MonthlyVinylWrapper = React.memo(() => {
    return (
        <MonthlyVinylProvider>
            <MonthlyVinyl />
        </MonthlyVinylProvider>
    );
});
