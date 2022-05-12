import React, { Component } from "react";
import {
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
  Space,
} from "antd";
import countries from "i18n-iso-countries";
import countriesDE from "i18n-iso-countries/langs/de.json";
import countriesEN from "i18n-iso-countries/langs/en.json";
import strings from "../../locale/strings.json";

class NatFuerWenLeistungen extends Component {
  state = { selectedAnswer: null, countries: [], taxastionInAustra: null };

  constructor(props) {
    super(props);

    const { currentLang } = props;

    countries.registerLocale(currentLang === "de" ? countriesDE : countriesEN);
    this.state.countries = countries.getNames(currentLang, {
      select: "official",
    });
  }

  render() {
    const { selectedAnswer, countries, taxastionInAustra } = this.state;
    const { currentLang } = this.props;

    const formLayout = {
      wrapperCol: { xs: 24, xl: 24 },
      labelCol: { xs: 24, xl: 24 },
    };

    return (
      <>
        <h2>
          {strings[currentLang].nat.LEGAL_SERVICES_FOR_CLIENT_OR_SOMEONE_ELSE}
        </h2>
        <Radio.Group
          value={selectedAnswer}
          onChange={(e) => this.setState({ selectedAnswer: e.target.value })}
        >
          <Radio value={strings[currentLang].nat.CLIENT}>
            {strings[currentLang].nat.CLIENT}
          </Radio>
          <Radio value={strings[currentLang].nat.SOMEONE_ELSE}>
            {strings[currentLang].nat.SOMEONE_ELSE}
          </Radio>
        </Radio.Group>
        {selectedAnswer === strings[currentLang].nat.SOMEONE_ELSE && (
          <>
            <h3 style={{ marginTop: "24px" }}>
              {
                strings[currentLang].nat
                  .LEGAL_SERVICES_FOR_SOMEONE_ELSE_INFORMATION
              }
            </h3>
            <Form {...formLayout}>
              <Row gutter={[24, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={strings[currentLang].nat.FIRST_AND_LAST_NAME}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label={strings[currentLang].nat.DATE_OF_BIRTH}>
                    <DatePicker
                      format="D.M.YYYY"
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
                  <Form.Item label={strings[currentLang].nat.STREET}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label={strings[currentLang].nat.STREET_NUMBER}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  {" "}
                  <Form.Item label={strings[currentLang].nat.POSTAL_CODE}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label={strings[currentLang].nat.CITY}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label={strings[currentLang].nat.COUNTRY}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label={strings[currentLang].nat.EMAIL_ADDRESS}>
                    <Input />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item label={strings[currentLang].nat.PHONE_NUMBER}>
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form>

            <h2 style={{ marginTop: "24px" }}>
              {strings[currentLang].nat.STEP_CLIENT_SUBJECT_TO_TAXATION}
            </h2>
            <Space direction="horizontal" size="large">
              <Radio.Group
                onChange={(e) => {
                  this.setState({ taxastionInAustra: e.target.value });
                }}
                value={taxastionInAustra}
              >
                <Space direction="vertical">
                  <Radio value="1">{strings[currentLang].YES}</Radio>
                  <Radio value="0">{strings[currentLang].NO}</Radio>
                </Space>
              </Radio.Group>

              {taxastionInAustra && taxastionInAustra === "0" && (
                <div>
                  <h3>
                    {strings[currentLang].nat.STEP_SELECT_COUNTRY_FOR_TAXATION}
                  </h3>
                  <Select
                    placeholder={strings[currentLang].nat.SELECT_COUNTRY}
                    options={Object.keys(countries).map((countryCode) => ({
                      label: countries[countryCode],
                      value: countryCode,
                    }))}
                    optionFilterProp="label"
                    showSearch
                    style={{ width: "100%" }}
                  />
                </div>
              )}
            </Space>
          </>
        )}
      </>
    );
  }
}

export default NatFuerWenLeistungen;
