import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Col, Collapse, Modal, Row, Space, Tag } from "antd";
import { v4 as uuidv4 } from "uuid";
import JurWirtschaftlicherEigentuemerCard from "./JurWirtschaftlicherEigentuemerCard";
import {
  DeleteOutlined,
  ExclamationCircleTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import strings from "../../../locale/strings.json";
import _, { unset } from "lodash";

class JurWirtschaftlicherEigentuemer extends Component {
  state = { isOptional: false, beneficialOwnerKeyValid: {}, activeKey: null };

  checkIfStepIsOptional = () => {
    const { formData, onChangeFormData } = this.props;
    const { legalServices, otherLegalService, beneficialOwners } = formData;

    this.setState(
      {
        isOptional:
          (!legalServices ||
            (Array.isArray(legalServices) && legalServices.length === 0)) &&
          otherLegalService,
      },
      () => {
        const { isOptional } = this.state;

        if (!beneficialOwners && !isOptional) {
          const uuid = uuidv4();
          onChangeFormData("beneficialOwners", [{ key: uuid }]);
          this.setState({
            beneficialOwnerKeyValid: { [uuid]: false },
            activeKey: uuid,
          });
        }
      }
    );
  };

  validate = () => {
    const { beneficialOwnerKeyValid } = this.state;
    const { setCurrentStepValid, isActive } = this.props;

    if (isActive) {
      if (
        beneficialOwnerKeyValid &&
        Object.keys(beneficialOwnerKeyValid).length > 0
      ) {
        if (
          Object.values(beneficialOwnerKeyValid).findIndex(
            (val) => val === false
          ) >= 0
        ) {
          setCurrentStepValid(false);
        } else {
          setCurrentStepValid(true);
        }
      } else {
        setCurrentStepValid(true);
      }
    }
  };

  insertNameIntoHeader = (nameLegalEntity, header) =>
    header.replace("[NAME_LEGAL_ENTITY]", nameLegalEntity);

  addNewBeneficialOwner = () => {
    const { onChangeFormData, formData } = this.props;
    const { beneficialOwners } = formData;

    const uuid = uuidv4();

    if (beneficialOwners) {
      onChangeFormData("beneficialOwners", [
        ...beneficialOwners,
        { key: uuid },
      ]);
    } else {
      onChangeFormData("beneficialOwners", [{ key: uuid }]);
    }

    this.setState(
      ({ beneficialOwnerKeyValid }) => ({
        beneficialOwnerKeyValid: { ...beneficialOwnerKeyValid, [uuid]: false },
        activeKey: uuid,
      }),
      this.validate
    );
  };

  removeBeneficialOwner = (key) => {
    const { beneficialOwnerKeyValid } = this.state;
    const { onChangeFormData, formData } = this.props;
    const { beneficialOwners } = formData;

    onChangeFormData(
      "beneficialOwners",
      beneficialOwners.filter((md) => md.key !== key)
    );

    unset(beneficialOwnerKeyValid, key);

    this.setState({ beneficialOwnerKeyValid, activeKey: null }, this.validate);
  };

  changeBeneficialOwnerData = (mdKey, key, value) => {
    const { onChangeFormData, formData } = this.props;
    const { beneficialOwners } = formData;

    const index = beneficialOwners.findIndex((md) => md.key === mdKey);
    beneficialOwners[index][key] = value;

    onChangeFormData("beneficialOwners", beneficialOwners);
  };

  componentDidUpdate = (prevProps) => {
    const { formData: prevFormData, isActive: wasActive } = prevProps;
    const { formData, isActive } = this.props;

    const { beneficialOwners: prevBeneficialOwners } = prevFormData;
    const { beneficialOwners } = formData;

    if (
      !_.isEqual(beneficialOwners, prevBeneficialOwners) ||
      (isActive && !wasActive)
    ) {
      this.validate();
      this.checkIfStepIsOptional();
    }
  };

  render() {
    const { isOptional, activeKey } = this.state;
    const { formData, currentLang } = this.props;
    const { beneficialOwners } = formData;
    let nameLegalEntity = "";

    if (formData && formData.clientData) {
      nameLegalEntity = formData.clientData.nameLegalEntity;
    }

    return (
      <>
        {isOptional && (
          <h2>
            <ExclamationCircleTwoTone
              twoToneColor="orange"
              style={{ marginRight: "6px" }}
            />
            <b>This step is optional</b>
          </h2>
        )}
        <h2>
          {this.insertNameIntoHeader(
            nameLegalEntity,
            strings[currentLang].jur
              .STEP_PROVIDE_INFORMATION_ABOUT_BENEFICIAL_OWNERS
          )}
        </h2>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {" "}
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <Button
                size="small"
                icon={<PlusOutlined />}
                onClick={this.addNewBeneficialOwner}
              >
                Add beneficial owner
              </Button>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <Collapse
                accordion
                activeKey={activeKey}
                onChange={(key) => {
                  this.setState({ activeKey: key });
                }}
              >
                {(beneficialOwners || []).map((x) => (
                  <Collapse.Panel
                    key={x.key}
                    header={
                      <>
                        {!x.firstName
                          ? strings[currentLang].jur.BENEFICIAL_OWNER
                          : " "}
                        {x.firstName || ""} {x.lastName || ""}
                        {
                          <Tag color="coral" style={{ marginLeft: "6px" }}>
                            Information inclomplete
                          </Tag>
                        }
                      </>
                    }
                    extra={
                      <Button
                        type="link"
                        danger
                        size="small"
                        icon={<DeleteOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          e.preventDefault();
                          Modal.confirm({
                            title: "Remove?",
                            icon: <DeleteOutlined style={{ color: "red" }} />,
                            okText: "Yes, remove",
                            cancelText: "Cancel",
                            centered: true,
                            okButtonProps: {
                              danger: true,
                              type: "link",
                            },
                            cancelButtonProps: {
                              type: "link",
                            },
                            onOk: () => {
                              this.removeBeneficialOwner(x.key);
                            },
                          });
                          return false;
                        }}
                      />
                    }
                  >
                    <JurWirtschaftlicherEigentuemerCard
                      currentLang={currentLang}
                      onChangeBeneficialOwnerData={(key, value) => {
                        this.changeBeneficialOwnerData(x.key, key, value);
                      }}
                      beneficialOwnerData={x}
                      onValidated={(valid) => {
                        const { beneficialOwnerKeyValid } = this.state;
                        beneficialOwnerKeyValid[x.key] = valid;

                        this.setState(
                          { beneficialOwnerKeyValid },
                          this.validate
                        );
                      }}
                    />
                  </Collapse.Panel>
                ))}
              </Collapse>
            </Col>
          </Row>
          {/* {beneficialOwners && beneficialOwners.length > 0 && (
            <Row gutter={[24, 24]}>
              <Col xs={24}>
                <Button
                  size="small"
                  icon={<PlusOutlined />}
                  onClick={this.addNewManagingDirector}
                >
                  Add person
                </Button>
              </Col>
            </Row>
          )} */}
        </Space>
      </>
    );
  }
}

JurWirtschaftlicherEigentuemer.propTypes = {
  currentLang: PropTypes.oneOf(["de", "en"]),
  formData: PropTypes.shape({
    beneficialOwners: PropTypes.array,
    clientData: PropTypes.shape({
      nameLegalEntity: PropTypes.any,
    }),
    legalServices: PropTypes.array,
    otherLegalService: PropTypes.string,
  }),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
  isActive: PropTypes.bool,
};

export default JurWirtschaftlicherEigentuemer;
