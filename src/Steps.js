import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, message, Row } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import JurAusfuellerInformation from "./steps/jur/JurAusfuellerInformation";
import JurGeschaeftsfuehrer from "./steps/jur/JurGeschaeftsfuehrer/JurGeschaeftsfuehrer";
import JurGeschaeftsfuehrerDokumentUpload from "./steps/jur/JurGeschaeftsfuehrerDokumentUpload";
import JurKontaktperson from "./steps/jur/JurKontaktPerson/JurKontaktPerson";
import JurMandantSteuerpflichtig from "./steps/jur/JurMandantSteuerpflichtig";
import JurPEP from "./steps/jur/JurPEP";
import JurPEP2 from "./steps/jur/JurPEP2";
import JurRechtsgeschaefte from "./steps/jur/JurRechtsgeschaefte";
import JurStammdaten from "./steps/jur/JurStammdaten";
import JurWirtschaftlicherEigentuemer from "./steps/jur/JurWirtschaftlicherEigentuemer/JurWirtschaftlicherEigentuemer";
import JurWirtschaftlicherEigentuemerDokumentUpload from "./steps/jur/JurWirtschaftlicherEigentuemerDokumentUpload";
import JurZusaetzlicheDokumenteUpload from "./steps/jur/JurZusaetzlicheDokumenteUpload";
import JurZusammenfassung from "./steps/jur/JurZusammenfassung";
import NatAusfuellerInformation from "./steps/nat/NatAusfuellerInformation";
import NatDokumentUpload from "./steps/nat/NatDokumentUpload";
import NatMandantSteuerpflichtig from "./steps/nat/NatMandantSteuerpflichtig";
import NatPEP from "./steps/nat/NatPEP";
import NatRechtsgeschaefte from "./steps/nat/NatRechtsgeschaefte";
import NatStammdaten from "./steps/nat/NatStammdaten";
import NatZusammenfassung from "./steps/nat/NatZusammenfassung";
import StepNatJurPerson from "./steps/StepNatJurPerson";
import strings from "./locale/strings.json";

// Core modules imports are same as usual
import { Pagination } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import { getAccessToken } from "./api/jwt";
import withRouter from "./util/withRouter";
import { getFormDataForId } from "./api/api";

class Steps extends Component {
  state = {
    currentStep: 0,
    swiperInstance: null,
    formData: {},
    validSteps: { 0: false },
    isAuthenticated: null,
  };

  handleChangeFormData = (key, value, callback) => {
    if (key === "clientType") {
      const { onClientTypeChange } = this.props;
      onClientTypeChange(value);
    }

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

  componentDidMount = async () => {
    const token = getAccessToken();
    this.setState({ isAuthenticated: token != null });

    const { router } = this.props;
    const { navigate, params } = router;

    if (token == null) {
      navigate(`/${params.formId}/auth`);
    } else {
      // token überprüfen
      const { formId } = params;

      try {
        const { success } = (await getFormDataForId(formId)).data;

        if (success != null && success === false) {
          navigate(`/${formId}/auth`);
        }
      } catch (err) {
        if (err.response && err.response.status != null) {
          navigate(`/${formId}/auth`);
        } else {
          message.error("Error fetching data. Please try again later.");
        }
      }
    }
  };

  render() {
    const { formData, swiperInstance } = this.state;
    const { currentLang } = this.props;

    const CT = formData && formData.clientType;

    // if (isAuthenticated === false) <Navigate
    return (
      <>
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
                      <NatZusammenfassung
                        isActive={isActive}
                        currentLang={currentLang}
                        onChangeFormData={this.handleChangeFormData}
                        formData={formData}
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
          {CT && CT === "jur" && (
            <SwiperSlide>
              {({ isActive }) => (
                <JurPEP2
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
            <SwiperSlide>
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
            <SwiperSlide>
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
            <SwiperSlide>
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
            <SwiperSlide>
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
          {CT && CT === "jur" && (
            <SwiperSlide>
              {({ isActive }) => (
                <JurZusammenfassung
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
            swiperInstance.activeIndex !== swiperInstance.slides.length - 1 ? (
              <>
                {strings[currentLang].NEXT} <RightOutlined />
              </>
            ) : (
              strings[currentLang].SUBMIT
            )}
          </Button>
        </Row>
      </>
    );
  }
}

Steps.propTypes = {
  currentLang: PropTypes.oneOf(["de", "en"]),
  router: PropTypes.any,
  onClientTypeChange: PropTypes.func,
};

export default withRouter(Steps);
