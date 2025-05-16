/* eslint-disable */
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    _Any: { input: any; output: any };
    _FieldSet: { input: any; output: any };
};

export type ListVinyl = {
    __typename?: 'ListVinyl';
    _id: Scalars['ID']['output'];
    artist: Scalars['String']['output'];
    coverImage?: Maybe<Scalars['String']['output']>;
    createdAt?: Maybe<Scalars['String']['output']>;
    discogsId: Scalars['Int']['output'];
    genre?: Maybe<Array<Scalars['String']['output']>>;
    monthlyDate?: Maybe<Scalars['String']['output']>;
    status: Scalars['String']['output'];
    title: Scalars['String']['output'];
    year?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
    __typename?: 'Mutation';
    addInList?: Maybe<ListVinyl>;
    monthly?: Maybe<ListVinyl>;
    removeFromList?: Maybe<ListVinyl>;
    updateInList?: Maybe<ListVinyl>;
};

export type MutationAddInListArgs = {
    artist: Scalars['String']['input'];
    coverImage?: InputMaybe<Scalars['String']['input']>;
    genre?: InputMaybe<Array<Scalars['String']['input']>>;
    id: Scalars['Int']['input'];
    status?: InputMaybe<Scalars['String']['input']>;
    title: Scalars['String']['input'];
    year?: InputMaybe<Scalars['String']['input']>;
};

export type MutationMonthlyArgs = {
    month?: InputMaybe<Scalars['String']['input']>;
};

export type MutationRemoveFromListArgs = {
    id: Scalars['ID']['input'];
};

export type MutationUpdateInListArgs = {
    id: Scalars['ID']['input'];
    status?: InputMaybe<Scalars['String']['input']>;
};

export type Pagination = {
    __typename?: 'Pagination';
    items: Scalars['Int']['output'];
    page: Scalars['Int']['output'];
    pages: Scalars['Int']['output'];
    perPage: Scalars['Int']['output'];
    results?: Maybe<Array<Vinyl>>;
};

export type Query = {
    __typename?: 'Query';
    _service: _Service;
    list?: Maybe<Array<ListVinyl>>;
    search?: Maybe<Pagination>;
};

