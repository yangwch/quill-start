import { Card } from "antd";
import React, { MouseEvent } from "react";
import styled from "styled-components";
import Buttons from "./Buttons";

interface Props {
  id: string;
  text: string;
  isFavorite: boolean;
  onAdd: (text: string) => void;
  onFavorite: (id: string) => void;
  onCopy?: (id: string, e: MouseEvent) => void;
  onDelete?: (id: string, e: MouseEvent) => void;
}

const ContentWrapper = styled.div`
  font-size: 14px;
`;

function ListItem(props: Props) {
  const { id, text, onAdd, onFavorite, onCopy, onDelete } = props;
  return (
    <Card
      extra={
        <Buttons
          isFavorite={props.isFavorite}
          onRemove={e => onDelete && onDelete(id, e)}
          onAdd={() => onAdd(text)}
          onFavorite={() => onFavorite(id)}
        />
      }
      styles={{ body: { padding: 10 } }}
      style={{ marginBottom: 10 }}
    >
      <ContentWrapper><pre>{text}</pre></ContentWrapper>
    </Card>
  );
}

export default ListItem;
