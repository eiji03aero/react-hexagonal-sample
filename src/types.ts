import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export type CustomApolloClient = ApolloClient<NormalizedCacheObject>;

// -------------------- domain --------------------
export interface ITodo {
  id: number;
  title: string;
  done: boolean;
}
