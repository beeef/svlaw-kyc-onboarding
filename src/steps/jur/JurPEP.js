import React, { Component } from "react";
import { Button, Input, Modal, Radio, Space } from "antd";
import ReactMarkdown from "react-markdown";
import strings from "../../locale/strings.json";
import pepDefinitionMd from "../../locale/PEP_en.md";

class JurPEP extends Component {
  state = { selectedAnswer: null, pepDefinition: null };

  constructor(props) {
    super(props);

    fetch(pepDefinitionMd)
      .then((res) => res.text())
      .then((text) => {
        this.state.pepDefinition = text;
      });
  }

  render() {
    const { selectedAnswer, pepDefinition } = this.state;
    const { currentLang } = this.props;

    return (
      <>
        <h2 style={{ marginBottom: 0, padding: 0 }}>
          {strings[currentLang].jur.STEP_PEP}
        </h2>
        <div style={{ marginBottom: "24px" }}>
          <Button
            size="small"
            type="link"
            style={{ margin: 0, padding: 0 }}
            onClick={() => {
              Modal.info({
                title: "PEP",
                content: <ReactMarkdown>{pepDefinition}</ReactMarkdown>,
                width: "80%",
                centered: true,
              });
            }}
          >
            What is a PEP?
          </Button>
        </div>
        <Radio.Group
          value={selectedAnswer}
          onChange={(e) => {
            this.setState({ selectedAnswer: e.target.value });
          }}
        >
          <Space direction="vertical">
            <Radio value={strings[currentLang].YES}>
              {strings[currentLang].YES}
            </Radio>
            <Radio value={strings[currentLang].NO}>
              {strings[currentLang].NO}
            </Radio>
          </Space>
        </Radio.Group>

        <div
          style={{ marginTop: "24px" }}
          className={
            selectedAnswer != null &&
            selectedAnswer === strings[currentLang].YES
              ? "fade-in"
              : "fade-out"
          }
        >
          <h3>{strings[currentLang].PLEASE_EXPLAIN}</h3>
          <Input.TextArea rows={4} />
        </div>
      </>
    );
  }
}

export default JurPEP;
