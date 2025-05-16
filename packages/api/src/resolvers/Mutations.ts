import { Resolvers } from '../__generated__/resolvers-types';
import { VinylStatus } from '../models/vinyl';

export const Mutations: Resolvers = {
    Mutation: {
        addInList: async (_, { id, artist, title, coverImage, genre, year, status }, { dataSources }) => {
            return dataSources.listDataSource.addInList({
                discogsId: id,
                artist,
                title,
                coverImage,
                genre,
                year,
                status: status ?? 'want',
                createdAt: new Date().toISOString(),
            });
        },
        updateInList: async (_, { id, status }, { dataSources }) => {
            return dataSources.listDataSource.updateInList(id, status as VinylStatus);
        },
        removeFromList: async (_, { id }, { dataSources }) => {
            return dataSources.listDataSource.removeFromList(id);
        },
        monthly: async (_, { month }, { dataSources }) => {
            const date = month ? new Date(month) : new Date();
            return dataSources.listDataSource.getMonthly(date);
        },
    },
};
