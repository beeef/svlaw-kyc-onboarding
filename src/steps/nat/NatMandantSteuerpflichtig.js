import React, { Component } from "react";
import strings from "../../locale/strings.json";
import countries from "i18n-iso-countries";
import { Checkbox, Form, Radio, Select, Space } from "antd";

class NatMandantSteuerpflichtig extends Component {
  state = { countries: null, selectedType: null, selectedAnswer: null };

  constructor(props) {
    super(props);

    const { currentLang } = props;

    countries.registerLocale(
      require(`i18n-iso-countries/langs/${currentLang}.json`)
    );
    this.state.countries = countries.getNames(currentLang, {
      select: "official",
    });
  }

  validate = () => {};

  render() {
    const { countries, selectedAnswer } = this.state;
    const { currentLang, onChangeFormData } = this.props;

    return (
      <>
        <h2>{strings[currentLang].nat.STEP_CLIENT_SUBJECT_TO_TAXATION}</h2>
        <Space direction="vertical" size="large">
          <Radio.Group
            onChange={(e) => {
              this.setState({ selectedAnswer: e.target.value });
              onChangeFormData(
                "clientSubjectToTaxationInAustria",
                e.target.value
              );
            }}
            value={selectedAnswer}
          >
            <Space direction="vertical">
              <Radio value="1">{strings[currentLang].YES}</Radio>
              <Radio value="0">{strings[currentLang].NO}</Radio>
            </Space>
          </Radio.Group>

          {selectedAnswer && selectedAnswer === "0" && (
            <div>
              <h3>
                {strings[currentLang].nat.STEP_SELECT_COUNTRY_FOR_TAXATION}
              </h3>
              <Select
                placeholder={strings[currentLang].nat.SELECT_COUNTRY}
                options={Object.keys(countries).map((countryCode) => ({
                  label: countries[countryCode],
                  value: countryCode,
                }))}
                optionFilterProp="label"
                showSearch
              />
            </div>
          )}
        </Space>
      </>
    );
  }
}

export default NatMandantSteuerpflichtig;
