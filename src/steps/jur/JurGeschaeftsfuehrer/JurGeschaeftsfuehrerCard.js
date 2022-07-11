import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd";
import countries from "i18n-iso-countries";
import countriesDE from "i18n-iso-countries/langs/de.json";
import countriesEN from "i18n-iso-countries/langs/en.json";
import strings from "../../../locale/strings.json";
import { validateEmail, validatePhoneNumber } from "../../../util/validation";

class JurGeschaeftsfuehrerCard extends Component {
  state = {};

  constructor(props) {
    super(props);

    const { currentLang } = props;

    countries.registerLocale(currentLang === "de" ? countriesDE : countriesEN);
    this.state.countries = countries.getNames(currentLang, {
      select: "official",
    });
  }

  validate = () => {
    const { managingDirectorData, onValidated } = this.props;

    const {
      firstName,
      lastName,
      dateOfBirth,
      nationality,
      street,
      zip,
      city,
      country,
      email,
      phoneAreaCode,
      phone,
      powerOfRepresentation,
    } = managingDirectorData;

    if (
      firstName &&
      lastName &&
      dateOfBirth &&
      nationality &&
      street &&
      zip &&
      city &&
      country &&
      email &&
      phoneAreaCode &&
      phone &&
      powerOfRepresentation &&
      validateEmail(email) &&
      validatePhoneNumber(`+${phoneAreaCode}${phone}`)
    ) {
      onValidated(true);
    } else {
      onValidated(false);
    }
  };

  componentDidMount = () => {
    const { onChangeManagingDirectorData } = this.props;
    onChangeManagingDirectorData("powerOfRepresentation", "sole");
  };

  render() {
    const { countries } = this.state;
    const { currentLang, onChangeManagingDirectorData, managingDirectorData } =
      this.props;

    const formLayout = {
      wrapperCol: { xs: 24, xl: 24 },
      labelCol: { xs: 24, xl: 24 },
    };

    return (
      <>
        <Form {...formLayout}>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.FIRST_NAME} required>
                <Input
                  placeholder={strings[currentLang].jur.FIRST_NAME}
                  onBlur={(e) => {
                    onChangeManagingDirectorData("firstName", e.target.value);
                    this.validate();
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.LAST_NAME} required>
                <Input
                  placeholder={strings[currentLang].jur.LAST_NAME}
                  onBlur={(e) => {
                    onChangeManagingDirectorData("lastName", e.target.value);
                    this.validate();
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={strings[currentLang].jur.DATE_OF_BIRTH}
                required
              >
                <DatePicker
                  format="DD.MM.YYYY"
                  allowClear
                  style={{ width: "100%" }}
                  onChange={(date) => {
                    onChangeManagingDirectorData(
                      "dateOfBirth",
                      date.format("YYYY-MM-DD")
                    );
                    this.validate();
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.NATIONALITY} required>
                <Select
                  placeholder={strings[currentLang].jur.SELECT_COUNTRY}
                  options={Object.keys(countries).map((countryCode) => ({
                    label: countries[countryCode],
                    value: countryCode,
                  }))}
                  optionFilterProp="label"
                  showSearch
                  onChange={(country) => {
                    onChangeManagingDirectorData("nationality", country);
                    this.validate();
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={strings[currentLang].jur.RESIDENTIAL_ADDRESS}
                required
              >
                <Input
                  placeholder={`${strings[currentLang].jur.STREET}, ${strings[currentLang].jur.STREET_NUMBER}`}
                  onBlur={(e) => {
                    onChangeManagingDirectorData("street", e.target.value);
                    this.validate();
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.POSTAL_CODE} required>
                <Input
                  placeholder={strings[currentLang].jur.POSTAL_CODE_SHORT}
                  onBlur={(e) => {
                    onChangeManagingDirectorData("zip", e.target.value);
                    this.validate();
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.CITY} required>
                <Input
                  placeholder={strings[currentLang].jur.CITY}
                  onBlur={(e) => {
                    onChangeManagingDirectorData("city", e.target.value);
                    this.validate();
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.COUNTRY} required>
                <Select
                  placeholder={strings[currentLang].jur.SELECT_COUNTRY}
                  options={Object.keys(countries).map((countryCode) => ({
                    label: countries[countryCode],
                    value: countryCode,
                  }))}
                  optionFilterProp="label"
                  showSearch
                  onChange={(country) => {
                    onChangeManagingDirectorData("country", country);
                    this.validate();
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={strings[currentLang].jur.EMAIL_ADDRESS}
                required
              >
                <Input
                  placeholder={strings[currentLang].jur.EMAIL_ADDRESS}
                  onBlur={(e) => {
                    onChangeManagingDirectorData("email", e.target.value);
                    this.validate();
                  }}
                  status={
                    managingDirectorData &&
                    managingDirectorData.email &&
                    !validateEmail(managingDirectorData.email)
                      ? "error"
                      : null
                  }
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
                      onChangeManagingDirectorData(
                        "phoneAreaCode",
                        e.target.value
                      );
                      this.validate();
                    }}
                    placeholder="43"
                    prefix="+"
                    style={{ width: "28%" }}
                  />
                  <Input
                    onChange={(e) => {
                      onChangeManagingDirectorData("phone", e.target.value);
                      this.validate();
                    }}
                    placeholder="12345"
                    style={{ width: "72%" }}
                  />
                </Input.Group>
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item
                label={strings[currentLang].jur.POWER_OF_REPRESENTATION}
                help={strings[currentLang].jur.POWER_OF_REPRESENTATION_HELP}
                required
              >
                <Select
                  placeholder={strings[currentLang].PLEASE_CHOOSE}
                  defaultValue="sole"
                  options={[
                    { label: "Sole", value: "sole" },
                    {
                      label: "Jointly with one other authorized person",
                      value: "jointly",
                    },
                  ]}
                  onChange={(val) => {
                    onChangeManagingDirectorData("powerOfRepresentation", val);
                    this.validate();
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

JurGeschaeftsfuehrerCard.propTypes = {
  currentLang: PropTypes.string,
  managingDirectorData: PropTypes.shape({
    city: PropTypes.any,
    country: PropTypes.any,
    dateOfBirth: PropTypes.any,
    email: PropTypes.any,
    firstName: PropTypes.any,
    lastName: PropTypes.any,
    nationality: PropTypes.any,
    phone: PropTypes.any,
    phoneAreaCode: PropTypes.any,
    powerOfRepresentation: PropTypes.any,
    street: PropTypes.any,
    zip: PropTypes.any,
  }),
  onChangeManagingDirectorData: PropTypes.func,
  onValidated: PropTypes.func,
};

export default JurGeschaeftsfuehrerCard;
