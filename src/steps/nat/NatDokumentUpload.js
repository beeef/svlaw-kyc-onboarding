import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import React, { Component } from "react";
import strings from "../../locale/strings.json";

class NatDokumentUpload extends Component {
  state = { selectedFiles: [] };

  validate = () => {
    const { selectedFiles } = this.state;
    const { setCurrentStepValid } = this.props;

    setCurrentStepValid(selectedFiles && selectedFiles.length > 0);
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
      accept: ".pdf,.jpg,.jpeg",
      className: "uploader",
      name: "file",
      multiple: true,
      action: "",
      beforeUpload: (file) => {
        this.setState({ selectedFiles: [file] }, this.validate);
        return false;
      },
      onRemove: () => {
        this.setState({ selectedFiles: [] }, this.validate);
      },
    };

    return (
      <>
        <h2>{strings[currentLang].nat.STEP_UPLOAD_OFFICIAL_DOCUMENT}</h2>
        {firstName && lastName && (
          <ul>
            <li>
              <span style={{ fontSize: "14pt", fontWeight: "lighter" }}>
                {firstName} {lastName}
              </span>
            </li>
          </ul>
        )}
        <Upload.Dragger {...uploadProps} fileList={selectedFiles}>
          <InboxOutlined className="icon" />
          <p className="upload-text">
            {strings[currentLang].CLICK_OR_DRAG_TO_UPLOAD}
          </p>
          <p className="upload-hint">
            {strings[currentLang].CHOOSE_MULTIPLE_FILES}
          </p>
        </Upload.Dragger>
      </>
    );
  }
}

export default NatDokumentUpload;
