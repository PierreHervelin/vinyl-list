/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    '\n    query GetList {\n        list {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            createdAt\n        }\n    }\n': typeof types.GetListDocument;
    '\n    mutation AddInList(\n        $id: Int!\n        $title: String!\n        $artist: String!\n        $genre: [String!]\n        $year: String\n        $coverImage: String\n        $status: String\n    ) {\n        addInList(\n            id: $id\n            title: $title\n            artist: $artist\n            genre: $genre\n            year: $year\n            coverImage: $coverImage\n            status: $status\n        ) {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n': typeof types.AddInListDocument;
    '\n    mutation RemoveFromList($id: ID!) {\n        removeFromList(id: $id) {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n': typeof types.RemoveFromListDocument;
    '\n    mutation UpdateInList($id: ID!, $status: String!) {\n        updateInList(id: $id, status: $status) {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n': typeof types.UpdateInListDocument;
    '\n    mutation GetMonthly {\n        monthly {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n': typeof types.GetMonthlyDocument;
    '\n    query GetVinyl($query: String!, $genre: [String!], $artist: [String!]) {\n        search(query: $query, genre: $genre, artist: $artist) {\n            items\n            page\n            pages\n            perPage\n            results {\n                id\n                title\n                artist\n                genre\n                year\n                coverImage\n            }\n        }\n    }\n': typeof types.GetVinylDocument;
};
const documents: Documents = {
    '\n    query GetList {\n        list {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            createdAt\n        }\n    }\n':
        types.GetListDocument,
    '\n    mutation AddInList(\n        $id: Int!\n        $title: String!\n        $artist: String!\n        $genre: [String!]\n        $year: String\n        $coverImage: String\n        $status: String\n    ) {\n        addInList(\n            id: $id\n            title: $title\n            artist: $artist\n            genre: $genre\n            year: $year\n            coverImage: $coverImage\n            status: $status\n        ) {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n':
        types.AddInListDocument,
    '\n    mutation RemoveFromList($id: ID!) {\n        removeFromList(id: $id) {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n':
        types.RemoveFromListDocument,
    '\n    mutation UpdateInList($id: ID!, $status: String!) {\n        updateInList(id: $id, status: $status) {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n':
        types.UpdateInListDocument,
    '\n    mutation GetMonthly {\n        monthly {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n':
        types.GetMonthlyDocument,
    '\n    query GetVinyl($query: String!, $genre: [String!], $artist: [String!]) {\n        search(query: $query, genre: $genre, artist: $artist) {\n            items\n            page\n            pages\n            perPage\n            results {\n                id\n                title\n                artist\n                genre\n                year\n                coverImage\n            }\n        }\n    }\n':
        types.GetVinylDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetList {\n        list {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            createdAt\n        }\n    }\n',
): (typeof documents)['\n    query GetList {\n        list {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            createdAt\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation AddInList(\n        $id: Int!\n        $title: String!\n        $artist: String!\n        $genre: [String!]\n        $year: String\n        $coverImage: String\n        $status: String\n    ) {\n        addInList(\n            id: $id\n            title: $title\n            artist: $artist\n            genre: $genre\n            year: $year\n            coverImage: $coverImage\n            status: $status\n        ) {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n',
): (typeof documents)['\n    mutation AddInList(\n        $id: Int!\n        $title: String!\n        $artist: String!\n        $genre: [String!]\n        $year: String\n        $coverImage: String\n        $status: String\n    ) {\n        addInList(\n            id: $id\n            title: $title\n            artist: $artist\n            genre: $genre\n            year: $year\n            coverImage: $coverImage\n            status: $status\n        ) {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation RemoveFromList($id: ID!) {\n        removeFromList(id: $id) {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n',
): (typeof documents)['\n    mutation RemoveFromList($id: ID!) {\n        removeFromList(id: $id) {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation UpdateInList($id: ID!, $status: String!) {\n        updateInList(id: $id, status: $status) {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n',
): (typeof documents)['\n    mutation UpdateInList($id: ID!, $status: String!) {\n        updateInList(id: $id, status: $status) {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    mutation GetMonthly {\n        monthly {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n',
): (typeof documents)['\n    mutation GetMonthly {\n        monthly {\n            _id\n            discogsId\n            title\n            artist\n            genre\n            year\n            coverImage\n            status\n            monthlyDate\n            createdAt\n        }\n    }\n'];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
    source: '\n    query GetVinyl($query: String!, $genre: [String!], $artist: [String!]) {\n        search(query: $query, genre: $genre, artist: $artist) {\n            items\n            page\n            pages\n            perPage\n            results {\n                id\n                title\n                artist\n                genre\n                year\n                coverImage\n            }\n        }\n    }\n',
): (typeof documents)['\n    query GetVinyl($query: String!, $genre: [String!], $artist: [String!]) {\n        search(query: $query, genre: $genre, artist: $artist) {\n            items\n            page\n            pages\n            perPage\n            results {\n                id\n                title\n                artist\n                genre\n                year\n                coverImage\n            }\n        }\n    }\n'];

export function graphql(source: string) {
    return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
    TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
