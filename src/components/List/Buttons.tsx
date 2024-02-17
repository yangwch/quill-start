import { Space } from "antd";
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
      <button onClick={props.onAdd}>+</button>
      <button
        onClick={props.onFavorite}
        style={{ color: props.isFavorite ? "red" : "black" }}
      >
        {props.isFavorite ? "★" : "☆"}
      </button>
      <button onClick={props.onRemove}>-</button>
    </Space>
  );
}

export default Buttons;
