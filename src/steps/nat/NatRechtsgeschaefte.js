import PropTypes from "prop-types";
import { Checkbox, Input, Radio, Space } from "antd";
import _ from "lodash";
import React, { Component } from "react";
import strings from "../../locale/strings.json";

class NatRechtsgeschaefte extends Component {
  state = { otherChecked: false };

  constructor(props) {
    super(props);
    this.inputChangeTimeout = null;
  }

  validate = () => {
    const { otherChecked } = this.state;
    const { formData, setCurrentStepValid } = this.props;
    const { legalServices, otherLegalService } = formData;

    if (otherChecked) {
      setCurrentStepValid(otherLegalService && otherLegalService.length > 0);
    } else if (legalServices && legalServices.length > 0) {
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

  onOtherLegalServiceChange = (text) => {
    const { onChangeFormData } = this.props;
    onChangeFormData("otherLegalService", text);
  };

  componentDidUpdate = (prevProps) => {
    const { isActive, formData } = this.props;
    const { legalServices } = formData;

    if (isActive) {
      if (
        legalServices &&
        (!_.isEqual(
          prevProps.formData.legalServices,
          this.props.formData.legalServices
        ) ||
          !_.isEqual(
            prevProps.formData.otherLegalService,
            this.props.formData.otherLegalService
          ))
      ) {
        this.validate();
      }
    }
  };

  render() {
    const { otherChecked } = this.state;
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
          <Checkbox
            checked={otherChecked}
            onChange={(e) => {
              this.setState({ otherChecked: e.target.checked }, this.validate);
            }}
          >
            {strings[currentLang].nat.OTHER}
          </Checkbox>
          <div className={otherChecked ? "fade-in" : "fade-out"}>
            <Input
              placeholder={strings[currentLang].PLEASE_EXPLAIN}
              // value={otherLegalService}
              onChange={(e) => {
                const { value } = e.target;
                if (this.inputChangeTimeout != null)
                  clearTimeout(this.inputChangeTimeout);
                this.inputChangeTimeout = setTimeout(() => {
                  this.onOtherLegalServiceChange(value);
                  this.validate();
                }, 400);
              }}
            />
          </div>
        </Space>
      </>
    );
  }
}

NatRechtsgeschaefte.propTypes = {
  isActive: PropTypes.bool,
  currentLang: PropTypes.any,
  formData: PropTypes.shape({
    legalServices: PropTypes.array,
    otherLegalService: PropTypes.string,
  }),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
};

export default NatRechtsgeschaefte;
