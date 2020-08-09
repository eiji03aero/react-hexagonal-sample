import { EventEmitter } from "events";
import * as E from "fp-ts/es6/Either";

import * as types from "../../types";
import { Notification } from "../entities";

export class NotificationsService implements types.INotificationsService {
  private _emitter: EventEmitter;

  constructor () {
    this._emitter = new EventEmitter();
  }

  get onNotification () {
    return this._emitter.on.bind(this._emitter, "notification");
  }

  get offNotification () {
    return this._emitter.off.bind(this._emitter, "notification");
  }

  async dispatch (params: {
    type: types.NotificationType,
    message: string,
  }): types.PromisedEither<null> {
    const notification = new Notification(params);
    const r1 = notification.validate();
    if (E.isLeft(r1)) {
      const errNotification = new Notification({
        type: "error",
        message: `notification validation failed: ${r1.left.message}`,
      });
      this._emitter.emit("notification", errNotification.serialize());
      return r1;
    }

    this._emitter.emit("notification", notification.serialize());
    return E.right(null);
  }
}
