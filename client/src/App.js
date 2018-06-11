import React, { Component } from "react";
import FirstComponent from "./components/FirstComponent";

class App extends Component {
  render() {
    return (
      <div>
        <h1>From React</h1>
        <FirstComponent />
      </div>
    );
  }
}

export default App;
