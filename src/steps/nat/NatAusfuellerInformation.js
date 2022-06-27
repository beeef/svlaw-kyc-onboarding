import React, { Component } from "react";
import { Checkbox, Col, DatePicker, Form, Input, Row, Select } from "antd";
import strings from "../../locale/strings.json";

class NatAusfuellerInformation extends Component {
  state = { userData: {}, sameInformationAsPrevious: false };

  validate = () => {};

  render() {
    const { sameInformationAsPrevious } = this.state;
    const { currentLang, onChangeFormData } = this.props;

    const formLayout = {
      wrapperCol: { xs: 24, xl: 24 },
      labelCol: { xs: 24, xl: 24 },
    };

    const onValChange = (key, value) => {
      const { userData } = this.state;
      const { onChangeFormData } = this.props;

      this.setState(
        {
          userData: {
            ...userData,
            [key]: value,
          },
        },
        () => {
          onChangeFormData("userData", this.state.userData);
        }
      );
    };

    return (
      <>
        <h2>{strings[currentLang].nat.STEP_PROVIDE_USER_INFORMATION}</h2>
        <div style={{ margin: "24px 0" }}>
          <Checkbox
            checked={sameInformationAsPrevious}
            onChange={(e) => {
              this.setState({ sameInformationAsPrevious: e.target.checked });
            }}
          >
            I, [FIRST_NAME] [LAST_NAME], filled out this form by myself.
          </Checkbox>
        </div>
        <Form
          {...formLayout}
          labelAlign="left"
          className={!sameInformationAsPrevious ? "fade-in" : "fade-out"}
        >
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.FIRST_NAME} required>
                <Input
                  placeholder={strings[currentLang].nat.FIRST_NAME}
                  onChange={(e) => {
                    onValChange("firstName", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.LAST_NAME} required>
                <Input
                  placeholder={strings[currentLang].nat.LAST_NAME}
                  onChange={(e) => {
                    onValChange("lastName", e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={strings[currentLang].nat.EMAIL_ADDRESS}
                required
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
              <Form.Item label={strings[currentLang].nat.PHONE_NUMBER} required>
                <Input
                  placeholder={strings[currentLang].nat.PHONE_NUMBER}
                  onChange={(e) => {
                    onValChange("phone", e.target.value);
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

export default NatAusfuellerInformation;
