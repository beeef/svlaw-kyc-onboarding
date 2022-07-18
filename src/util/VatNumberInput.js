import React, { Component } from "react";
import { Form, Input } from "antd";
import PropTypes from "prop-types";

class VatNumberInput extends Component {
  state = {
    currentValue: "",
    loading: false,
    error: null,
    inputError: false,
    inputSuccess: false,
  };

  validateValue = () => {
    const { currentValue } = this.state;
    const { countryCode, successMsg, errorMsg } = this.props;

    if (!currentValue || currentValue.trim() === "") {
      this.setState({ inputError: false, inputSuccess: false });
    } else if (countryCode && currentValue) {
      this.setState({ loading: false, inputSuccess: true, inputError: false });
    } else {
      this.setState({
        loading: false,
        inputError: errorMsg || true,
        inputSuccess: false,
      });
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
      return "warning";
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
    const { currentValue, loading } = this.state;
    const {
      countryCode,
      minLength,
      maxLength,
      size,
      label,
      help,
      onChange,
      name,
    } = this.props;

    return (
      <Form.Item
        label={label}
        help={help}
        validateStatus={loading ? "validating" : this.getValidationStatus()}
        hasFeedback
        extra={this.getStatusMsg()}
        rules={[{ type: "string" }]}
      >
        <Input
          prefix={countryCode || ""}
          size={size || "middle"}
          value={currentValue}
          placeholder={label}
          minLength={minLength || 2}
          maxLength={maxLength || 18}
          onBlur={(e) => {
            if (this.validationTimeout) clearTimeout(this.validationTimeout);
            const { value } = e.target;

            this.setState({ currentValue: value }, () => {
              onChange(name, value);
              this.validateValue();
            });
          }}
          onChange={(e) => {
            const value = e.target.value;
            this.setState({ currentValue: value }, () => {
              if (this.validationTimeout) clearTimeout(this.validationTimeout);
              this.validationTimeout = setTimeout(() => {
                onChange(name, value);
                this.validateValue();
              }, 400);
            });
          }}
        />
      </Form.Item>
    );
  }
}

VatNumberInput.propTypes = {
  countryCode: PropTypes.string,
  errorMsg: PropTypes.string,
  help: PropTypes.string,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  size: PropTypes.string,
  successMsg: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default VatNumberInput;
