import PropTypes from "prop-types";
import { Input } from "antd";
import React, { Component } from "react";
import strings from "../../locale/strings.json";

class JurZusaetzlicheInformationen extends Component {
  state = {};

  render() {
    const { currentLang } = this.props;

    return (
      <>
        <h2>{strings[currentLang].jur.STEP_ADDITIONAL_REMARKS}</h2>
        <Input.TextArea rows={5} />
      </>
    );
  }
}

JurZusaetzlicheInformationen.propTypes = {
  currentLang: PropTypes.any,
};

export default JurZusaetzlicheInformationen;
