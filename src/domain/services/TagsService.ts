import * as E from "fp-ts/es6/Either";

import * as types from "../../types";
import { Tag } from "../entities";
import { colors } from "../../utils";

export class TagsService implements types.ITagsService {
  private _tagsRepository: types.ITagsRepository;

  constructor (params: {
    tagsRepository: types.ITagsRepository,
  }) {
    this._tagsRepository = params.tagsRepository;
  }

  async create (params: {
    name: string,
    color?: string,
  }): types.PromisedEither<types.ITag> {
    const tag = new Tag({
      name: params.name,
      color: params.color || colors.random(),
    });
    const r1 = tag.validate();
    if (E.isLeft(r1)) {
      return r1;
    }

    await this._tagsRepository.save(tag);
    return E.right(tag);
  }
}
