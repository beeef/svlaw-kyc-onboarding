import React, { createRef, useState } from "react";
import { Button, Col, Input, message, Row } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { getAuthTokenForFormAndPin } from "./api/api";
import { saveAccessToken } from "./api/jwt";

const Authenticate = () => {
  const { formId } = useParams();
  const navigate = useNavigate();

  const digit1ref = createRef();
  const digit2ref = createRef();
  const digit3ref = createRef();
  const digit4ref = createRef();
  const digit5ref = createRef();
  const digit6ref = createRef();
  const digit7ref = createRef();
  const digit8ref = createRef();

  const [loading, setLoading] = useState(false);
  const [digit1, setDigit1] = useState();
  const [digit2, setDigit2] = useState();
  const [digit3, setDigit3] = useState();
  const [digit4, setDigit4] = useState();
  const [digit5, setDigit5] = useState();
  const [digit6, setDigit6] = useState();
  const [digit7, setDigit7] = useState();
  const [digit8, setDigit8] = useState();

  const handleFetchToken = async () => {
    const pincode = `${digit1}${digit2}${digit3}${digit4}${digit5}${digit6}${digit7}${digit8}`;
    setLoading(true);
    try {
      const { token } = (await getAuthTokenForFormAndPin(formId, pincode)).data;
      console.log("token", token);
      if (token != null) {
        saveAccessToken(token);
        navigate(`/${formId}`);
      } else {
        message.error("Please provide the corrent PIN code.");
      }
    } catch (err) {
      if (err && err.response && err.response.status != null) {
        const { status } = err.response;

        if (status == 404 || status == 401) {
          message.error("Please provide the corrent PIN code.");
        } else {
          message.error("Unable to verify the code at the moment.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Please enter the PIN code that we&apos;ve sent you via e-mail.</h2>
      <Row gutter={6} style={{ marginBottom: "24px" }}>
        <Col xs={24} md={20}>
          <Row gutter={[6, 12]}>
            <Col xs={3}>
              <Input
                size="large"
                minLength={1}
                maxLength={1}
                ref={digit1ref}
                value={digit1}
                onChange={(e) => {
                  setDigit1(e.target.value);
                  if (e.target.value) digit2ref.current.focus();
                }}
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.6em",
                  padding: "6px",
                }}
                disabled={loading}
              />
            </Col>
            <Col xs={3}>
              <Input
                size="large"
                minLength={1}
                maxLength={1}
                ref={digit2ref}
                value={digit2}
                onChange={(e) => {
                  setDigit2(e.target.value);
                  if (e.target.value) digit3ref.current.focus();
                }}
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.6em",
                  padding: "6px",
                }}
                disabled={loading}
              />
            </Col>
            <Col xs={3}>
              <Input
                size="large"
                minLength={1}
                maxLength={1}
                ref={digit3ref}
                value={digit3}
                onChange={(e) => {
                  setDigit3(e.target.value);
                  if (e.target.value) digit4ref.current.focus();
                }}
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.6em",
                  padding: "6px",
                }}
                disabled={loading}
              />
            </Col>
            <Col xs={3}>
              <Input
                size="large"
                minLength={1}
                maxLength={1}
                ref={digit4ref}
                value={digit4}
                onChange={(e) => {
                  setDigit4(e.target.value);
                  if (e.target.value) digit5ref.current.focus();
                }}
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.6em",
                  padding: "6px",
                }}
                disabled={loading}
              />
            </Col>
            <Col xs={3}>
              <Input
                size="large"
                minLength={1}
                maxLength={1}
                ref={digit5ref}
                value={digit5}
                onChange={(e) => {
                  setDigit5(e.target.value);
                  if (e.target.value) digit6ref.current.focus();
                }}
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.6em",
                  padding: "6px",
                }}
                disabled={loading}
              />
            </Col>
            <Col xs={3}>
              <Input
                size="large"
                minLength={1}
                maxLength={1}
                ref={digit6ref}
                value={digit6}
                onChange={(e) => {
                  setDigit6(e.target.value);
                  if (e.target.value) digit7ref.current.focus();
                }}
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.6em",
                  padding: "6px",
                }}
                disabled={loading}
              />
            </Col>
            <Col xs={3}>
              <Input
                size="large"
                minLength={1}
                maxLength={1}
                ref={digit7ref}
                value={digit7}
                onChange={(e) => {
                  setDigit7(e.target.value);
                  if (e.target.value) digit8ref.current.focus();
                }}
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.6em",
                  padding: "6px",
                }}
                disabled={loading}
              />
            </Col>
            <Col xs={3}>
              <Input
                size="large"
                minLength={1}
                maxLength={1}
                ref={digit8ref}
                value={digit8}
                onChange={(e) => {
                  setDigit8(e.target.value);
                }}
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.6em",
                  padding: "6px",
                }}
                disabled={loading}
              />
            </Col>
          </Row>
        </Col>
        <Col
          xs={24}
          md={4}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            loading={loading}
            type="primary"
            shape="circle"
            icon={<ArrowRightOutlined />}
            disabled={
              !digit1 ||
              !digit2 ||
              !digit3 ||
              !digit4 ||
              !digit5 ||
              !digit6 ||
              !digit7 ||
              !digit8
            }
            onClick={handleFetchToken}
          />
        </Col>
      </Row>
    </>
  );
};

export default Authenticate;
