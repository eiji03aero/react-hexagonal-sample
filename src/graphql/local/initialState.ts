import * as types from "../../types";

type InitialState = {
  todos: types.STodo[],
};

export const initialState: InitialState = {
  todos: [] as types.STodo[],
};
