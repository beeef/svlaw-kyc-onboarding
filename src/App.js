import React, { Component } from "react";
import { Button, Row } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

// Core modules imports are same as usual
import { Pagination } from "swiper";
// Direct React component imports
import { Swiper, SwiperSlide } from "swiper/react/swiper-react.js";

// Styles must use direct files imports
import "swiper/swiper.scss"; // core Swiper
import "swiper/modules/navigation/navigation.scss"; // Navigation module
import "swiper/modules/pagination/pagination.scss"; // Pagination module

import "antd/dist/antd.css";
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
import JurPEP3 from "./steps/jur/JurPEP3";
import JurPEP4 from "./steps/jur/JurPEP4";
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
  };

  handleChangeFormData = (key, value) => {
    this.setState((state) => ({
      formData: { ...state.formData, [key]: value },
    }));
  };

  gotoPrevStep = () => {
    const { swiperInstance } = this.state;
    swiperInstance.slidePrev(400);
  };

  gotoNextStep = () => {
    const { swiperInstance } = this.state;
    swiperInstance.slideNext(400);
  };

  render() {
    const { currentLang, swiperInstance, formData } = this.state;

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
                    this.setState({ swiperInstance: swiper });
                  });
                  this.setState({ swiperInstance: swiper });
                }}
              >
                <SwiperSlide>
                  <StepNatJurPerson
                    currentLang={currentLang}
                    onChangeFormData={this.handleChangeFormData}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  {CT && (
                    <>
                      {CT === "nat" && (
                        <NatStammdaten
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                        />
                      )}
                      {CT === "jur" && (
                        <JurStammdaten
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                        />
                      )}
                    </>
                  )}
                </SwiperSlide>
                <SwiperSlide>
                  {CT && (
                    <>
                      {CT === "nat" && (
                        <NatMandantSteuerpflichtig
                          formData={formData}
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                        />
                      )}
                      {CT === "jur" && (
                        <JurMandantSteuerpflichtig
                          formData={formData}
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                        />
                      )}
                    </>
                  )}
                </SwiperSlide>
                <SwiperSlide>
                  {CT && (
                    <>
                      {CT === "nat" && (
                        <NatRechtsgeschaefte
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                        />
                      )}
                      {CT === "jur" && (
                        <JurRechtsgeschaefte
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                          formData={formData}
                        />
                      )}
                    </>
                  )}
                </SwiperSlide>
                <SwiperSlide>
                  {CT && (
                    <>
                      {CT === "nat" && (
                        <NatPEP
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                        />
                      )}
                      {CT === "jur" && (
                        <JurGeschaeftsfuehrer
                          formData={formData}
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                        />
                      )}
                    </>
                  )}
                </SwiperSlide>
                <SwiperSlide>
                  {CT && (
                    <>
                      {CT === "nat" && (
                        <NatDokumentUpload
                          formData={formData}
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                        />
                      )}
                      {CT === "jur" && (
                        <JurPEP
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                        />
                      )}
                    </>
                  )}
                </SwiperSlide>
                <SwiperSlide>
                  {CT && (
                    <>
                      {CT === "nat" && (
                        <NatAusfuellerInformation
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                        />
                      )}
                      {CT === "jur" && (
                        <JurPEP2
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                        />
                      )}
                    </>
                  )}
                </SwiperSlide>
                <SwiperSlide>
                  {CT && (
                    <>
                      {CT === "nat" && (
                        <NatZusaetzlicheInformationen
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                        />
                      )}
                      {CT === "jur" && (
                        <JurGeschaeftsfuehrerDokumentUpload
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                          formData={formData}
                        />
                      )}
                    </>
                  )}
                </SwiperSlide>
                <SwiperSlide>
                  {CT && (
                    <>
                      {CT === "nat" && (
                        <NatZusammenfassung
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                          formData={formData}
                        />
                      )}
                      {CT === "jur" && (
                        <JurWirtschaftlicherEigentuemer
                          formData={formData}
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                        />
                      )}
                    </>
                  )}
                </SwiperSlide>
                {CT && CT === "jur" && (
                  <SwiperSlide>
                    <JurPEP3
                      formData={formData}
                      currentLang={currentLang}
                      onChangeFormData={this.handleChangeFormData}
                    />
                  </SwiperSlide>
                )}
                {CT && CT === "jur" && (
                  <SwiperSlide>
                    <JurPEP4
                      formData={formData}
                      currentLang={currentLang}
                      onChangeFormData={this.handleChangeFormData}
                    />
                  </SwiperSlide>
                )}
                {CT && CT === "jur" && (
                  <SwiperSlide>
                    <JurWirtschaftlicherEigentuemerDokumentUpload
                      formData={formData}
                      currentLang={currentLang}
                      onChangeFormData={this.handleChangeFormData}
                    />
                  </SwiperSlide>
                )}
                {CT && CT === "jur" && (
                  <SwiperSlide>
                    <JurKontaktperson
                      formData={formData}
                      currentLang={currentLang}
                      onChangeFormData={this.handleChangeFormData}
                    />
                  </SwiperSlide>
                )}
                {CT && CT === "jur" && (
                  <SwiperSlide>
                    <JurAusfuellerInformation
                      formData={formData}
                      currentLang={currentLang}
                      onChangeFormData={this.handleChangeFormData}
                    />
                  </SwiperSlide>
                )}
                {CT && CT === "jur" && (
                  <SwiperSlide>
                    <JurZusaetzlicheDokumenteUpload
                      formData={formData}
                      currentLang={currentLang}
                      onChangeFormData={this.handleChangeFormData}
                    />
                  </SwiperSlide>
                )}
                {CT && CT === "jur" && (
                  <SwiperSlide>
                    <JurZusaetzlicheInformationen
                      formData={formData}
                      currentLang={currentLang}
                      onChangeFormData={this.handleChangeFormData}
                    />
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
                <Button onClick={this.gotoNextStep}>
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
          </div>
        </div>
      </div>
    );
  }
}

export default App;
