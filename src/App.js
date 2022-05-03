import React, { Component } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import "antd/dist/antd.css";
import "./styles.css";
import strings from "./locale/strings.json";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";
import Step5 from "./steps/Step5";

class App extends Component {
  state = { currentStep: 0, currentLang: "de", swiperInstance: null };

  gotoPrevStep = () => {
    const { swiperInstance } = this.state;
    swiperInstance.slidePrev(400);
  };

  gotoNextStep = () => {
    const { swiperInstance } = this.state;
    swiperInstance.slideNext(400);
  };

  render() {
    const { currentStep, currentLang } = this.state;

    return (
      <div className="App">
        <div className="main-container">
          <div className="left">
            {/*
            <PageHeader title="KYC Formular" subTitle="Natürliche Person">
              <Steps
                direction="horizontal"
                current={currentStep}
                progressDot
                onChange={(current) => {
                  this.setState({ currentStep: current });
                  this.carouselRef.current.goTo(current);
                }}
              >
                <Steps.Step title={strings[currentLang].nat.STEP1_TITLE} />
                <Steps.Step title={strings[currentLang].nat.STEP2_TITLE} />
                <Steps.Step title={strings[currentLang].nat.STEP3_TITLE} />
                <Steps.Step title={strings[currentLang].nat.STEP4_TITLE} />
                <Steps.Step title={strings[currentLang].nat.STEP5_TITLE} />
              </Steps>
            </PageHeader>
              */}
            <div className="content">
              <h1>SV.LAW OnBoarding</h1>
              <Swiper
                allowTouchMove={true}
                pagination={{
                  type: "progressbar"
                }}
                navigation={false}
                modules={[Pagination]}
                className="mySwiper"
                onSwiper={(swiper) => {
                  this.setState({ swiperInstance: swiper });
                }}
              >
                <SwiperSlide>
                  <Step1
                    currentLang={currentLang}
                    gotoPrev={this.gotoPrevStep}
                    gotoNext={this.gotoNextStep}
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <Step2
                    currentLang={currentLang}
                    gotoPrev={this.gotoPrevStep}
                    gotoNext={this.gotoNextStep}
                  />
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
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>
    );
  }
}

export default App;
