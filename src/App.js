import React, { Component } from "react";
import { Row, Steps } from "antd";

import "./styles.css";
import strings from "./locale/strings.json";

import svlawLogo from "./svlaw-logo.png";
import { getAccessToken } from "./api/jwt";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import InformationOhneFormular from "./InformationOhneFormular";
import Authenticate from "./Authenticate";
import KycSteps from "./Steps";

class App extends Component {
  state = {
    currentLang: "en",
    isAuthenticated: false,
    clientType: null,
  };

  componentDidMount = () => {
    const isAuthenticated = getAccessToken() != null;
    this.setState({ isAuthenticated });
  };

  render() {
    const { currentLang, currentStep, clientType } = this.state;

    const CT = clientType;

    return (
      <div className="App">
        <div className="main-container">
          <div className="left">
            <div className="content">
              <h1>Client Onboarding</h1>
              <BrowserRouter>
                <Routes>
                  <Route
                    path="/"
                    element={
                      <InformationOhneFormular currentLang={currentLang} />
                    }
                  />
                  <Route
                    path="/:formId/auth"
                    element={<Authenticate currentLang={currentLang} />}
                  />
                  <Route
                    path="/:formId"
                    element={
                      <KycSteps
                        currentLang={currentLang}
                        onClientTypeChange={(ct) => {
                          this.setState({ clientType: ct });
                        }}
                      />
                    }
                  />
                </Routes>
              </BrowserRouter>
              <Row style={{ marginTop: "auto" }}>
                <span style={{ fontSize: "0.8rem", color: "#666666" }}>
                  All data you provide is stored and transferred to us encrypted
                  and is not accessible to third parties. For details, please
                  refer to our{" "}
                  <a
                    href="https://www.sv.law/en/data-protection-declaration"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Data Protection Policy
                  </a>
                  .
                </span>
              </Row>
            </div>
          </div>
          <div className="right">
            <img
              src={svlawLogo}
              className="svlaw-logo"
              alt="STADLER VÖLKEL Logo"
            />
            {CT && CT === "nat" && (
              <div style={{ width: "100%" }} className="steps-nat">
                <p style={{ marginTop: "auto", color: "#ffffff" }}>
                  {strings[currentLang].CLICK_TO_SWITCH_BETWEEN_STEPS}
                </p>
                <Steps
                  direction="vertical"
                  className="progress-steps"
                  current={currentStep}
                  progressDot
                >
                  <Steps.Step
                    title="Type of entity"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step
                    title="Personal information"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step title="Taxation" onStepClick={this.onStepClick} />
                  <Steps.Step
                    title="Legal services"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step title="PEP" onStepClick={this.onStepClick} />
                  <Steps.Step
                    title="Document Upload"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step
                    title="Contact information"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step title="Summary" onStepClick={this.onStepClick} />
                </Steps>
              </div>
            )}
            {CT && CT === "jur" && (
              <div style={{ width: "100%" }} className="steps-jur">
                <p style={{ marginTop: "auto", color: "#ffffff" }}>
                  {strings[currentLang].CLICK_TO_SWITCH_BETWEEN_STEPS}
                </p>
                <Steps
                  direction="vertical"
                  className="progress-steps"
                  current={currentStep}
                  progressDot
                >
                  <Steps.Step
                    title="Type of entity"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step
                    title="Entity information"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step title="Taxation" onStepClick={this.onStepClick} />
                  <Steps.Step
                    title="Legal services"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step
                    title="Managing directors"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step title="PEP" onStepClick={this.onStepClick} />
                  <Steps.Step
                    title="Documents of managing directors"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step
                    title="Beneficial owners"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step title="PEP" onStepClick={this.onStepClick} />
                  <Steps.Step
                    title="Documents of beneficial owners"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step
                    title="Contact information"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step
                    title="Personal information"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step
                    title="Additional documents"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step title="Summary" onStepClick={this.onStepClick} />
                </Steps>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
