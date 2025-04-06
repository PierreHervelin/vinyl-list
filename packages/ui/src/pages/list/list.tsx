import { Button, Callout, Card, Code, Dialog, Flex, Heading, Text } from '@radix-ui/themes';
import React, { useEffect } from 'react';
import { ListTableWrapper } from './table/table';
import { DateTime } from 'luxon';
import { InfoCircledIcon } from '@radix-ui/react-icons';

export const CountDownItem = React.memo<{ value: number; label: string }>(({ value, label }) => {
    function formatTime(time: number) {
        return String(Math.floor(time)).padStart(2, '0');
    }

    return (
        <Card style={{ width: '60px', padding: '8px', backgroundColor: 'var(--accent-6)' }}>
            <Flex direction="column" justify="center" align="center" gap="0">
                <Text size="1" style={{ color: 'var(--accent-10)' }}>
                    {label}
                </Text>
                <Code variant="ghost" color="indigo" size="5">
                    {formatTime(value)}
                </Code>
            </Flex>
        </Card>
    );
});

export const MonthlyVinylCountDown = React.memo(() => {
    const [days, setDays] = React.useState(0);
    const [hours, setHours] = React.useState(0);
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = DateTime.now();
            const nextMonth = DateTime.now().plus({ months: 1 }).startOf('month');
            const diff = nextMonth.diff(now, ['days', 'hours', 'minutes', 'seconds']);
            setDays(diff.days);
            setHours(diff.hours);
            setMinutes(diff.minutes);
            setSeconds(diff.seconds);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Flex gap="1">
            <CountDownItem value={days} label="Jours" />
            <CountDownItem value={hours} label="Heures" />
            <CountDownItem value={minutes} label="Min" />
            <CountDownItem value={seconds} label="Sec" />
        </Flex>
    );
});

export const MonthlyVinyl = React.memo(() => {
    return (
        <Flex direction="column" gap="4">
            <Heading as="h2" size="4">
                Vinyle du mois
            </Heading>
            <Callout.Root size="2">
                <Callout.Icon>
                    <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>C'est l'heure ! Votre vinyle du mois peut être révélé.</Callout.Text>
            </Callout.Root>
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

                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button size="3">Révéler</Button>
                        </Dialog.Trigger>
                        <Dialog.Content>
                            <Dialog.Title>Le vinyle du mois</Dialog.Title>
                        </Dialog.Content>
                    </Dialog.Root>
                </Flex>
            </Card>
        </Flex>
    );
});

export const List = React.memo(() => {
    return (
        <Flex direction="column" gap="6" p={{ initial: '4', lg: '9' }}>
            <MonthlyVinyl />
            <ListTableWrapper />
        </Flex>
    );
});
