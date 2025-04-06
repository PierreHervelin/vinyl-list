import { GraphQLResolveInfo } from 'graphql';
import { DataSourceContext } from '../types/DataSourceContext';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  _FieldSet: { input: any; output: any; }
};

export type ListVinyl = {
  __typename?: 'ListVinyl';
  _id: Scalars['ID']['output'];
  artist: Scalars['String']['output'];
  coverImage?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  discogsId: Scalars['Int']['output'];
  genre?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  year?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addInList?: Maybe<ListVinyl>;
  removeFromList?: Maybe<ListVinyl>;
};


export type MutationAddInListArgs = {
  artist: Scalars['String']['input'];
  coverImage?: InputMaybe<Scalars['String']['input']>;
  genre?: InputMaybe<Array<Scalars['String']['input']>>;
  id: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  year?: InputMaybe<Scalars['String']['input']>;
};


export type MutationRemoveFromListArgs = {
  id: Scalars['ID']['input'];
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
  coverImage?: Maybe<Scalars['String']['output']>;
  format?: Maybe<Array<Scalars['String']['output']>>;
  genre?: Maybe<Array<Scalars['String']['output']>>;
  id: Scalars['Int']['output'];
  style?: Maybe<Array<Scalars['String']['output']>>;
  title: Scalars['String']['output'];
  year?: Maybe<Scalars['String']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  ListVinyl: ResolverTypeWrapper<ListVinyl>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Pagination: ResolverTypeWrapper<Pagination>;
  Query: ResolverTypeWrapper<{}>;
  Vinyl: ResolverTypeWrapper<Vinyl>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  ListVinyl: ListVinyl;
  ID: Scalars['ID']['output'];
  String: Scalars['String']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Pagination: Pagination;
  Query: {};
  Vinyl: Vinyl;
  Boolean: Scalars['Boolean']['output'];
}>;

export type ListVinylResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['ListVinyl'] = ResolversParentTypes['ListVinyl']> = ResolversObject<{
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  artist?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  coverImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  discogsId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  genre?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addInList?: Resolver<Maybe<ResolversTypes['ListVinyl']>, ParentType, ContextType, RequireFields<MutationAddInListArgs, 'artist' | 'id' | 'title'>>;
  removeFromList?: Resolver<Maybe<ResolversTypes['ListVinyl']>, ParentType, ContextType, RequireFields<MutationRemoveFromListArgs, 'id'>>;
}>;

export type PaginationResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Pagination'] = ResolversParentTypes['Pagination']> = ResolversObject<{
  items?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  page?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  pages?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  perPage?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  results?: Resolver<Maybe<Array<ResolversTypes['Vinyl']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  list?: Resolver<Maybe<Array<ResolversTypes['ListVinyl']>>, ParentType, ContextType, Partial<QueryListArgs>>;
  search?: Resolver<Maybe<ResolversTypes['Pagination']>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'query'>>;
}>;

export type VinylResolvers<ContextType = DataSourceContext, ParentType extends ResolversParentTypes['Vinyl'] = ResolversParentTypes['Vinyl']> = ResolversObject<{
  artist?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  coverImage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  format?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  genre?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  style?: Resolver<Maybe<Array<ResolversTypes['String']>>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  year?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = DataSourceContext> = ResolversObject<{
  ListVinyl?: ListVinylResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Pagination?: PaginationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Vinyl?: VinylResolvers<ContextType>;
}>;

