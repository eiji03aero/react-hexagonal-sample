import * as E from "fp-ts/lib/Either";

export type PromisedEither<T> = Promise<E.Either<Error, T>>;
