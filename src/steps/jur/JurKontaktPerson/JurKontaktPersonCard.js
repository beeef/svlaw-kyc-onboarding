import React from "react";
import PropTypes from "prop-types";
import { Button, Row } from "antd";
import strings from "../../../locale/strings.json";
import CustomForm from "../../../util/CustomForm";

const JurKontaktPersonCard = ({
  currentLang,
  onRemove,
  onChange,
  onValid,
  onInvalid,
}) => {
  const formItems = [
    {
      name: "firstName",
      required: true,
      label: strings[currentLang].jur.FIRST_NAME,
      onChange: onChange,
    },
    {
      name: "lastName",
      required: true,
      label: strings[currentLang].jur.LAST_NAME,
      onChange: onChange,
    },
    {
      name: "email",
      required: true,
      onChange: onChange,
      label: strings[currentLang].jur.EMAIL_ADDRESS,
      type: "email",
    },
    {
      name: "phone",
      required: true,
      onChange: onChange,
      label: strings[currentLang].nat.PHONE_NUMBER,
      type: "phone",
      help: "Please provide the number in the following format: +43 1 23456789",
    },
  ];

  return (
    <>
      <Row justify="end">
        <Button type="link" danger onClick={onRemove}>
          Remove
        </Button>
      </Row>
      <CustomForm
        formItems={formItems}
        onValid={onValid}
        onInvalid={onInvalid}
      />
    </>
  );
};

JurKontaktPersonCard.propTypes = {
  currentLang: PropTypes.any,
  onChange: PropTypes.func,
  onValid: PropTypes.func,
  onInvalid: PropTypes.func,
  onRemove: PropTypes.any,
};

export default JurKontaktPersonCard;
