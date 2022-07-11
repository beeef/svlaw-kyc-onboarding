import PropTypes from "prop-types";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import React, { Component } from "react";
import strings from "../../locale/strings.json";

class JurGeschaeftsfuehrerDokumentUpload extends Component {
  state = { selectedFiles: [] };

  render() {
    const { selectedFiles } = this.state;
    const { currentLang, formData } = this.props;

    const { managingDirectors } = formData;

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
              .STEP_UPLOAD_OFFICIAL_DOCUMENT_FOR_EACH_MANAGING_DIRECTOR
          }
        </h2>
        {managingDirectors && (
          <ul>
            {managingDirectors.map((md, index) => (
              <li
                key={`${md.firstName} ${md.lastName}`}
                style={{
                  borderBottom:
                    index < managingDirectors.length - 1
                      ? "1px solid #dddddd"
                      : 0,
                  padding: "24px 0 32px 0",
                }}
              >
                <span style={{ fontSize: "14pt", fontWeight: "lighter" }}>
                  {md.firstName} {md.lastName}
                </span>
                <Upload.Dragger {...uploadProps}>
                  <p className="upload-text">
                    {strings[currentLang].CLICK_OR_DRAG_TO_UPLOAD}
                  </p>
                  <p className="upload-hint">
                    {strings[currentLang].CHOOSE_MULTIPLE_FILES}
                  </p>
                </Upload.Dragger>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

JurGeschaeftsfuehrerDokumentUpload.propTypes = {
  currentLang: PropTypes.any,
  formData: PropTypes.shape({
    managingDirectors: PropTypes.shape({
      length: PropTypes.number,
      map: PropTypes.func,
    }),
  }),
};

export default JurGeschaeftsfuehrerDokumentUpload;
