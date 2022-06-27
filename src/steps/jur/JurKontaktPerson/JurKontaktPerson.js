import React, { Component } from "react";
import { Button, Card, Checkbox, Col, Row } from "antd";
import { v4 as uuid } from "uuid";
import { PlusOutlined } from "@ant-design/icons";
import strings from "../../../locale/strings.json";
import JurKontaktPersonCard from "./JurKontaktPersonCard";

class JurKontaktperson extends Component {
  state = { countries: null };

  validate = () => {};

  handleAddNewContact = () => {
    const { formData, onChangeFormData } = this.props;
    const { contactData } = formData;

    if (!contactData) {
      onChangeFormData("contactData", [{ key: uuid() }]);
    } else {
      onChangeFormData("contactData", [...contactData, { key: uuid() }]);
    }
  };

  render() {
    const { currentLang, formData } = this.props;

    const { contactData } = formData;

    let managingDirectors = [];
    let beneficialOwners = [];

    if (formData.managingDirectors)
      managingDirectors = formData.managingDirectors;
    if (formData.beneficialOwners) beneficialOwners = formData.beneficialOwners;

    const onValChange = (key, value) => {
      const { clientData } = this.state;
      const { onChangeFormData } = this.props;

      this.setState(
        {
          clientData: {
            ...clientData,
            [key]: value,
          },
        },
        () => {
          onChangeFormData("contactData", this.state.clientData);
        }
      );
    };

    return (
      <>
        <h2>{strings[currentLang].jur.STEP_CONTACT_PERSON}</h2>
        <Row>
          <Col xs={12}>
            {managingDirectors && (
              <>
                {managingDirectors.map((md) => (
                  <Checkbox
                    key={`md-${md.firstName}-${md.lastName}`}
                    value={`${md.firstName} ${md.lastName}`}
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
                    value={`bo-${bo.firstName}-${bo.lastName}`}
                    key={`${bo.firstName} ${bo.lastName}`}
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
            >
              Add new point of contact
            </Button>
          </Col>
        </Row>

        {contactData && contactData.length > 0 ? (
          <Row gutter={[12, 12]} style={{ marginTop: "24px" }}>
            {contactData.map((cd) => (
              <Col xs={24} key={cd.key}>
                <Card>
                  <JurKontaktPersonCard currentLang={currentLang} />
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

export default JurKontaktperson;
