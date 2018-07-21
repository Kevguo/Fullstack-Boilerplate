import express from "express";
import bodyParser from "body-parser";
import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import mongoose from "mongoose";
import path from "path";

import configs from "./configs";
import typeDefs from "./schema";
import resolvers from "./resolvers";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

mongoose.connect(
  configs.dbURL,
  { useNewUrlParser: true }
);

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to database");
});
mongoose.connection.on("error", err => {
  console.log(`Mongoose connection error: ${err}`);
});

const Cat = mongoose.model("Cat", { name: String });

const app = express();

app.use(
  "/graphql",
  bodyParser.json(),
  graphqlExpress({ schema, context: { Cat } })
);

app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.use(express.static(path.join(__dirname, "../dist/")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
