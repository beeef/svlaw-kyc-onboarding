import React, { Component } from "react";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import strings from "../../locale/strings.json";
import countries from "i18n-iso-countries";

class NatStammdaten extends Component {
  state = { countries: null };

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

    return (
      <>
        <h2>{strings[currentLang].nat.STEP_CLIENT_INFORMATION}</h2>
        <Form {...formLayout} labelAlign="left">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.FIRST_NAME}>
                <Input placeholder={strings[currentLang].nat.FIRST_NAME} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.LAST_NAME}>
                <Input placeholder={strings[currentLang].nat.LAST_NAME} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.DATE_OF_BIRTH}>
                <DatePicker
                  format="DD.MM.YYYY"
                  allowClear
                  style={{ width: "100%" }}
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
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={`${strings[currentLang].nat.STREET}, ${strings[currentLang].nat.STREET_NUMBER}`}
              >
                <Input
                  placeholder={`${strings[currentLang].nat.STREET}, ${strings[currentLang].nat.STREET_NUMBER}`}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.POSTAL_CODE}>
                <Input
                  placeholder={strings[currentLang].nat.POSTAL_CODE_SHORT}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.CITY}>
                <Input placeholder={strings[currentLang].nat.CITY} />
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
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.VAT_NUMBER}>
                <Input placeholder={strings[currentLang].nat.VAT_NUMBER} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.EMAIL_ADDRESS}>
                <Input placeholder={strings[currentLang].nat.EMAIL_ADDRESS} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

export default NatStammdaten;
