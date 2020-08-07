import { gql } from "@apollo/client";

export const typeDefs = gql`
  extend type Query {
    localState: LocalState!
    todos(input: TodosInput): [Todo]!
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

  input TodosInput {
    sort: String
  }
`;
