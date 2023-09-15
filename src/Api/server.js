import { createServer } from "miragejs";
import { data } from "./data";

createServer({
  routes() {
    this.get("/api/treeData", () => {
      return data;
    });
  },
});
