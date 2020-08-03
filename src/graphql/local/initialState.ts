import { ITodo } from "../../types";

type InitialState = {
  localState: {
    todos: ITodo[],
  }
};

export const initialState: InitialState = {
  localState: {
    todos: [] as ITodo[],
  }
};
