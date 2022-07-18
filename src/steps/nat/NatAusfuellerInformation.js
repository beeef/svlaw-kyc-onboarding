import PropTypes from "prop-types";
import React, { Component } from "react";
import { Checkbox, Col, Form, Input, Row } from "antd";
import strings from "../../locale/strings.json";
import { validateEmail, validatePhoneNumber } from "../../util/validation";
import CustomForm from "../../util/CustomForm";

class NatAusfuellerInformation extends Component {
  state = {
    userData: { firstName: "", lastName: "", email: "", phone: "" },
    sameInformationAsPrevious: false,
    allFieldsValid: false,
  };

  validate = () => {
    const { isActive } = this.props;

    if (isActive) {
      const { allFieldsValid } = this.state;
      const { setCurrentStepValid } = this.props;

      setCurrentStepValid(allFieldsValid);
    }
  };

  insertUserData = () => {
    const { userData } = this.state;
    const { formData, onChangeFormData } = this.props;
    const { clientData } = formData;

    if (clientData && clientData.firstName && clientData.lastName) {
      this.setState(
        {
          userData: {
            ...userData,
            firstName: clientData.firstName,
            lastName: clientData.lastName,
            email: clientData.invoiceEmail,
            phone: clientData.phone,
          },
        },
        () => {
          onChangeFormData("userData", this.state.userData);
          this.validate();
        }
      );
    }
  };

  resetUserData = () => {
    const { onChangeFormData } = this.props;
    this.setState(
      {
        userData: { firstName: "", lastName: "", email: "", phone: "" },
      },
      () => {
        onChangeFormData("userData", this.state.userData);
        this.validate();
      }
    );
  };

  render() {
    const { sameInformationAsPrevious, userData } = this.state;
    const { currentLang, formData } = this.props;

    const { clientData } = formData;
    let firstName = null;
    let lastName = null;

    if (clientData) {
      firstName = clientData.firstName;
      lastName = clientData.lastName;
    }

    const onValChange = (key, value) => {
      const { userData } = this.state;
      const { onChangeFormData } = this.props;

      this.setState(
        {
          userData: {
            ...userData,
            [key]: value,
          },
        },
        () => {
          onChangeFormData("userData", this.state.userData);
          this.validate();
        }
      );
    };

    const formItems = [
      {
        name: "firstName",
        required: true,
        label: strings[currentLang].nat.FIRST_NAME,
        onChange: onValChange,
        defaultValue: userData.firstName,
      },
      {
        name: "lastName",
        required: true,
        label: strings[currentLang].nat.LAST_NAME,
        onChange: onValChange,
        defaultValue: userData.lastName,
      },
      {
        name: "email",
        required: true,
        onChange: onValChange,
        label: strings[currentLang].nat.EMAIL_ADDRESS,
        type: "email",
        defaultValue: userData.email,
      },
      {
        name: "phone",
        required: true,
        onChange: onValChange,
        label: strings[currentLang].nat.PHONE_NUMBER,
        type: "phone",
        help: "Please provide the number in the following format: +43 1 23456789",
        defaultValue: userData.phone,
      },
    ];

    return (
      <>
        <h2>{strings[currentLang].nat.STEP_PROVIDE_USER_INFORMATION}</h2>
        <div style={{ margin: "24px 0" }}>
          <Checkbox
            checked={sameInformationAsPrevious}
            onChange={(e) => {
              this.setState(
                { sameInformationAsPrevious: e.target.checked },
                e.target.checked ? this.insertUserData : this.resetUserData
              );
            }}
          >
            I, {firstName} {lastName}, filled out this form by myself.
          </Checkbox>
        </div>
        <CustomForm
          formItems={formItems}
          onValid={() => {
            this.setState({ allFieldsValid: true }, this.validate);
          }}
          onInvalid={() => {
            this.setState({ allFieldsValid: false }, this.validate);
          }}
        />
      </>
    );
  }
}

NatAusfuellerInformation.propTypes = {
  isActive: PropTypes.bool,
  currentLang: PropTypes.any,
  formData: PropTypes.shape({
    clientData: PropTypes.any,
  }),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
};

export default NatAusfuellerInformation;
