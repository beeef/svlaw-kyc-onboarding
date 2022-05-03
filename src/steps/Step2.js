import {
  ArrowDownOutlined,
  LeftOutlined,
  RightOutlined
} from "@ant-design/icons";
import { Button, Input, Radio, Row, Space } from "antd";
import React, { Component } from "react";
import strings from "../locale/strings.json";

class Step2 extends Component {
  state = { selectedAnswer: null };

  render() {
    const { selectedAnswer } = this.state;
    const { currentLang, gotoNext, gotoPrev } = this.props;

    return (
      <>
        <h2>{strings[currentLang].nat.STEP2_TITLE}</h2>
        <Radio.Group
          onChange={(e) => {
            this.setState({ selectedAnswer: e.target.value });
          }}
          value={selectedAnswer}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Radio value={1}>
              Kauf / Verkauf (bzw. Tausch) der Liegenschaft(en)
            </Radio>
            <Radio value={2}>
              Gründung einer Gesellschaft / Verkauf von Gesellschaftsanteilen
            </Radio>
            <Radio value={3}>Kauf / Verkauf eines Unternehmens</Radio>
            <Radio value={4}>
              Betrieb oder Verwaltung von Treuhandgesellschaften, Gesellschaften
              oder ähnlichen Strukturen, wie etwa Trusts oder Stiftungen
            </Radio>
            <Radio value={5}>
              Beschaffung der für Gründung, Betrieb oder Verwaltung von
              Gesellschaften erforderlichen Mittel
            </Radio>
            <Radio value={6}>
              Verwaltung von Geld, Wertpapieren oder sonstigen Vermögenswerten,
              die Eröffnung oder Verwaltung von Bank-, Spar- oder
              Wertpapierkonten
            </Radio>
            <Radio value={99} style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%"
                }}
              >
                Sonstiges
                {selectedAnswer === 99 ? (
                  <Input
                    style={{ width: "260px", margin: 0 }}
                    placeholder="Rechtsgeschäft angeben"
                  />
                ) : null}
              </div>
            </Radio>
          </Space>
        </Radio.Group>
        <Row justify="space-between" style={{ marginTop: "24px" }}>
          <Button icon={<LeftOutlined />} onClick={gotoPrev}>
            Back
          </Button>
          <Button onClick={gotoNext}>
            Next <RightOutlined />
          </Button>
        </Row>
      </>
    );
  }
}

export default Step2;
