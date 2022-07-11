import PropTypes from "prop-types";
import React, { Component } from "react";
import { Col, Form, Input, Row, Select } from "antd";
import strings from "../../locale/strings.json";
import countries from "i18n-iso-countries";
import countriesDE from "i18n-iso-countries/langs/de.json";
import countriesEN from "i18n-iso-countries/langs/en.json";
import { validateEmail } from "../../util/validation";
import VatNumberInput from "../../util/VatNumberInput";
import EmailInput from "../../util/EmailInput";
import TextInput from "../../util/TextInput";
import CustomForm from "../../util/CustomForm";

class JurStammdaten extends Component {
  state = { countries: null, clientData: {} };

  constructor(props) {
    super(props);

    const { currentLang } = props;

    countries.registerLocale(currentLang === "de" ? countriesDE : countriesEN);
    this.state.countries = countries.getNames(currentLang, {
      select: "official",
    });
  }

  validate = () => {
    const { clientData } = this.state;
    const { setCurrentStepValid } = this.props;

    const {
      nameLegalEntity,
      registrationNumber,
      businessAddress,
      city,
      postalCode,
      countryOfRegistration,
      email,
    } = clientData;

    if (
      nameLegalEntity &&
      registrationNumber &&
      businessAddress &&
      city &&
      postalCode &&
      countryOfRegistration &&
      email &&
      validateEmail(email)
    ) {
      setCurrentStepValid(true);
    } else {
      setCurrentStepValid(false);
    }
  };

  render() {
    const { countries, clientData } = this.state;
    const { currentLang } = this.props;

    const formLayout = {
      wrapperCol: { xs: 24, xl: 24 },
      labelCol: { xs: 24, xl: 24 },
    };

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
        name: "nameLegalEntity",
        required: true,
        label: "asdf",
        hint: "asdfasdfasd",
        onChange: onValChange,
        type: "text",
      },
    ];

    return (
      <>
        <CustomForm formItems={formItems} />
        <h2>{strings[currentLang].jur.STEP_CLIENT_INFORMATION}</h2>
        <Form {...formLayout} labelAlign="left">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <TextInput
                required
                label={strings[currentLang].jur.NAME_LEGAL_ENTITY}
                hint="Please state the name exactly as it appears in a
                          current companies register excerpt."
                name="nameLegalEntity"
                onChange={onValChange}
              />
            </Col>
            <Col xs={24} md={12}>
              <TextInput
                required
                label={strings[currentLang].jur.REGISTRATION_NUMBER}
                name="registrationNumber"
                maxLength={24}
                onChange={onValChange}
              />
            </Col>
            <Col xs={24} md={12}>
              <TextInput
                label={strings[currentLang].jur.BUSINESS_ADDRESS}
                required
                name="businessAddress"
                onChange={onValChange}
              />
            </Col>
            <Col xs={24} md={12}>
              <TextInput
                label={strings[currentLang].jur.CITY}
                required
                name="city"
                onChange={onValChange}
                validationFunc={(val) => /^[a-zA-Z ]+$/.test(val)}
                errorMsg="Only letters are allowed."
              />
            </Col>
            <Col xs={24} md={12}>
              <TextInput
                label={strings[currentLang].jur.POSTAL_CODE}
                required
                name="postalCode"
                onChange={onValChange}
              />
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={strings[currentLang].jur.COUNTRY_OF_REGISTRATION}
                required
              >
                <Select
                  placeholder={strings[currentLang].jur.SELECT_COUNTRY}
                  options={Object.keys(countries).map((countryCode) => ({
                    label: countries[countryCode],
                    value: countryCode,
                  }))}
                  optionFilterProp="label"
                  onChange={(country) => {
                    onValChange("countryOfRegistration", country);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <EmailInput
                label={strings[currentLang].nat.EMAIL_ADDRESS}
                required
                help="This email address is used by us to submit invoices."
                hint="Please provide an email address that can be used by us
                          for billing purposes only. You can enter your personal
                          email address at a later stage."
                name="email"
                onChange={onValChange}
              />
            </Col>
            <Col xs={24} md={12}>
              <VatNumberInput
                countryCode={clientData.countryOfRegistration}
                label={`${strings[currentLang].jur.VAT_NUMBER}`}
                name="vatNumber"
                onChange={onValChange}
              />
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

JurStammdaten.propTypes = {
  currentLang: PropTypes.oneOf(["de", "en"]),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
};

export default JurStammdaten;
