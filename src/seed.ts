import * as types from "./types";
import { local } from "./graphql";

const tags = [
  {
    color: "#00bcd4",
    createdAt: "2020-08-09T04:55:17.063Z",
    id: "543f2edc-5e30-4933-9e95-7a6911d2b54f",
    name: "Friendship",
    updatedAt: "2020-08-09T04:55:17.063Z",
  },
  {
    color: "#43a047",
    createdAt: "2020-08-09T04:55:17.143Z",
    id: "d9fb2d64-f9e8-44e5-b095-ed1ff9f5e42a",
    name: "House chore",
    updatedAt: "2020-08-09T04:55:17.143Z",
  },
  {
    color: "#ab47bc",
    createdAt: "2020-08-09T04:55:17.116Z",
    id: "ee5cdd7c-9b1a-4afe-b5bd-aed56d6bea43",
    name: "After work",
    updatedAt: "2020-08-09T04:55:17.116Z",
  },
  {
    color: "#1b5e20",
    createdAt: "2020-08-09T04:57:30.249Z",
    id: "f355d5d7-56ea-45a1-96fd-667e5a3b2856",
    name: "Survival",
    updatedAt: "2020-08-09T04:57:30.249Z",
  },
  {
    color: "#e65100",
    createdAt: "2020-08-09T04:57:30.113Z",
    id: "7641dd1d-f180-4370-8dad-10f74ea3c695",
    name: "Cooking",
    updatedAt: "2020-08-09T04:57:30.113Z",
  },
  {
    color: "#1976d2",
    createdAt: "2020-08-09T04:58:54.960Z",
    id: "f83961b8-855f-4b65-a4b0-873fd1588d25",
    name: "Programming",
    updatedAt: "2020-08-09T04:58:54.960Z",
  },
  {
    color: "#8e24aa",
    createdAt: "2020-08-09T05:00:55.841Z",
    id: "11402be8-9cfa-4c4c-bfd4-52957ea3dfea",
    name: "Date",
    updatedAt: "2020-08-09T05:00:55.841Z",
  },
  {
    color: "#64b5f6",
    createdAt: "2020-08-09T05:00:56.660Z",
    id: "94f4748b-63c0-4fd7-9738-9034eb989cc1",
    name: "Water",
    updatedAt: "2020-08-09T05:00:56.660Z",
  },
  {
    color: "#00bcd4",
    createdAt: "2020-08-09T05:02:12.269Z",
    id: "1c8d78dc-8150-448f-80da-f028ae4c0a0f",
    name: "Pet",
    updatedAt: "2020-08-09T05:02:12.269Z",
  },
  {
    color: "#d32f2f",
    createdAt: "2020-08-09T05:08:47.114Z",
    id: "2ff1c7bd-1c80-48df-9e73-2835c00f5fdc",
    name: "Workout",
    updatedAt: "2020-08-09T05:08:47.114Z",
  }
];

