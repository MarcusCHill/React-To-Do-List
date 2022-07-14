import React from "react";
import PropTypes from 'prop-types';
import InputWithLabel from "./InputWithLabel";
import style from "./AddTodoForm.module.css";
import { ReactComponent as AddItem } from '../svgs/addItem.svg';

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
  todoList: PropTypes.array,
}

/*
Create function component AddTodoForm that accepts destructured properties found during instantization.
AddTodoForm returns a form that allows users to add a todo title to their todo list.
*/
function AddTodoForm ({ onAddTodo, todoList }){
  /*
  Call and destructure React.useState hook to set todoTitle variable with value defined by setTodoTitle function
  */
  const [todoTitle, setTodoTitle] = React.useState("");
  /*
  Create a handler function handleTitleChange that accepts event values in response to the input onChange event
  handleTitleChange creates newTodoTitle variable that is equal to the current input value
  handleTitleChange uses setTodoTitle functon to update todoTitle with value stored in newTodoTilte
  */
  function handleTitleChange (e){
    const newTodoTilte = e.target.value;
    setTodoTitle(newTodoTilte);
  }
  /*
  Create a handler function handleAddTodo that accepts event values in response to the form onSubmit event.
  handleAddTodo will prevent reloading on submission
  todoTitle variable and position variable is passed into onAddTodo property used as an addTodo argument found in App component.
  */
  function handleAddTodo (e){
    e.preventDefault();
    const position = todoList.length;
    onAddTodo(todoTitle, position);
    setTodoTitle("");
  };

  return(
    /*
    onSubmit event handler runs handleAddTodo when form is submitted
    */
    <form onSubmit={handleAddTodo} className={style.form}>
      <InputWithLabel id="todoTitle" name="title" onChange={handleTitleChange} value={todoTitle}>
        Todo:
      </InputWithLabel>
      <button className={style.button}>
        <AddItem className={style.svg}/>
      </button>
    </form>
  );
};

export default AddTodoForm;
