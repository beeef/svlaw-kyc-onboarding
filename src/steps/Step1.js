import React, { Component } from "react";
import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import strings from "../locale/strings.json";
import countries from "i18n-iso-countries";

class Step1 extends Component {
  state = {
    countries: null
  };

  constructor(props) {
    super(props);

    countries.registerLocale(require("i18n-iso-countries/langs/de.json"));
    this.state.countries = countries.getNames("de", { select: "official" });
  }

  render() {
    const { countries } = this.state;
    const { currentLang, gotoPrev, gotoNext } = this.props;

    const formLayout = {
      wrapperCol: { xs: 24, xl: 24 },
      labelCol: { xs: 24, xl: 24 }
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <h2>Bitte auswählen</h2>
        <div>
          <Button onClick={gotoNext}>Natürliche Person</Button>{" "}
          <Button onClick={gotoNext}>Juristische Person</Button>
        </div>
      </div>
    );

    /*
    return (
      <Card
        title={strings[currentLang].nat.STEP1_TITLE}
        className="box-shadow"
        extra={
          <Button type="primary">
            Next <RightOutlined />
          </Button>
        }
        actions={[
          <Button icon={<LeftOutlined />}>Back</Button>,
          <Button type="primary">
            Next <RightOutlined />
          </Button>
        ]}
      >
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
                <DatePicker format="DD.MM.YYYY" allowClear />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.NATIONALITY}>
                <Select
                  placeholder={strings[currentLang].nat.SELECT_COUNTRY}
                  options={Object.keys(countries).map((countryCode) => ({
                    label: countries[countryCode],
                    value: countryCode
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
                    value: countryCode
                  }))}
                  optionFilterProp="label"
                  showSearch
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    );
    */
  }
}

export default Step1;
