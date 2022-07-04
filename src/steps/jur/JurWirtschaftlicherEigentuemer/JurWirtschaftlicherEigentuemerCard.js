import React, { Component } from "react";
import { Col, DatePicker, Form, Input, Row, Select } from "antd";
import countries from "i18n-iso-countries";
import countriesDE from "i18n-iso-countries/langs/de.json";
import countriesEN from "i18n-iso-countries/langs/en.json";
import strings from "../../../locale/strings.json";

class JurWirtschaftlicherEigentuemerCard extends Component {
  state = {};

  constructor(props) {
    super(props);

    const { currentLang } = props;

    countries.registerLocale(currentLang === "de" ? countriesDE : countriesEN);
    this.state.countries = countries.getNames(currentLang, {
      select: "official",
    });
  }

  render() {
    const { countries } = this.state;
    const { currentLang, onChangeBeneficialOwnerData, style } = this.props;

    const formLayout = {
      wrapperCol: { xs: 24, xl: 24 },
      labelCol: { xs: 24, xl: 24 },
    };

    return (
      <>
        <Form {...formLayout}>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.FIRST_NAME}>
                <Input
                  placeholder={strings[currentLang].jur.FIRST_NAME}
                  onBlur={(e) => {
                    onChangeBeneficialOwnerData("firstName", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.LAST_NAME}>
                <Input
                  placeholder={strings[currentLang].jur.LAST_NAME}
                  onBlur={(e) => {
                    onChangeBeneficialOwnerData("lastName", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.DATE_OF_BIRTH}>
                <DatePicker
                  format="DD.MM.YYYY"
                  allowClear
                  style={{ width: "100%" }}
                  onChange={(date) => {
                    onChangeBeneficialOwnerData(
                      "dateOfBirth",
                      date.format("YYYY-MM-DD")
                    );
                  }}
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
                  onChange={(country) => {
                    onChangeBeneficialOwnerData("nationality", country);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.RESIDENTIAL_ADDRESS}>
                <Input
                  placeholder={`${strings[currentLang].jur.STREET}, ${strings[currentLang].jur.STREET_NUMBER}`}
                  onBlur={(e) => {
                    onChangeBeneficialOwnerData("street", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.POSTAL_CODE}>
                <Input
                  placeholder={strings[currentLang].jur.POSTAL_CODE_SHORT}
                  onBlur={(e) => {
                    onChangeBeneficialOwnerData("zip", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.CITY}>
                <Input
                  placeholder={strings[currentLang].jur.CITY}
                  onBlur={(e) => {
                    onChangeBeneficialOwnerData("city", e.target.value);
                  }}
                />
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
                  onChange={(country) => {
                    onChangeBeneficialOwnerData("country", country);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.EMAIL_ADDRESS}>
                <Input
                  placeholder={strings[currentLang].jur.EMAIL_ADDRESS}
                  onBlur={(e) => {
                    onChangeBeneficialOwnerData("email", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].jur.PHONE_NUMBER}>
                <Input
                  placeholder={strings[currentLang].jur.PHONE_NUMBER}
                  onBlur={(e) => {
                    onChangeBeneficialOwnerData("phone", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={24}>
              <Form.Item
                label={strings[currentLang].jur.POWER_OF_REPRESENTATION}
                help={strings[currentLang].jur.POWER_OF_REPRESENTATION_HELP}
              >
                <Select
                  placeholder={strings[currentLang].PLEASE_CHOOSE}
                  options={[
                    { label: "None", value: "none" },
                    { label: "Sole", value: "sole" },
                    {
                      label: "Jointly with one other authorized person",
                      value: "jointly",
                    },
                  ]}
                  onChange={(val) => {
                    onChangeBeneficialOwnerData(
                      "powerOfRepresentation",
                      e.target.value
                    );
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

export default JurWirtschaftlicherEigentuemerCard;