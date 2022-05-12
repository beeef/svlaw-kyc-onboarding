import { Checkbox, Input, Radio, Space } from "antd";
import React, { Component } from "react";
import strings from "../../locale/strings.json";

class NatRechtsgeschaefte extends Component {
  state = { checkedAnswers: [] };

  render() {
    const { checkedAnswers } = this.state;
    const { currentLang } = this.props;

    const createCheckbox = (question) => (
      <Checkbox
        checked={checkedAnswers.indexOf(question) >= 0}
        onChange={(e) => {
          if (e.target.checked) {
            this.setState({ checkedAnswers: [...checkedAnswers, question] });
          } else {
            this.setState({
              checkedAnswers: checkedAnswers.filter((c) => c !== question),
            });
          }
        }}
      >
        {question}
      </Checkbox>
    );

    const questionChecked = (question) => checkedAnswers.indexOf(question) >= 0;

    return (
      <>
        <h2>{strings[currentLang].nat.STEP_WHAT_LEGAL_SERVICES}</h2>
        <h3>{strings[currentLang].CHECKBOX_TICK_ALL_THAT_APPLY}</h3>
        <Space direction="vertical">
          {createCheckbox(
            strings[currentLang].nat.PURCHASE_OR_SALE_OF_REAL_ESTATE
          )}
          {createCheckbox(strings[currentLang].nat.ADMINISTRATION_OF_MONEY)}
          {createCheckbox(
            strings[currentLang].nat
              .FORMATION_OR_OPERATION_OR_ADMINISTRATION_OF_ANY_TRUST
          )}
          {createCheckbox(strings[currentLang].nat.OTHER)}
          {questionChecked(strings[currentLang].nat.OTHER) && (
            <Input placeholder="Enter some Text" />
          )}
        </Space>
      </>
    );
  }
}

export default NatRechtsgeschaefte;
