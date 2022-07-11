import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Input, Modal, Radio, Space } from "antd";
import ReactMarkdown from "react-markdown";
import strings from "../../locale/strings.json";
import pepDefinitionMd from "../../locale/PEP_en.md";

class NatPEP extends Component {
  state = { selectedAnswer: null, explanation: null, pepDefinition: null };

  constructor(props) {
    super(props);

    fetch(pepDefinitionMd)
      .then((res) => res.text())
      .then((text) => {
        this.state.pepDefinition = text;
      });
  }

  validate = () => {
    const { selectedAnswer, explanation } = this.state;
    const { currentLang, setCurrentStepValid } = this.props;

    if (
      selectedAnswer &&
      selectedAnswer === strings[currentLang].nat.NONE_OF_ABOVE
    ) {
      setCurrentStepValid(true);
    } else if (selectedAnswer && explanation && explanation.length > 0) {
      setCurrentStepValid(true);
    } else {
      setCurrentStepValid(false);
    }
  };

  render() {
    const { selectedAnswer, pepDefinition } = this.state;
    const { currentLang } = this.props;

    return (
      <>
        <h2 style={{ marginBottom: 0, padding: 0 }}>
          {strings[currentLang].nat.STEP_PEP}
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
            this.setState({ selectedAnswer: e.target.value }, this.validate);
          }}
        >
          <Space direction="vertical">
            <Radio value={strings[currentLang].nat.CLIENT}>
              {strings[currentLang].nat.CLIENT}
            </Radio>
            <Radio value={strings[currentLang].nat.FAMILY_MEMBER_OF_CLIENT}>
              {strings[currentLang].nat.FAMILY_MEMBER_OF_CLIENT}
            </Radio>
            <Radio value={strings[currentLang].nat.CLOSE_ASSOCIATE_OF_CLIENT}>
              {strings[currentLang].nat.CLOSE_ASSOCIATE_OF_CLIENT}
            </Radio>
            <Radio value={strings[currentLang].nat.NONE_OF_ABOVE}>
              {strings[currentLang].nat.NONE_OF_ABOVE}
            </Radio>
          </Space>
        </Radio.Group>

        <div
          style={{ marginTop: "24px" }}
          className={
            selectedAnswer != null &&
            selectedAnswer !== strings[currentLang].nat.NONE_OF_ABOVE
              ? "fade-in"
              : "fade-out"
          }
        >
          <h3>{strings[currentLang].PLEASE_EXPLAIN}</h3>
          <Input.TextArea
            rows={4}
            placeholder="Enter some text"
            onChange={(e) => {
              this.setState({ explanation: e.target.value }, this.validate);
            }}
          />
        </div>
      </>
    );
  }
}

NatPEP.propTypes = {
  currentLang: PropTypes.any,
  setCurrentStepValid: PropTypes.func,
};

export default NatPEP;
