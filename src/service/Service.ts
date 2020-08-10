import * as E from "fp-ts/es6/Either";

import * as types from "../types";
import * as dmn from "../domain";

export class Service implements types.IService {
  private _todosRepository: types.ITodosRepository;
  private _tagsRepository: types.ITagsRepository;
  private _todosService: types.ITodosService;
  private _tagsService: types.ITagsService;
  private _notificationsService: types.INotificationsService;

  constructor (params: {
    todosRepository: types.ITodosRepository,
    tagsRepository: types.ITagsRepository,
  }) {
    this._todosRepository = params.todosRepository;
    this._tagsRepository = params.tagsRepository;
    this._todosService = new dmn.TodosService({
      todosRepository: this._todosRepository,
    });
    this._tagsService = new dmn.TagsService({
      tagsRepository: this._tagsRepository,
    });
    this._notificationsService = new dmn.NotificationsService();
  }

  async createTodo (params: {
    title: string,
  }): types.PromisedEither<types.ITodo> {
    const r1 = await this._todosService.create(params);
    if (E.isLeft(r1)) {
      await this.notificate({
        type: "error",
        message: `Failed to create todo: ${r1.left}`
      });
      return r1;
    }
    const todo = r1.right;

    await this.notificate({
      type: "success",
      message: "Created Todo",
    });

    return E.right(todo);
  }

  async updateTodo (id: string, params: Partial<types.STodo>): types.PromisedEither<types.ITodo> {
    const r1 = await this._todosService.update(id, params);
    if (E.isLeft(r1)) {
      await this.notificate({
        type: "error",
        message: `Failed to update todo: ${r1.left.message}`,
      });
      return r1;
    }
    const todo = r1.right;

    await this.notificate({
      type: "success",
      message: "Updated Todo",
    });

    return E.right(todo);
  }

  async createTag (params: {
    name: string,
    color?: string,
  }): types.PromisedEither<types.ITag> {
    const r1 = await this._tagsService.create(params);
    if (E.isLeft(r1)) {
      await this.notificate({
        type: "error",
        message: `Failed to create tag: ${r1.left.message}`,
      });
      return r1;
    }
    const tag = r1.right;

    await this.notificate({
      type: "success",
      message: "Created Tag",
    });

    return E.right(tag);
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
