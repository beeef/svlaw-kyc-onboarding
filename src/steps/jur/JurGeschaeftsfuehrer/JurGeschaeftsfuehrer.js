import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Col, Collapse, Modal, Row, Space, Tag } from "antd";
import { v4 as uuidv4 } from "uuid";
import JurGeschaeftsfuehrerCard from "./JurGeschaeftsfuehrerCard";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import strings from "../../../locale/strings.json";
import _, { unset } from "lodash";

class JurGeschaeftsfuehrer extends Component {
  state = { managingDirectorKeyValid: {}, activeKey: null };

  componentDidMount = () => {
    const { onChangeFormData, formData } = this.props;
    const { managingDirectors } = formData;

    const uuid = uuidv4();

    if (!managingDirectors) {
      onChangeFormData("managingDirectors", [{ key: uuid }]);
      this.setState({
        managingDirectorKeyValid: { [uuid]: false },
        activeKey: uuid,
      });
    }
  };

  validate = () => {
    const { managingDirectorKeyValid } = this.state;
    const { setCurrentStepValid, isActive } = this.props;

    if (isActive) {
      if (
        managingDirectorKeyValid &&
        Object.keys(managingDirectorKeyValid).length > 0
      ) {
        if (
          Object.values(managingDirectorKeyValid).findIndex(
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

  addNewManagingDirector = () => {
    const { onChangeFormData, formData } = this.props;
    const { managingDirectors } = formData;
    const uuid = uuidv4();

    if (managingDirectors) {
      onChangeFormData("managingDirectors", [
        ...managingDirectors,
        { key: uuid },
      ]);
    } else {
      onChangeFormData("managingDirectors", [{ key: uuid }]);
    }

    this.setState(
      ({ managingDirectorKeyValid }) => ({
        managingDirectorKeyValid: {
          ...managingDirectorKeyValid,
          [uuid]: false,
        },
        activeKey: uuid,
      }),
      this.validate
    );
  };

  removeManagingDirector = (key) => {
    const { managingDirectorKeyValid } = this.state;
    const { onChangeFormData, formData } = this.props;
    const { managingDirectors } = formData;

    onChangeFormData(
      "managingDirectors",
      managingDirectors.filter((md) => md.key !== key)
    );

    unset(managingDirectorKeyValid, key);

    this.setState({ managingDirectorKeyValid }, this.validate);
  };

  changeManagingDirectorData = (mdKey, key, value) => {
    const { onChangeFormData, formData } = this.props;
    const { managingDirectors } = formData;

    const index = managingDirectors.findIndex((md) => md.key === mdKey);
    managingDirectors[index][key] = value;

    onChangeFormData("managingDirectors", managingDirectors);
  };

  componentDidUpdate = (prevProps) => {
    const { formData: prevFormData } = prevProps;
    const { formData } = this.props;

    const { managingDirectors: prevManagingDirectors } = prevFormData;
    const { managingDirectors } = formData;

    if (!_.isEqual(managingDirectors, prevManagingDirectors)) {
      this.validate();
    }
  };

  render() {
    const { managingDirectorKeyValid, activeKey } = this.state;
    const { formData, currentLang } = this.props;
    const { managingDirectors: managingDirectors } = formData;
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
              .STEP_PROVIDE_INFORMATION_ABOUT_MANAGING_DIRECTORS
          )}
        </h2>
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {" "}
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <Button
                size="small"
                icon={<PlusOutlined />}
                onClick={this.addNewManagingDirector}
              >
                Add another managing director
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
                {(managingDirectors || []).map((x) => (
                  <Collapse.Panel
                    key={x.key}
                    header={
                      <>
                        {!x.firstName
                          ? strings[currentLang].jur.MANAGING_DIRECTOR
                          : " "}
                        {x.firstName || ""} {x.lastName || ""}
                        {!managingDirectorKeyValid[x.key] && (
                          <Tag color="coral" style={{ marginLeft: "6px" }}>
                            Information inclomplete
                          </Tag>
                        )}
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
                              this.removeManagingDirector(x.key);
                            },
                          });
                          return false;
                        }}
                      />
                    }
                  >
                    <JurGeschaeftsfuehrerCard
                      currentLang={currentLang}
                      onChangeManagingDirectorData={(key, value) => {
                        this.changeManagingDirectorData(x.key, key, value);
                      }}
                      managingDirectorData={x}
                      onValidated={(valid) => {
                        const { managingDirectorKeyValid } = this.state;
                        managingDirectorKeyValid[x.key] = valid;

                        this.setState(
                          { managingDirectorKeyValid },
                          this.validate
                        );
                      }}
                    />
                  </Collapse.Panel>
                ))}
              </Collapse>
            </Col>
          </Row>
          {/* {managingDirectors && managingDirectors.length > 0 && (
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

JurGeschaeftsfuehrer.propTypes = {
  currentLang: PropTypes.any,
  formData: PropTypes.shape({
    clientData: PropTypes.shape({
      nameLegalEntity: PropTypes.any,
    }),
    managingDirectors: PropTypes.array,
  }),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
  isActive: PropTypes.bool,
};

export default JurGeschaeftsfuehrer;
