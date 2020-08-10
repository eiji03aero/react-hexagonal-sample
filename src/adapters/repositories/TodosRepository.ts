import * as E from "fp-ts/es6/Either";

import * as types from "../../types";
import { local } from "../../graphql";
import { Todo } from "../../domain";
import { collection } from "../../utils";

export class TodosRepository implements types.ITodosRepository {
  private _apolloClient: types.CustomApolloClient;

  constructor (params: {
    apolloClient: types.CustomApolloClient,
  }) {
    this._apolloClient = params.apolloClient;
  }

  async get (params: types.TodosInput): types.PromisedEither<types.ITodo[]> {
    const r1 = await this._getSerialized(params);
    if (E.isLeft(r1)) {
      return r1;
    }
    const stodos = r1.right;

    const todos = stodos.map((st: types.STodo) => {
      return new Todo(st);
    });
    return E.right(todos);
  }

  async find (id: string): types.PromisedEither<types.ITodo> {
    const r1 = await this.get({});
    if (E.isLeft(r1)) {
      return r1;
    }
    const stodos = r1.right;

    const stodo = stodos.find((t: types.STodo) => t.id === id);
    if (!stodo) {
      return E.left(new Error(`Not found Todo with id: ${id}` ));
    }

    const todo = new Todo(stodo);
    return E.right(todo);
  }

  async save (todo: types.ITodo): types.PromisedEither<null> {
    const r1 = await this._getSerialized({});
    if (E.isLeft(r1)) {
      return r1;
    }
    const stodos = r1.right;

    const stodo = todo.serialize();
    this._apolloClient.writeQuery({
      query: local.GetTodosDocument,
      data: {
        todos: [stodo, ...stodos]
      }
    });

    return E.right(null);
  }

  async update (todo: types.ITodo): types.PromisedEither<null> {
    const r1 = await this._getSerialized({});
    if (E.isLeft(r1)) {
      return r1;
    }
    const stodos = r1.right;

    const stodo = todo.serialize();
    this._apolloClient.writeQuery({
      query: local.GetTodosDocument,
      data: {
        todos: collection.updateById<types.STodo>(stodos, stodo),
      }
    });

    return E.right(null);
  }

  private async _getSerialized (params: types.TodosInput): types.PromisedEither<types.STodo[]> {
    const result = this._apolloClient.readQuery<{ todos: types.STodo[] }>({
      query: local.GetTodosDocument,
      variables: params,
    });
    if (!result) {
      return E.right([] as types.STodo[]);
    }

    return E.right(result.todos);
  }
}
