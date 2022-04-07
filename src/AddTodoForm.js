import React from "react";

function AddTodoForm (props){

  function handleAddTodo (e){
    e.preventDefault();
    let todoTitle = e.target.title.value;
    e.target.title.value = "";
    props.onAddTodo(todoTitle);
    console.log(todoTitle);
  };


  return(
    <form  onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title: </label>
      <input id="todoTitle" type="text" name="title"/>
      <button>Add</button>
    </form>
  );
};

export default AddTodoForm;
