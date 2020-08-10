import * as base from "./base";
import * as dmn from "./domain";
import * as gql from "./graphql";

export interface ITodosRepository {
  get(params: gql.TodosInput): base.PromisedEither<dmn.ITodo[]>;
  find(id: string): base.PromisedEither<dmn.ITodo>;
  save(todo: dmn.ITodo): base.PromisedEither<null>;
  update(todo: dmn.ITodo): base.PromisedEither<null>;
}

export interface ITagsRepository {
  get(params: gql.TagsInput): base.PromisedEither<dmn.ITag[]>;
  save(params: dmn.ITag): base.PromisedEither<null>;
}
