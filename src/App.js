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
import NatFuerWenLeistungen from "./steps/nat/NatFuerWenLeistungen";
import NatPEP from "./steps/nat/NatPEP";
import NatDokumentUpload from "./steps/nat/NatDokumentUpload";
import NatZusaetzlicheInformationen from "./steps/nat/NatZusaetzlicheInformationen";
import NatZusammenfassung from "./steps/nat/NatZusammenfassung";

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
              <h1>OnBoarding</h1>
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
                        <NatRechtsgeschaefte
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
                        <NatFuerWenLeistungen
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
                        <NatPEP
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
                        <NatDokumentUpload
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
                        <NatZusaetzlicheInformationen
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
                        <NatZusammenfassung
                          currentLang={currentLang}
                          onChangeFormData={this.handleChangeFormData}
                          formData={formData}
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
                  {strings[currentLang].NEXT} <RightOutlined />
                </Button>
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
