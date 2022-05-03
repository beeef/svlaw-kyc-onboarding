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
  Select
} from "antd";
import {
  BankOutlined,
  LeftOutlined,
  RightOutlined,
  UserOutlined
} from "@ant-design/icons";
import strings from "../locale/strings.json";
import countries from "i18n-iso-countries";

class StepNatJurPerson extends Component {
  state = {
    countries: null,
    selectedType: null
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
      labelCol: { xs: 24, xl: 24 }
    };

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}
      >
        <h2>Bitte auswählen</h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            rowGap: "12px"
          }}
        >
          <Button
            type={selectedType === "nat" ? "primary" : "default"}
            size="large"
            icon={<UserOutlined />}
            onClick={() => {
              onChangeFormData("clientType", "nat");
              this.setState({ selectedType: "nat" });
            }}
          >
            Natürliche Person
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
            Juristische Person{" "}
          </Button>
        </div>
      </div>
    );
  }
}

export default StepNatJurPerson;
