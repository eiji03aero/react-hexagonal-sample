import * as types from "../types";
import * as dmn from "../domain";

export class Service implements types.IService {
  private _proxy: types.IProxy;
  private _todosService: types.ITodosService;
  private _notificationsService: types.INotificationsService;

  constructor (params: {
    proxy: types.IProxy,
  }) {
    this._proxy = params.proxy;
    this._notificationsService = new dmn.NotificationsService();
    this._todosService = new dmn.TodosService({
      proxy: this._proxy,
    });
  }

  async getTodos (params: types.TodosInput): Promise<types.STodo[]> {
    return this._proxy.getTodos(params);
  }

  async createTodo (params: {
    title: string;
  }): Promise<types.STodo> {
    const stodo = this._todosService.create(params);
    await this._notificationsService.dispatch({
      type: "success",
      message: "Created Todo",
    });
    return stodo;
  }

  async markTodoDone (params: {
    id: string;
    done: boolean;
  }): Promise<null> {
    await this._todosService.markTodoDone(params);
    await this._notificationsService.dispatch({
      type: "success",
      message: `Marked Todo ${params.done ? "done" : "undone"}`,
    });
    return null;
  }

  async onNotification (handler: types.NotificationHandler) {
    this._notificationsService.onNotification(handler);
  }

  async offNotification (handler: types.NotificationHandler) {
    this._notificationsService.offNotification(handler);
  }
}
