import PropTypes from "prop-types";
import { Form, Input } from "antd";
import React, { Component } from "react";

class TextInput extends Component {
  state = {
    currentValue: "",
    loading: false,
    error: null,
    inputError: false,
    inputSuccess: false,
  };

  validateValue = () => {
    const { currentValue } = this.state;
    const { validationFunc, minLength, maxLength, successMsg, errorMsg } =
      this.props;

    if (!validationFunc) {
      // valid wenn min und max length erfüllt sind
      if (
        currentValue &&
        currentValue.length >= (minLength || 2) &&
        currentValue.length <= (maxLength || 64)
      ) {
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
    const { currentValue, loading } = this.state;
    const {
      minLength,
      maxLength,
      immediateValidation,
      size,
      label,
      help,
      required,
      onChange,
      name,
    } = this.props;

    return (
      <Form.Item
        label={label}
        extra={help}
        validateStatus={loading ? "validating" : this.getValidationStatus()}
        hasFeedback
        help={this.getStatusMsg()}
        required={required || false}
      >
        <Input
          size={size || "middle"}
          placeholder={label}
          value={currentValue}
          minLength={minLength || 2}
          maxLength={maxLength || 64}
          onBlur={(e) => {
            this.setState({ currentValue: e.target.value.trim() }, () => {
              if (!immediateValidation) {
                this.validateValue();
              }
            });
          }}
          onChange={(e) => {
            const value = e.target.value;
            this.setState({ currentValue: e.target.value }, () => {
              onChange(name, value);
            });
            if (immediateValidation) {
              this.validateValue();
            }
          }}
        />
      </Form.Item>
    );
  }
}

TextInput.propTypes = {
  errorMsg: PropTypes.string,
  help: PropTypes.string,
  immediateValidation: PropTypes.bool,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  size: PropTypes.string,
  successMsg: PropTypes.string,
  validationFunc: PropTypes.func,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func,
};

export default TextInput;
