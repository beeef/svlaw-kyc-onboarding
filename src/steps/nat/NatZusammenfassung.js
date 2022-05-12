import React, { Component } from "react";
import { Checkbox, Space } from "antd";
import ReactJson from "react-json-view";
import strings from "../../locale/strings.json";

class NatZusammenfassung extends Component {
  state = {};

  render() {
    const { currentLang, formData } = this.props;

    return (
      <>
        <h2>{strings[currentLang].nat.STEP_SUMMARY}</h2>
        <Space style={{ width: "100%" }} direction="vertical" size="large">
          <ReactJson
            name={false}
            src={formData}
            displayDataTypes={false}
            enableClipboard={false}
          />
          <Checkbox>
            {strings[currentLang].nat.I_CONFIRM_PROVIDED_INFORMATION}
          </Checkbox>
        </Space>
      </>
    );
  }
}

export default NatZusammenfassung;
