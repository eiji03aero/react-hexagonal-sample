import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { initialState, GetLocalStateDocument, typeDefs } from "./local";

import { CustomApolloClient } from "../types";

export const createApolloClient = (_: {
}) => {
  const cache = new InMemoryCache;

  const apolloClient: CustomApolloClient = new ApolloClient<NormalizedCacheObject>({
    cache,
    typeDefs,
  });

  const writeInitialState = () => {
    apolloClient.writeQuery({
      query: GetLocalStateDocument,
      data: initialState,
    });
  };

  writeInitialState();

  apolloClient.onResetStore(() => {
    writeInitialState();
    return Promise.resolve();
  });

  return apolloClient;
};
