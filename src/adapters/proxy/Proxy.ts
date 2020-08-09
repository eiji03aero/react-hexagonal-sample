import * as E from "fp-ts/es6/Either";

import * as types from "../../types";
import { local } from "../../graphql";
import { collection } from "../../utils";

export class Proxy implements types.IProxy {
  private _apolloClient: types.CustomApolloClient;

  constructor (params: {
    apolloClient: types.CustomApolloClient,
  }) {
    this._apolloClient = params.apolloClient;
  }

  async getTodos (params: types.TodosInput): types.PromisedEither<types.STodo[]> {
    const result = this._apolloClient.readQuery<{ todos: types.STodo[] }>({
      query: local.GetTodosDocument,
      variables: params,
    });
    if (!result) {
      return E.right([] as types.STodo[]);
    }

    return E.right(result.todos);
  }

  async getTodoById (id: string): types.PromisedEither<types.STodo> {
    const r1 = await this.getTodos({});
    if (E.isLeft(r1)) {
      return r1;
    }
    const stodos = r1.right;

    const stodo = stodos.find((t: types.STodo) => t.id === id);
    if (!stodo) {
      return E.left(new Error(`Not found Todo with id: ${id}` ));
    }

    return E.right(stodo);
  }

  async addTodo (stodo: types.STodo): types.PromisedEither<null> {
    const r1 = await this.getTodos({});
    if (E.isLeft(r1)) {
      return r1;
    }
    const stodos = r1.right;

    this._apolloClient.writeQuery({
      query: local.GetTodosDocument,
      data: {
        todos: [stodo, ...stodos]
      }
    });

    return E.right(null);
  }

  async updateTodo (stodo: types.STodo): types.PromisedEither<null> {
    const r1 = await this.getTodos({});
    if (E.isLeft(r1)) {
      return r1;
    }
    const stodos = r1.right;

    this._apolloClient.writeQuery({
      query: local.GetTodosDocument,
      data: {
        todos: collection.updateById<types.STodo>(stodos, stodo),
      }
    });

    return E.right(null);
  }

  async getTags (params: types.TagsInput): types.PromisedEither<types.STag[]> {
    const result = this._apolloClient.readQuery<{ tags: types.STag[] }>({
      query: local.GetTagsDocument,
      variables: params,
    });
    if (!result) {
      return E.right([] as types.STag[]);
    }

    return E.right(result.tags);
  }

  async addTag (stag: types.STag): types.PromisedEither<null> {
    const r1 = await this.getTags({});
    if (E.isLeft(r1)) {
      return r1;
    }
    const stags = r1.right;

    this._apolloClient.writeQuery({
      query: local.GetTagsDocument,
      data: {
        tags: [stag, ...stags],
      }
    });

    return E.right(null);
  }
}
