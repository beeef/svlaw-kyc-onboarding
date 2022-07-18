import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Input, Modal, Radio, Space } from "antd";
import ReactMarkdown from "react-markdown";
import strings from "../../locale/strings.json";
import pepDefinitionMd from "../../locale/PEP_en.md";

class JurPEP2 extends Component {
  state = { selectedAnswer1: null, selectedAnswer2: null, pepDefinition: null };

  constructor(props) {
    super(props);

    fetch(pepDefinitionMd)
      .then((res) => res.text())
      .then((text) => {
        this.state.pepDefinition = text;
      });

    this.textareaChangedTimeout = null;
  }

  validate = () => {
    const { selectedAnswer1, selectedAnswer2 } = this.state;
    const { formData, setCurrentStepValid, isActive, currentLang } = this.props;

    const { beneficialOwnerPepExplanation1, beneficialOwnerPepExplanation2 } =
      formData;

    if (isActive) {
      if (selectedAnswer1 && selectedAnswer1 === strings[currentLang].NO) {
        if (selectedAnswer2 && selectedAnswer2 === strings[currentLang].NO) {
          setCurrentStepValid(true);
        } else if (
          selectedAnswer2 &&
          selectedAnswer2 === strings[currentLang].YES &&
          beneficialOwnerPepExplanation2 &&
          beneficialOwnerPepExplanation2.length > 2
        ) {
          setCurrentStepValid(true);
        } else {
          setCurrentStepValid(false);
        }
      } else if (
        selectedAnswer1 &&
        selectedAnswer1 === strings[currentLang].YES &&
        beneficialOwnerPepExplanation1 &&
        beneficialOwnerPepExplanation1.length > 2
      ) {
        if (selectedAnswer2 && selectedAnswer2 === strings[currentLang].NO) {
          setCurrentStepValid(true);
        } else if (
          selectedAnswer2 &&
          selectedAnswer2 === strings[currentLang].YES &&
          beneficialOwnerPepExplanation2 &&
          beneficialOwnerPepExplanation2.length > 2
        ) {
          setCurrentStepValid(true);
        } else {
          setCurrentStepValid(false);
        }
      } else {
        setCurrentStepValid(false);
      }
    }
  };

  render() {
    const { selectedAnswer1, selectedAnswer2, pepDefinition } = this.state;
    const { currentLang, onChangeFormData } = this.props;

    return (
      <>
        <div style={{ marginTop: "24px" }}>
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
        <h2 style={{ marginBottom: 0, padding: 0 }}>
          {strings[currentLang].jur.STEP_PEP3}
        </h2>

        <Radio.Group
          value={selectedAnswer1}
          onChange={(e) => {
            this.setState({ selectedAnswer1: e.target.value }, this.validate);
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
            selectedAnswer1 != null &&
            selectedAnswer1 === strings[currentLang].YES
              ? "fade-in"
              : "fade-out"
          }
        >
          <h3>{strings[currentLang].PLEASE_EXPLAIN}</h3>
          <Input.TextArea
            rows={4}
            style={{ resize: "none" }}
            onChange={(e) => {
              if (this.textareaChangedTimeout) clearTimeout(this.text);
              this.textareaChangedTimeout = setTimeout(() => {
                onChangeFormData(
                  "beneficialOwnerPepExplanation1",
                  e.target.value
                );
                this.validate();
              }, 400);
            }}
          />
        </div>

        <h2 style={{ marginBottom: 0, padding: 0 }}>
          {strings[currentLang].jur.STEP_PEP4}
        </h2>

        <Radio.Group
          value={selectedAnswer2}
          onChange={(e) => {
            this.setState({ selectedAnswer2: e.target.value }, this.validate);
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
            selectedAnswer2 != null &&
            selectedAnswer2 === strings[currentLang].YES
              ? "fade-in"
              : "fade-out"
          }
        >
          <h3>{strings[currentLang].PLEASE_EXPLAIN}</h3>
          <Input.TextArea
            rows={4}
            style={{ resize: "none" }}
            onChange={(e) => {
              if (this.textareaChangedTimeout) clearTimeout(this.text);
              this.textareaChangedTimeout = setTimeout(() => {
                onChangeFormData(
                  "beneficialOwnerPepExplanation2",
                  e.target.value
                );
                this.validate();
              }, 400);
            }}
          />
        </div>
      </>
    );
  }
}

JurPEP2.propTypes = {
  currentLang: PropTypes.any,
  formData: PropTypes.shape({
    beneficialOwnerPepExplanation1: PropTypes.any,
    beneficialOwnerPepExplanation2: PropTypes.any,
  }),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
  isActive: PropTypes.bool,
};

export default JurPEP2;
