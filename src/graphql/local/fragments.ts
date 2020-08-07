import { gql } from "@apollo/client";

export const TodoAttributes = gql `
  fragment TodoAttributes on Todo {
    id
    title
    done
    createdAt
    updatedAt
  }
`;
