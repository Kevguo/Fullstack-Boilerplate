import React, { Component } from "react";

class FirstComponent extends Component {
  constructor() {
    super();

    this.state = {
      fromServer: ""
    };
  }

  componentDidMount() {
    const someApiRequest = async method => {
      // CORS PROBLEM WTF?
      const response = await fetch("/api/test");
      const json = await response.json();
      this.setState({ fromServer: json });
    };
    someApiRequest();
  }

  render() {
    const { fromServer } = this.state;

    return <h1>{fromServer.response}</h1>;
  }
}

export default FirstComponent;
