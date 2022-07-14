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
      onValid,
      onInvalid,
    } = this.props;

    if (!validationFunc) {
      // valid wenn min und max length erfüllt sind && eine email adresse ist
      if (
        currentValue &&
        currentValue.length >= (minLength || 2) &&
        currentValue.length <= (maxLength || 64) &&
        validateEmail(currentValue)
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
      this.inputRef.current.value = defaultValue;
      this.setState({ currentValue: defaultValue }, this.validateValue);
    }
  };

  render() {
    const { loading } = this.state;
    const {
      minLength,
      maxLength,
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
          placeholder={label}
          size={size || "middle"}
          minLength={minLength || 2}
          maxLength={maxLength || 64}
          onBlur={(e) => {
            this.setState(
              { currentValue: e.target.value.trim() },
              this.validateValue
            );
          }}
          onChange={(e) => {
            const { value } = e.target;
            if (this.validationTimeout) clearTimeout(this.validationTimeout);
            this.validationTimeout = setTimeout(() => {
              onChange(name, value);
              this.validateValue();
            }, 400);

            this.setState({ currentValue: value });
          }}
          ref={this.inputRef}
        />
      </Form.Item>
    );
  }
}

EmailInput.propTypes = {
  errorMsg: PropTypes.string,
  help: PropTypes.string,
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
  defaultValue: PropTypes.any,
};

export default EmailInput;
