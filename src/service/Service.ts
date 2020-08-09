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

  async createTodo (params: {
    title: string,
  }): types.PromisedEither<types.STodo> {
    const r1 = await this._todosService.create(params);
    if (E.isLeft(r1)) {
      await this.notificate({
        type: "error",
        message: `Failed to create todo: ${r1.left}`
      });
      return r1;
    }
    const stodo = r1.right;

    await this.notificate({
      type: "success",
      message: "Created Todo",
    });

    return E.right(stodo);
  }

  async updateTodo (id: string, params: Partial<types.STodo>): types.PromisedEither<types.STodo> {
    const r1 = await this._todosService.update(id, params);
    if (E.isLeft(r1)) {
      await this.notificate({
        type: "error",
        message: `Failed to update todo: ${r1.left.message}`,
      });
      return r1;
    }
    const stodo = r1.right;

    await this.notificate({
      type: "success",
      message: "Updated Todo",
    });
    return E.right(stodo);
  }

  async createTag (params: {
    name: string,
    color?: string,
  }): types.PromisedEither<types.STag> {
    const r1 = await this._tagsService.create(params);
    if (E.isLeft(r1)) {
      await this.notificate({
        type: "error",
        message: `Failed to create tag: ${r1.left.message}`,
      });
      return r1;
    }
    const stag = r1.right;

    await this.notificate({
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

  async notificate (params: {
    type: types.NotificationType,
    message: string,
  }): types.PromisedEither<null> {
    return this._notificationsService.dispatch(params);
  }
}
