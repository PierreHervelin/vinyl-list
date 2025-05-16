import { create } from 'zustand';
import type { ListVinyl } from '../../gql/graphql';

interface ListStore {
    list: ListVinyl[];
    setList: (list: ListVinyl[]) => void;
    addInList: (vinyl: ListVinyl) => void;
    updateInList: (vinyl: ListVinyl) => void;
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
    updateInList: vinyl => {
        set(state => ({
            list: state.list.map(v => (v._id === vinyl._id ? vinyl : v)),
        }));
    },
    removeFromList: _id => {
        set(state => ({
            list: state.list.filter(vinyl => vinyl._id !== _id),
        }));
    },
}));
