import * as types from "../../types";
import { BaseEntity } from "./BaseEntity";

export class Todo extends BaseEntity implements types.ITodo {
  title: string;
  done: boolean;

  constructor (params: Partial<types.SBaseEntity> & {
    title: string;
    done: boolean;
  }) {
    super(params);
    this.title = params.title;
    this.done = params.done;
  }

  serialize () {
    return {
      ...super.serialize(),
      title: this.title,
      done: this.done,
    };
  }

  markDone (done: boolean) {
    this.done = done;
  }

  equals (other: this) {
    return this.id === other.id;
  }
}
