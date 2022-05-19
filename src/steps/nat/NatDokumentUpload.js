import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import React, { Component } from "react";
import strings from "../../locale/strings.json";

class NatDokumentUpload extends Component {
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
        <Upload.Dragger {...uploadProps}>
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
