import { ApolloClient, InMemoryCache, NormalizedCacheObject } from "@apollo/client";

import { CustomApolloClient } from "../types";
import * as local from "./local";

export const createApolloClient = (_: {
}) => {
  const cache = new InMemoryCache({
    typePolicies: local.typePolicies,
  });

  const apolloClient: CustomApolloClient = new ApolloClient<NormalizedCacheObject>({
    cache,
    typeDefs: local.typeDefs,
  });

  const writeInitialState = () => {
    apolloClient.writeQuery({
      query: local.GetLocalStateDocument,
      data: local.initialState,
    });
  };

  writeInitialState();

  apolloClient.onResetStore(() => {
    writeInitialState();
    return Promise.resolve();
  });

  return apolloClient;
};
