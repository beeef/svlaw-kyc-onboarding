import { Checkbox, Input, Radio, Space } from "antd";
import React, { Component } from "react";
import strings from "../../locale/strings.json";

class NatRechtsgeschaefte extends Component {
  state = {};

  validate = () => {
    const { formData, setCurrentStepValid } = this.props;
    const { legalServices } = formData;

    if (legalServices && legalServices.length > 0) {
      setCurrentStepValid(true);
    } else {
      setCurrentStepValid(false);
    }
  };

  onCheckLegalService = (question, checked) => {
    const { formData, onChangeFormData } = this.props;
    const { legalServices } = formData;

    if (checked) {
      if (legalServices)
        onChangeFormData("legalServices", [...legalServices, question]);
      else onChangeFormData("legalServices", [question]);
    } else {
      onChangeFormData(
        "legalServices",
        legalServices.filter((ls) => ls !== question)
      );
    }
  };

  render() {
    const { currentLang, formData } = this.props;

    const { legalServices } = formData;

    const questionChecked = (question) =>
      formData && legalServices && legalServices.indexOf(question) >= 0;

    const createCheckbox = (question) => (
      <Checkbox
        checked={questionChecked(question)}
        onChange={(e) => {
          this.onCheckLegalService(question, e.target.checked);
        }}
      >
        {question}
      </Checkbox>
    );

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
          <div
            className={
              questionChecked(strings[currentLang].nat.OTHER)
                ? "fade-in"
                : "fade-out"
            }
          >
            <Input placeholder={strings[currentLang].PLEASE_EXPLAIN} />
          </div>
        </Space>
      </>
    );
  }
}

export default NatRechtsgeschaefte;
