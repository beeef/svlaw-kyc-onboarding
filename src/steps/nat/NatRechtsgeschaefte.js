import { Checkbox, Radio, Space } from "antd";
import React, { Component } from "react";
import strings from "../../locale/strings.json";

class NatRechtsgeschaefte extends Component {
  state = {};

  render() {
    const { currentLang } = this.props;

    return (
      <>
        <h2>{strings[currentLang].nat.STEP_WHAT_LEGAL_SERVICES}</h2>
        <h3>{strings[currentLang].CHECKBOX_TICK_ALL_THAT_APPLY}</h3>
        <Space direction="vertical">
          <Checkbox>
            {strings[currentLang].nat.PURCHASE_OR_SALE_OF_REAL_ESTATE}
          </Checkbox>
          <Checkbox>
            {strings[currentLang].nat.ADMINISTRATION_OF_MONEY}
          </Checkbox>
          <Checkbox>
            {
              strings[currentLang].nat
                .FORMATION_OR_OPERATION_OR_ADMINISTRATION_OF_ANY_TRUST
            }
          </Checkbox>
          <Checkbox>{strings[currentLang].nat.OTHER}</Checkbox>
        </Space>
      </>
    );
  }
}

export default NatRechtsgeschaefte;
