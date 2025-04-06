import React, { createContext, useContext, useMemo, useState, type PropsWithChildren } from 'react';
import { NOT_IMPLEMENTED_ERROR } from '../../../app';
import { useListStore } from '../store';

interface ListTableContextProps {
    selection: string[];
    setSelection: (selection: string[]) => void;
    toggleSelection: (id: string) => void;
    toggleAll: () => void;
}

const ListTableContext = createContext<ListTableContextProps>({
    selection: [],
    setSelection: () => {
        throw NOT_IMPLEMENTED_ERROR;
    },
    toggleSelection: () => {
        throw NOT_IMPLEMENTED_ERROR;
    },
    toggleAll: () => {
        throw NOT_IMPLEMENTED_ERROR;
    },
});

export const ListTableContextProvider = React.memo<PropsWithChildren>(({ children }) => {
    const list = useListStore(state => state.list);
    const [selection, setSelection] = useState<string[]>([]);
    function toggleSelection(_id: string) {
        setSelection(prev => {
            if (prev.includes(_id)) {
                return prev.filter(item => item !== _id);
            }
            return [...prev, _id];
        });
    }
    function toggleAll() {
        if (selection.length === list.length) {
            setSelection([]);
        } else {
            setSelection(list.map(item => item._id));
        }
    }
    const context = useMemo<ListTableContextProps>(
        () => ({
            selection,
            setSelection,
            toggleSelection,
            toggleAll,
        }),
        [selection],
    );

    return <ListTableContext.Provider value={context}>{children}</ListTableContext.Provider>;
});

export const useListTableContext = () => useContext(ListTableContext);
