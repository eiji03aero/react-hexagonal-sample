import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

import * as dmn from "./domain";

export type CustomApolloClient = ApolloClient<NormalizedCacheObject>;

export interface ILocalState {
  todos: dmn.STodo[];
}

export type TodosInput = {
  keyword?: string;
  tagIds?: string[];
  sort?: string;
}

export type TagsInput = {};
