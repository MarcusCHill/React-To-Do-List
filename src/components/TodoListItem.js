import * as React from "react";
import PropTypes from 'prop-types';
import style from "./TodoListItem.module.css";
import { ReactComponent as RemoveItem } from '../svgs/removeItem.svg';

TodoListItem.propTypes = {
  todoList: PropTypes.string,
  onRemoveTodo: PropTypes.func,
  provided: PropTypes.object,
}

/*
Create TodoListItem function component that accepts properties defined at TodoListItem instantization
Returns a list element with the item's title value and creates a remove button that acceses onRemoveTodo property.
*/
function TodoListItem ({ item, onRemoveTodo, provided, innerRef}){
  return(
    <li className={style.listItem} {...provided.dragHandleProps} {...provided.draggableProps} ref={innerRef}>
      <span className={style.todoTitle}>{item.fields.Title}</span>
      &nbsp;
      <button type="button" onClick={() => onRemoveTodo(item.id)} className={style.button}>
        <RemoveItem className={style.svg}/>
      </button>
    </li>
  );
};

export default TodoListItem;
