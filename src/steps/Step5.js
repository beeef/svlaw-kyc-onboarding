import React, { Component } from "react";
import strings from "../locale/strings.json";

class Step5 extends Component {
  state = {};

  render() {
    const { currentLang } = this.props;

    return (
      <>
        <h2>{strings[currentLang].nat.STEP5_TITLE}</h2>
      </>
    );
  }
}

export default Step5;
