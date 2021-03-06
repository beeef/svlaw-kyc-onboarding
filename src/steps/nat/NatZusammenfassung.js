import PropTypes from "prop-types";
import React, { Component } from "react";
import { Checkbox, Input, Space } from "antd";
import ReactJson from "react-json-view";
import strings from "../../locale/strings.json";

class NatZusammenfassung extends Component {
  state = { confirmed: false };

  render() {
    const { confirmed } = this.state;
    const { currentLang, formData, setCurrentStepValid, onChangeFormData } =
      this.props;

    return (
      <>
        <h2>{strings[currentLang].nat.STEP_ADDITIONAL_REMARKS}</h2>
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
            {strings[currentLang].nat.I_CONFIRM_PROVIDED_INFORMATION}
          </Checkbox>
        </Space>
      </>
    );
  }
}

NatZusammenfassung.propTypes = {
  currentLang: PropTypes.any,
  formData: PropTypes.any,
  setCurrentStepValid: PropTypes.func,
  onChangeFormData: PropTypes.func,
};

export default NatZusammenfassung;
