import * as E from "fp-ts/es6/Either";

import * as types from "../../types";
import { Tag } from "../entities";
import { colors } from "../../utils";

export class TagsService implements types.ITagsService {
  private _proxy: types.IProxy;

  constructor (params: {
    proxy: types.IProxy,
  }) {
    this._proxy = params.proxy;
  }

  async create (params: {
    name: string,
    color?: string,
  }): types.PromisedEither<types.STag> {
    const tag = new Tag({
      name: params.name,
      color: params.color || colors.random(),
    });
    const stag = tag.serialize();
    await this._proxy.addTag(stag);
    return E.right(stag);
  }
}
