import { Resolvers } from '../__generated__/resolvers-types';

export const Mutations: Resolvers = {
    Mutation: {
        addInList: async (_, { id, artist, title, coverImage, genre, year }, { dataSources }) => {
            return dataSources.listDataSource.addInList({
                discogsId: id,
                artist,
                title,
                coverImage,
                genre,
                year,
                createdAt: new Date().toISOString(),
            });
        },
        removeFromList: async (_, { id }, { dataSources }) => {
            return dataSources.listDataSource.removeFromList(id);
        },
    },
};
