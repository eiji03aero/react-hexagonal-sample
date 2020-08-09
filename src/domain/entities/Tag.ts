import * as E from "fp-ts/es6/Either";

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

  validate (): types.EntityValidateResult {
    if (!this.name) {
      return E.left(new Error("name cannot be empty"));
    }
    if (!this.color) {
      return E.left(new Error("color cannot by empty"));
    }

    return E.right(null);
  }

  update (params: Partial<types.STag>): types.EntityValidateResult {
    super.update(params);

    if (params.name) {
      this.name = name;
    }
    if (params.color) {
      this.color = params.color;
    }

    return this.validate();
  }
}
