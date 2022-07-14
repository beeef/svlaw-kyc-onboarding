import React, { Component } from "react";
import { Button, Row, Steps } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// Core modules imports are same as usual
import { Pagination } from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import "./styles.css";
import strings from "./locale/strings.json";

import svlawLogo from "./svlaw-logo.png";
import StepNatJurPerson from "./steps/StepNatJurPerson";
import NatStammdaten from "./steps/nat/NatStammdaten";
import JurStammdaten from "./steps/jur/JurStammdaten";
import NatMandantSteuerpflichtig from "./steps/nat/NatMandantSteuerpflichtig";
import NatRechtsgeschaefte from "./steps/nat/NatRechtsgeschaefte";
import NatPEP from "./steps/nat/NatPEP";
import NatDokumentUpload from "./steps/nat/NatDokumentUpload";
import NatZusaetzlicheInformationen from "./steps/nat/NatZusaetzlicheInformationen";
import NatZusammenfassung from "./steps/nat/NatZusammenfassung";
import NatAusfuellerInformation from "./steps/nat/NatAusfuellerInformation";
import JurMandantSteuerpflichtig from "./steps/jur/JurMandantSteuerpflichtig";
import JurRechtsgeschaefte from "./steps/jur/JurRechtsgeschaefte";
import JurGeschaeftsfuehrer from "./steps/jur/JurGeschaeftsfuehrer/JurGeschaeftsfuehrer";
import JurPEP from "./steps/jur/JurPEP";
import JurPEP2 from "./steps/jur/JurPEP2";
import JurGeschaeftsfuehrerDokumentUpload from "./steps/jur/JurGeschaeftsfuehrerDokumentUpload";
import JurWirtschaftlicherEigentuemer from "./steps/jur/JurWirtschaftlicherEigentuemer/JurWirtschaftlicherEigentuemer";
import JurWirtschaftlicherEigentuemerDokumentUpload from "./steps/jur/JurWirtschaftlicherEigentuemerDokumentUpload";
import JurKontaktperson from "./steps/jur/JurKontaktPerson/JurKontaktPerson";
import JurAusfuellerInformation from "./steps/jur/JurAusfuellerInformation";
import JurZusaetzlicheDokumenteUpload from "./steps/jur/JurZusaetzlicheDokumenteUpload";
import JurZusaetzlicheInformationen from "./steps/jur/JurZusaetzlicheInformationen";

class App extends Component {
  state = {
    currentStep: 0,
    currentLang: "en",
    swiperInstance: null,
    formData: {},
    validSteps: { 0: false },
  };

  handleChangeFormData = (key, value, callback) => {
    this.setState(
      (state) => ({
        formData: { ...state.formData, [key]: value },
      }),
      callback
    );
  };

  gotoPrevStep = () => {
    const { swiperInstance } = this.state;
    swiperInstance.slidePrev(400);
  };

  gotoNextStep = () => {
    const { swiperInstance } = this.state;
    swiperInstance.slideNext(400);
  };

  onStepClick = (index) => {
    this.setState({ currentStep: index });

    const { swiperInstance } = this.state;
    swiperInstance.slideTo(index, 400);
  };

  isNextStepValid = () => {
    const { currentStep } = this.state;

    return this.isStepValid(currentStep);
  };

  isStepValid = (stepIndex) => {
    const { validSteps } = this.state;

    return validSteps[stepIndex];
  };

  setCurrentStepValid = (valid) => {
    const { validSteps, currentStep } = this.state;

    this.setState({ validSteps: { ...validSteps, [currentStep]: valid } });
  };

