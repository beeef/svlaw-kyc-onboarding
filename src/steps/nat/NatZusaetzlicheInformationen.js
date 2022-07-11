import PropTypes from "prop-types";
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
        <Input.TextArea rows={5} />
      </>
    );
  }
}

NatZusaetzlicheInformationen.propTypes = {
  currentLang: PropTypes.any,
};

export default NatZusaetzlicheInformationen;
