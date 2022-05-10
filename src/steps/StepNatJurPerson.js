import React, { Component } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Radio,
  Row,
  Select,
} from "antd";
import {
  BankOutlined,
  LeftOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import strings from "../locale/strings.json";
import countries from "i18n-iso-countries";
import ButtonGroup from "antd/lib/button/button-group";

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

  validate = () => {};

  render() {
    const { countries, selectedType } = this.state;
    const { currentLang, onChangeFormData } = this.props;

    const formLayout = {
      wrapperCol: { xs: 24, xl: 24 },
      labelCol: { xs: 24, xl: 24 },
    };

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
          <ButtonGroup>
            <Button
              type={selectedType === "nat" ? "primary" : "default"}
              size="large"
              icon={<UserOutlined />}
              onClick={() => {
                onChangeFormData("clientType", "nat");
                this.setState({ selectedType: "nat" });
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
                this.setState({ selectedType: "jur" });
              }}
            >
              {strings[currentLang].LEGAL_ENTITY}
            </Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default StepNatJurPerson;
