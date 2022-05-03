import React, { Component } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination } from "swiper";
import "antd/dist/antd.css";
import "./styles.css";
import strings from "./locale/strings.json";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";
import { Button, Row } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import svlawLogo from "./svlaw-logo.png";
import StepNatJurPerson from "./steps/StepNatJurPerson";

class App extends Component {
  state = {
    currentStep: 0,
    currentLang: "de",
    swiperInstance: null,
    formData: {}
  };

  handleChangeFormData = (key, value) => {
    this.setState((state) => ({
      formData: { ...state.formData, [key]: value }
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
    const { currentLang, swiperInstance } = this.state;

    return (
      <div className="App">
        <div className="main-container">
          <div className="left">
            <div className="content">
              <h1>OnBoarding</h1>
              <Swiper
                allowTouchMove={false}
                pagination={{
                  type: "progressbar"
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
                  <Step1
                    currentLang={currentLang}
                    onChangeFormData={this.handleChangeFormData}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Step2 currentLang={currentLang} />
                </SwiperSlide>
                <SwiperSlide>
                  <Step3 currentLang={currentLang} />
                </SwiperSlide>
                <SwiperSlide>
                  <Step4 currentLang={currentLang} />
                </SwiperSlide>
                <SwiperSlide>
                  <Step5 currentLang={currentLang} />
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
                  Zurück
                </Button>
                <Button onClick={this.gotoNextStep}>
                  Weiter <RightOutlined />
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
