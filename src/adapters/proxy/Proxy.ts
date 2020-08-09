import * as types from "../../types";
import { local } from "../../graphql";

export class Proxy implements types.IProxy {
  private _apolloClient: types.CustomApolloClient;

  constructor (params: {
    apolloClient: types.CustomApolloClient,
  }) {
    this._apolloClient = params.apolloClient;
  }

  async getTodos (params: types.TodosInput): Promise<types.STodo[]> {
    const result = this._apolloClient.readQuery<{ todos: types.STodo[] }>({
      query: local.GetTodosDocument,
      variables: params,
    });
    if (!result) {
      return [] as types.STodo[];
    }

    return result.todos;
  }

  async getTodoById (id: string): Promise<types.STodo> {
    const stodos = await this.getTodos({});
    const todo = stodos.find((t: types.STodo) => t.id === id);
    if (!todo) {
      throw new Error("Not found");
    }

    return todo;
  }

  async addTodo (stodo: types.STodo): Promise<null> {
    const stodos = await this.getTodos({});
    this._apolloClient.writeQuery({
      query: local.GetTodosDocument,
      data: {
        todos: [stodo, ...stodos]
      }
    });

    return null;
  }

  async updateTodo (stodo: types.STodo): Promise<null> {
    const stodos = await this.getTodos({});
    const updatedTodos = stodos.map((t: types.STodo) => {
      if (stodo.id === t.id) {
        return stodo;
      }
      return t;
    });
    this._apolloClient.writeQuery({
      query: local.GetTodosDocument,
      data: {
        todos: updatedTodos
      }
    });

    return null;
  }

  async getTags (params: types.TagsInput): Promise<types.STag[]> {
    const result = this._apolloClient.readQuery<{ tags: types.STag[] }>({
      query: local.GetTagsDocument,
      variables: params,
    });
    if (!result) {
      return [] as types.STag[];
    }

    return result.tags;
  }

  async addTag (stag: types.STag): Promise<null> {
    const stags = await this.getTags({});
    this._apolloClient.writeQuery({
      query: local.GetTagsDocument,
      data: {
        tags: [stag, ...stags],
      }
    });

    return null;
  }
}