  render() {
    const { currentLang, swiperInstance, formData, currentStep } = this.state;

    const CT = formData && formData.clientType;

    return (
      <div className="App">
        <div className="main-container">
          <div className="left">
            <div className="content">
              <h1>Client Onboarding</h1>
              <Swiper
                allowTouchMove={false}
                pagination={{
                  type: "progressbar",
                }}
                navigation={false}
                modules={[Pagination]}
                className="mySwiper"
                onSwiper={(swiper) => {
                  swiper.on("activeIndexChange", (swiper) => {
                    this.setState({
                      swiperInstance: swiper,
                      currentStep: swiper.activeIndex,
                    });
                    console.log("index changed", swiper.activeIndex);
                  });
                  this.setState({ swiperInstance: swiper });
                }}
              >
                <SwiperSlide tabIndex={-1}>
                  {({ isActive }) => (
                    <StepNatJurPerson
                      isActive={isActive}
                      currentLang={currentLang}
                      onChangeFormData={this.handleChangeFormData}
                      setCurrentStepValid={this.setCurrentStepValid}
                    />
                  )}
                </SwiperSlide>
                <SwiperSlide tabIndex={-1}>
                  {({ isActive }) => {
                    if (CT) {
                      return (
                        <>
                          {CT === "nat" && (
                            <NatStammdaten
                              isActive={isActive}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                          {CT === "jur" && (
                            <JurStammdaten
                              isActive={isActive}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                        </>
                      );
                    }
                  }}
                </SwiperSlide>
                <SwiperSlide tabIndex={-1}>
                  {({ isActive }) => {
                    if (CT) {
                      return (
                        <>
                          {CT === "nat" && (
                            <NatMandantSteuerpflichtig
                              isActive={isActive}
                              formData={formData}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                          {CT === "jur" && (
                            <JurMandantSteuerpflichtig
                              isActive={isActive}
                              formData={formData}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                        </>
                      );
                    }
                  }}
                </SwiperSlide>
                <SwiperSlide tabIndex={-1}>
                  {({ isActive }) => {
                    if (CT) {
                      return (
                        <>
                          {CT === "nat" && (
                            <NatRechtsgeschaefte
                              isActive={isActive}
                              formData={formData}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                          {CT === "jur" && (
                            <JurRechtsgeschaefte
                              isActive={isActive}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              formData={formData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                        </>
                      );
                    }
                  }}
                </SwiperSlide>
                <SwiperSlide tabIndex={-1}>
                  {({ isActive }) => {
                    if (CT) {
                      return (
                        <>
                          {CT === "nat" && (
                            <NatPEP
                              isActive={isActive}
                              formData={formData}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                          {CT === "jur" && (
                            <JurGeschaeftsfuehrer
                              isActive={isActive}
                              formData={formData}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                        </>
                      );
                    }
                  }}
                </SwiperSlide>
                <SwiperSlide tabIndex={-1}>
                  {({ isActive }) => {
                    if (CT) {
                      return (
                        <>
                          {CT === "nat" && (
                            <NatDokumentUpload
                              isActive={isActive}
                              formData={formData}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                          {CT === "jur" && (
                            <JurPEP
                              isActive={isActive}
                              formData={formData}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                        </>
                      );
                    }
                  }}
                </SwiperSlide>
                <SwiperSlide tabIndex={-1}>
                  {({ isActive }) => {
                    if (CT) {
                      return (
                        <>
                          {CT === "nat" && (
                            <NatAusfuellerInformation
                              isActive={isActive}
                              formData={formData}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                          {CT === "jur" && (
                            <JurGeschaeftsfuehrerDokumentUpload
                              isActive={isActive}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              formData={formData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                        </>
                      );
                    }
                  }}
                </SwiperSlide>
                <SwiperSlide tabIndex={-1}>
                  {({ isActive }) => {
                    if (CT) {
                      return (
                        <>
                          {CT === "nat" && (
                            <NatZusaetzlicheInformationen
                              isActive={isActive}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                          {CT === "jur" && (
                            <JurWirtschaftlicherEigentuemer
                              isActive={isActive}
                              formData={formData}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                        </>
                      );
                    }
                  }}
                </SwiperSlide>
                <SwiperSlide tabIndex={-1}>
                  {({ isActive }) => {
                    if (CT) {
                      return (
                        <>
                          {CT === "nat" && (
                            <NatZusammenfassung
                              isActive={isActive}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              formData={formData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                          {CT === "jur" && (
                            <JurPEP2
                              isActive={isActive}
                              formData={formData}
                              currentLang={currentLang}
                              onChangeFormData={this.handleChangeFormData}
                              setCurrentStepValid={this.setCurrentStepValid}
                            />
                          )}
                        </>
                      );
                    }
                  }}
                </SwiperSlide>
                {CT && CT === "jur" && (
                  <SwiperSlide tabIndex={-1}>
                    {({ isActive }) => (
                      <JurWirtschaftlicherEigentuemerDokumentUpload
                        isActive={isActive}
                        formData={formData}
                        currentLang={currentLang}
                        onChangeFormData={this.handleChangeFormData}
                        setCurrentStepValid={this.setCurrentStepValid}
                      />
                    )}
                  </SwiperSlide>
                )}
                {CT && CT === "jur" && (
                  <SwiperSlide tabIndex={-1}>
                    {({ isActive }) => (
                      <JurKontaktperson
                        isActive={isActive}
                        formData={formData}
                        currentLang={currentLang}
                        onChangeFormData={this.handleChangeFormData}
                        setCurrentStepValid={this.setCurrentStepValid}
                      />
                    )}
                  </SwiperSlide>
                )}
                {CT && CT === "jur" && (
                  <SwiperSlide tabIndex={-1}>
                    {({ isActive }) => (
                      <JurAusfuellerInformation
                        isActive={isActive}
                        formData={formData}
                        currentLang={currentLang}
                        onChangeFormData={this.handleChangeFormData}
                        setCurrentStepValid={this.setCurrentStepValid}
                      />
                    )}
                  </SwiperSlide>
                )}
                {CT && CT === "jur" && (
                  <SwiperSlide tabIndex={-1}>
                    {({ isActive }) => (
                      <JurZusaetzlicheDokumenteUpload
                        isActive={isActive}
                        formData={formData}
                        currentLang={currentLang}
                        onChangeFormData={this.handleChangeFormData}
                        setCurrentStepValid={this.setCurrentStepValid}
                      />
                    )}
                  </SwiperSlide>
                )}
              </Swiper>
              <Row
                justify="space-between"
                style={{ marginTop: "24px", margin: "12px 24px" }}
              >
                <Button
                  icon={<LeftOutlined />}
                  onClick={this.gotoPrevStep}
                  disabled={!swiperInstance || swiperInstance.activeIndex === 0}
                >
                  {strings[currentLang].BACK}
                </Button>
                <Button
                  onClick={this.gotoNextStep}
                  disabled={!this.isNextStepValid()}
                >
                  {swiperInstance &&
                  swiperInstance.activeIndex !==
                    swiperInstance.slides.length - 1 ? (
                    <>
                      {strings[currentLang].NEXT} <RightOutlined />
                    </>
                  ) : (
                    strings[currentLang].SUBMIT
                  )}
                </Button>
              </Row>
              <Row>
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
              <div style={{ width: "100%" }}>
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
                  <Steps.Step
                    title="Additional remarks"
                    onStepClick={this.onStepClick}
                  />
                  <Steps.Step title="Summary" onStepClick={this.onStepClick} />
                </Steps>
              </div>
            )}
            {CT && CT === "jur" && (
              <div style={{ width: "100%" }}>
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