export type QueryListArgs = {
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type QuerySearchArgs = {
    artist?: InputMaybe<Array<Scalars['String']['input']>>;
    genre?: InputMaybe<Array<Scalars['String']['input']>>;
    query: Scalars['String']['input'];
};

export type Vinyl = {
    __typename?: 'Vinyl';
    artist: Scalars['String']['output'];
    country?: Maybe<Scalars['String']['output']>;
    coverImage?: Maybe<Scalars['String']['output']>;
    format?: Maybe<Array<Scalars['String']['output']>>;
    genre?: Maybe<Array<Scalars['String']['output']>>;
    id: Scalars['Int']['output'];
    style?: Maybe<Array<Scalars['String']['output']>>;
    title: Scalars['String']['output'];
    year?: Maybe<Scalars['String']['output']>;
};

export type _Service = {
    __typename?: '_Service';
    sdl?: Maybe<Scalars['String']['output']>;
};

export type GetListQueryVariables = Exact<{ [key: string]: never }>;

export type GetListQuery = {
    __typename?: 'Query';
    list?: Array<{
        __typename?: 'ListVinyl';
        _id: string;
        discogsId: number;
        title: string;
        artist: string;
        genre?: Array<string> | null;
        year?: string | null;
        coverImage?: string | null;
        status: string;
        createdAt?: string | null;
    }> | null;
};

export type AddInListMutationVariables = Exact<{
    id: Scalars['Int']['input'];
    title: Scalars['String']['input'];
    artist: Scalars['String']['input'];
    genre?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
    year?: InputMaybe<Scalars['String']['input']>;
    coverImage?: InputMaybe<Scalars['String']['input']>;
    status?: InputMaybe<Scalars['String']['input']>;
}>;

export type AddInListMutation = {
    __typename?: 'Mutation';
    addInList?: {
        __typename?: 'ListVinyl';
        _id: string;
        discogsId: number;
        title: string;
        artist: string;
        genre?: Array<string> | null;
        year?: string | null;
        coverImage?: string | null;
        status: string;
        monthlyDate?: string | null;
        createdAt?: string | null;
    } | null;
};

export type RemoveFromListMutationVariables = Exact<{
    id: Scalars['ID']['input'];
}>;

export type RemoveFromListMutation = {
    __typename?: 'Mutation';
    removeFromList?: {
        __typename?: 'ListVinyl';
        _id: string;
        discogsId: number;
        title: string;
        artist: string;
        genre?: Array<string> | null;
        year?: string | null;
        coverImage?: string | null;
        status: string;
        monthlyDate?: string | null;
        createdAt?: string | null;
    } | null;
};

export type UpdateInListMutationVariables = Exact<{
    id: Scalars['ID']['input'];
    status: Scalars['String']['input'];
}>;

export type UpdateInListMutation = {
    __typename?: 'Mutation';
    updateInList?: {
        __typename?: 'ListVinyl';
        _id: string;
        discogsId: number;
        title: string;
        artist: string;
        genre?: Array<string> | null;
        year?: string | null;
        coverImage?: string | null;
        status: string;
        monthlyDate?: string | null;
        createdAt?: string | null;
    } | null;
};

export type GetMonthlyMutationVariables = Exact<{ [key: string]: never }>;

export type GetMonthlyMutation = {
    __typename?: 'Mutation';
    monthly?: {
        __typename?: 'ListVinyl';
        _id: string;
        discogsId: number;
        title: string;
        artist: string;
        genre?: Array<string> | null;
        year?: string | null;
        coverImage?: string | null;
        status: string;
        monthlyDate?: string | null;
        createdAt?: string | null;
    } | null;
};

export type GetVinylQueryVariables = Exact<{
    query: Scalars['String']['input'];
    genre?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
    artist?: InputMaybe<Array<Scalars['String']['input']> | Scalars['String']['input']>;
}>;

export type GetVinylQuery = {
    __typename?: 'Query';
    search?: {
        __typename?: 'Pagination';
        items: number;
        page: number;
        pages: number;
        perPage: number;
        results?: Array<{
            __typename?: 'Vinyl';
            id: number;
            title: string;
            artist: string;
            genre?: Array<string> | null;
            year?: string | null;
            coverImage?: string | null;
        }> | null;
    } | null;
};

export const GetListDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetList' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'list' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'discogsId' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'artist' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'genre' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'year' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'coverImage' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetListQuery, GetListQueryVariables>;
export const AddInListDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'AddInList' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'artist' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'genre' } },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                        },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'year' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'coverImage' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
                    type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'addInList' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'title' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'title' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'artist' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'artist' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'genre' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'genre' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'year' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'year' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'coverImage' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'coverImage' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'status' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'discogsId' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'artist' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'genre' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'year' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'coverImage' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'monthlyDate' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<AddInListMutation, AddInListMutationVariables>;
export const RemoveFromListDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'RemoveFromList' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'removeFromList' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'discogsId' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'artist' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'genre' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'year' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'coverImage' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'monthlyDate' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<RemoveFromListMutation, RemoveFromListMutationVariables>;
export const UpdateInListDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'UpdateInList' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'updateInList' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'id' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'id' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'status' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'status' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'discogsId' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'artist' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'genre' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'year' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'coverImage' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'monthlyDate' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<UpdateInListMutation, UpdateInListMutationVariables>;
export const GetMonthlyDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'mutation',
            name: { kind: 'Name', value: 'GetMonthly' },
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'monthly' },
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'discogsId' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'artist' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'genre' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'year' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'coverImage' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'status' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'monthlyDate' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetMonthlyMutation, GetMonthlyMutationVariables>;
export const GetVinylDocument = {
    kind: 'Document',
    definitions: [
        {
            kind: 'OperationDefinition',
            operation: 'query',
            name: { kind: 'Name', value: 'GetVinyl' },
            variableDefinitions: [
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'query' } },
                    type: { kind: 'NonNullType', type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } } },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'genre' } },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                        },
                    },
                },
                {
                    kind: 'VariableDefinition',
                    variable: { kind: 'Variable', name: { kind: 'Name', value: 'artist' } },
                    type: {
                        kind: 'ListType',
                        type: {
                            kind: 'NonNullType',
                            type: { kind: 'NamedType', name: { kind: 'Name', value: 'String' } },
                        },
                    },
                },
            ],
            selectionSet: {
                kind: 'SelectionSet',
                selections: [
                    {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'search' },
                        arguments: [
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'query' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'query' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'genre' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'genre' } },
                            },
                            {
                                kind: 'Argument',
                                name: { kind: 'Name', value: 'artist' },
                                value: { kind: 'Variable', name: { kind: 'Name', value: 'artist' } },
                            },
                        ],
                        selectionSet: {
                            kind: 'SelectionSet',
                            selections: [
                                { kind: 'Field', name: { kind: 'Name', value: 'items' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'page' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'pages' } },
                                { kind: 'Field', name: { kind: 'Name', value: 'perPage' } },
                                {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'results' },
                                    selectionSet: {
                                        kind: 'SelectionSet',
                                        selections: [
                                            { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'artist' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'genre' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'year' } },
                                            { kind: 'Field', name: { kind: 'Name', value: 'coverImage' } },
                                        ],
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        },
    ],
} as unknown as DocumentNode<GetVinylQuery, GetVinylQueryVariables>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    _Any: { input: any; output: any };
    _FieldSet: { input: any; output: any };
};

