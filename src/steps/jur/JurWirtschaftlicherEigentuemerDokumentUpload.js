import PropTypes from "prop-types";
import { Button, Upload } from "antd";
import React, { Component } from "react";
import strings from "../../locale/strings.json";
import { formatBytes } from "../../util/util";

class JurWirtschaftlicherEigentuemerDokumentUpload extends Component {
  state = { selectedFiles: {} };

  validate = () => {
    const { formData, setCurrentStepValid } = this.props;
    const { beneficialOwners } = formData;

    if (beneficialOwners) {
      const { selectedFiles } = this.state;
      console.log(beneficialOwners);
      setCurrentStepValid(
        beneficialOwners.filter((bo) => !selectedFiles[bo.key]).length === 0
      );
    } else {
      setCurrentStepValid(false);
    }
  };

  render() {
    const { selectedFiles } = this.state;
    const { currentLang, formData } = this.props;

    const { beneficialOwners } = formData;

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
        return false;
      },
      showUploadList: false,
    });

    return (
      <>
        <h2>
          {
            strings[currentLang].jur
              .STEP_UPLOAD_OFFICIAL_DOCUMENT_FOR_EACH_BENEFICIAL_OWNER
          }
        </h2>
        {beneficialOwners && (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {beneficialOwners.map((bo, index) => (
              <li
                key={bo.key}
                style={{
                  borderBottom:
                    index < beneficialOwners.length - 1
                      ? "1px solid #dddddd"
                      : 0,
                  padding: "24px 0 32px 0",
                }}
              >
                <span style={{ fontSize: "14pt", fontWeight: "lighter" }}>
                  {bo.firstName} {bo.lastName}
                </span>
                {!selectedFiles[bo.key] && (
                  <div>
                    <Upload.Dragger {...uploadProps(bo)}>
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
                  className={!selectedFiles[bo.key] ? "fade-out" : "fade-in"}
                >
                  {selectedFiles[bo.key] && (
                    <>
                      {selectedFiles[bo.key].name} (
                      <i>{formatBytes(selectedFiles[bo.key].size)}</i>){" "}
                      <Button
                        type="link"
                        danger
                        onClick={() => {
                          this.setState((s) => {
                            const { [bo.key]: x, ...newSelectedFiles } =
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

JurWirtschaftlicherEigentuemerDokumentUpload.propTypes = {
  currentLang: PropTypes.any,
  formData: PropTypes.shape({
    beneficialOwners: PropTypes.arrayOf(
      PropTypes.shape({
        length: PropTypes.number,
        map: PropTypes.func,
      })
    ),
  }),
  setCurrentStepValid: PropTypes.func,
};

export default JurWirtschaftlicherEigentuemerDokumentUpload;
