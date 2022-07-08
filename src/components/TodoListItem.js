import * as React from "react";
import style from "./TodoListItem.module.css"
/*
Create TodoListItem function component that accepts properties defined at TodoListItem instantization
Returns a list element with the item's title value and creates a remove button that acceses onRemoveTodo property.
*/
function TodoListItem ({ item, onRemoveTodo }){
  return(
    <li className={style.listItem}>
      {item.fields.Title}
      &nbsp;
      <button type="button" onClick={() => onRemoveTodo(item.id)} className={style.button}>Remove</button>
    </li>
  );
};

export default TodoListItem;