export type ListVinyl = {
    __typename?: 'ListVinyl';
    _id: Scalars['ID']['output'];
    artist: Scalars['String']['output'];
    coverImage?: Maybe<Scalars['String']['output']>;
    createdAt?: Maybe<Scalars['String']['output']>;
    discogsId: Scalars['Int']['output'];
    genre?: Maybe<Array<Scalars['String']['output']>>;
    monthlyDate?: Maybe<Scalars['String']['output']>;
    status: Scalars['String']['output'];
    title: Scalars['String']['output'];
    year?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
    __typename?: 'Mutation';
    addInList?: Maybe<ListVinyl>;
    monthly?: Maybe<ListVinyl>;
    removeFromList?: Maybe<ListVinyl>;
    updateInList?: Maybe<ListVinyl>;
};

export type MutationAddInListArgs = {
    artist: Scalars['String']['input'];
    coverImage?: InputMaybe<Scalars['String']['input']>;
    genre?: InputMaybe<Array<Scalars['String']['input']>>;
    id: Scalars['Int']['input'];
    status?: InputMaybe<Scalars['String']['input']>;
    title: Scalars['String']['input'];
    year?: InputMaybe<Scalars['String']['input']>;
};

export type MutationMonthlyArgs = {
    month?: InputMaybe<Scalars['String']['input']>;
};

export type MutationRemoveFromListArgs = {
    id: Scalars['ID']['input'];
};

export type MutationUpdateInListArgs = {
    id: Scalars['ID']['input'];
    status?: InputMaybe<Scalars['String']['input']>;
};

export type Pagination = {
    __typename?: 'Pagination';
    items: Scalars['Int']['output'];
    page: Scalars['Int']['output'];
    pages: Scalars['Int']['output'];
    perPage: Scalars['Int']['output'];
    results?: Maybe<Array<Vinyl>>;
};

export type Query = {
    __typename?: 'Query';
    _service: _Service;
    list?: Maybe<Array<ListVinyl>>;
    search?: Maybe<Pagination>;
};

export type QueryListArgs = {
    page?: InputMaybe<Scalars['Int']['input']>;
};

export type QuerySearchArgs = {
    artist?: InputMaybe<Array<Scalars['String']['input']>>;
    genre?: InputMaybe<Array<Scalars['String']['input']>>;
    query: Scalars['String']['input'];
};

export type Vinyl = {
    __typename?: 'Vinyl';
    artist: Scalars['String']['output'];
    country?: Maybe<Scalars['String']['output']>;
    coverImage?: Maybe<Scalars['String']['output']>;
    format?: Maybe<Array<Scalars['String']['output']>>;
    genre?: Maybe<Array<Scalars['String']['output']>>;
    id: Scalars['Int']['output'];
    style?: Maybe<Array<Scalars['String']['output']>>;
    title: Scalars['String']['output'];
    year?: Maybe<Scalars['String']['output']>;
};

export type _Service = {
    __typename?: '_Service';
    sdl?: Maybe<Scalars['String']['output']>;
};
