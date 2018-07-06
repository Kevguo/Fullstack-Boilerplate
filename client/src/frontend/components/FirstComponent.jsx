import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import "./FirstComponent.css";

const GET_CATS = gql`
  {
    allCats {
      _id
      name
    }
  }
`;

class FirstComponent extends Component {
  render() {
    return (
      <Query query={GET_CATS}>
        {({ loading, error, data }) => {
          if (loading) return "Loading...";
          if (error) return `Error! ${error.message}`;

          return data.allCats.map(cat => <h1 key={cat._id}>{cat.name}</h1>);
        }}
      </Query>
    );
  }
}

export default FirstComponent;
