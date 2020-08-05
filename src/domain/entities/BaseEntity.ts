import { v4 } from "uuid";
import { IBaseEntity } from "../../types";

export class BaseEntity implements IBaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;

  constructor (params: {
    id?: string,
    createdAt?: string,
    updatedAt?: string,
  }) {
    this.id = params.id || v4();
    this.createdAt = params.createdAt || this.getCurrentDateTime();
    this.updatedAt = params.updatedAt || this.getCurrentDateTime();
  }

  serialize () {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  equals (other: this) {
    return this === other;
  }

  protected getCurrentDateTime () {
    return new Date().toISOString();
  }

  protected update () {
    this.updatedAt = this.getCurrentDateTime();
  }
}
