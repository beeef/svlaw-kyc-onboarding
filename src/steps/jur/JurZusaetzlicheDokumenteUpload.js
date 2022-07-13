import PropTypes from "prop-types";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Card, message, Space, Table, Upload } from "antd";
import React, { Component } from "react";
import strings from "../../locale/strings.json";

class JurZusaetzlicheDokumenteUpload extends Component {
  state = { selectedFiles: [] };

  componentDidUpdate = (prevProps) => {
    const { isActive, setCurrentStepValid } = this.props;
    const { isActive: wasActive } = prevProps;

    if (isActive && isActive !== wasActive) {
      setCurrentStepValid(true);
    }
  };

  render() {
    const { selectedFiles } = this.state;
    const { currentLang, formData } = this.props;

    const { clientData } = formData;

    let firstName = "";
    let lastName = "";

    if (clientData) {
      firstName = clientData.firstName;
      lastName = clientData.lastName;
    }

    const uploadProps = {
      className: "uploader",
      name: "file",
      multiple: true,
      action: "",
      onChange(info) {
        const { status } = info.file;
        if (status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (status === "done") {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
      },
    };

    return (
      <>
        <h2>
          {
            strings[currentLang].jur
              .STEP_PLEASE_UPLOAD_THE_FOLLOWING_INFORMATION
          }
        </h2>
        <Table
          rowKey="name"
          pagination={false}
          columns={[
            { key: "name", dataIndex: "name", width: "60%" },
            {
              key: "file",
              render: () => (
                <Upload beforeUpload={() => false} showUploadList={false}>
                  <Button>Select file</Button>
                </Upload>
              ),
              align: "center",
            },
          ]}
          dataSource={[
            { name: strings[currentLang].jur.CURRENT_COMPANY_REGISTER_EXTRACT },
            {
              name: strings[currentLang].jur
                .CURRENT_EXTRACT_FROM_THE_BENIFICIAL_OWNER_REGISTER,
            },
            { name: strings[currentLang].jur.ORGANIZATION_CHART_SHAREHOLDERS },
            {
              name: strings[currentLang].jur
                .COMPANYS_LAST_AUDITED_FINANCIAL_STATEMENTS,
            },
            { name: strings[currentLang].jur.COMPANYS_ARTICLES_OF_ASSOCIATION },
          ]}
          showHeader={false}
        />
      </>
    );
  }
}

JurZusaetzlicheDokumenteUpload.propTypes = {
  currentLang: PropTypes.any,
  formData: PropTypes.shape({
    clientData: PropTypes.shape({
      firstName: PropTypes.any,
      lastName: PropTypes.any,
    }),
  }),
  isActive: PropTypes.bool,
  setCurrentStepValid: PropTypes.func,
};

export default JurZusaetzlicheDokumenteUpload;