const todos = [
  {
    createdAt: "2020-08-09T05:02:51.473Z",
    done: false,
    id: "04d72e36-bcc7-4b48-a0cc-af097e8fe1f8",
    title: "Go shop for dinner",
    updatedAt: "2020-08-09T05:02:51.473Z",
    tagIds: ["d9fb2d64-f9e8-44e5-b095-ed1ff9f5e42a", "7641dd1d-f180-4370-8dad-10f74ea3c695"],
  },
  {
    createdAt: "2020-08-09T05:02:51.504Z",
    done: false,
    id: "4cc8848e-813a-494b-8b78-c95793e5478e",
    title: "See if flog is edible",
    updatedAt: "2020-08-09T05:02:51.504Z",
    tagIds: ["7641dd1d-f180-4370-8dad-10f74ea3c695", "f355d5d7-56ea-45a1-96fd-667e5a3b2856"],
  },
  {
    createdAt: "2020-08-09T05:02:51.674Z",
    done: false,
    id: "c581e0e5-9e0d-4fd2-a40b-f92d9e5dbe76",
    title: "Look up where to have dinner with bebe",
    updatedAt: "2020-08-09T05:02:51.674Z",
    tagIds: ["11402be8-9cfa-4c4c-bfd4-52957ea3dfea"]
  },
  {
    createdAt: "2020-08-09T05:02:51.442Z",
    done: false,
    id: "ca2004d6-008c-4a4c-86f8-f8eb1f89ec6b",
    title: "Go take Emi-tan a walk",
    updatedAt: "2020-08-09T05:02:51.442Z",
    tagIds: ["1c8d78dc-8150-448f-80da-f028ae4c0a0f", "d9fb2d64-f9e8-44e5-b095-ed1ff9f5e42a"]
  },
  {
    createdAt: "2020-08-09T05:02:52.111Z",
    done: false,
    id: "e7b10aa5-43d4-4d2b-a3ae-4b240a51d227",
    title: "Work out after work",
    updatedAt: "2020-08-09T05:02:52.111Z",
    tagIds: ["ee5cdd7c-9b1a-4afe-b5bd-aed56d6bea43", "2ff1c7bd-1c80-48df-9e73-2835c00f5fdc"],
  },
  {
    createdAt: "2020-08-09T05:09:59.529Z",
    done: false,
    id: "0d5730cb-1eaa-4992-9b84-fca4ca9cfd1b",
    title: "Try to fix tap",
    updatedAt: "2020-08-09T05:09:59.529Z",
    tagIds: ["94f4748b-63c0-4fd7-9738-9034eb989cc1", "d9fb2d64-f9e8-44e5-b095-ed1ff9f5e42a"],
  },
  {
    createdAt: "2020-08-09T05:09:59.896Z",
    done: false,
    id: "2e6a3328-d4f4-4ed0-96d3-a945a917618f",
    title: "Go watch soccer",
    updatedAt: "2020-08-09T05:09:59.896Z",
    tagIds: ["543f2edc-5e30-4933-9e95-7a6911d2b54f"],
  },
  {
    createdAt: "2020-08-09T05:10:00.431Z",
    done: false,
    id: "304fd38b-1630-42bd-9534-609c5ca364cf",
    title: "Beer place",
    updatedAt: "2020-08-09T05:10:00.431Z",
    tagIds: ["11402be8-9cfa-4c4c-bfd4-52957ea3dfea"]
  },
  {
    createdAt: "2020-08-09T05:09:59.591Z",
    done: false,
    id: "ea785d54-a51c-4154-8489-71c7ebae75cb",
    title: "Do something with heat at night",
    updatedAt: "2020-08-09T05:09:59.591Z",
    tagIds: ["d9fb2d64-f9e8-44e5-b095-ed1ff9f5e42a", "f355d5d7-56ea-45a1-96fd-667e5a3b2856"]
  },
  {
    createdAt: "2020-08-09T05:10:00.038Z",
    done: false,
    id: "f8885900-71a6-4322-8d96-cb5ed21b0fe1",
    title: "Try make yakinioku onigiri",
    updatedAt: "2020-08-09T05:10:00.038Z",
    tagIds: ["7641dd1d-f180-4370-8dad-10f74ea3c695"],
  },
  {
    createdAt: "2020-08-09T05:13:46.662Z",
    done: false,
    id: "007d9ca9-55e1-4168-a947-bed30e5b5993",
    title: "Have shisha",
    updatedAt: "2020-08-09T05:13:46.662Z",
    tagIds: ["ee5cdd7c-9b1a-4afe-b5bd-aed56d6bea43", "543f2edc-5e30-4933-9e95-7a6911d2b54f"],
  },
  {
    createdAt: "2020-08-09T05:13:47.048Z",
    done: false,
    id: "35cf4e24-34a3-48a6-b013-c0d5939d5256",
    title: "Finish trainig menu",
    updatedAt: "2020-08-09T05:13:47.048Z",
    tagIds: ["2ff1c7bd-1c80-48df-9e73-2835c00f5fdc"]
  },
  {
    createdAt: "2020-08-09T05:16:21.350Z",
    done: false,
    id: "2661ff18-3fcb-48dc-ac3a-81626432ae64",
    title: "Go swim in river",
    updatedAt: "2020-08-09T05:16:21.350Z",
    tagIds: ["543f2edc-5e30-4933-9e95-7a6911d2b54f", "94f4748b-63c0-4fd7-9738-9034eb989cc1"],
  },
  {
    createdAt: "2020-08-09T05:16:21.137Z",
    done: false,
    id: "46996fb0-aa64-4b9c-96bd-14061ce850d1",
    title: "Bake yum cake",
    updatedAt: "2020-08-09T05:16:21.137Z",
    tagIds: ["7641dd1d-f180-4370-8dad-10f74ea3c695"],
  },
  {
    createdAt: "2020-08-09T05:16:21.267Z",
    done: false,
    id: "ac0a7a30-f945-496c-872f-601bf29ed0f1",
    title: "Look for some gift for anniversary",
    updatedAt: "2020-08-09T05:16:21.267Z",
    tagIds: ["11402be8-9cfa-4c4c-bfd4-52957ea3dfea"]
  },
  {
    createdAt: "2020-08-09T05:16:21.085Z",
    done: false,
    id: "d96fc8fb-8f07-4ef3-a4e6-55906647b624",
    title: "Hit the bar",
    updatedAt: "2020-08-09T05:16:21.085Z",
    tagIds: ["ee5cdd7c-9b1a-4afe-b5bd-aed56d6bea43"],
  },
];

export const writeSeedData = (client: types.CustomApolloClient) => {
  client.writeQuery({
    query: local.GetLocalStateDocument,
    data: {
      tags,
      todos,
    }
  });
};
