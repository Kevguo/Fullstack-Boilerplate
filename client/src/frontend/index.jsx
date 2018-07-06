import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";

import client from "./apollo";

import FirstComponent from "./components/FirstComponent";

const App = (
  <ApolloProvider client={client}>
    <FirstComponent />
  </ApolloProvider>
);

ReactDOM.render(App, document.getElementById("root"));

module.hot.accept();
