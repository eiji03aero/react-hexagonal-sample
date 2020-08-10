import { TypePolicies, FieldFunctionOptions, Reference } from "@apollo/client";

export const typePolicies: TypePolicies = {
  Query: {
    fields: {
      todos: {
        read (_stodos: Reference[], { variables, readField }: FieldFunctionOptions) {
          let stodos = _stodos.slice();
          const vars = variables || {};

          stodos.sort((a, b: Reference) => {
            const ad = new Date(readField<string>("createdAt", a)!);
            const bd = new Date(readField<string>("createdAt", b)!);
            return ad < bd
              ? -1
              : 1;
          });

          if (vars.keyword) {
            const keyword = vars.keyword as string;
            const keywordRE = new RegExp(keyword);
            stodos = stodos.filter((st: Reference) => {
              const title = readField<string>("title", st)!;
              return keywordRE.test(title);
            });
          }

          if (vars.tagIds && vars.tagIds.length > 0) {
            const tagIds = vars.tagIds as string[];
            stodos = stodos.filter((st: Reference) => {
              const ids = readField<string[]>("tagIds", st)!;
              return tagIds.every((id: string) => ids.includes(id));
            });
          }

          if (vars.sort === "desc") {
            stodos.reverse();
          }

          return stodos;
        }
      }
    }
  }
};
