import React from "react";

import { IContext } from "./types";

export const AppContext = React.createContext<IContext>({
  service: {} as any,
});
