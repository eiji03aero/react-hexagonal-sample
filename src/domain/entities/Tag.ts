import * as types from "../../types";
import { BaseEntity } from "./BaseEntity";

export class Tag extends BaseEntity implements types.ITag {
  name: string;
  color: string;

  constructor (params: Partial<types.SBaseEntity> & {
    name: string,
    color: string,
  }) {
    super(params);
    this.name = params.name;
    this.color = params.color;
  }

  serialize () {
    return {
      ...super.serialize(),
      __typename: "Tag",
      name: this.name,
      color: this.color,
    };
  }
}
