import { DateTime } from 'luxon';
import React, { createContext, useContext, useMemo, type PropsWithChildren } from 'react';
import type { ListVinyl } from '../../../gql/graphql';
import { useListStore } from '../store';

interface MonthlyVinylContextProps {
    current: ListVinyl | undefined;
    history: ListVinyl[];
}

export const MonthlyVinylContext = createContext<MonthlyVinylContextProps>({ current: undefined, history: [] });

export const MonthlyVinylProvider = React.memo<PropsWithChildren>(({ children }) => {
    const list = useListStore(state => state.list);
    const now = DateTime.now().toUTC().startOf('month').toJSDate().toISOString();
    const context = useMemo<MonthlyVinylContextProps>(() => {
        return {
            current: list.find(v => {
                return v.status === 'monthly' && v.monthlyDate === now;
            }),
            history: list.filter(v => v.status === 'monthly' && v.monthlyDate !== now),
        };
    }, [list]);
    return <MonthlyVinylContext.Provider value={context}>{children}</MonthlyVinylContext.Provider>;
});

export const useMonthlyVinylContext = () => useContext(MonthlyVinylContext);
