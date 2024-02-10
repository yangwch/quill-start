import { MouseEvent } from "react";
import styled from "styled-components";
import BubbleTool from "../BubbleTool";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

const EditorWrapper = styled.div`
  position: relative;
`;

const BubbleWrapper = styled.div`
  position: absolute;
  background: #878383;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  opacity: 0;
  pointer-events: none;
  border-radius: 10px;
  color: #fff;
  &.visible {
    opacity: 1;
    pointer-events: all;
  }
  .yc-divider-vertical {
    border-color: #fff;
  }
`;

interface Props {
  wrapperRef: React.RefObject<HTMLDivElement>;
  bubbleRef: React.RefObject<HTMLDivElement>;
  bubbleState: { visible: boolean; x: number; y: number };
  onImprove?: (e: MouseEvent) => void;
  onContinue?: (e: MouseEvent) => void;
  onTranslate?: (e: MouseEvent) => void;
  onSimplify?: (e: MouseEvent) => void;
  onExpand?: (e: MouseEvent) => void;
}

function Editor({
  wrapperRef: ref,
  bubbleRef,
  bubbleState,
  onImprove,
  onContinue,
  onTranslate,
  onSimplify,
  onExpand,
}: Props) {
  return (
    <div style={{ boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)" }}>
      <div id="toolbar">
        <button className="ql-bold"></button>
        <button className="ql-script" value="sub"></button>
        <button className="ql-script" value="super"></button>
        <button className="ql-code"></button>
      </div>
      <EditorWrapper>
        <div ref={ref}>
          小糖果是一家本地制造糖果的公司，我们使用全天然原料，无污染，不添加防腐剂。自成立以来，我们致力于提供健康、美味的糖果产品。我们的生产过程严格遵循高品质标准，确保每一颗小糖果都能给消费者带来纯正的口感和愉悦的体验。无论是作为休闲零食还是礼物赠送，小糖果都是您最佳的选择。我们始终关注环境保护和可持续发展，在生产过程中尽可能降低对环境的影响。通过与当地农民和供应商合作，我们确保使用优质的原材料，并为当地经济做出贡献。选择小糖果，您将在享受美味同时也支持健康和可持续发展。
        </div>
        <BubbleWrapper
          ref={bubbleRef}
          className={bubbleState.visible ? "visible" : ""}
          style={{
            left: bubbleState.x,
            top: bubbleState.y,
          }}
        >
          <BubbleTool
            onImprove={onImprove}
            onContinue={onContinue}
            onTranslate={onTranslate}
            onSimplify={onSimplify}
            onExpand={onExpand}
          />
        </BubbleWrapper>
      </EditorWrapper>
    </div>
  );
}

export default Editor;
