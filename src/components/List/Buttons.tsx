import { Button, Space } from "antd";
import React, { MouseEvent } from "react";

interface Props {
  onAdd: (e: MouseEvent) => void;
  onFavorite: (e: MouseEvent) => void;
  isFavorite: boolean;
  onRemove: (e: MouseEvent) => void;
}

function Buttons(props: Props) {
  return (
    <Space style={{ fontSize: 12 }}>
      <Button onClick={props.onAdd}>+</Button>
      <Button
        onClick={props.onFavorite}
        style={{ color: props.isFavorite ? "red" : "black" }}
      >
        {props.isFavorite ? "★" : "☆"}
      </Button>
      <Button onClick={props.onRemove}>-</Button>
    </Space>
  );
}

export default Buttons;
