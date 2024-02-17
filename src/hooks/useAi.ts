import { useCallback, useState } from "react";
import { requestAi } from "../services/ai";

export enum TemplateType {
  AD,
  INTRO_YOURSELF,
  SOCIAL_MEDIA
}

export enum CREATIVE_LEVEL {
  ORIGINAL = 'original',
  REPETITIVE = 'repetitive',
  DETERMINISTIC = 'deterministic',
  CREATIVE = 'creative',
  IMAGINATIVE = 'imaginative',
}

export enum LANGUAGES {
  EN = 'en',
  ZH = 'zh',
}

export interface ListItem {
  id: string;
  text: string;
  favorite: boolean;
}

const initialList = [
  {
    id: "1",
    text: "小糖果是一家本地制造糖果的公司，我们使用全天然原料，无污染，不添加防腐剂。自成立以来，我们致力于提供健康、美味的糖果产品。我们的生产过程严格遵循高品质标准，确保每一颗小糖果都能给消费者带来纯正的口感和愉悦的体验。无论是作为休闲零食还是礼物赠送，小糖果都是您最佳的选择。我们始终关注环境保护和可持续发展，在生产过程中尽可能降低对环境的影响。通过与当地农民和供应商合作，我们确保使用优质的原材料，并为当地经济做出贡献。选择小糖果，您将在享受美味同时也支持健康和可持续发展。",
    favorite: true,
  },
  {
    id: "2",
    text: "我是占位",
    favorite: false,
  },
];

function useAi() {
  const [list, setList] = useState<ListItem[]>(initialList);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [templateType, setTemplateType] = useState<TemplateType>(
    TemplateType.AD,
  );
  const onShowAdDialog = useCallback(() => {
    console.log("show ad dialog");
    setTemplateType(TemplateType.AD);
    setDialogVisible(true);
  }, []);

  const onShowIntroYourselfDialog = useCallback(() => {
    console.log("show intro yourself dialog");
    setTemplateType(TemplateType.INTRO_YOURSELF);
    setDialogVisible(true);
  }, []);

  const onHideDialog = useCallback(() => {
    setDialogVisible(false);
  }, []);
  const onSubmit = useCallback((formData: Record<string, any>) => {
    console.log(formData);
    requestAi().then((res) => {
      console.log(res);
      setList(res);
      setDialogVisible(false);
    });
  }, []);
  return {
    list,
    dialogVisible,
    templateType,
    onShowAdDialog,
    onShowIntroYourselfDialog,
    onHideDialog,
    onSubmit,
  };
}

export default useAi;
