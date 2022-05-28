import * as React from "react";
/*
Create TodoListItem function component that accepts properties defined at TodoListItem instantization
Returns a list element with the item's title value and creates a remove button that acceses onRemoveTodo property.
*/
function TodoListItem ({ item, onRemoveTodo }){
  return(
    <li>
      {item.fields.Title}
      &nbsp;
      <button type="button" onClick={() => onRemoveTodo(item.id)}>remove</button>
    </li>
  );
};

export default TodoListItem;
