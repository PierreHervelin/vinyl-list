import { ApolloServer, ContextFunction } from '@apollo/server';
import { StandaloneServerContextFunctionArgument, startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import gql from 'graphql-tag';
import { readFileSync } from 'node:fs';
import resolvers from './resolvers';
import { DataSourceContext } from './types/DataSourceContext';
import { DiscogsApi } from './datasources/DiscogsApi';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { ListDataSource } from './datasources/ListDataSource';

dotenv.config();

const port = process.env.PORT ?? '4001';

const context: ContextFunction<[StandaloneServerContextFunctionArgument], DataSourceContext> = async ({ req }) => {
    return {
        dataSources: {
            discogsApi: new DiscogsApi(),
            listDataSource: new ListDataSource(),
        },
    };
};

async function main(): Promise<void> {
    let typeDefs = gql(
        readFileSync('schema.graphql', {
            encoding: 'utf-8',
        }),
    );
    const server = new ApolloServer({
        schema: buildSubgraphSchema({ typeDefs, resolvers }),
    });

    await startStandaloneServer(server, {
        context,
        listen: { port: Number.parseInt(port) },
    });
    await mongoose.connect(process.env.MONGODB_URI, { retryWrites: true, w: 'majority' });
}

main();
