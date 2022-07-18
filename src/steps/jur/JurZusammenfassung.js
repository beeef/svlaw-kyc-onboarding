import { Checkbox, Input, Space } from "antd";
import PropTypes from "prop-types";
import React, { Component } from "react";
import ReactJson from "react-json-view";
import strings from "../../locale/strings.json";

class JurZusammenfassung extends Component {
  state = { confirmed: false };

  constructor(props) {
    super(props);

    this.textareaChangeTimeout = null;
  }

  componentDidUpdate = (prevProps) => {
    const { isActive, setCurrentStepValid } = this.props;
    const { isActive: wasActive } = prevProps;

    if (isActive && isActive !== wasActive) {
      setCurrentStepValid(true);
    }
  };

  render() {
    const { confirmed } = this.state;
    const { currentLang, formData, onChangeFormData, setCurrentStepValid } =
      this.props;

    return (
      <>
        <h2>{strings[currentLang].jur.STEP_ADDITIONAL_REMARKS}</h2>
        <Space style={{ width: "100%" }} direction="vertical" size="large">
          <Input.TextArea
            rows={5}
            onChange={(e) => {
              if (this.textareaChangeTimeout)
                clearTimeout(this.textareaChangeTimeout);

              this.textareaChangeTimeout = setTimeout(() => {
                onChangeFormData("additionalInformation", e.target.value);
              }, 400);
            }}
          />
          <ReactJson
            name={false}
            src={formData}
            displayDataTypes={false}
            enableClipboard={false}
          />
          <Checkbox
            checked={confirmed}
            onChange={(e) => {
              this.setState({ confirmed: e.target.checked }, () => {
                setCurrentStepValid(e.target.checked);
              });
            }}
          >
            {strings[currentLang].jur.I_CONFIRM_PROVIDED_INFORMATION}
          </Checkbox>
        </Space>
      </>
    );
  }
}

JurZusammenfassung.propTypes = {
  formData: PropTypes.any,
  currentLang: PropTypes.any,
  setCurrentStepValid: PropTypes.func,
  isActive: PropTypes.bool,
  onChangeFormData: PropTypes.func,
};

export default JurZusammenfassung;
