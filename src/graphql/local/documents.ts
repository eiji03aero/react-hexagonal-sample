import { gql } from "@apollo/client";

export const GetLocalStateDocument = gql`
  query GetLocalState {
    localState @client {
      todos
    }
    todos
  }
`;

export const GetTodosDocument = gql`
  query GetTodos {
    todos @client {
      id
      title
      done
      createdAt
      updatedAt
    }
  }
`;
