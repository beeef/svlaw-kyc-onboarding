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

    if (countryCode && currentValue) {
      this.setState({ loading: true }, () => {
        setTimeout(() => {
          this.setState({ loading: false, inputError: true });
        }, 2000);
      });
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
      minLength,
      maxLength,
      immediateValidation,
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
          size={size || "middle"}
          value={currentValue}
          minLength={minLength || 2}
          maxLength={maxLength || 64}
          onBlur={() => {
            if (!immediateValidation) {
              this.validateValue();
            }
          }}
          onChange={(e) => {
            onChange(name, e.target.value);
            this.setState({ currentValue: e.target.value }, () => {
              if (immediateValidation) {
                this.validateValue();
              }
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
  immediateValidation: PropTypes.bool,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  size: PropTypes.string,
  successMsg: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default VatNumberInput;
