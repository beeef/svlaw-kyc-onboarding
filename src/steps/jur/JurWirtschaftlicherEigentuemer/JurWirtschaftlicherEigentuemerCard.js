import React, { Component } from "react";
import PropTypes from "prop-types";
import { Col, Form, Row, Select } from "antd";
import strings from "../../../locale/strings.json";
import CustomForm from "../../../util/CustomForm";

class JurWirtschaftlicherEigentuemerCard extends Component {
  state = { allFieldsValid: false };

  validate = () => {
    const { allFieldsValid } = this.state;
    const { beneficialOwnerData, onValidated } = this.props;

    if (allFieldsValid === true && beneficialOwnerData.powerOfRepresentation) {
      onValidated(true);
    } else {
      onValidated(false);
    }
  };

  componentDidMount = () => {
    const { onChangeBeneficialOwnerData } = this.props;
    onChangeBeneficialOwnerData("powerOfRepresentation", "sole");
  };

  render() {
    const { currentLang, onChangeBeneficialOwnerData } = this.props;

    const formLayout = {
      wrapperCol: { xs: 24, xl: 24 },
      labelCol: { xs: 24, xl: 24 },
    };

    const formItems = [
      {
        name: "firstName",
        required: true,
        label: strings[currentLang].jur.FIRST_NAME,
        onChange: onChangeBeneficialOwnerData,
      },
      {
        name: "lastName",
        required: true,
        label: strings[currentLang].jur.LAST_NAME,
        onChange: onChangeBeneficialOwnerData,
      },
      {
        name: "dateOfBirth",
        required: true,
        onChange: onChangeBeneficialOwnerData,
        label: strings[currentLang].jur.DATE_OF_BIRTH,
        type: "birthday",
      },
      {
        name: "nationality",
        required: true,
        onChange: onChangeBeneficialOwnerData,
        label: strings[currentLang].jur.NATIONALITY,
        type: "country",
      },
      {
        name: "street",
        required: true,
        onChange: onChangeBeneficialOwnerData,
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
        onChange: onChangeBeneficialOwnerData,
        label: `${strings[currentLang].jur.POSTAL_CODE}`,
      },
      {
        name: "city",
        required: true,
        onChange: onChangeBeneficialOwnerData,
        label: `${strings[currentLang].jur.CITY}`,
      },
      {
        name: "country",
        required: true,
        onChange: onChangeBeneficialOwnerData,
        label: `${strings[currentLang].jur.COUNTRY}`,
        type: "country",
      },
      {
        name: "email",
        required: true,
        onChange: onChangeBeneficialOwnerData,
        label: strings[currentLang].jur.EMAIL_ADDRESS,
        type: "email",
      },
      {
        name: "phone",
        required: true,
        onChange: onChangeBeneficialOwnerData,
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
                required
                label={strings[currentLang].jur.POWER_OF_REPRESENTATION}
                // help={strings[currentLang].jur.POWER_OF_REPRESENTATION_HELP}
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
                    onChangeBeneficialOwnerData(
                      "powerOfRepresentation",
                      e.target.value
                    );
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

JurWirtschaftlicherEigentuemerCard.propTypes = {
  beneficialOwnerData: PropTypes.any,
  currentLang: PropTypes.oneOf(["de", "en"]),
  onChangeBeneficialOwnerData: PropTypes.func,
  onValidated: PropTypes.func,
};

export default JurWirtschaftlicherEigentuemerCard;
