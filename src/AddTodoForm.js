import React from "react";
import InputWithLabel from "./InputWithLabel";
/*
Create function component AddTodoForm that accepts destructured properties found during instantization.
AddTodoForm returns a form that allows users to add a todo title to their todo list.
*/
function AddTodoForm ({ onAddTodo }){
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
  todoTitle variable is passed into onAddTodo property used as an addTodo argument found in App component.
  */
  function handleAddTodo (e){
    e.preventDefault();
    onAddTodo({title: todoTitle, id: Date.now()});
    setTodoTitle("");
  };

  return(
    /*
    onSubmit event handler runs handleAddTodo when form is submitted
    */
    <form  onSubmit={handleAddTodo}>
      <InputWithLabel id="todoTitle" name="title" onChange={handleTitleChange} value={todoTitle}>
        Title:
      </InputWithLabel>
      <button>Add</button>
    </form>
  );
};

export default AddTodoForm;
