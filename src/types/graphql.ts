import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

import * as dmn from "./domain";

// -------------------- graphql --------------------
export type CustomApolloClient = ApolloClient<NormalizedCacheObject>;

export interface ILocalState {
  todos: dmn.STodo[];
}

export type TodosInput = {
  sort?: string;
}

export type TagsInput = {};
