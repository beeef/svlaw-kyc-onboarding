import PropTypes from "prop-types";
import React, { Component } from "react";
import { Col, DatePicker, Form, Input, Popover, Row, Select } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import strings from "../../locale/strings.json";
import countries from "i18n-iso-countries";
import countriesDE from "i18n-iso-countries/langs/de.json";
import countriesEN from "i18n-iso-countries/langs/en.json";
import { validateEmail, validatePhoneNumber } from "../../util/validation";

class NatStammdaten extends Component {
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
    const { setCurrentStepValid } = this.props;
    const { clientData } = this.state;

    if (clientData) {
      if (
        clientData.firstName &&
        clientData.lastName &&
        clientData.dateOfBirth &&
        clientData.nationality &&
        clientData.streetAndNumber &&
        clientData.postalCode &&
        clientData.city &&
        clientData.country &&
        clientData.phoneAreaCode &&
        clientData.phone &&
        validateEmail(clientData.email) &&
        validatePhoneNumber(`+${clientData.phoneAreaCode}${clientData.phone}`)
      ) {
        setCurrentStepValid(true);
        console.log("hier1");
      } else {
        console.log("hier2");
        setCurrentStepValid(false);
      }
    } else {
      console.log("hier3");
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

    return (
      <>
        <h2>{strings[currentLang].nat.STEP_CLIENT_INFORMATION}</h2>
        <Form {...formLayout} labelAlign="left">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.FIRST_NAME} required>
                <Input
                  placeholder={strings[currentLang].nat.FIRST_NAME}
                  onChange={(e) => {
                    onValChange("firstName", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.LAST_NAME} required>
                <Input
                  placeholder={strings[currentLang].nat.LAST_NAME}
                  onChange={(e) => {
                    onValChange("lastName", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={strings[currentLang].nat.DATE_OF_BIRTH}
                required
              >
                <DatePicker
                  format="DD.MM.YYYY"
                  allowClear
                  style={{ width: "100%" }}
                  onChange={(date) => {
                    onValChange("dateOfBirth", date.format("YYYY-MM-DD"));
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.NATIONALITY} required>
                <Select
                  placeholder={strings[currentLang].nat.SELECT_COUNTRY}
                  options={Object.keys(countries).map((countryCode) => ({
                    label: countries[countryCode],
                    value: countryCode,
                  }))}
                  optionFilterProp="label"
                  showSearch
                  onChange={(country) => {
                    onValChange("nationality", country);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.STREET} required>
                <Input
                  placeholder={strings[currentLang].nat.STREET}
                  onChange={(e) => {
                    onValChange("streetAndNumber", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.POSTAL_CODE} required>
                <Input
                  placeholder={strings[currentLang].nat.POSTAL_CODE_SHORT}
                  onChange={(e) => {
                    onValChange("postalCode", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.CITY} required>
                <Input
                  placeholder={strings[currentLang].nat.CITY}
                  onChange={(e) => {
                    onValChange("city", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.COUNTRY} required>
                <Select
                  placeholder={strings[currentLang].nat.SELECT_COUNTRY}
                  options={Object.keys(countries).map((countryCode) => ({
                    label: countries[countryCode],
                    value: countryCode,
                  }))}
                  optionFilterProp="label"
                  showSearch
                  onChange={(country) => {
                    onValChange("country", country);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={strings[currentLang].nat.EMAIL_ADDRESS}
                required
                help={
                  <span style={{ fontSize: "0.75rem" }}>
                    This email address is used by us to submit invoices.
                  </span>
                }
              >
                <Input
                  status={
                    clientData &&
                    clientData.email &&
                    !validateEmail(clientData.email)
                      ? "error"
                      : null
                  }
                  placeholder={strings[currentLang].nat.EMAIL_ADDRESS}
                  onChange={(e) => {
                    onValChange("email", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={strings[currentLang].nat.PHONE_NUMBER}
                required
                help="Please provide the number in the following format: +43 1 23456789"
              >
                <Input.Group compact>
                  <Input
                    onChange={(e) => {
                      onValChange("phoneAreaCode", e.target.value);
                    }}
                    placeholder="43"
                    prefix="+"
                    style={{ width: "28%" }}
                  />
                  <Input
                    onChange={(e) => {
                      onValChange("phone", e.target.value);
                    }}
                    placeholder="12345"
                    style={{ width: "72%" }}
                  />
                </Input.Group>
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={
                  <>
                    {strings[currentLang].nat.VAT_NUMBER}
                    <Popover
                      content={
                        <p style={{ width: "300px" }}>
                          VAT ID is an identification number issued by a tax
                          authority to a person who is an entrepreneur invoicing
                          value added tax.
                        </p>
                      }
                    >
                      <QuestionCircleOutlined style={{ marginLeft: "4px" }} />
                    </Popover>
                  </>
                }
              >
                <Input
                  placeholder={strings[currentLang].nat.VAT_NUMBER}
                  onChange={(e) => {
                    onValChange("vatNumber", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

NatStammdaten.propTypes = {
  currentLang: PropTypes.oneOf(["de", "en"]),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
};

export default NatStammdaten;
