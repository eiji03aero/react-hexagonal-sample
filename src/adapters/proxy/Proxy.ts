import * as types from "../../types";
import { local } from "../../graphql";

export class Proxy implements types.IProxy {
  private _apolloClient: types.CustomApolloClient;

  constructor (params: {
    apolloClient: types.CustomApolloClient,
  }) {
    this._apolloClient = params.apolloClient;
  }

  async getTodos (): Promise<types.STodo[]> {
    const { todos } = this.getLocalState();
    return todos;
  }

  async getTodoById (id: string): Promise<types.STodo> {
    const { todos } = this.getLocalState();
    const todo = todos.find((t: types.STodo) => t.id === id);
    if (!todo) {
      throw new Error("Not found");
    }

    return todo;
  }

  async addTodo (stodo: types.STodo): Promise<null> {
    const { todos } = this.getLocalState();
    this.writeLocalState({
      todos: todos.slice().concat(stodo)
    });

    return null;
  }

  async updateTodo (stodo: types.STodo): Promise<null> {
    const { todos } = this.getLocalState();
    const updatedTodos = todos.map((t: types.STodo) => {
      if (stodo.id === t.id) {
        return stodo;
      }
      return t;
    });
    this.writeLocalState({
      todos: updatedTodos,
    });

    return null;
  }

  getLocalState (): types.ILocalState {
    const result = this._apolloClient.readQuery<{ localState: types.ILocalState }>({
      query: local.GetLocalStateDocument
    });
    if (!result) {
      throw new Error("query failed");
    }

    return result.localState;
  }

  writeLocalState (data: Partial<types.ILocalState>): null {
    this._apolloClient.writeQuery({
      query: local.GetLocalStateDocument,
      data: {
        localState: data
      }
    });

    return null;
  }
}
