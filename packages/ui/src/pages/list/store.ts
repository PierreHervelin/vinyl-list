import { create } from 'zustand';
import type { ListVinyl } from '../../gql/graphql';

interface ListStore {
    list: ListVinyl[];
    setList: (list: ListVinyl[]) => void;
    addInList: (vinyl: ListVinyl) => void;
    removeFromList: (_id: string) => void;
}

export const useListStore = create<ListStore>(set => ({
    list: [],
    setList: list => {
        set({
            list,
        });
    },
    addInList: vinyl => {
        set(state => ({
            list: [...state.list, vinyl],
        }));
    },
    removeFromList: _id => {
        set(state => ({
            list: state.list.filter(vinyl => vinyl._id !== _id),
        }));
    },
}));
