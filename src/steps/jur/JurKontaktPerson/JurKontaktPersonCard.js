import React from "react";
import { Col, Form, Input, Row } from "antd";
import strings from "../../../locale/strings.json";

const JurKontaktPersonCard = ({ currentLang }) => {
  const formLayout = {
    wrapperCol: { xs: 24, xl: 24 },
    labelCol: { xs: 24, xl: 24 },
  };

  return (
    <Form {...formLayout} labelAlign="left">
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12}>
          <Form.Item required label={strings[currentLang].jur.FIRST_NAME}>
            <Input
              placeholder={strings[currentLang].jur.FIRST_NAME}
              onChange={(e) => {
                onValChange("firstName", e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label={strings[currentLang].jur.LAST_NAME} required>
            <Input
              placeholder={strings[currentLang].jur.LAST_NAME}
              onChange={(e) => {
                onValChange("registrationNumber", e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label={strings[currentLang].jur.EMAIL_ADDRESS} required>
            <Input
              placeholder={strings[currentLang].jur.EMAIL_ADDRESS}
              onChange={(e) => {
                onValChange("email", e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label={strings[currentLang].jur.PHONE_NUMBER} required>
            <Input
              placeholder={strings[currentLang].jur.PHONE_NUMBER}
              onChange={(e) => {
                onValChange("phone", e.target.value);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default JurKontaktPersonCard;
