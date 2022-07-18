import PropTypes from "prop-types";
import { Button, message, Upload } from "antd";
import React, { Component } from "react";
import strings from "../../locale/strings.json";
import { formatBytes } from "../../util/util";

class JurGeschaeftsfuehrerDokumentUpload extends Component {
  state = { selectedFiles: {} };

  validate = () => {
    const { formData, setCurrentStepValid, isActive } = this.props;
    const { managingDirectors } = formData;

    if (isActive) {
      if (managingDirectors) {
        const { selectedFiles } = this.state;
        console.log(
          managingDirectors.filter((md) => selectedFiles[md.key] == null)
        );
        setCurrentStepValid(
          managingDirectors.filter((md) => selectedFiles[md.key] == null)
            .length === 0
        );
      } else {
        setCurrentStepValid(false);
      }
    }
  };

  componentDidUpdate = (prevProps) => {
    const { isActive } = this.props;
    const { isActive: wasActive } = prevProps;

    if (isActive && !wasActive) {
      this.validate();
    }
  };

  render() {
    const { selectedFiles } = this.state;
    const { currentLang, formData, onChangeFormData } = this.props;

    const { managingDirectors } = formData;

    const uploadProps = (md) => ({
      accept: ".jpg,.jpeg,.pdf",
      className: "uploader",
      name: "file",
      multiple: true,
      action: "",
      beforeUpload: (file) => {
        this.setState(
          (s) => ({
            selectedFiles: { ...s.selectedFiles, [md.key]: file },
          }),
          this.validate
        );

        // das file zum Managing Director anfügen
        const idx = managingDirectors.findIndex((md2) => md2.key === md.key);
        managingDirectors[idx].photoId = file;
        onChangeFormData("managingDirectors", [...managingDirectors]);

        return false;
      },
      showUploadList: false,
    });

    return (
      <>
        <h2>
          {
            strings[currentLang].jur
              .STEP_UPLOAD_OFFICIAL_DOCUMENT_FOR_EACH_MANAGING_DIRECTOR
          }
        </h2>
        {managingDirectors && (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {managingDirectors.map((md, index) => (
              <li
                key={md.key}
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
                {!selectedFiles[md.key] && (
                  <div>
                    <Upload.Dragger {...uploadProps(md)}>
                      <p className="upload-text">
                        {strings[currentLang].CLICK_OR_DRAG_TO_UPLOAD}
                      </p>
                      <p className="upload-hint">
                        {strings[currentLang].CHOOSE_MULTIPLE_FILES}
                      </p>
                    </Upload.Dragger>
                  </div>
                )}
                <div
                  className={!selectedFiles[md.key] ? "fade-out" : "fade-in"}
                >
                  {selectedFiles[md.key] && (
                    <>
                      {selectedFiles[md.key].name} (
                      <i>{formatBytes(selectedFiles[md.key].size)}</i>){" "}
                      <Button
                        type="link"
                        danger
                        onClick={() => {
                          this.setState((s) => {
                            const { [md.key]: x, ...newSelectedFiles } =
                              s.selectedFiles;
                            return {
                              selectedFiles: newSelectedFiles,
                            };
                          }, this.validate);
                        }}
                      >
                        Remove
                      </Button>
                    </>
                  )}
                </div>
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
    managingDirectors: PropTypes.array,
  }),
  setCurrentStepValid: PropTypes.func,
  isActive: PropTypes.bool,
  onChangeFormData: PropTypes.func,
};

export default JurGeschaeftsfuehrerDokumentUpload;
