import React, { MouseEvent } from "react";
import { Space, Divider } from "antd";

function Button({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: (e: MouseEvent) => void;
}) {
  return (
    <span
      onPointerDown={onClick}
      style={{
        cursor: "pointer",
        width: "fit-content",
        wordWrap: "break-word",
      }}
    >
      {children}
    </span>
  );
}

interface BubbleToolProps {
  onImprove?: (e: MouseEvent) => void;
  onContinue?: (e: MouseEvent) => void;
  onTranslate?: (e: MouseEvent) => void;
  onSimplify?: (e: MouseEvent) => void;
  onExpand?: (e: MouseEvent) => void;
}
function BubbleTool(props: BubbleToolProps) {
  return (
    <div
      style={{
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
        display: "inline-block",
      }}
    >
      <Space size={5}>
        <Button onClick={props.onImprove}>改善</Button>
        <Divider type="vertical" />
        <Button onClick={props.onContinue}>续写</Button>
        <Divider type="vertical" />
        <Button onClick={props.onSimplify}>简化</Button>
        <Divider type="vertical" />
        <Button onClick={props.onExpand}>扩写</Button>
        <Divider type="vertical" />
        <Button onClick={props.onTranslate}>翻译</Button>
      </Space>
    </div>
  );
}

export default BubbleTool;
