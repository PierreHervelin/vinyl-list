import { BookmarkIcon, MagnifyingGlassIcon, StarIcon } from '@radix-ui/react-icons';
import { Box, Flex, Text, type IconProps } from '@radix-ui/themes';
import React, { useMemo, type ReactElement } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';
import { Link, useMatch } from 'react-router-dom';

interface NavbarItem {
    title: string;
    to: string;
    icon: ReactElement<IconProps>;
}

interface NavbarItemProps extends NavbarItem {
    mini?: boolean;
}

const ICON_SIZE = '18px';

const ICON_SIZE_MOBILE = '26px';

const NAVBAR_ITEMS: NavbarItem[] = [
    {
        title: 'Recherche',
        to: '/',
        icon: <MagnifyingGlassIcon />,
    },
    {
        title: 'Liste',
        to: '/list',
        icon: <BookmarkIcon />,
    },
    {
        title: 'Collection',
        to: '/collection',
        icon: <StarIcon />,
    },
];

const NavbarItem = React.memo<NavbarItemProps>(({ title, to, icon, mini }) => {
    const match = useMatch(to);
    const Icon = icon.type as React.ElementType<IconProps>;
    const color = useMemo(() => (match ? 'white' : 'var(--gray-12)'), [match]);
    return (
        <Link
            to={to}
            style={{
                textDecoration: 'none',
                color: 'inherit',
                padding: '5px',
                paddingInline: '10px',
                background: match ? 'var(--accent-10)' : 'transparent',
                borderRadius: mini ? 'var(--radius-4)' : 'var(--radius-3)',
                flex: '1 1 0px',
                maxWidth: mini ? '80px' : 'unset',
            }}
        >
            <Flex direction={mini ? 'column' : 'row'} align="center" gap={mini ? '1' : '2'}>
                <Icon
                    width={mini ? ICON_SIZE_MOBILE : ICON_SIZE}
                    height={mini ? ICON_SIZE_MOBILE : ICON_SIZE}
                    color={color}
                />

                <Text as="p" size={mini ? '1' : '3'} style={{ color }}>
                    {title}
                </Text>
            </Flex>
        </Link>
    );
});

export const Navbar = () => {
    return (
        <>
            <BrowserView>
                <Box
                    position="sticky"
                    top="0"
                    height="100vh"
                    width="250px"
                    flexShrink="0"
                    p="3"
                    style={{
                        alignSelf: 'flex-start',
                        zIndex: 2,
                        boxShadow: 'var(--shadow-4)',
                        background: 'var(--color-panel-solid)',
                    }}
                >
                    <Flex direction="column" gap="6">
                        <Flex direction="column" gap="10px">
                            {NAVBAR_ITEMS.map(item => (
                                <NavbarItem key={item.title} title={item.title} to={item.to} icon={item.icon} />
                            ))}
                        </Flex>
                    </Flex>
                </Box>
            </BrowserView>
            <MobileView>
                <Box
                    position="fixed"
                    bottom="0"
                    width="100%"
                    flexShrink="0"
                    p="3"
                    style={{ zIndex: 2, boxShadow: 'var(--shadow-4)', background: 'var(--color-panel-solid)' }}
                >
                    <Flex gap="2" justify="center" align="center" flexGrow="1">
                        {NAVBAR_ITEMS.map(item => (
                            <NavbarItem key={item.title} title={item.title} to={item.to} icon={item.icon} mini={true} />
                        ))}
                    </Flex>
                </Box>
            </MobileView>
        </>
    );
};
