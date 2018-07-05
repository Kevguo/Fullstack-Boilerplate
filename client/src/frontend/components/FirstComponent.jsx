import React, { Component } from "react";
import { createApolloFetch } from "apollo-fetch";
import gql from "graphql-tag";

const apolloFetch = createApolloFetch({ uri: "/graphql" });

const query = gql`
  {
    allCats {
      name
    }
  }
`;

class FirstComponent extends Component {
  constructor() {
    super();

    this.state = {
      fromServer: ""
    };
  }

  componentDidMount() {
    const graphAPIRequest = async () => {
      const response = await apolloFetch({ query });
      const json = response.data;
      this.setState({ fromServer: json });
    };
    graphAPIRequest();
  }

  render() {
    const { fromServer } = this.state;

    return <h1>{JSON.stringify(fromServer)}</h1>;
  }
}

export default FirstComponent;
