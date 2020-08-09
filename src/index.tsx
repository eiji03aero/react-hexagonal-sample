import { Service } from "./service";
import { createApolloClient } from "./graphql";
import { render } from "./adapters/ui";
import { Proxy } from "./adapters/proxy";
import { writeSeedData } from "./seed";

document.addEventListener("DOMContentLoaded", function (_) {
  const container = document.getElementById("app");
  if (!container) {
    throw new Error("mount node not found");
  }

  const apolloClient = createApolloClient({});
  const proxy = new Proxy({
    apolloClient
  });

  const service = new Service({
    proxy
  });

  writeSeedData(apolloClient);

  render({
    service,
    apolloClient,
    container,
  });
});
