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
    this._emitter.emit("notification", notification.serialize());
    return E.right(null);
  }
}
