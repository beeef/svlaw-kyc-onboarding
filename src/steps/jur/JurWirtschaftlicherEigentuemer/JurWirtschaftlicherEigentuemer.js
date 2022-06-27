import React, { Component } from "react";
import { Button, Col, Collapse, Modal, Row, Space } from "antd";
import { v4 as uuidv4 } from "uuid";
import JurWirtschaftlicherEigentuemerCard from "./JurWirtschaftlicherEigentuemerCard";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import strings from "../../../locale/strings.json";

class JurWirtschaftlicherEigentuemer extends Component {
  state = {};

  componentDidMount = () => {
    const { onChangeFormData, formData } = this.props;
    const { beneficialOwners } = formData;

    if (!beneficialOwners) {
      onChangeFormData("beneficialOwners", [{ key: uuidv4() }]);
    }
  };

  insertNameIntoHeader = (nameLegalEntity, header) =>
    header.replace("[NAME_LEGAL_ENTITY]", nameLegalEntity);

  addNewBeneficialOwner = () => {
    const { onChangeFormData, formData } = this.props;
    const { beneficialOwners } = formData;

    if (beneficialOwners) {
      onChangeFormData("beneficialOwners", [
        ...beneficialOwners,
        { key: uuidv4() },
      ]);
    } else {
      onChangeFormData("beneficialOwners", [{ key: uuidv4() }]);
    }
  };

  removeBeneficialOwner = (key) => {
    const { onChangeFormData, formData } = this.props;
    const { beneficialOwners } = formData;

    onChangeFormData(
      "beneficialOwners",
      beneficialOwners.filter((md) => md.key !== key)
    );
  };

  changeBeneficialOwnerData = (mdKey, key, value) => {
    const { onChangeFormData, formData } = this.props;
    const { beneficialOwners } = formData;

    const index = beneficialOwners.findIndex((md) => md.key === mdKey);
    beneficialOwners[index][key] = value;

    onChangeFormData("beneficialOwners", beneficialOwners);
  };

  render() {
    const { formData, currentLang } = this.props;
    const { beneficialOwners } = formData;
    let nameLegalEntity = "";

    if (formData && formData.clientData) {
      nameLegalEntity = formData.clientData.nameLegalEntity;
    }

    return (
      <>
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
                defaultActiveKey={
                  beneficialOwners && beneficialOwners.length > 0
                    ? beneficialOwners[0].key
                    : null
                }
              >
                {(beneficialOwners || []).map((x) => (
                  <Collapse.Panel
                    key={x.key}
                    header={`${
                      !x.firstName
                        ? strings[currentLang].jur.BENEFICIAL_OWNER
                        : " "
                    }${x.firstName || ""} ${x.lastName || ""}`}
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

export default JurWirtschaftlicherEigentuemer;
