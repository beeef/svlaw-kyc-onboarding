import PropTypes from "prop-types";
import React, { Component } from "react";
import { Button, Card, Checkbox, Col, Row } from "antd";
import { v4 as uuid } from "uuid";
import { PlusOutlined } from "@ant-design/icons";
import strings from "../../../locale/strings.json";
import JurKontaktPersonCard from "./JurKontaktPersonCard";

class JurKontaktperson extends Component {
  state = { selectedPersons: [], allContactPersonsValid: true };

  validate = () => {
    const { allContactPersonsValid, selectedPersons } = this.state;
    const { formData, setCurrentStepValid } = this.props;
    const { contactData } = formData;

    if (
      contactData &&
      contactData.length > 0 &&
      allContactPersonsValid &&
      selectedPersons.length > 0
    ) {
      setCurrentStepValid(true);
    } else if (
      selectedPersons.length > 0 &&
      (!contactData || contactData.length === 0)
    ) {
      setCurrentStepValid(true);
    } else if (
      selectedPersons.length === 0 &&
      contactData &&
      contactData.length > 0 &&
      allContactPersonsValid
    ) {
      setCurrentStepValid(true);
    } else {
      setCurrentStepValid(false);
    }
  };

  handleAddNewContact = () => {
    const { allContactPersonsValid } = this.state;

    if (allContactPersonsValid) {
      const { formData, onChangeFormData } = this.props;
      const { contactData } = formData;

      if (!contactData) {
        onChangeFormData("contactData", [{ key: uuid() }]);
      } else {
        onChangeFormData("contactData", [...contactData, { key: uuid() }]);
      }

      this.setState({ allContactPersonsValid: false }, this.validate);
    }
  };

  handleRemoveContact = (index) => {
    const { formData, onChangeFormData } = this.props;
    const { contactData } = formData;

    if (contactData) {
      if (contactData.length === 1) {
        this.setState({ allContactPersonsValid: true }, this.validate);
      }

      onChangeFormData(
        "contactData",
        contactData.filter((cd, i) => i !== index)
      );
    }

    this.validate();
  };

  handleContactDataChange = (index, key, value) => {
    const { formData, onChangeFormData } = this.props;
    const { contactData } = formData;

    if (contactData) {
      contactData[index][key] = value;
      onChangeFormData("contactData", contactData);
    }

    this.validate();
  };

  insertNameIntoHeader = (nameLegalEntity, header) =>
    header.replace("[NAME_LEGAL_ENTITY]", nameLegalEntity);

  render() {
    const { selectedPersons, allContactPersonsValid } = this.state;

    const { currentLang, formData } = this.props;

    const { contactData } = formData;

    let managingDirectors = [];
    let beneficialOwners = [];

    if (formData.managingDirectors)
      managingDirectors = formData.managingDirectors;
    if (formData.beneficialOwners) beneficialOwners = formData.beneficialOwners;

    return (
      <>
        <h2>
          {this.insertNameIntoHeader(
            formData.clientData ? formData.clientData.nameLegalEntity : "",
            strings[currentLang].jur.STEP_CONTACT_PERSON
          )}
        </h2>
        <Row>
          <Col xs={12}>
            {managingDirectors && (
              <>
                {managingDirectors.map((md) => (
                  <Checkbox
                    key={md.key}
                    checked={
                      selectedPersons.findIndex((sp) => sp.key === md.key) >= 0
                    }
                    onChange={(e) => {
                      const { checked } = e.target;

                      const { selectedPersons } = this.state;

                      if (checked) {
                        this.setState(
                          {
                            selectedPersons: [
                              ...selectedPersons,
                              {
                                key: md.key,
                                firstName: md.firstName,
                                lastName: md.lastName,
                                email: md.email,
                                phone: md.phone,
                              },
                            ],
                          },
                          this.validate
                        );
                      } else {
                        this.setState(
                          {
                            selectedPersons: selectedPersons.filter(
                              (sp) => sp.key !== md.key
                            ),
                          },
                          this.validate
                        );
                      }
                    }}
                  >
                    {md.firstName} {md.lastName}
                  </Checkbox>
                ))}
              </>
            )}
            {beneficialOwners && (
              <>
                {beneficialOwners.map((bo) => (
                  <Checkbox
                    key={bo.key}
                    checked={
                      selectedPersons.findIndex((sp) => sp.key === bo.key) >= 0
                    }
                    onChange={(e) => {
                      const { checked } = e.target;

                      const { selectedPersons } = this.state;

                      if (checked) {
                        this.setState(
                          {
                            selectedPersons: [
                              ...selectedPersons,
                              {
                                key: bo.key,
                                firstName: bo.firstName,
                                lastName: bo.lastName,
                                email: bo.email,
                                phone: bo.phone,
                              },
                            ],
                          },
                          this.validate
                        );
                      } else {
                        this.setState(
                          {
                            selectedPersons: selectedPersons.filter(
                              (sp) => sp.key !== bo.key
                            ),
                          },
                          this.validate
                        );
                      }
                    }}
                  >
                    {bo.firstName} {bo.lastName}
                  </Checkbox>
                ))}
              </>
            )}
          </Col>
          <Col xs={12}>
            <Button
              type="default"
              size="small"
              icon={<PlusOutlined />}
              onClick={this.handleAddNewContact}
              disabled={!allContactPersonsValid}
            >
              Add new point of contact
            </Button>
          </Col>
        </Row>

        {contactData && contactData.length > 0 ? (
          <Row gutter={[12, 12]} style={{ marginTop: "24px" }}>
            {contactData.map((cd, index) => (
              <Col xs={24} key={cd.key}>
                <Card>
                  <JurKontaktPersonCard
                    currentLang={currentLang}
                    onRemove={() => {
                      this.handleRemoveContact(index);
                    }}
                    onChange={(key, value) => {
                      this.handleContactDataChange(index, key, value);
                    }}
                    onValid={() => {
                      console.log("onValid");
                      this.setState(
                        { allContactPersonsValid: true },
                        this.validate
                      );
                    }}
                    onInvalid={() => {
                      console.log("onInvalid");
                      this.setState(
                        { allContactPersonsValid: false },
                        this.validate
                      );
                    }}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <></>
        )}
      </>
    );
  }
}

JurKontaktperson.propTypes = {
  currentLang: PropTypes.any,
  formData: PropTypes.shape({
    beneficialOwners: PropTypes.any,
    clientData: PropTypes.shape({
      nameLegalEntity: PropTypes.any,
    }),
    contactData: PropTypes.shape({
      filter: PropTypes.func,
      length: PropTypes.number,
      map: PropTypes.func,
    }),
    managingDirectors: PropTypes.any,
  }),
  onChangeFormData: PropTypes.func,
  setCurrentStepValid: PropTypes.func,
};

export default JurKontaktperson;
