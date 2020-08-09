import * as E from "fp-ts/es6/Either";

import * as types from "../types";
import * as dmn from "../domain";

export class Service implements types.IService {
  private _proxy: types.IProxy;
  private _todosService: types.ITodosService;
  private _tagsService: types.ITagsService;
  private _notificationsService: types.INotificationsService;

  constructor (params: {
    proxy: types.IProxy,
  }) {
    this._proxy = params.proxy;
    this._todosService = new dmn.TodosService({
      proxy: this._proxy,
    });
    this._tagsService = new dmn.TagsService({
      proxy: this._proxy,
    });
    this._notificationsService = new dmn.NotificationsService();
  }

  async getTodos (params: types.TodosInput): types.PromisedEither<types.STodo[]> {
    return this._proxy.getTodos(params);
  }

  async createTodo (params: {
    title: string,
  }): types.PromisedEither<types.STodo> {
    const stodo = this._todosService.create(params);
    await this._notificationsService.dispatch({
      type: "success",
      message: "Created Todo",
    });
    return stodo;
  }

  async markTodoDone (params: {
    id: string,
    done: boolean,
  }): types.PromisedEither<null> {
    await this._todosService.markTodoDone(params);
    await this._notificationsService.dispatch({
      type: "success",
      message: `Marked Todo ${params.done ? "done" : "undone"}`,
    });
    return E.right(null);
  }

  async getTags (params: types.TagsInput): types.PromisedEither<types.STag[]> {
    return this._proxy.getTags(params);
  }

  async createTag (params: {
    name: string,
    color?: string,
  }): types.PromisedEither<types.STag> {
    const r1 = await this._tagsService.create(params);
    if (E.isLeft(r1)) {
      return r1;
    }
    const stag = r1.right;

    await this._notificationsService.dispatch({
      type: "success",
      message: "Created Tag",
    });

    return E.right(stag);
  }

  async onNotification (handler: types.NotificationHandler) {
    this._notificationsService.onNotification(handler);
  }

  async offNotification (handler: types.NotificationHandler) {
    this._notificationsService.offNotification(handler);
  }
}
