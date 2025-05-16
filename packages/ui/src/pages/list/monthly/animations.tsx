import { Box, Card, Code, Flex, Text } from '@radix-ui/themes';
import { DateTime } from 'luxon';
import React, { useEffect, useState, type PropsWithChildren } from 'react';

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
    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    function setTime(): void {
        const now = DateTime.now();
        const nextMonth = DateTime.now().plus({ months: 1 }).startOf('month');
        const diff = nextMonth.diff(now, ['days', 'hours', 'minutes', 'seconds']);
        setDays(diff.days);
        setHours(diff.hours);
        setMinutes(diff.minutes);
        setSeconds(diff.seconds);
    }

    useEffect(() => {
        setTime();
        const interval = setInterval(() => {
            setTime();
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

export const MonthlyVinylRollAnimation = React.memo<PropsWithChildren<{ duration: number }>>(
    ({ children, duration }) => {
        return (
            <Box overflow="hidden" width={{ initial: '200px', md: '250px' }} height={{ initial: '350px', md: '400px' }}>
                <Flex
                    direction="column"
                    style={{
                        animationName: 'loop',
                        animationTimingFunction: 'linear',
                        animationIterationCount: 'infinite',
                        animationDuration: `${duration}ms`,
                    }}
                    gap="4"
                    className="inner"
                >
                    {children}
                    {children}
                </Flex>
            </Box>
        );
    },
);
