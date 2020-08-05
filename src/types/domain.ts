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
