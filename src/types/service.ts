import * as base from "./base";
import * as dmn from "./domain";
import * as gql from "./graphql";

// -------------------- service --------------------
export interface IService {
  getTodos(params: gql.TodosInput): base.PromisedEither<dmn.STodo[]>;
  createTodo(params: {
    title: string;
  }): base.PromisedEither<dmn.STodo>;
  markTodoDone(params: {
    id: string,
    done: boolean,
  }): base.PromisedEither<null>;
  getTags(params: gql.TagsInput): base.PromisedEither<dmn.STag[]>;
  createTag(params: {
    name: string,
    color?: string,
  }): base.PromisedEither<dmn.STag>;
  onNotification(handler: dmn.NotificationHandler): void;
  offNotification(handler: dmn.NotificationHandler): void;
}

// -------------------- proxy --------------------
export interface IProxy {
  getTodos(params: gql.TodosInput): base.PromisedEither<dmn.STodo[]>;
  getTodoById(id: string): base.PromisedEither<dmn.STodo>;
  addTodo(todo: dmn.STodo): base.PromisedEither<null>;
  updateTodo(todo: dmn.STodo): base.PromisedEither<null>;
  getTags(params: gql.TagsInput): base.PromisedEither<dmn.STag[]>;
  addTag(tag: dmn.STag): base.PromisedEither<null>;
}
