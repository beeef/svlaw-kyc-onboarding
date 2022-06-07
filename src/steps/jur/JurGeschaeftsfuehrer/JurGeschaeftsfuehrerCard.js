import React, { Component } from "react";
import { Button, Card, Col, Form, Input, Row } from "antd";
import countries from "i18n-iso-countries";
import countriesDE from "i18n-iso-countries/langs/de.json";
import countriesEN from "i18n-iso-countries/langs/en.json";
import strings from "../../../locale/strings.json";

class JurGeschaeftsfuehrerCard extends Component {
  state = {};
  render() {
    const { currentLang, style } = this.props;

    return (
      <Card size="small" style={style}>
        <Form wrapperCol={{ span: 24 }} labelCol={{ span: 24 }}>
          <Row gutter={[24, 24]}>
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
          </Row>
        </Form>

        <Button size="small" type="link" danger>
          Remove
        </Button>
      </Card>
    );
  }
}

export default JurGeschaeftsfuehrerCard;
