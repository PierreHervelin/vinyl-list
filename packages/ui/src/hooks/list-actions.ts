import { useState } from 'react';
import { graphql } from '../gql';
import type { Vinyl } from '../gql/graphql';
import { useListStore } from '../pages/list/store';
import { useMutation } from '@apollo/client';

const ADD_IN_LIST = graphql(`
    mutation AddInList(
        $id: Int!
        $title: String!
        $artist: String!
        $genre: [String!]
        $year: String
        $coverImage: String
    ) {
        addInList(id: $id, title: $title, artist: $artist, genre: $genre, year: $year, coverImage: $coverImage) {
            _id
            discogsId
            title
            artist
            genre
            year
            coverImage
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
            createdAt
        }
    }
`);

export function useListActions() {
    const add = useListStore(state => state.addInList);
    const remove = useListStore(state => state.removeFromList);
    const [loading, setLoading] = useState(false);

    const [addInList] = useMutation(ADD_IN_LIST);
    const [removeFromList] = useMutation(REMOVE_FROM_LIST);

    async function save(vinyl: Vinyl) {
        setLoading(true);
        const result = await addInList({
            variables: {
                id: vinyl.id,
                title: vinyl.title,
                artist: vinyl.artist,
                genre: vinyl.genre,
                year: vinyl.year,
                coverImage: vinyl.coverImage,
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

    return { save, unSave, loading };
}
