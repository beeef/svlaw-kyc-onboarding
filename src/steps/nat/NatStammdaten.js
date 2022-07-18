import PropTypes from "prop-types";
import React, { Component } from "react";
import strings from "../../locale/strings.json";
import CustomForm from "../../util/CustomForm";

class NatStammdaten extends Component {
  state = { countries: null, clientData: {}, allFieldsValid: false };

  validate = () => {
    const { isActive } = this.props;

    if (isActive) {
      const { setCurrentStepValid } = this.props;
      const { allFieldsValid } = this.state;

      setCurrentStepValid(allFieldsValid);
    }
  };

  render() {
    const { clientData } = this.state;
    const { currentLang } = this.props;

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
          this.validate();
        }
      );
    };

    const formItems = [
      {
        name: "firstName",
        required: true,
        label: strings[currentLang].nat.FIRST_NAME,
        hint: "Please state the name exactly as it appears in a current companies register excerpt.",
        onChange: onValChange,
      },
      {
        name: "lastName",
        required: true,
        label: strings[currentLang].nat.LAST_NAME,
        maxLength: 24,
        onChange: onValChange,
      },
      {
        name: "dateOfBirth",
        required: true,
        onChange: onValChange,
        label: strings[currentLang].nat.DATE_OF_BIRTH,
        type: "birthday",
      },
      {
        name: "nationality",
        required: true,
        onChange: onValChange,
        label: strings[currentLang].nat.NATIONALITY,
        type: "country",
      },
      {
        name: "street",
        required: true,
        onChange: onValChange,
        label: `${strings[currentLang].nat.STREET}`,
        validationFunc: (val) => {
          const x = val.trim();
          return x.indexOf(" ") > 0;
        },
        errorMsg: "The address must contain a street name and a number.",
      },
      {
        name: "postalCode",
        required: true,
        label: strings[currentLang].nat.POSTAL_CODE,
        onChange: onValChange,
      },
      {
        name: "city",
        required: true,
        label: strings[currentLang].nat.CITY,
        onChange: onValChange,
        validationFunc: (val) => /^[a-zA-Z ]+$/.test(val),
        errorMsg: "Only letters are allowed.",
      },
      {
        name: "country",
        required: true,
        label: strings[currentLang].nat.COUNTRY,
        onChange: onValChange,
        type: "country",
      },
      {
        name: "invoiceEmail",
        required: true,
        label: strings[currentLang].nat.EMAIL_ADDRESS,
        onChange: onValChange,
        type: "email",
        help: "This email address is used by us to submit invoices.",
        hint: "Please provide an email address that can be used by us for billing purposes only. You can enter your personal email address at a later stage.",
      },
      {
        name: "phone",
        required: true,
        label: strings[currentLang].nat.PHONE_NUMBER,
        type: "phone",
        onChange: onValChange,
      },
      {
        name: "vatNumber",
        label: strings[currentLang].nat.VAT_NUMBER,
        onChange: onValChange,
        type: "vat",
        countryCode: (clientData && clientData.country) || null,
      },
    ];

    return (
      <>
        <h2>{strings[currentLang].nat.STEP_CLIENT_INFORMATION}</h2>
        <CustomForm
          currentLang={currentLang}
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

NatStammdaten.propTypes = {
  isActive: PropTypes.bool,
  currentLang: PropTypes.oneOf(["de", "en"]),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
};

export default NatStammdaten;
