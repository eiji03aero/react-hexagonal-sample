import * as E from "fp-ts/es6/Either";

import * as base from "./base";

// -------------------- BaseEntity --------------------
export interface SBaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export type EntityValidateResult = E.Either<Error, null>;

export interface IBaseEntity extends SBaseEntity {
  serialize(): SBaseEntity;
  validate(): EntityValidateResult;
  update(params: Partial<SBaseEntity>): EntityValidateResult;
  equals(other: this): boolean;
}

// -------------------- Todo --------------------
export interface STodo extends SBaseEntity {
  title: string;
  done: boolean;
  tagIds: string[];
}

export interface ITodo extends IBaseEntity, STodo {
  serialize(): STodo;
  update(params: Partial<STodo>): EntityValidateResult;
  markDone(done: boolean): void;
}

export interface ITodosService {
  create(params: {
    title: string,
  }): base.PromisedEither<STodo>;
  update(id: string, params: Partial<STodo>): base.PromisedEither<STodo>;
}

// -------------------- Tag --------------------
export interface STag extends SBaseEntity {
  name: string;
  color: string;
}

export interface ITag extends IBaseEntity, STag {
  serialize(): STag;
  update(params: Partial<STag>): EntityValidateResult;
}

export interface ITagsService {
  create(params: {
    name: string,
    color?: string,
  }): base.PromisedEither<STag>;
}

// -------------------- Notification --------------------
export type NotificationType =
  | "info"
  | "success"
  | "error";

export interface SNotification extends SBaseEntity {
  type: NotificationType;
  message: string;
}

export interface INotification extends IBaseEntity, SNotification {
  serialize(): SNotification;
}

export type NotificationHandler = (snotification: SNotification) => void;

export interface INotificationsService {
  onNotification(h: NotificationHandler): void;
  offNotification(h: NotificationHandler): void;
  dispatch(params: {
    type: NotificationType,
    message: string,
  }): base.PromisedEither<null>;
}
