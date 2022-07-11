import PropTypes from "prop-types";
import { InboxOutlined } from "@ant-design/icons";
import { Card, message, Space, Upload } from "antd";
import React, { Component } from "react";
import strings from "../../locale/strings.json";

class JurZusaetzlicheDokumenteUpload extends Component {
  state = { selectedFiles: [] };

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
        <Space style={{ width: "100%" }} direction="vertical" size="middle">
          <Card>
            <p style={{ margin: "0 0 12px 0", padding: 0, fontSize: "1.1rem" }}>
              {strings[currentLang].jur.CURRENT_COMPANY_REGISTER_EXTRACT}
            </p>
            <Upload.Dragger {...uploadProps}>
              <p className="upload-text">
                {strings[currentLang].CLICK_OR_DRAG_TO_UPLOAD}
              </p>
              <p className="upload-hint">
                {strings[currentLang].CHOOSE_MULTIPLE_FILES}
              </p>
            </Upload.Dragger>
          </Card>
          <Card>
            <p style={{ margin: "0 0 12px 0", padding: 0, fontSize: "1.1rem" }}>
              {
                strings[currentLang].jur
                  .CURRENT_EXTRACT_FROM_THE_BENIFICIAL_OWNER_REGISTER
              }
            </p>
            <Upload.Dragger {...uploadProps}>
              <p className="upload-text">
                {strings[currentLang].CLICK_OR_DRAG_TO_UPLOAD}
              </p>
              <p className="upload-hint">
                {strings[currentLang].CHOOSE_MULTIPLE_FILES}
              </p>
            </Upload.Dragger>
          </Card>
          <Card>
            {" "}
            <p style={{ margin: "0 0 12px 0", padding: 0, fontSize: "1.1rem" }}>
              {strings[currentLang].jur.ORGANIZATION_CHART_SHAREHOLDERS}
            </p>
            <Upload.Dragger {...uploadProps}>
              <p className="upload-text">
                {strings[currentLang].CLICK_OR_DRAG_TO_UPLOAD}
              </p>
              <p className="upload-hint">
                {strings[currentLang].CHOOSE_MULTIPLE_FILES}
              </p>
            </Upload.Dragger>
          </Card>
          <Card>
            {" "}
            <p style={{ margin: "0 0 12px 0", padding: 0, fontSize: "1.1rem" }}>
              {
                strings[currentLang].jur
                  .COMPANYS_LAST_AUDITED_FINANCIAL_STATEMENTS
              }
            </p>
            <Upload.Dragger {...uploadProps}>
              <p className="upload-text">
                {strings[currentLang].CLICK_OR_DRAG_TO_UPLOAD}
              </p>
              <p className="upload-hint">
                {strings[currentLang].CHOOSE_MULTIPLE_FILES}
              </p>
            </Upload.Dragger>
          </Card>
          <Card>
            <p style={{ margin: "0 0 12px 0", padding: 0, fontSize: "1.1rem" }}>
              {strings[currentLang].jur.COMPANYS_ARTICLES_OF_ASSOCIATION}
            </p>
            <Upload.Dragger {...uploadProps}>
              <p className="upload-text">
                {strings[currentLang].CLICK_OR_DRAG_TO_UPLOAD}
              </p>
              <p className="upload-hint">
                {strings[currentLang].CHOOSE_MULTIPLE_FILES}
              </p>
            </Upload.Dragger>
          </Card>
        </Space>
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
};

export default JurZusaetzlicheDokumenteUpload;
