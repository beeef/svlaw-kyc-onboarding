import React, { Component } from "react";
import { Radio, Select, Space } from "antd";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import DomicileHapitualResidenceDefinitionEN from "../../locale/Domicile_Hapitual-Residence_en.md";
import strings from "../../locale/strings.json";
import countries from "i18n-iso-countries";
import countriesDE from "i18n-iso-countries/langs/de.json";
import countriesEN from "i18n-iso-countries/langs/en.json";

class NatMandantSteuerpflichtig extends Component {
  state = { countries: null, selectedAnswer: null, domicileDefinition: null };

  constructor(props) {
    super(props);

    const { currentLang } = props;

    countries.registerLocale(currentLang === "de" ? countriesDE : countriesEN);
    this.state.countries = countries.getNames(currentLang, {
      select: "official",
    });

    fetch(DomicileHapitualResidenceDefinitionEN)
      .then((res) => res.text())
      .then((text) => {
        this.state.domicileDefinition = text;
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
    const { isActive } = this.props;

    if (isActive) {
      if (
        prevProps.formData.clientSubjectToTaxationInCountry !==
        this.props.formData.clientSubjectToTaxationInCountry
      ) {
        this.validate();
      }
    }
  };

  insertNameIntoHeader = (firstName, lastName, header) => {
    let newHeader = header.replace("[FIRST_NAME]", firstName);
    newHeader = newHeader.replace("[LAST_NAME]", lastName);

    return newHeader;
  };

  render() {
    const { countries, selectedAnswer, domicileDefinition } = this.state;
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
        {domicileDefinition && (
          <div style={{ marginTop: "auto" }}>
            <ReactMarkdown>{domicileDefinition}</ReactMarkdown>
          </div>
        )}
      </>
    );
  }
}

NatMandantSteuerpflichtig.propTypes = {
  isActive: PropTypes.bool,
  currentLang: PropTypes.string,
  formData: PropTypes.shape({
    clientData: PropTypes.shape({
      firstName: PropTypes.any,
      lastName: PropTypes.any,
    }),
    clientSubjectToTaxationInCountry: PropTypes.any,
  }),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
};

export default NatMandantSteuerpflichtig;
