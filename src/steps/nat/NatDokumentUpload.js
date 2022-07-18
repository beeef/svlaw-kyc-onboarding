import PropTypes from "prop-types";
import { InboxOutlined } from "@ant-design/icons";
import { Button, message, Upload } from "antd";
import React, { Component } from "react";
import strings from "../../locale/strings.json";
import { formatBytes } from "../../util/util";

class NatDokumentUpload extends Component {
  state = { selectedFiles: [] };

  validate = () => {
    const { selectedFiles } = this.state;
    const { setCurrentStepValid } = this.props;

    setCurrentStepValid(selectedFiles && selectedFiles.length > 0);
  };

  render() {
    const { selectedFiles } = this.state;
    const { currentLang, formData, onChangeFormData } = this.props;

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
      multiple: false,
      action: "",
      beforeUpload: (file) => {
        this.setState({ selectedFiles: [file] }, this.validate);
        onChangeFormData("clientData", { ...clientData, photoId: file });

        return false;
      },
      showUploadList: false,
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
        {selectedFiles.length === 0 && (
          <Upload.Dragger {...uploadProps} fileList={selectedFiles}>
            <InboxOutlined className="icon" />
            <p className="upload-text">
              {strings[currentLang].CLICK_OR_DRAG_TO_UPLOAD}
            </p>
            <p className="upload-hint">
              {strings[currentLang].CHOOSE_MULTIPLE_FILES}
            </p>
          </Upload.Dragger>
        )}
        <div className={selectedFiles.length === 0 ? "fade-out" : "fade-in"}>
          {selectedFiles.length > 0 && (
            <>
              {selectedFiles[0].name} (
              <i>{formatBytes(selectedFiles[0].size)}</i>){" "}
              <Button
                type="link"
                danger
                onClick={() => {
                  this.setState({ selectedFiles: [] }, this.validate);
                }}
              >
                Remove
              </Button>
            </>
          )}
        </div>
      </>
    );
  }
}

NatDokumentUpload.propTypes = {
  currentLang: PropTypes.any,
  formData: PropTypes.shape({
    clientData: PropTypes.shape({
      firstName: PropTypes.any,
      lastName: PropTypes.any,
    }),
  }),
  setCurrentStepValid: PropTypes.func,
  onChangeFormData: PropTypes.func,
};

export default NatDokumentUpload;
