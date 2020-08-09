import * as E from "fp-ts/es6/Either";

import * as types from "../../types";
import { BaseEntity } from "./BaseEntity";

export class Todo extends BaseEntity implements types.ITodo {
  title: string;
  done: boolean;
  tagIds: string[];

  constructor (params: Partial<types.SBaseEntity> & {
    title: string,
    done: boolean,
    tagIds?: string[],
  }) {
    super(params);
    this.title = params.title;
    this.done = params.done;
    this.tagIds = params.tagIds || [] as string[];
  }

  serialize () {
    return {
      ...super.serialize(),
      __typename: "Todo",
      title: this.title,
      done: this.done,
      tagIds: this.tagIds,
    };
  }

  validate (): types.EntityValidateResult {
    if (!this.title) {
      return E.left(new Error("title cannot be empty"));
    }

    return E.right(null);
  }

  update (params: Partial<types.STodo>): types.EntityValidateResult {
    super.update(params);

    if (params.title) {
      this.title = params.title;
    }
    if (params.done !== undefined) {
      this.done = params.done;
    }
    if (params.tagIds) {
      this.tagIds = params.tagIds;
    }

    return this.validate();
  }

  markDone (done: boolean) {
    this.done = done;
  }

  equals (other: this) {
    return this.id === other.id;
  }
}
