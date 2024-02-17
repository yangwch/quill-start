import React, { useMemo } from "react";
import { TemplateType } from "../../hooks/useAi";
import { Modal } from "antd";
import InternalForm, { FieldType } from "./Form";
import { useForm } from "antd/es/form/Form";

interface Props {
  dialogVisible: boolean;
  templateType: TemplateType;
  onShowAdDialog: () => void;
  onShowIntroYourselfDialog: () => void;
  onHideDialog: () => void;
  onSubmit: (form: Record<string, any>) => void;
}
function InternalDialog(props: Props) {
  const dialogTitle = useMemo(() => {
    switch (props.templateType) {
      case TemplateType.INTRO_YOURSELF:
        return "介绍你自己";
      case TemplateType.AD:
        return "写广告创意";
      case TemplateType.SOCIAL_MEDIA:
        return "创作视频";
      default:
        return "";
    }
  }, [props.templateType]);
  const [form] = useForm<FieldType>();
  const onOk = () => {
    form
      .validateFields()
      .then(values => {
        props.onSubmit(values);
      })
      .catch(() => {});
  };
  return (
    <Modal
      title={dialogTitle}
      destroyOnClose
      open={props.dialogVisible}
      onCancel={props.onHideDialog}
      onOk={onOk}
    >
      <InternalForm form={form} />
    </Modal>
  );
}

export default InternalDialog;
