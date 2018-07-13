import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Button from "@material-ui/core/Button";
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

          return data.allCats.map(cat => (
            <Button variant="contained" color="primary" key={cat._id}>
              {cat.name}
            </Button>
          ));
        }}
      </Query>
    );
  }
}

export default FirstComponent;
