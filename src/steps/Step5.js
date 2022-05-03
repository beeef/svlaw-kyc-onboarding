import React, { Component } from "react";
import { Card } from "antd";
import strings from "../locale/strings.json";

class Step5 extends Component {
  state = {};

  render() {
    const { currentLang } = this.props;

    return (
      <Card title={strings[currentLang].nat.STEP5_TITLE} className="box-shadow">
        asdf
      </Card>
    );
  }
}

export default Step5;
