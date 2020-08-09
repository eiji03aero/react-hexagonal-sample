import * as types from "../../types";

type InitialState = {
  todos: types.STodo[],
  tags: types.STag[],
};

export const initialState: InitialState = {
  todos: [] as types.STodo[],
  tags: [] as types.STag[],
};
