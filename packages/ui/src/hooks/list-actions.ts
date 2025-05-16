import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { graphql } from '../gql';
import type { Vinyl } from '../gql/graphql';
import { useListStore } from '../pages/list/store';

const ADD_IN_LIST = graphql(`
    mutation AddInList(
        $id: Int!
        $title: String!
        $artist: String!
        $genre: [String!]
        $year: String
        $coverImage: String
        $status: String
    ) {
        addInList(
            id: $id
            title: $title
            artist: $artist
            genre: $genre
            year: $year
            coverImage: $coverImage
            status: $status
        ) {
            _id
            discogsId
            title
            artist
            genre
            year
            coverImage
            status
            monthlyDate
            createdAt
        }
    }
`);

const REMOVE_FROM_LIST = graphql(`
    mutation RemoveFromList($id: ID!) {
        removeFromList(id: $id) {
            _id
            discogsId
            title
            artist
            genre
            year
            coverImage
            status
            monthlyDate
            createdAt
        }
    }
`);

const UPDATE_IN_LIST = graphql(`
    mutation UpdateInList($id: ID!, $status: String!) {
        updateInList(id: $id, status: $status) {
            _id
            discogsId
            title
            artist
            genre
            year
            coverImage
            status
            monthlyDate
            createdAt
        }
    }
`);

const GET_MONTHLY = graphql(`
    mutation GetMonthly {
        monthly {
            _id
            discogsId
            title
            artist
            genre
            year
            coverImage
            status
            monthlyDate
            createdAt
        }
    }
`);

export type VinylStatus = 'have' | 'want' | 'monthly';

export function useListActions() {
    const add = useListStore(state => state.addInList);
    const remove = useListStore(state => state.removeFromList);
    const updateInStore = useListStore(state => state.updateInList);
    const [loading, setLoading] = useState(false);

    const [addInList] = useMutation(ADD_IN_LIST);
    const [removeFromList] = useMutation(REMOVE_FROM_LIST);
    const [updateInList] = useMutation(UPDATE_IN_LIST);
    const [getMonthly] = useMutation(GET_MONTHLY);

    async function save(vinyl: Vinyl, status?: VinylStatus) {
        setLoading(true);
        const result = await addInList({
            variables: {
                id: vinyl.id,
                title: vinyl.title,
                artist: vinyl.artist,
                genre: vinyl.genre,
                year: vinyl.year,
                coverImage: vinyl.coverImage,
                status: status ?? 'want',
            },
        });
        if (!result.data?.addInList) return;
        add(result.data.addInList);
        setLoading(false);
    }

    async function unSave(_ids: string[], callBack?: () => void) {
        setLoading(true);
        for (const _id of _ids) {
            const result = await removeFromList({ variables: { id: _id } });
            if (!result.data?.removeFromList) return;
            remove(result.data.removeFromList._id);
        }
        setLoading(false);
        if (callBack) callBack();
    }

    async function update(_id: string, status: VinylStatus) {
        setLoading(true);
        const result = await updateInList({ variables: { id: _id, status } });
        if (!result.data?.updateInList) return;
        updateInStore(result.data.updateInList);
        setLoading(false);
    }

    async function monthly() {
        setLoading(true);
        const result = await getMonthly();
        if (!result.data?.monthly) return;
        updateInStore(result.data.monthly);
        setLoading(false);
    }

    return { save, unSave, update, monthly, loading };
}
