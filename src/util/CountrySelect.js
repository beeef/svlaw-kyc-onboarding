import React, { Component } from "react";
import PropTypes from "prop-types";
import { Form, Select } from "antd";
import strings from "../locale/strings.json";
import countries from "i18n-iso-countries";
import countriesDE from "i18n-iso-countries/langs/de.json";
import countriesEN from "i18n-iso-countries/langs/en.json";

class CountrySelect extends Component {
  state = {
    countries: null,
    currentValue: null,
    inputSuccess: false,
    inputError: false,
  };

  constructor(props) {
    super(props);

    const { currentLang } = props;

    countries.registerLocale(currentLang === "de" ? countriesDE : countriesEN);
    this.state.countries = countries.getNames(currentLang, {
      select: "official",
    });
  }

  validateValue = () => {
    const { currentValue } = this.state;
    const { validationFunc, minLength, maxLength, successMsg, errorMsg } =
      this.props;

    if (!validationFunc) {
      // valid wenn min und max length erfüllt sind
      if (currentValue) {
        this.setState({ inputSuccess: successMsg || true, inputError: false });
        return true;
      } else {
        this.setState({ inputError: errorMsg || true, inputSuccess: false });
      }
    } else {
      if (validationFunc(currentValue)) {
        this.setState({ inputSuccess: successMsg || true, inputError: false });
      } else {
        this.setState({ inputError: errorMsg || true, inputSuccess: false });
      }
    }
  };

  getValidationStatus = () => {
    const { inputSuccess, inputError } = this.state;

    if (!inputSuccess && !inputError) {
      return null;
    }

    if (inputSuccess) {
      return "success";
    }

    if (inputError) {
      return "error";
    }
  };

  getStatusMsg = () => {
    const { inputSuccess, inputError } = this.state;
    const { successMsg, errorMsg } = this.props;

    if (inputSuccess && successMsg) {
      return successMsg;
    }

    if (inputError && errorMsg) {
      return errorMsg;
    }

    return null;
  };

  render() {
    const { currentValue, countries } = this.state;
    const {
      currentLang,
      size,
      label,
      help,
      required,
      onChange,
      name,
      onValid,
      onInvalid,
    } = this.props;

    return (
      <Form.Item
        label={label}
        extra={help}
        help={this.getStatusMsg()}
        required={required || false}
        validateStatus={this.getValidationStatus()}
      >
        <Select
          showSearch
          value={currentValue}
          size={size || "middle"}
          placeholder={strings[currentLang].jur.SELECT_COUNTRY}
          options={Object.keys(countries).map((countryCode) => ({
            label: countries[countryCode],
            value: countryCode,
          }))}
          optionFilterProp="label"
          onChange={(country) => {
            if (country) onValid();
            else onInvalid();

            this.setState({ currentValue: country }, this.validateValue);
            onChange(name, country);
          }}
        />
      </Form.Item>
    );
  }
}

CountrySelect.propTypes = {
  currentLang: PropTypes.oneOf(["de", "en"]),
  errorMsg: PropTypes.string,
  help: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  name: PropTypes.string,
  onChange: PropTypes.func,
  required: PropTypes.bool,
  size: PropTypes.oneOf(["small", "middle", "large"]),
  successMsg: PropTypes.string,
  validationFunc: PropTypes.func,
  onValid: PropTypes.func,
  onInvalid: PropTypes.func,
};

export default CountrySelect;
