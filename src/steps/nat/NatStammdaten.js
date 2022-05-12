import React, { Component } from "react";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import strings from "../../locale/strings.json";
import countries from "i18n-iso-countries";

class NatStammdaten extends Component {
  state = { countries: null, clientData: {} };

  constructor(props) {
    super(props);

    const { currentLang } = props;

    countries.registerLocale(
      require(`i18n-iso-countries/langs/${currentLang}.json`)
    );
    this.state.countries = countries.getNames(currentLang, {
      select: "official",
    });
  }

  validate = () => {};

  render() {
    const { countries } = this.state;
    const { currentLang, onChangeFormData } = this.props;

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
        }
      );
    };

    return (
      <>
        <h2>{strings[currentLang].nat.STEP_CLIENT_INFORMATION}</h2>
        <Form {...formLayout} labelAlign="left">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.FIRST_NAME}>
                <Input
                  placeholder={strings[currentLang].nat.FIRST_NAME}
                  onChange={(e) => {
                    onValChange("firstName", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.LAST_NAME}>
                <Input
                  placeholder={strings[currentLang].nat.LAST_NAME}
                  onChange={(e) => {
                    onValChange("lastName", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.DATE_OF_BIRTH}>
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
              <Form.Item label={strings[currentLang].nat.NATIONALITY}>
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
              <Form.Item
                label={`${strings[currentLang].nat.STREET}, ${strings[currentLang].nat.STREET_NUMBER}`}
              >
                <Input
                  placeholder={`${strings[currentLang].nat.STREET}, ${strings[currentLang].nat.STREET_NUMBER}`}
                  onChange={(e) => {
                    onValChange("streetAndNumber", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.POSTAL_CODE}>
                <Input
                  placeholder={strings[currentLang].nat.POSTAL_CODE_SHORT}
                  onChange={(e) => {
                    onValChange("postalCode", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.CITY}>
                <Input
                  placeholder={strings[currentLang].nat.CITY}
                  onChange={(e) => {
                    onValChange("city", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.COUNTRY}>
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
              <Form.Item label={strings[currentLang].nat.VAT_NUMBER}>
                <Input
                  placeholder={strings[currentLang].nat.VAT_NUMBER}
                  onChange={(e) => {
                    onValChange("vatNumber", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.EMAIL_ADDRESS}>
                <Input
                  placeholder={strings[currentLang].nat.EMAIL_ADDRESS}
                  onChange={(e) => {
                    onValChange("email", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.PHONE_NUMBER}>
                <Input
                  onChange={(e) => {
                    onValChange("phone", e.target.value);
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

export default NatStammdaten;
