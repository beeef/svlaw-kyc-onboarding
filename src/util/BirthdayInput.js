import PropTypes from "prop-types";
import { DatePicker, Form } from "antd";
import React, { Component } from "react";
import moment from "moment";

class BirthdayInput extends Component {
  state = {
    currentValue: null,
    loading: false,
    error: null,
    inputError: false,
    inputSuccess: false,
  };

  validateValue = () => {
    const { currentValue } = this.state;
    const {
      validationFunc,
      successMsg,
      errorMsg,
      required,
      onValid,
      onInvalid,
    } = this.props;

    if (required) {
      if (!validationFunc) {
        // valid wenn min und max length erfüllt sind
        if (currentValue && currentValue.isValid()) {
          this.setState(
            {
              inputSuccess: successMsg || true,
              inputError: false,
            },
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
            {
              inputSuccess: successMsg || true,
              inputError: false,
            },
            onValid
          );
        } else {
          this.setState(
            { inputError: errorMsg || true, inputSuccess: false },
            onInvalid
          );
        }
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
    const { size, label, help, required, onChange, name } = this.props;

    return (
      <Form.Item
        label={label}
        extra={help}
        validateStatus={loading ? "validating" : this.getValidationStatus()}
        hasFeedback
        help={this.getStatusMsg()}
        required={required || false}
      >
        <DatePicker
          allowClear
          format="DD.MM.YYYY"
          size={size || "middle"}
          placeholder="DD.MM.YYYY"
          value={currentValue}
          onChange={(date) => {
            this.setState({ currentValue: date }, () => {
              onChange(name, date ? date.format("YYYY-MM-DD") : null);
              this.validateValue();
            });
          }}
          style={{ width: "100%" }}
          //   onSelect={(date) => {
          //     this.setState({ currentValue: date }, () => {
          //       onChange(name, date.format("YYYY-MM-DD"));
          //     });
          //     this.validateValue();
          //   }}
        />
      </Form.Item>
    );
  }
}

BirthdayInput.propTypes = {
  errorMsg: PropTypes.string,
  help: PropTypes.string,
  label: PropTypes.string.isRequired,
  size: PropTypes.string,
  successMsg: PropTypes.string,
  validationFunc: PropTypes.func,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  onValid: PropTypes.func,
  onInvalid: PropTypes.func,
};

export default BirthdayInput;
