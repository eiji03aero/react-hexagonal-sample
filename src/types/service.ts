import * as base from "./base";
import * as dmn from "./domain";

export interface IService {
  createTodo(params: {
    title: string;
  }): base.PromisedEither<dmn.ITodo>;
  updateTodo(id: string, params: Partial<dmn.STodo>): base.PromisedEither<dmn.ITodo>;
  createTag(params: {
    name: string,
    color?: string,
  }): base.PromisedEither<dmn.ITag>;
  onNotification(handler: dmn.NotificationHandler): void;
  offNotification(handler: dmn.NotificationHandler): void;
  notificate(params: {
    type: dmn.NotificationType,
    message: string,
  }): base.PromisedEither<null>;
}
