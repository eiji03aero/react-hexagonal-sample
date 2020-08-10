import * as E from "fp-ts/es6/Either";

import * as types from "../../types";
import { local } from "../../graphql";
import { Tag } from "../../domain";

export class TagsRepository implements types.ITagsRepository {
  private _apolloClient: types.CustomApolloClient;

  constructor (params: {
    apolloClient: types.CustomApolloClient,
  }) {
    this._apolloClient = params.apolloClient;
  }

  async get (params: types.TagsInput): types.PromisedEither<types.ITag[]> {
    const r1 = await this._getSerialized(params);
    if (E.isLeft(r1)) {
      return r1;
    }
    const stags = r1.right;

    const tags = stags.map((st: types.STag) => {
      return new Tag(st);
    });

    return E.right(tags);
  }

  async save (tag: types.ITag): types.PromisedEither<null> {
    const r1 = await this._getSerialized({});
    if (E.isLeft(r1)) {
      return r1;
    }
    const stags = r1.right;

    const stag = tag.serialize();
    this._apolloClient.writeQuery({
      query: local.GetTagsDocument,
      data: {
        tags: [stag, ...stags]
      }
    });

    return E.right(null);
  }

  private async _getSerialized (params: types.TagsInput): types.PromisedEither<types.STag[]> {
    const result = this._apolloClient.readQuery<{ tags: types.STag[] }>({
      query: local.GetTagsDocument,
      variables: params,
    });
    if (!result) {
      return E.right([] as types.STag[]);
    }

    return E.right(result.tags);
  }
}
