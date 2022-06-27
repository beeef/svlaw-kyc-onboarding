import React, { Component } from "react";
import { Button, Col, Collapse, Modal, Row, Space } from "antd";
import { v4 as uuidv4 } from "uuid";
import JurGeschaeftsfuehrerCard from "./JurGeschaeftsfuehrerCard";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import strings from "../../../locale/strings.json";

class JurGeschaeftsfuehrer extends Component {
  state = {};

  componentDidMount = () => {
    const { onChangeFormData, formData } = this.props;
    const { managing_directors } = formData;

    if (!managing_directors) {
      onChangeFormData("managing_directors", [{ key: uuidv4() }]);
    }
  };

  insertNameIntoHeader = (nameLegalEntity, header) =>
    header.replace("[NAME_LEGAL_ENTITY]", nameLegalEntity);

  addNewManagingDirector = () => {
    const { onChangeFormData, formData } = this.props;
    const { managing_directors } = formData;

    if (managing_directors) {
      onChangeFormData("managing_directors", [
        ...managing_directors,
        { key: uuidv4() },
      ]);
    } else {
      onChangeFormData("managing_directors", [{ key: uuidv4() }]);
    }
  };

  removeManagingDirector = (key) => {
    const { onChangeFormData, formData } = this.props;
    const { managing_directors } = formData;

    onChangeFormData(
      "managing_directors",
      managing_directors.filter((md) => md.key !== key)
    );
  };

  changeManagingDirectorData = (mdKey, key, value) => {
    const { onChangeFormData, formData } = this.props;
    const { managing_directors } = formData;

    const index = managing_directors.findIndex((md) => md.key === mdKey);
    managing_directors[index][key] = value;

    onChangeFormData("managing_directors", managing_directors);
  };

  render() {
    const { formData, currentLang } = this.props;
    const { managing_directors: managingDirectors } = formData;
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
                Add person
              </Button>
            </Col>
          </Row>
          <Row gutter={[24, 24]}>
            <Col xs={24}>
              <Collapse
                accordion
                defaultActiveKey={
                  managingDirectors && managingDirectors.length > 0
                    ? managingDirectors[0].key
                    : null
                }
              >
                {(managingDirectors || []).map((x) => (
                  <Collapse.Panel
                    key={x.key}
                    header={`${
                      !x.firstName
                        ? strings[currentLang].jur.MANAGING_DIRECTOR
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

export default JurGeschaeftsfuehrer;
