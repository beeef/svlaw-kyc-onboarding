import { Input } from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";
import strings from "../../locale/strings.json";

class JurZusaetzlicheInformationen extends Component {
  state = {};

  componentDidUpdate = (prevProps) => {
    const { isActive, setCurrentStepValid } = this.props;
    const { isActive: wasActive } = prevProps;

    if (isActive && isActive !== wasActive) {
      setCurrentStepValid(true);
    }
  };

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
  setCurrentStepValid: PropTypes.func,
  isActive: PropTypes.bool,
};

export default JurZusaetzlicheInformationen;
