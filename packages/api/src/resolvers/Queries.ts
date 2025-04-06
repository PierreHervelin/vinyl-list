import { Resolvers } from '../__generated__/resolvers-types';

export const Queries: Resolvers = {
    Query: {
        search: async (_, { query, genre, artist }, { dataSources }) => {
            return dataSources.discogsApi.search(query, genre, artist);
        },
        list: (_, __, { dataSources }) => {
            return dataSources.listDataSource.getList();
        },
    },
};
