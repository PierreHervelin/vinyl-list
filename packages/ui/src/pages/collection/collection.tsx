import { Flex } from '@radix-ui/themes';
import React from 'react';
import { ListTableWrapper } from '../list/table/table';

export const Collection = React.memo(() => {
    return (
        <Flex direction="column" gap="6" p={{ initial: '4', lg: '9' }}>
            <ListTableWrapper status="have" />
        </Flex>
    );
})
