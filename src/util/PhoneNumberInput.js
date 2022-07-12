import React, { Component } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Form, Input, Popover } from "antd";
import PropTypes from "prop-types";
import { validatePhoneNumber } from "./validation";

class PhoneNumberInput extends Component {
  state = {
    currentAreaCode: null,
    currentValue: "",
    loading: false,
    error: null,
    inputError: false,
    inputSuccess: false,
  };

  validateValue = () => {
    const { currentAreaCode, currentValue } = this.state;
    const {
      validationFunc,
      minLength,
      maxLength,
      successMsg,
      errorMsg,
      onValid,
      onInvalid,
    } = this.props;

    if (!validationFunc) {
      // valid wenn min und max length erfüllt sind && eine email adresse ist
      if (
        currentAreaCode &&
        currentValue &&
        currentValue.length >= (minLength || 2) &&
        currentValue.length <= (maxLength || 64) &&
        currentAreaCode.length >= (minLength || 2) &&
        currentAreaCode.length <= (maxLength || 64) &&
        validatePhoneNumber(`+${currentAreaCode}${currentValue}`)
      ) {
        this.setState(
          { inputSuccess: successMsg || true, inputError: false },
          onValid
        );
        return true;
      } else {
        this.setState(
          { inputError: errorMsg || true, inputSuccess: false },
          onInvalid
        );
      }
    } else {
      if (validationFunc(currentValue)) {
        this.setState(
          { inputSuccess: successMsg || true, inputError: false },
          onValid
        );
      } else {
        this.setState(
          { inputError: errorMsg || true, inputSuccess: false },
          onInvalid
        );
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
    const { currentAreaCode, currentValue, loading } = this.state;
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
        hasFeedback={false}
        extra={this.getStatusMsg()}
        required={required || false}
      >
        <Input.Group compact>
          <Input
            onChange={(e) => {
              this.setState({ currentAreaCode: e.target.value }, () => {
                onChange(name, `${currentAreaCode}${currentValue}`);
                this.validateValue();
              });
            }}
            size={size || "middle"}
            placeholder="43"
            prefix="+"
            style={{ width: "28%" }}
          />
          <Input
            placeholder="12345"
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
              this.setState({ currentValue: e.target.value }, () => {
                onChange(name, `${currentAreaCode}${currentValue}`);
                if (immediateValidation) {
                  this.validateValue();
                }
              });
            }}
            style={{ width: "72%" }}
          />
        </Input.Group>
      </Form.Item>
    );
  }
}

PhoneNumberInput.propTypes = {
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
  onValid: PropTypes.func,
  onInvalid: PropTypes.func,
};

export default PhoneNumberInput;
