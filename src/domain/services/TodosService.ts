import * as E from "fp-ts/es6/Either";

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
  }): types.PromisedEither<types.STodo> {
    const todo = new Todo({
      title: params.title,
      done: false,
    });
    const stodo = todo.serialize();
    await this._proxy.addTodo(stodo);
    return E.right(stodo);
  }

  async markTodoDone (params: {
    id: string,
    done: boolean,
  }): types.PromisedEither<null> {
    const r1 = await this._proxy.getTodoById(params.id);
    if (E.isLeft(r1)) {
      return r1;
    }
    const stodo = r1.right;

    const todo = new Todo(stodo);
    todo.markDone(params.done);
    await this._proxy.updateTodo(todo.serialize());
    return E.right(null);
  }
}
