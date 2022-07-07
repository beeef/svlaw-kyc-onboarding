import React, { Component } from "react";
import strings from "../../locale/strings.json";
import countries from "i18n-iso-countries";
import countriesDE from "i18n-iso-countries/langs/de.json";
import countriesEN from "i18n-iso-countries/langs/en.json";
import { Radio, Select, Space } from "antd";

class NatMandantSteuerpflichtig extends Component {
  state = { countries: null, selectedAnswer: null };

  constructor(props) {
    super(props);

    const { currentLang } = props;

    countries.registerLocale(currentLang === "de" ? countriesDE : countriesEN);
    this.state.countries = countries.getNames(currentLang, {
      select: "official",
    });
  }

  validate = () => {
    const { setCurrentStepValid, formData } = this.props;
    const { selectedAnswer } = this.state;

    if (selectedAnswer != null) {
      if (selectedAnswer === "1") {
        setCurrentStepValid(true);
      } else if (
        formData &&
        formData.clientSubjectToTaxationInCountry != null
      ) {
        setCurrentStepValid(true);
      } else {
        setCurrentStepValid(false);
      }
    } else {
      setCurrentStepValid(false);
    }
  };

  componentDidUpdate = (prevProps) => {
    if (
      prevProps.formData.clientSubjectToTaxationInCountry !==
      this.props.formData.clientSubjectToTaxationInCountry
    ) {
      this.validate();
    }
  };

  insertNameIntoHeader = (firstName, lastName, header) => {
    let newHeader = header.replace("[FIRST_NAME]", firstName);
    newHeader = newHeader.replace("[LAST_NAME]", lastName);

    return newHeader;
  };

  render() {
    const { countries, selectedAnswer } = this.state;
    const { currentLang, formData, onChangeFormData } = this.props;

    const { clientData } = formData;

    let firstName = "";
    let lastName = "";

    if (clientData) {
      firstName = clientData.firstName;
      lastName = clientData.lastName;
    }

    return (
      <>
        <h2>
          {this.insertNameIntoHeader(
            firstName,
            lastName,
            strings[currentLang].nat.STEP_CLIENT_SUBJECT_TO_TAXATION
          )}
        </h2>
        <Space direction="vertical" size="large">
          <Radio.Group
            onChange={(e) => {
              this.setState({ selectedAnswer: e.target.value }, this.validate);
              onChangeFormData(
                "clientSubjectToTaxationInAustria",
                e.target.value
              );
              onChangeFormData(
                "clientSubjectToTaxationInCountry",
                e.target.value === "1" ? "AT" : null
              );
            }}
            value={selectedAnswer}
          >
            <Space direction="vertical">
              <Radio value="1">{strings[currentLang].YES}</Radio>
              <Radio value="0">{strings[currentLang].NO}</Radio>
            </Space>
          </Radio.Group>

          <div
            className={
              selectedAnswer && selectedAnswer === "0" ? "fade-in" : "fade-out"
            }
          >
            <h3>
              {this.insertNameIntoHeader(
                firstName,
                lastName,
                strings[currentLang].nat.STEP_SELECT_COUNTRY_FOR_TAXATION
              )}
            </h3>
            <Select
              placeholder={strings[currentLang].nat.SELECT_COUNTRY}
              options={Object.keys(countries).map((countryCode) => ({
                label: countries[countryCode],
                value: countryCode,
              }))}
              optionFilterProp="label"
              showSearch
              onChange={(countryCode) => {
                onChangeFormData(
                  "clientSubjectToTaxationInCountry",
                  countryCode
                );
              }}
            />
          </div>
        </Space>
      </>
    );
  }
}

export default NatMandantSteuerpflichtig;
