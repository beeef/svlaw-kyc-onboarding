import React, { Component } from "react";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import strings from "../../locale/strings.json";
import countries from "i18n-iso-countries";

class JurStammdaten extends Component {
  state = { countries: null, selectedType: null };

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
    const { currentLang } = this.props;

    const formLayout = {
      wrapperCol: { xs: 24, xl: 24 },
      labelCol: { xs: 24, xl: 24 },
    };

    return (
      <>
        <h2>{strings[currentLang].jur.STEP1_TITLE}</h2>
        <Form {...formLayout} labelAlign="left">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.FIRST_NAME}>
                <Input placeholder={strings[currentLang].jur.FIRST_NAME} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.LAST_NAME}>
                <Input placeholder={strings[currentLang].jur.LAST_NAME} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.DATE_OF_BIRTH}>
                <DatePicker
                  format="DD.MM.YYYY"
                  allowClear
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.NATIONALITY}>
                <Select
                  placeholder={strings[currentLang].jur.SELECT_COUNTRY}
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
                label={`${strings[currentLang].jur.STREET}, ${strings[currentLang].jur.STREET_NUMBER}`}
              >
                <Input
                  placeholder={`${strings[currentLang].jur.STREET}, ${strings[currentLang].jur.STREET_NUMBER}`}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.POSTAL_CODE}>
                <Input
                  placeholder={strings[currentLang].jur.POSTAL_CODE_SHORT}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.CITY}>
                <Input placeholder={strings[currentLang].jur.CITY} />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.COUNTRY}>
                <Select
                  placeholder={strings[currentLang].jur.SELECT_COUNTRY}
                  options={Object.keys(countries).map((countryCode) => ({
                    label: countries[countryCode],
                    value: countryCode,
                  }))}
                  optionFilterProp="label"
                  showSearch
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
