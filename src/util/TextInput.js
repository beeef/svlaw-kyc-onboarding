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

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.validationTimeout = null;
  }

  validateValue = () => {
    const { currentValue } = this.state;
    const {
      validationFunc,
      minLength,
      maxLength,
      successMsg,
      errorMsg,
      required,
      onValid,
      onInvalid,
    } = this.props;

    if (required) {
      if (!validationFunc) {
        // valid wenn min und max length erfüllt sind
        if (
          currentValue &&
          currentValue.length >= (minLength || 2) &&
          currentValue.length <= (maxLength || 64)
        ) {
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

  componentDidMount = () => {
    const { defaultValue } = this.props;
    if (defaultValue) {
      this.setState({ currentValue: defaultValue }, this.validateValue);
    }
  };

  componentDidUpdate = (prevProps) => {
    const { defaultValue } = this.props;
    const { defaultValue: prevDefaultValue } = prevProps;

    if (defaultValue !== prevDefaultValue) {
      this.setState({ currentValue: defaultValue }, this.validateValue);
    }
  };

  render() {
    const { currentValue, loading } = this.state;
    const {
      minLength,
      maxLength,
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
          minLength={minLength || 2}
          maxLength={maxLength || 64}
          value={currentValue}
          onBlur={(e) => {
            if (this.validationTimeout) clearTimeout(this.validationTimeout);

            const { value } = e.target;
            const firstChar = (
              value && value.trim().length > 0
                ? value.trim().substring(0, 1)
                : ""
            ).toLocaleUpperCase();
            const rest =
              value && value.trim().length > 1 ? value.trim().substring(1) : "";

            this.setState({ currentValue: `${firstChar}${rest}` }, () => {
              onChange(name, `${firstChar}${rest}`);
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

TextInput.propTypes = {
  errorMsg: PropTypes.string,
  help: PropTypes.string,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  size: PropTypes.string,
  successMsg: PropTypes.string,
  validationFunc: PropTypes.func,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func,
  onValid: PropTypes.func,
  onInvalid: PropTypes.func,
  defaultValue: PropTypes.string,
};

export default TextInput;
