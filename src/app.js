const express = require("express");
const bodyParser = require("body-parser");
const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
const { makeExecutableSchema } = require("graphql-tools");
const mongoose = require("mongoose");
const path = require("path");

const configs = require("./configs");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");

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
