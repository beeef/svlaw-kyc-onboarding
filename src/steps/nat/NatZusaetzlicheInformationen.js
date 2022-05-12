import { Input } from "antd";
import React, { Component } from "react";
import strings from "../../locale/strings.json";

class NatZusaetzlicheInformationen extends Component {
  state = {};

  render() {
    const { currentLang } = this.props;

    return (
      <>
        <h2>{strings[currentLang].nat.STEP_ADDITIONAL_REMARKS}</h2>
        <Input.TextArea placeholder="Enter some text (optional) .." rows={5} />
      </>
    );
  }
}

export default NatZusaetzlicheInformationen;
