import type { ListVinyl, Vinyl } from '../../gql/graphql';

export function getListVinyl(list: ListVinyl[], v: Vinyl): ListVinyl | undefined {
    return list.find(vinyl => vinyl.discogsId === v.id || (vinyl.artist === v.artist && vinyl.title === v.title));
}

export function getListVinylById(list: ListVinyl[], _id: string): ListVinyl | undefined {
    return list.find(vinyl => vinyl._id === _id);
}
