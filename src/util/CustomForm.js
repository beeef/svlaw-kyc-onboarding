import React, { Component } from "react";
import { Col, Form, Row } from "antd";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import EmailInput from "./EmailInput";
import VatNumberInput from "./VatNumberInput";
import CountrySelect from "./CountrySelect";
import PhoneNumberInput from "./PhoneNumberInput";
import BirthdayInput from "./BirthdayInput";

class CustomForm extends Component {
  state = { valid: false, stepsValid: [] };

  constructor(props) {
    super(props);
    const { formItems, onValid, onInvalid } = props;

    const requiredItems = formItems.filter((fi) => fi.required === true);

    if (requiredItems.length === 0) {
      this.state.valid = true;
      onValid();
    } else {
      this.state.valid = false;
      onInvalid();
    }

    this.state.stepsValid = formItems.map(
      (fi) => !fi.required || fi.required === false
    );
  }

  setStepValid = (index, valid) => {
    const { stepsValid } = this.state;
    const { onValid, onInvalid } = this.props;

    stepsValid[index] = valid;
    this.setState({ stepsValid }, () => {
      const invalidSteps = stepsValid.filter((s) => s === false);
      if (invalidSteps.length > 0) onInvalid();
      else onValid();
    });
  };

  render() {
    const formLayout = {
      wrapperCol: { xs: 24, xl: 24 },
      labelCol: { xs: 24, xl: 24 },
    };

    const { formItems, currentLang } = this.props;

    return (
      <Form {...formLayout} labelAlign="left">
        <Row gutter={[24, 0]}>
          {formItems.map((fi, index) => {
            const { type } = fi;
            if (!type || type === "text") {
              return (
                <Col xs={24} md={12} key={fi.name}>
                  <TextInput
                    {...fi}
                    onValid={() => {
                      this.setStepValid(index, true);
                    }}
                    onInvalid={() => {
                      this.setStepValid(index, false);
                    }}
                  />
                </Col>
              );
            }

            if (type === "email") {
              return (
                <Col xs={24} md={12} key={fi.name}>
                  <EmailInput
                    {...fi}
                    onValid={() => {
                      this.setStepValid(index, true);
                    }}
                    onInvalid={() => {
                      this.setStepValid(index, false);
                    }}
                  />
                </Col>
              );
            }

            if (type === "phone") {
              return (
                <Col xs={24} md={12} key={fi.name}>
                  <PhoneNumberInput
                    {...fi}
                    onValid={() => {
                      this.setStepValid(index, true);
                    }}
                    onInvalid={() => {
                      this.setStepValid(index, false);
                    }}
                  />
                </Col>
              );
            }

            if (type === "vat") {
              return (
                <Col xs={24} md={12} key={fi.name}>
                  <VatNumberInput
                    {...fi}
                    onValid={() => {
                      this.setStepValid(index, true);
                    }}
                    onInvalid={() => {
                      this.setStepValid(index, false);
                    }}
                  />
                </Col>
              );
            }

            if (type === "country") {
              return (
                <Col xs={24} md={12} key={fi.name}>
                  <CountrySelect
                    currentLang={currentLang}
                    {...fi}
                    onValid={() => {
                      this.setStepValid(index, true);
                    }}
                    onInvalid={() => {
                      this.setStepValid(index, false);
                    }}
                  />
                </Col>
              );
            }

            if (type === "birthday") {
              return (
                <Col xs={24} md={12} key={fi.name}>
                  <BirthdayInput
                    {...fi}
                    onValid={() => {
                      this.setStepValid(index, true);
                    }}
                    onInvalid={() => {
                      this.setStepValid(index, false);
                    }}
                  />
                </Col>
              );
            }
          })}
        </Row>
      </Form>
    );
  }
}

CustomForm.propTypes = {
  currentLang: PropTypes.oneOf(["de", "en"]),
  formItems: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf([
        "text",
        "vat",
        "email",
        "country",
        "birthday",
        "phone",
      ]),
      validationFunc: PropTypes.func,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      help: PropTypes.string,
      onChange: PropTypes.func,
      required: PropTypes.bool,
      hint: PropTypes.string,
    })
  ),
  onValid: PropTypes.func,
  onInvalid: PropTypes.func,
};

export default CustomForm;
