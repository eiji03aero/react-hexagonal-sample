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

  async getTodos (params: types.TodosInput): Promise<types.STodo[]> {
    return this._proxy.getTodos(params);
  }

  async createTodo (params: {
    title: string,
  }): Promise<types.STodo> {
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
  }): Promise<null> {
    await this._todosService.markTodoDone(params);
    await this._notificationsService.dispatch({
      type: "success",
      message: `Marked Todo ${params.done ? "done" : "undone"}`,
    });
    return null;
  }

  async getTags (params: types.TagsInput): Promise<types.STag[]> {
    return this._proxy.getTags(params);
  }

  async createTag (params: {
    name: string,
    color?: string,
  }): Promise<types.STag> {
    const stag = await this._tagsService.create(params);
    await this._notificationsService.dispatch({
      type: "success",
      message: "Created Tag",
    });
    return stag;
  }

  async onNotification (handler: types.NotificationHandler) {
    this._notificationsService.onNotification(handler);
  }

  async offNotification (handler: types.NotificationHandler) {
    this._notificationsService.offNotification(handler);
  }
}
