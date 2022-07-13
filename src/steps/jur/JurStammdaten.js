import PropTypes from "prop-types";
import React, { Component } from "react";
import strings from "../../locale/strings.json";
import { validateEmail } from "../../util/validation";
import CustomForm from "../../util/CustomForm";

class JurStammdaten extends Component {
  state = {};

  render() {
    const { currentLang, setCurrentStepValid } = this.props;

    const onValChange = (key, value) => {
      const { clientData } = this.state;
      const { onChangeFormData } = this.props;

      this.setState(
        {
          clientData: {
            ...clientData,
            [key]: value,
          },
        },
        () => {
          onChangeFormData("clientData", this.state.clientData);
        }
      );
    };

    const formItems = [
      {
        name: "nameLegalEntity",
        required: true,
        label: strings[currentLang].jur.NAME_LEGAL_ENTITY,
        hint: "Please state the name exactly as it appears in a current companies register excerpt.",
        onChange: onValChange,
      },
      {
        name: "registrationNumber",
        required: true,
        label: strings[currentLang].jur.REGISTRATION_NUMBER,
        maxLength: 24,
        onChange: onValChange,
      },
      {
        name: "businessAddress",
        required: true,
        label: strings[currentLang].jur.BUSINESS_ADDRESS,
        onChange: onValChange,
        validationFunc: (val) => {
          const x = val.trim();
          return x.indexOf(" ") > 0;
        },
        errorMsg: "The address must contain a street name and a number.",
      },
      {
        name: "city",
        required: true,
        label: strings[currentLang].jur.CITY,
        onChange: onValChange,
        validationFunc: (val) => /^[a-zA-Z ]+$/.test(val),
        errorMsg: "Only letters are allowed.",
      },
      {
        name: "postalCode",
        required: true,
        label: strings[currentLang].jur.POSTAL_CODE,
        onChange: onValChange,
      },
      {
        name: "countryOfRegistration",
        required: true,
        label: strings[currentLang].jur.COUNTRY_OF_REGISTRATION,
        onChange: onValChange,
        type: "country",
      },
      {
        name: "invoiceEmail",
        required: true,
        label: strings[currentLang].jur.EMAIL_ADDRESS,
        onChange: onValChange,
        type: "email",
        help: "This email address is used by us to submit invoices.",
        hint: "Please provide an email address that can be used by us for billing purposes only. You can enter your personal email address at a later stage.",
      },
      {
        name: "vatNumber",
        label: strings[currentLang].jur.VAT_NUMBER,
        onChange: onValChange,
      },
    ];

    return (
      <>
        <h2>{strings[currentLang].jur.STEP_CLIENT_INFORMATION}</h2>
        <CustomForm
          formItems={formItems}
          currentLang={currentLang}
          onValid={() => {
            setCurrentStepValid(true);
          }}
          onInvalid={() => {
            setCurrentStepValid(false);
          }}
        />
      </>
    );
  }
}

JurStammdaten.propTypes = {
  currentLang: PropTypes.oneOf(["de", "en"]),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
  setCurrentStepInvalid: PropTypes.func,
};

export default JurStammdaten;
