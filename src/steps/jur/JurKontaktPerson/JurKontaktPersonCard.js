import React from "react";
import { Button, Col, Form, Input, Row } from "antd";
import strings from "../../../locale/strings.json";
import { DeleteOutlined } from "@ant-design/icons";

const JurKontaktPersonCard = ({ currentLang, onRemove, onChange }) => {
  const formLayout = {
    wrapperCol: { xs: 24, xl: 24 },
    labelCol: { xs: 24, xl: 24 },
  };

  return (
    <Form {...formLayout} labelAlign="left">
      <Row justify="end">
        <Button
          type="link"
          size="small"
          icon={<DeleteOutlined />}
          danger
          onClick={onRemove}
        >
          {strings[currentLang].REMOVE}
        </Button>
      </Row>
      <Row gutter={[24, 0]}>
        <Col xs={24} md={12}>
          <Form.Item required label={strings[currentLang].jur.FIRST_NAME}>
            <Input
              placeholder={strings[currentLang].jur.FIRST_NAME}
              onBlur={(e) => {
                onChange("firstName", e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label={strings[currentLang].jur.LAST_NAME} required>
            <Input
              placeholder={strings[currentLang].jur.LAST_NAME}
              onBlur={(e) => {
                onChange("lastName", e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label={strings[currentLang].jur.EMAIL_ADDRESS} required>
            <Input
              placeholder={strings[currentLang].jur.EMAIL_ADDRESS}
              onBlur={(e) => {
                onChange("email", e.target.value);
              }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label={strings[currentLang].jur.PHONE_NUMBER} required>
            <Input
              placeholder={strings[currentLang].jur.PHONE_NUMBER}
              onBlur={(e) => {
                onChange("phone", e.target.value);
              }}
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default JurKontaktPersonCard;
