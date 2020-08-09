export interface SBaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface IBaseEntity extends SBaseEntity {
  serialize(): SBaseEntity;
  equals(other: this): boolean;
}

export interface STodo extends SBaseEntity {
  title: string;
  done: boolean;
  tagIds: string[];
}

export interface ITodo extends IBaseEntity, STodo {
  serialize(): STodo;
  markDone(done: boolean): void;
}

export interface ITodosService {
  create(params: {
    title: string,
  }): Promise<STodo>;
  markTodoDone(params: {
    id: string;
    done: boolean;
  }): Promise<null>;
}

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
  }): Promise<null>;
}

export interface STag extends SBaseEntity {
  name: string;
  color: string;
}

export interface ITag extends IBaseEntity, STag {
  serialize(): STag;
}

export interface ITagsService {
  create(params: {
    name: string,
    color?: string,
  }): Promise<STag>;
}
