import express from "express";
import bodyParser from "body-parser";
import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import { makeExecutableSchema } from "graphql-tools";
import mongoose from "mongoose";

import typeDefs from "./schema";
import resolvers from "./resolvers";

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});

mongoose.connect(
  "mongodb://kevguo:Y0h0b0y0..@ds163530.mlab.com:63530/onetwoonetwo",
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

const PORT = 5500;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
