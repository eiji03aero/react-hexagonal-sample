import { gql } from "@apollo/client";

export const GetLocalStateDocument = gql`
  query GetLocalState {
    todos
    tags
  }
`;

export const GetTodosDocument = gql`
  query GetTodos {
    todos @client {
      id
      title
      done
      tagIds
      createdAt
      updatedAt
    }
  }
`;

export const GetTagsDocument = gql`
  query GetTags {
    tags @client {
      id
      name
      color
      createdAt
      updatedAt
    }
  }
`;
