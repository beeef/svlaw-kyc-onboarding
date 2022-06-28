import React, { Component } from "react";
import { Button, Col, Form, Input, Radio, Row } from "antd";
import strings from "../../locale/strings.json";

class JurAusfuellerInformation extends Component {
  state = { countries: null };

  validate = () => {};

  handleUserDataChange = (key, value) => {
    const { formData, onChangeFormData } = this.props;
    const { userData } = formData;

    if (userData) {
      userData[key] = value;
      onChangeFormData("userData", userData);
    }
  };

  handleRadioButtonsChange = (val) => {
    const { formData, onChangeFormData } = this.props;
    if (val === "other") {
      onChangeFormData("userData", {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
    } else {
      let managingDirectors = [];
      let beneficialOwners = [];
      if (formData.managingDirectors)
        managingDirectors = formData.managingDirectors;
      if (formData.beneficialOwners)
        beneficialOwners = formData.beneficialOwners;

      let x = managingDirectors.find((md) => md.key === val);

      if (!x) x = beneficialOwners.find((bo) => bo.key === val);

      if (x) {
        onChangeFormData("userData", {
          firstName: x.firstName,
          lastName: x.lastName,
          email: x.email,
          phone: x.phone,
        });
      }
    }
  };

  render() {
    const { currentLang, formData } = this.props;

    let { userData } = formData;

    if (!userData) userData = {};

    let managingDirectors = [];
    let beneficialOwners = [];

    if (formData.managingDirectors)
      managingDirectors = formData.managingDirectors;
    if (formData.beneficialOwners) beneficialOwners = formData.beneficialOwners;

    return (
      <>
        <h2>{strings[currentLang].jur.STEP_PROVIDE_USER_INFORMATION}</h2>
        <Row>
          <Col xs={24}>
            <Radio.Group
              onChange={(e) => {
                this.handleRadioButtonsChange(e.target.value);
              }}
            >
              {managingDirectors && (
                <>
                  {managingDirectors.map((md) => (
                    <Radio key={md.key} value={md.key}>
                      {md.firstName} {md.lastName}
                    </Radio>
                  ))}
                </>
              )}
              {beneficialOwners && (
                <>
                  {beneficialOwners.map((bo) => (
                    <Radio value={bo.key} key={bo.key}>
                      {bo.firstName} {bo.lastName}
                    </Radio>
                  ))}
                </>
              )}
              <Radio key="other" value="other">
                {strings[currentLang].OTHER_PERSON}
              </Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={24}>
            <Form
              wrapperCol={{ xs: 24, xl: 24 }}
              labelCol={{ xs: 24, xl: 24 }}
              labelAlign="left"
            >
              <Row gutter={[24, 0]}>
                <Col xs={24} md={12}>
                  <Form.Item
                    required
                    label={strings[currentLang].jur.FIRST_NAME}
                  >
                    <Input
                      placeholder={strings[currentLang].jur.FIRST_NAME}
                      value={userData.firstName || ""}
                      onChange={(e) => {
                        this.handleUserDataChange("firstName", e.target.value);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={strings[currentLang].jur.LAST_NAME}
                    required
                  >
                    <Input
                      placeholder={strings[currentLang].jur.LAST_NAME}
                      value={userData.lastName || ""}
                      onChange={(e) => {
                        this.handleUserDataChange("lastName", e.target.value);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={strings[currentLang].jur.EMAIL_ADDRESS}
                    required
                  >
                    <Input
                      placeholder={strings[currentLang].jur.EMAIL_ADDRESS}
                      value={userData.email || ""}
                      onChange={(e) => {
                        this.handleUserDataChange("email", e.target.value);
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    label={strings[currentLang].jur.PHONE_NUMBER}
                    required
                  >
                    <Input
                      placeholder={strings[currentLang].jur.PHONE_NUMBER}
                      value={userData.phone || ""}
                      onChange={(e) => {
                        this.handleUserDataChange("phone", e.target.value);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
}

export default JurAusfuellerInformation;
