import { MouseEvent } from "react";
import ListItem from "./ListItem";

export interface ListItem {
  id: string;
  text: string;
  favorite: boolean;
}
interface Props {
  list: ListItem[];
  onAdd: (text: string) => void;
  onFavorite: (id: string) => void;
  onCopy?: (id: string, e: MouseEvent) => void;
  onDelete?: (id: string, e: MouseEvent) => void;
}
function List(props: Props) {
  return (
    <div>
      {props.list.map(item => (
        <ListItem
          key={item.id}
          id={item.id}
          text={item.text}
          onAdd={props.onAdd}
          onFavorite={props.onFavorite}
          onCopy={props.onCopy}
          onDelete={props.onDelete}
          isFavorite={item.favorite}
        />
      ))}
    </div>
  );
}

export default List;
