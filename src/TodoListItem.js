import * as React from "react";
/*
Create TodoListItem function component that accepts properties defined at TodoListItem instantization
Returns a list element with the item's title value (from todoList array).
*/
function TodoListItem ({ item }){
  return(
    <li>{item.title}</li>
  );
};

export default TodoListItem;
