import { Flex } from '@radix-ui/themes';
import React from 'react';
import { MonthlyVinylWrapper } from './monthly/monthly';
import { ListTableWrapper } from './table/table';

export const List = React.memo(() => {
    return (
        <Flex direction="column" gap="6" p={{ initial: '4', lg: '9' }}>
            <MonthlyVinylWrapper />
            <ListTableWrapper status="want" />
        </Flex>
    );
});
