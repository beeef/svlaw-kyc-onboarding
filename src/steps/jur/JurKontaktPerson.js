import React, { Component } from "react";
import { Checkbox, Col, Form, Input, Popover, Radio, Row, Select } from "antd";
import strings from "../../locale/strings.json";
import { QuestionCircleOutlined } from "@ant-design/icons";

class JurKontaktperson extends Component {
  state = { countries: null, clientData: {} };

  validate = () => {};

  render() {
    const { currentLang, formData } = this.props;

    let managingDirectors = [];
    let beneficialOwners = [];

    if (formData.managingDirectors)
      managingDirectors = formData.managingDirectors;
    if (formData.beneficialOwners) beneficialOwners = formData.beneficialOwners;

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
        <h2>{strings[currentLang].jur.STEP_CONTACT_PERSON}</h2>
        <Radio.Group>
          {managingDirectors && (
            <>
              {managingDirectors.map((md) => (
                <Radio value={`${md.firstName} ${md.lastName}`}>
                  {md.firstName} {md.lastName}
                </Radio>
              ))}
            </>
          )}
          {beneficialOwners && (
            <>
              {beneficialOwners.map((bo) => (
                <Radio value={`${bo.firstName} ${bo.lastName}`}>
                  {bo.firstName} {bo.lastName}
                </Radio>
              ))}
            </>
          )}
          <Radio value="custom">New point of contact</Radio>
        </Radio.Group>
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
              <Form.Item
                label={strings[currentLang].nat.EMAIL_ADDRESS}
                required
                help={
                  <span style={{ fontSize: "0.75rem" }}>
                    This email address is used by us to submit invoices.
                  </span>
                }
              >
                <Input
                  placeholder={strings[currentLang].nat.EMAIL_ADDRESS}
                  onChange={(e) => {
                    onValChange("email", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.PHONE} required>
                <Input
                  placeholder={strings[currentLang].nat.PHONE}
                  onChange={(e) => {
                    onValChange("phone", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={strings[currentLang].nat.EMAIL_ADDRESS}
                required
                help={
                  <span style={{ fontSize: "0.75rem" }}>
                    This email address is used by us to submit invoices.
                  </span>
                }
              >
                <Input
                  placeholder={strings[currentLang].nat.EMAIL_ADDRESS}
                  onChange={(e) => {
                    onValChange("email", e.target.value);
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

export default JurKontaktperson;
