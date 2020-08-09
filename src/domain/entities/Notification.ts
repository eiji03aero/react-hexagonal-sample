import * as E from "fp-ts/es6/Either";

import * as types from "../../types";
import { BaseEntity } from "./BaseEntity";

export class Notification extends BaseEntity implements types.INotification {
  type: types.NotificationType;
  message: string;

  constructor (params: Partial<types.SBaseEntity> & {
    type: types.NotificationType;
    message: string;
  }) {
    super(params);
    this.type = params.type || "info";
    this.message = params.message || "";
  }

  serialize () {
    return {
      ...super.serialize(),
      __typename: "Notification",
      type: this.type,
      message: this.message,
    };
  }

  validate (): types.EntityValidateResult {
    if (!this.type) {
      return E.left(new Error("type cannot be emtpy"));
    }
    if (!this.message) {
      return E.left(new Error("message cannot be emtpy"));
    }

    return E.right(null);
  }
}
