import { Service } from "./service";
import { createApolloClient } from "./graphql";
import { render } from "./adapters/ui";
import * as repos from "./adapters/repositories";
import { writeSeedData } from "./seed";

document.addEventListener("DOMContentLoaded", function (_) {
  const container = document.getElementById("app");
  if (!container) {
    throw new Error("mount node not found");
  }

  const apolloClient = createApolloClient({});

  const todosRepository = new repos.TodosRepository({
    apolloClient,
  });
  const tagsRepository = new repos.TagsRepository({
    apolloClient,
  });

  const service = new Service({
    todosRepository,
    tagsRepository,
  });

  writeSeedData(apolloClient);

  render({
    service,
    apolloClient,
    container,
  });
});
