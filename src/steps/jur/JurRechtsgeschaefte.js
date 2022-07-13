import PropTypes from "prop-types";
import React, { Component } from "react";
import { Checkbox, Input, Space } from "antd";
import strings from "../../locale/strings.json";

class JurRechtsgeschaefte extends Component {
  state = { otherChecked: false };

  validate = () => {
    const { otherChecked } = this.state;
    const { formData, setCurrentStepValid, isActive } = this.props;
    const { legalServices, otherLegalService } = formData;

    if (isActive) {
      if (otherChecked) {
        setCurrentStepValid(otherLegalService && otherLegalService.length > 0);
      } else if (legalServices && legalServices.length > 0) {
        setCurrentStepValid(true);
      } else {
        setCurrentStepValid(false);
      }
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
    if (
      (prevProps.formData.legalServices ||
        prevProps.formData.otherLegalService) &&
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
  };

  render() {
    const { otherChecked } = this.state;
    const { currentLang, formData } = this.props;

    const { legalServices } = formData;

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

    const insertNameIntoHeader = (name, header) =>
      header.replace("[NAME_LEGAL_ENTITY]", name);

    const questionChecked = (question) =>
      formData && legalServices && legalServices.indexOf(question) >= 0;

    return (
      <>
        <h2>
          {insertNameIntoHeader(
            formData.clientData ? formData.clientData.nameLegalEntity : "",
            strings[currentLang].jur.STEP_WHAT_LEGAL_SERVICES
          )}
        </h2>
        <h3>{strings[currentLang].CHECKBOX_TICK_ALL_THAT_APPLY}</h3>
        <Space direction="vertical">
          {createCheckbox(
            strings[currentLang].jur.PURCHASE_OR_SALE_OF_REAL_ESTATE
          )}
          {createCheckbox(strings[currentLang].jur.ADMINISTRATION_OF_MONEY)}
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
            {strings[currentLang].jur.OTHER}
          </Checkbox>
          <div className={otherChecked ? "fade-in" : "fade-out"}>
            <Input
              placeholder={strings[currentLang].PLEASE_EXPLAIN}
              // value={otherLegalService}
              onChange={(e) => {
                this.onOtherLegalServiceChange(e.target.value);
              }}
            />
          </div>
        </Space>
      </>
    );
  }
}

JurRechtsgeschaefte.propTypes = {
  currentLang: PropTypes.any,
  formData: PropTypes.shape({
    clientData: PropTypes.shape({
      nameLegalEntity: PropTypes.any,
    }),
    legalServices: PropTypes.arrayOf(
      PropTypes.shape({
        filter: PropTypes.func,
        indexOf: PropTypes.func,
        length: PropTypes.number,
      })
    ),
    otherLegalService: PropTypes.string,
  }),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
  isActive: PropTypes.bool,
};

export default JurRechtsgeschaefte;
