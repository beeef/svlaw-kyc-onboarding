import { Col, Row } from "antd";
import React, { Component } from "react";
import strings from "../../../locale/strings.json";
import JurGeschaeftsfuehrerCard from "./JurGeschaeftsfuehrerCard";

class JurGeschaeftsfuehrer extends Component {
  state = {};

  insertNameIntoHeader = (nameLegalEntity, header) => {
    console.log("header", header);
    return header.replace("[NAME_LEGAL_ENTITY]", nameLegalEntity);
  };

  render() {
    const { formData, currentLang } = this.props;
    let nameLegalEntity = "";

    if (formData && formData.clientData) {
      nameLegalEntity = formData.clientData.nameLegalEntity;
    }

    console.log(
      strings[currentLang].jur.STEP_PROVIDE_INFORMATION_ABOUT_MANAGING_DIRECTORS
    );

    return (
      <>
        <h2>
          {this.insertNameIntoHeader(
            nameLegalEntity,
            strings[currentLang].jur
              .STEP_PROVIDE_INFORMATION_ABOUT_MANAGING_DIRECTORS
          )}
        </h2>
        <Row gutter={[24, 24]}>
          {[1, 2, 3, 4].map((x) => (
            <Col xs={24} key={x}>
              <JurGeschaeftsfuehrerCard currentLang={currentLang} />
            </Col>
          ))}
        </Row>
      </>
    );
  }
}

export default JurGeschaeftsfuehrer;
