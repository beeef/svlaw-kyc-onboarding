import React, { Component } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Form, Input, Popover } from "antd";
import PropTypes from "prop-types";
import { validateEmail } from "./validation";

class EmailInput extends Component {
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
      // valid wenn min und max length erfüllt sind && eine email adresse ist
      if (
        currentValue &&
        currentValue.length >= (minLength || 2) &&
        currentValue.length <= (maxLength || 64) &&
        validateEmail(currentValue)
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
      hint,
      onChange,
      name,
    } = this.props;

    return (
      <Form.Item
        label={
          <>
            {label}
            {hint && (
              <Popover
                content={
                  <p style={{ fontSize: "0.9rem", maxWidth: "400px" }}>
                    Please provide an email address that can be used by us for
                    billing purposes only. You can enter your personal email
                    address at a later stage.
                  </p>
                }
              >
                <QuestionCircleOutlined style={{ marginLeft: "4px" }} />
              </Popover>
            )}
          </>
        }
        help={help}
        validateStatus={loading ? "validating" : this.getValidationStatus()}
        hasFeedback
        extra={this.getStatusMsg()}
        required={required || false}
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
            this.setState({ currentValue: e.target.value });
            if (immediateValidation) {
              this.validateValue();
            }
          }}
        />
      </Form.Item>
    );
  }
}

EmailInput.propTypes = {
  errorMsg: PropTypes.string,
  help: PropTypes.string,
  immediateValidation: PropTypes.bool,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  size: PropTypes.string,
  successMsg: PropTypes.string,
  validationFunc: PropTypes.func,
  required: PropTypes.bool,
  hint: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default EmailInput;
