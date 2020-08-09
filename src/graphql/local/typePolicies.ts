import { TypePolicies, FieldFunctionOptions, Reference } from "@apollo/client";

export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      todos: {
        read (_stodos: Reference[], { variables, readField }: FieldFunctionOptions) {
          const stodos = _stodos.slice();
          const vars = variables || {};
          const sort = vars.sort || "desc";

          stodos.sort((a, b: Reference) => {
            const ad = new Date(readField<string>("updatedAt", a)!);
            const bd = new Date(readField<string>("updatedAt", b)!);
            return ad < bd
              ? -1
              : 1;
          });

          if (sort === "desc") {
            stodos.reverse();
          }

          return stodos;
        }
      }
    }
  }
};
