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

  markDone (done: boolean) {
    this.done = done;
  }

  equals (other: this) {
    return this.id === other.id;
  }
}
