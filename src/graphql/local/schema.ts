import { gql } from "@apollo/client";

export const typeDefs = gql`
extend type Query {
  localState: LocalState!
}

type LocalState {
  todos: [Todo]!
}

type Todo {
  id: ID!
  title: String!
  done: Boolean!
  createdAt: String!
  updatedAt: String!
}
`;

export const GetLocalStateDocument = gql`
query GetLocalState {
  localState @client {
    todos
  }
}
`;
