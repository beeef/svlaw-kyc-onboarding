import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Col, Form, Input, Radio, Row } from "antd";
import strings from "../../locale/strings.json";
import CustomForm from "../../util/CustomForm";

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

      console.log("x", x);

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
    const { currentLang, formData, setCurrentStepValid } = this.props;

    let { userData } = formData;

    if (!userData) userData = {};

    let managingDirectors = [];
    let beneficialOwners = [];

    if (formData.managingDirectors)
      managingDirectors = formData.managingDirectors;
    if (formData.beneficialOwners) beneficialOwners = formData.beneficialOwners;

    const formItems = [
      {
        name: "firstName",
        required: true,
        label: strings[currentLang].jur.FIRST_NAME,
        onChange: this.handleUserDataChange,
        defaultValue: userData.firstName,
      },
      {
        name: "lastName",
        required: true,
        label: strings[currentLang].jur.LAST_NAME,
        onChange: this.handleUserDataChange,
        defaultValue: userData.lastName,
      },
      {
        name: "email",
        required: true,
        onChange: this.handleUserDataChange,
        label: strings[currentLang].jur.EMAIL_ADDRESS,
        type: "email",
        defaultValue: userData.email,
      },
      {
        name: "phone",
        required: true,
        onChange: this.handleUserDataChange,
        label: strings[currentLang].nat.PHONE_NUMBER,
        type: "phone",
        help: "Please provide the number in the following format: +43 1 23456789",
        defaultValue: userData.phone,
      },
    ];

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
        {formData && formData.userData && (
          <Row>
            <Col xs={24}>
              <CustomForm
                formItems={formItems}
                onValid={() => {
                  setCurrentStepValid(true);
                }}
                onInvalid={() => {
                  setCurrentStepValid(false);
                }}
              />
            </Col>
          </Row>
        )}
      </>
    );
  }
}

JurAusfuellerInformation.propTypes = {
  currentLang: PropTypes.any,
  formData: PropTypes.shape({
    beneficialOwners: PropTypes.any,
    managingDirectors: PropTypes.any,
    userData: PropTypes.shape({
      email: PropTypes.string,
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      phone: PropTypes.string,
    }),
  }),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
};

export default JurAusfuellerInformation;
