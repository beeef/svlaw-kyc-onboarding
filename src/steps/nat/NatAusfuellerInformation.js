import PropTypes from "prop-types";
import React, { Component } from "react";
import { Checkbox, Col, Form, Input, Row } from "antd";
import strings from "../../locale/strings.json";
import { validateEmail, validatePhoneNumber } from "../../util/validation";

class NatAusfuellerInformation extends Component {
  state = {
    userData: { firstName: "", lastName: "", email: "", phone: "" },
    sameInformationAsPrevious: false,
  };

  validate = () => {
    const { userData } = this.state;
    const { setCurrentStepValid } = this.props;

    if (
      userData.firstName &&
      userData.lastName &&
      userData.email &&
      userData.phoneAreaCode &&
      userData.phone &&
      validateEmail(userData.email) &&
      validatePhoneNumber(`+${userData.phoneAreaCode}${userData.phone}`)
    ) {
      setCurrentStepValid(true);
    } else {
      setCurrentStepValid(false);
    }
  };

  onValChange = (key, value) => {
    const { userData } = this.state;

    this.setState({ userData: { ...userData, [key]: value } }, this.validate);
  };

  insertUserData = () => {
    const { userData } = this.state;
    const { formData } = this.props;
    const { clientData } = formData;

    if (clientData && clientData.firstName && clientData.lastName) {
      this.setState(
        {
          userData: {
            ...userData,
            firstName: clientData.firstName,
            lastName: clientData.lastName,
          },
        },
        this.validate
      );
    }
  };

  resetUserData = () => {
    this.setState(
      {
        userData: { firstName: "", lastName: "", email: "", phone: "" },
      },
      this.validate
    );
  };

  render() {
    const { sameInformationAsPrevious, userData } = this.state;
    const { currentLang, formData } = this.props;

    const { clientData } = formData;
    let firstName = "";
    let lastName = "";

    if (clientData) {
      firstName = clientData.firstName;
      lastName = clientData.lastName;
    }

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
          this.validate();
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
              this.setState(
                { sameInformationAsPrevious: e.target.checked },
                e.target.checked ? this.insertUserData : this.resetUserData
              );
            }}
          >
            I, {firstName} {lastName}, filled out this form by myself.
          </Checkbox>
        </div>
        <Form {...formLayout} labelAlign="left">
          <Row gutter={[24, 0]}>
            <Col xs={24} md={12}>
              <Form.Item label={strings[currentLang].nat.FIRST_NAME} required>
                <Input
                  placeholder={strings[currentLang].nat.FIRST_NAME}
                  onChange={(e) => {
                    onValChange("firstName", e.target.value);
                  }}
                  value={userData.firstName}
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
                  value={userData.lastName}
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
                  value={userData.email}
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label={strings[currentLang].nat.PHONE_NUMBER}
                required
                help="Please provide the number in the following format: +43 1 23456789"
              >
                <Input.Group compact>
                  <Input
                    onChange={(e) => {
                      onValChange("phoneAreaCode", e.target.value);
                    }}
                    placeholder="43"
                    prefix="+"
                    style={{ width: "28%" }}
                  />
                  <Input
                    onChange={(e) => {
                      onValChange("phone", e.target.value);
                    }}
                    placeholder="12345"
                    style={{ width: "72%" }}
                  />
                </Input.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}

NatAusfuellerInformation.propTypes = {
  currentLang: PropTypes.any,
  formData: PropTypes.shape({
    clientData: PropTypes.shape({
      firstName: PropTypes.any,
      lastName: PropTypes.any,
    }),
  }),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
};

export default NatAusfuellerInformation;
