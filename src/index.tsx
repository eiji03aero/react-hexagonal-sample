import { Service } from "./service";
import { createApolloClient } from "./graphql";
import { render } from "./adapters/ui";
import { Proxy } from "./adapters/proxy";

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

  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      service.createTodo({
        title: "domo" + String(i),
      });
    }, i * 200);
  }

  (window as any).todosasc = async () => {
    const r = await proxy.getTodos({
      sort: "asc",
    });
    console.log(r);
    return r;
  }

  (window as any).todos = async () => {
    const r = await proxy.getTodos({})
    console.log(r);
    return r;
  }

  (window as any).todosdesc = async () => {
    const r = await proxy.getTodos({
      sort: "desc"
    });
    console.log(r);
    return r;
  }

  render({
    service,
    apolloClient,
    container,
  });
});
