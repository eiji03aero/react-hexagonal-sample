import { v4 } from "uuid";
import * as E from "fp-ts/es6/Either";
import * as types from "../../types";

export class BaseEntity implements types.IBaseEntity {
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
      __typename: "BaseEntity",
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  validate (): types.EntityValidateResult {
    return E.right(null);
  }

  equals (other: this) {
    return this === other;
  }

  update (_: Partial<types.SBaseEntity>): types.EntityValidateResult {
    this.updatedAt = this.getCurrentDateTime();
    return E.right(null);
  }

  protected getCurrentDateTime () {
    return new Date().toISOString();
  }
}
