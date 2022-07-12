import PropTypes from "prop-types";
import React, { Component } from "react";
import { Col, Form, Row, Select } from "antd";
import strings from "../../../locale/strings.json";
import { validateEmail, validatePhoneNumber } from "../../../util/validation";
import CustomForm from "../../../util/CustomForm";

class JurGeschaeftsfuehrerCard extends Component {
  state = { allFieldsValid: false };

  validate = () => {
    const { allFieldsValid } = this.state;
    const { managingDirectorData, onValidated } = this.props;

    if (allFieldsValid === true && managingDirectorData.powerOfRepresentation) {
      onValidated(true);
    } else {
      onValidated(false);
    }
  };

  componentDidMount = () => {
    const { onChangeManagingDirectorData } = this.props;
    onChangeManagingDirectorData("powerOfRepresentation", "sole");
  };

  render() {
    const { currentLang, onChangeManagingDirectorData } = this.props;

    const formLayout = {
      wrapperCol: { xs: 24, xl: 24 },
      labelCol: { xs: 24, xl: 24 },
    };

    const formItems = [
      {
        name: "firstName",
        required: true,
        label: strings[currentLang].jur.FIRST_NAME,
        onChange: onChangeManagingDirectorData,
      },
      {
        name: "lastName",
        required: true,
        label: strings[currentLang].jur.LAST_NAME,
        onChange: onChangeManagingDirectorData,
      },
      {
        name: "dateOfBirth",
        required: true,
        onChange: onChangeManagingDirectorData,
        label: strings[currentLang].jur.DATE_OF_BIRTH,
        type: "birthday",
      },
      {
        name: "nationality",
        required: true,
        onChange: onChangeManagingDirectorData,
        label: strings[currentLang].jur.NATIONALITY,
        type: "country",
      },
      {
        name: "street",
        required: true,
        onChange: onChangeManagingDirectorData,
        label: `${strings[currentLang].jur.RESIDENTIAL_ADDRESS}`,
        validationFunc: (val) => {
          const x = val.trim();
          return x.indexOf(" ") > 0;
        },
        errorMsg: "The address must contain a street name and a number.",
      },
      {
        name: "zip",
        required: true,
        onChange: onChangeManagingDirectorData,
        label: `${strings[currentLang].jur.POSTAL_CODE}`,
      },
      {
        name: "city",
        required: true,
        onChange: onChangeManagingDirectorData,
        label: `${strings[currentLang].jur.CITY}`,
      },
      {
        name: "country",
        required: true,
        onChange: onChangeManagingDirectorData,
        label: `${strings[currentLang].jur.COUNTRY}`,
        type: "country",
      },
      {
        name: "email",
        required: true,
        onChange: onChangeManagingDirectorData,
        label: strings[currentLang].jur.EMAIL_ADDRESS,
        type: "email",
      },
      {
        name: "phone",
        required: true,
        onChange: onChangeManagingDirectorData,
        label: strings[currentLang].nat.PHONE_NUMBER,
        type: "phone",
        help: "Please provide the number in the following format: +43 1 23456789",
      },
    ];

    return (
      <>
        <CustomForm
          currentLang={currentLang}
          formItems={formItems}
          onValid={() => {
            this.setState({ allFieldsValid: true }, this.validate);
          }}
          onInvalid={() => {
            this.setState({ allFieldsValid: false }, this.validate);
          }}
        />
        <Form {...formLayout}>
          <Row gutter={[24, 0]}>
            <Col xs={24} md={24}>
              <Form.Item
                label={strings[currentLang].jur.POWER_OF_REPRESENTATION}
                help={strings[currentLang].jur.POWER_OF_REPRESENTATION_HELP}
                required
              >
                <Select
                  placeholder={strings[currentLang].PLEASE_CHOOSE}
                  defaultValue="sole"
                  options={[
                    { label: "Sole", value: "sole" },
                    {
                      label: "Jointly with one other authorized person",
                      value: "jointly",
                    },
                  ]}
                  onChange={(val) => {
                    onChangeManagingDirectorData("powerOfRepresentation", val);
                    this.validate();
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

JurGeschaeftsfuehrerCard.propTypes = {
  currentLang: PropTypes.string,
  managingDirectorData: PropTypes.shape({
    city: PropTypes.any,
    country: PropTypes.any,
    dateOfBirth: PropTypes.any,
    email: PropTypes.any,
    firstName: PropTypes.any,
    lastName: PropTypes.any,
    nationality: PropTypes.any,
    phone: PropTypes.any,
    phoneAreaCode: PropTypes.any,
    powerOfRepresentation: PropTypes.any,
    street: PropTypes.any,
    zip: PropTypes.any,
  }),
  onChangeManagingDirectorData: PropTypes.func,
  onValidated: PropTypes.func,
};

export default JurGeschaeftsfuehrerCard;
