import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Upload } from "antd";
import strings from "../../locale/strings.json";
import { formatBytes } from "../../util/util";
import { ExclamationCircleTwoTone } from "@ant-design/icons";

class JurWirtschaftlicherEigentuemerDokumentUpload extends Component {
  state = { selectedFiles: {}, isOptional: false };

  checkIfStepIsOptional = () => {
    const { formData, onChangeFormData } = this.props;
    const { legalServices, otherLegalService, beneficialOwners } = formData;

    this.setState({
      isOptional:
        (!legalServices ||
          (Array.isArray(legalServices) && legalServices.length === 0)) &&
        otherLegalService,
    });
  };

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

  componentDidUpdate = (prevProps) => {
    const { isActive: wasActive } = prevProps;
    const { isActive } = this.props;

    if (isActive && !wasActive) {
      this.validate();
      this.checkIfStepIsOptional();
    }
  };

  render() {
    const { selectedFiles, isOptional } = this.state;
    const { currentLang, formData } = this.props;

    const { beneficialOwners } = formData;

    const uploadProps = (bo) => ({
      accept: ".jpg,.jpeg,.pdf",
      className: "uploader",
      name: "file",
      multiple: true,
      action: "",
      beforeUpload: (file) => {
        this.setState(
          (s) => ({
            selectedFiles: { ...s.selectedFiles, [bo.key]: file },
          }),
          this.validate
        );

        // das file zum Managing Director anfügen
        const idx = beneficialOwners.findIndex((bo2) => bo2.key === bo.key);
        beneficialOwners[idx].photoId = file;
        onChangeFormData("beneficialOwners", [...beneficialOwners]);

        return false;
      },
      showUploadList: false,
    });

    return (
      <>
        {isOptional && (
          <h2>
            <ExclamationCircleTwoTone
              twoToneColor="orange"
              style={{ marginRight: "6px" }}
            />
            <b>This step is optional.</b>
          </h2>
        )}
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
  isActive: PropTypes.bool,
  currentLang: PropTypes.any,
  formData: PropTypes.shape({
    beneficialOwners: PropTypes.array,
    legalServices: PropTypes.array,
    otherLegalService: PropTypes.string,
  }),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
};

export default JurWirtschaftlicherEigentuemerDokumentUpload;
