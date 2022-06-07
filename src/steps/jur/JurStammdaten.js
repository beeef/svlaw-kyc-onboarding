import React, { Component } from "react";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import strings from "../../locale/strings.json";
import countries from "i18n-iso-countries";
import countriesDE from "i18n-iso-countries/langs/de.json";
import countriesEN from "i18n-iso-countries/langs/en.json";

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
        <h2>{strings[currentLang].jur.STEP_CLIENT_INFORMATION}</h2>
        <Form {...formLayout} labelAlign="left">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.NAME_LEGAL_ENTITY}>
                <Input
                  placeholder={strings[currentLang].jur.NAME_LEGAL_ENTITY}
                  onChange={(e) => {
                    onValChange("nameLegalEntity", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.REGISTRATION_NUMBER}>
                <Input
                  placeholder={strings[currentLang].jur.REGISTRATION_NUMBER}
                  onChange={(e) => {
                    onValChange("registrationNumber", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.BUSINESS_ADDRESS}>
                <Input
                  placeholder={`${strings[currentLang].jur.STREET}, ${strings[currentLang].jur.STREET_NUMBER}`}
                  onChange={(e) => {
                    onValChange("businessAddress", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.POSTAL_CODE}>
                <Input
                  placeholder={strings[currentLang].jur.POSTAL_CODE_SHORT}
                  onChange={(e) => {
                    onValChange("postalCode", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={strings[currentLang].jur.COUNTRY_OF_REGISTRATION}
              >
                <Select
                  placeholder={strings[currentLang].jur.SELECT_COUNTRY}
                  options={Object.keys(countries).map((countryCode) => ({
                    label: countries[countryCode],
                    value: countryCode,
                  }))}
                  optionFilterProp="label"
                  showSearch
                  onChange={(country) => {
                    onValChange("countryOfRegistration", country);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={`${strings[currentLang].jur.VAT_NUMBER} (${strings[currentLang].IF_APPLICABLE})`}
              >
                <Input
                  placeholder={strings[currentLang].jur.VAT_NUMBER}
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

export default JurStammdaten;
