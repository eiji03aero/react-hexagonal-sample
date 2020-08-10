import * as E from "fp-ts/es6/Either";

import * as types from "../../types";
import { Todo } from "../entities";

export class TodosService implements types.ITodosService {
  private _todosRepository: types.ITodosRepository;

  constructor (params: {
    todosRepository: types.ITodosRepository,
  }) {
    this._todosRepository = params.todosRepository;
  }

  async create (params: {
    title: string;
  }): types.PromisedEither<types.ITodo> {
    const todo = new Todo({
      title: params.title,
      done: false,
    });
    const r1 = todo.validate();
    if (E.isLeft(r1)) {
      return r1;
    }

    const r2 = await this._todosRepository.save(todo);
    if (E.isLeft(r2)) {
      return r2;
    }

    return E.right(todo);
  }

  async update (id: string, params: Partial<types.STodo>): types.PromisedEither<types.ITodo> {
    const r1 = await this._todosRepository.find(id);
    if (E.isLeft(r1)) {
      return r1;
    }
    const stodo = r1.right;

    const todo = new Todo(stodo);
    const r2 = todo.update(params);
    if (E.isLeft(r2)) {
      return r2;
    }

    const r3 = await this._todosRepository.update(todo);
    if (E.isLeft(r3)) {
      return r3;
    }

    return E.right(todo);
  }
}
