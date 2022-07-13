import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Col, Row } from "antd";
import { BankOutlined, FilePdfOutlined, UserOutlined } from "@ant-design/icons";
import strings from "../locale/strings.json";
import countries from "i18n-iso-countries";
import ReactMarkdown from "react-markdown";

class StepNatJurPerson extends Component {
  state = {
    countries: null,
    selectedType: null,
  };

  constructor(props) {
    super(props);

    countries.registerLocale(require("i18n-iso-countries/langs/de.json"));
    this.state.countries = countries.getNames("de", { select: "official" });
  }

  render() {
    const { selectedType } = this.state;
    const { currentLang, onChangeFormData, setCurrentStepValid } = this.props;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <ReactMarkdown>{strings[currentLang].WELCOME_TEXT}</ReactMarkdown>

        <h2>{strings[currentLang].SELECT_CLIENT_TYPE_HEADER}</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            rowGap: "12px",
          }}
        >
          <Button.Group>
            <Button
              type={selectedType === "nat" ? "primary" : "default"}
              size="large"
              icon={<UserOutlined />}
              onClick={() => {
                onChangeFormData("clientType", "nat");
                this.setState({ selectedType: "nat" }, () => {
                  setCurrentStepValid(true);
                });
              }}
            >
              {strings[currentLang].NATURAL_PERSON}
            </Button>
            <Button
              type={selectedType === "jur" ? "primary" : "default"}
              size="large"
              icon={<BankOutlined />}
              onClick={() => {
                onChangeFormData("clientType", "jur");
                this.setState({ selectedType: "jur" }, () => {
                  setCurrentStepValid(true);
                });
              }}
            >
              {strings[currentLang].LEGAL_ENTITY}
            </Button>
          </Button.Group>
        </div>
        {selectedType != null && (
          <Row style={{ marginTop: "48px" }}>
            <Col
              xs={24}
              md={4}
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginTop: "12px",
              }}
            >
              <FilePdfOutlined style={{ fontSize: "2rem", color: "coral" }} />
            </Col>
            <Col xs={24} md={20}>
              <ReactMarkdown>
                {strings[currentLang][selectedType].WELCOME_INFORMATION_TEXT}
              </ReactMarkdown>
            </Col>
          </Row>
        )}
      </div>
    );
  }
}

StepNatJurPerson.propTypes = {
  currentLang: PropTypes.oneOf(["de", "en"]),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
  isActive: PropTypes.bool,
};

export default StepNatJurPerson;
