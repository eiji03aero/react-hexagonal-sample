import * as types from "../../types";
import { Todo } from "../entities";

export class TodosService implements types.ITodosService {
  private _proxy: types.IProxy;

  constructor (params: {
    proxy: types.IProxy,
  }) {
    this._proxy = params.proxy;
  }

  async create (params: {
    title: string;
  }): Promise<types.STodo> {
    const todo = new Todo({
      title: params.title,
      done: false,
    });
    const stodo = todo.serialize();
    await this._proxy.addTodo(stodo);
    return stodo;
  }

  async markTodoDone (params: {
    id: string,
    done: boolean,
  }): Promise<null> {
    const stodo = await this._proxy.getTodoById(params.id);
    const todo = new Todo(stodo);
    todo.markDone(params.done);
    await this._proxy.updateTodo(todo.serialize());
    return null;
  }
}
