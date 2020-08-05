import * as types from "../types";
import * as dmn from "../domain";

export class Service implements types.IService {
  private _proxy: types.IProxy;
  private _todosService: types.ITodosService;

  constructor (params: {
    proxy: types.IProxy,
  }) {
    this._proxy = params.proxy;
    this._todosService = new dmn.TodosService({
      proxy: this._proxy,
    });

    // To suppress warning not used
    this._proxy;
  }

  async createTodo (params: {
    title: string;
  }): Promise<types.STodo> {
    return this._todosService.create(params);
  }

  async markTodoDone (params: {
    id: string;
    done: boolean;
  }): Promise<null> {
    return this._todosService.markTodoDone(params);
  }
}
