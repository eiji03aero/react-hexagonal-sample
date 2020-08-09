import * as dmn from "./domain";
import * as gql from "./graphql";

// -------------------- service --------------------
export interface IService {
  getTodos(params: gql.TodosInput): Promise<dmn.STodo[]>;
  createTodo(params: {
    title: string;
  }): Promise<dmn.STodo>;
  markTodoDone(params: {
    id: string,
    done: boolean,
  }): Promise<null>;
  getTags(params: gql.TagsInput): Promise<dmn.STag[]>;
  createTag(params: {
    name: string,
    color?: string,
  }): Promise<dmn.STag>;
  onNotification(handler: dmn.NotificationHandler): void;
  offNotification(handler: dmn.NotificationHandler): void;
}

// -------------------- proxy --------------------
export interface IProxy {
  getTodos(params: gql.TodosInput): Promise<dmn.STodo[]>;
  getTodoById(id: string): Promise<dmn.STodo>;
  addTodo(todo: dmn.STodo): Promise<null>;
  updateTodo(todo: dmn.STodo): Promise<null>;
  getTags(params: gql.TagsInput): Promise<dmn.STag[]>;
  addTag(tag: dmn.STag): Promise<null>;
}
