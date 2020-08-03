import { render } from "./adapters/ui/index";
import { createApolloClient } from "./graphql";

document.addEventListener("DOMContentLoaded", function (_) {
  const apolloClient = createApolloClient({});

  render({
    apolloClient,
  });
});
