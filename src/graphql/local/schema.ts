import { gql } from "@apollo/client";

export const typeDefs = gql`
  extend type Query {
    todos(input: TodosInput): [Todo]!
    tags(input: TagsInput): [Tag]!
  }

  type Todo {
    id: ID!
    title: String!
    done: Boolean!
    tagIds: [String]!
    createdAt: String!
    updatedAt: String!
  }

  input TodosInput {
    keyword: String
    tagIds: [String]
    sort: String
  }

  type Tag {
    id: ID!
    name: String!
    color: color!
    createdAt: String!
    updatedAt: String!
  }

  input TagsInput {
    sort: String
  }
`;
