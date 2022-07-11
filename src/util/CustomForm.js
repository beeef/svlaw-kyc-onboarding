import React, { Component } from "react";
import { Form } from "antd";
import PropTypes from "prop-types";
import TextInput from "./TextInput";
import EmailInput from "./EmailInput";
import VatNumberInput from "./VatNumberInput";

class CustomForm extends Component {
  state = {};

  render() {
    const formLayout = {
      wrapperCol: { xs: 24, xl: 24 },
      labelCol: { xs: 24, xl: 24 },
    };

    const { formItems } = this.props;

    return (
      <Form {...formLayout} labelAlign="left">
        {formItems.map((fi) => {
          const { type } = fi;

          if (type === "text") {
            return (
              <TextInput
                validationFunc={fi.validationFunc}
                label={fi.label}
                help={fi.help}
                onChange={fi.onChange}
                name={fi.name}
                required={fi.required}
                hint={fi.hint}
              />
            );
          }

          if (type === "email") {
            return (
              <EmailInput
                validationFunc={fi.validationFunc}
                label={fi.label}
                help={fi.help}
                onChange={fi.onChange}
                name={fi.name}
                required={fi.required}
                hint={fi.hint}
              />
            );
          }

          if (type === "vat") {
            return (
              <VatNumberInput
                validationFunc={fi.validationFunc}
                label={fi.label}
                help={fi.help}
                onChange={fi.onChange}
                name={fi.name}
                required={fi.required}
                hint={fi.hint}
              />
            );
          }
        })}
      </Form>
    );
  }
}

CustomForm.propTypes = {
  formItems: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.oneOf(["text", "vat", "email"]).isRequired,
      validationFunc: PropTypes.func,
      name: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      help: PropTypes.string,
      onChange: PropTypes.func,
      required: PropTypes.bool,
      hint: PropTypes.string,
    })
  ),
};

export default CustomForm;
