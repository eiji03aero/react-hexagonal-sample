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
    const r1 = todo.validate();
    if (E.isLeft(r1)) {
      return r1;
    }

    const stodo = todo.serialize();
    await this._proxy.addTodo(stodo);
    return E.right(stodo);
  }

  async update (id: string, params: Partial<types.STodo>): types.PromisedEither<types.STodo> {
    const r1 = await this._proxy.getTodoById(id);
    if (E.isLeft(r1)) {
      return r1;
    }
    const stodo = r1.right;

    const todo = new Todo(stodo);
    const r2 = todo.update(params);
    if (E.isLeft(r2)) {
      return r2;
    }

    const updatedStodo = todo.serialize();
    this._proxy.updateTodo(updatedStodo);
    return E.right(updatedStodo);
  }
}
