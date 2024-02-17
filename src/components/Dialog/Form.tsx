import React from "react";
import { Col, Divider, Form, FormInstance, Input, InputNumber, Row, Select } from "antd";
import { CREATIVE_LEVEL } from "../../hooks/useAi";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const initialValues = {
  creativeLevel: CREATIVE_LEVEL.ORIGINAL,
  resultsNumber: 2,
  language: "zh",
};
export type FieldType = {
  keywords?: string;
  resultsNumber?: number;
  creativeLevel?: CREATIVE_LEVEL;
  language?: string;
};

const InternalForm = ({ form } : {
  form: FormInstance<FieldType>
}) => (
  <Form
    form={form}
    name="aiPrompt"
    labelCol={{ span: 24 }}
    wrapperCol={{ span: 24 }}
    initialValues={initialValues}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="关键字"
      name="keywords"
      rules={[{ required: true, message: "请输入关键字!" }]}
    >
      <Input.TextArea placeholder="请输入关键字" />
    </Form.Item>
    <Divider orientation="left">高级选项</Divider>
    <Row>
      <Col span={11}>
        <Form.Item<FieldType>
          label="结果数量"
          name="resultsNumber"
          rules={[{ required: true, message: "请输入结果数量!" }]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
      </Col>
      <Col span={11} offset={2}>
        <Form.Item<FieldType>
          label="创造力水平"
          name="creativeLevel"
          rules={[{ required: true, message: "请选择创意程度!" }]}
        >
          <Select>
            <Select.Option value={CREATIVE_LEVEL.ORIGINAL}>原创</Select.Option>
            <Select.Option value={CREATIVE_LEVEL.REPETITIVE}>
              重复
            </Select.Option>
            <Select.Option value={CREATIVE_LEVEL.DETERMINISTIC}>
              确定性的
            </Select.Option>
            <Select.Option value={CREATIVE_LEVEL.CREATIVE}>
              充满创意
            </Select.Option>
            <Select.Option value={CREATIVE_LEVEL.IMAGINATIVE}>
              富有想象力
            </Select.Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
    <Row>
      <Col span={11}>
        <Form.Item<FieldType>
          label="语言"
          name="language"
          rules={[{ required: true, message: "请选择语言!" }]}
        >
          <Select>
            <Select.Option value="zh">中文</Select.Option>
            <Select.Option value="en">英文</Select.Option>
          </Select>
        </Form.Item>
      </Col>
    </Row>
  </Form>
);

export default InternalForm;
