import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import * as dmn from "./domain";

// -------------------- service --------------------
export interface IService {
  createTodo(params: {
    title: string;
  }): Promise<dmn.STodo>;
  markTodoDone(params: {
    id: string,
    done: boolean,
  }): Promise<null>;
}

// -------------------- graphql --------------------
export type CustomApolloClient = ApolloClient<NormalizedCacheObject>;

export interface ILocalState {
  todos: dmn.STodo[];
}

// -------------------- proxy --------------------
export interface IProxy {
  getTodos(): Promise<dmn.STodo[]>;
  getTodoById(id: string): Promise<dmn.STodo>;
  addTodo(todo: dmn.STodo): Promise<null>;
  updateTodo(todo: dmn.STodo): Promise<null>;
  getLocalState(): ILocalState;
  writeLocalState(data: Partial<ILocalState>): null;
}
