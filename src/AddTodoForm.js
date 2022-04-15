import React from "react";
/*
Create function component AddTodoForm that accepts props found during instantization.
AddTodoForm returns a form that allows users to add a todo title to their todo list.
*/
function AddTodoForm ({ onAddTodo }){

  function handleTitleChange (e){
    const newTodoTilte = e.target.value;
    setTodoTitle(newTodoTilte);
  }
  /*
  Create a handler function handleAddTodo that accepts event values in response to the onSubmit event.
  handleAddTodo will prevent reloading on submission
  handleAddTodo will pass the user input value into todoTitle variable
  todoTitle variable is passed into onAddTodo property which provides the setNewTodo argument used in React.useState()
  */
  function handleAddTodo (e){
    e.preventDefault();
    onAddTodo({title: todoTitle, id: Date.now()});
    setTodoTitle("");
    console.log(todoTitle);
  };

  const [todoTitle, setTodoTitle] = React.useState("");

  return(
    /*
    onSubmit event handler runs handleAddTodo when form is submitted
    */
    <form  onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Title: </label>
      <input id="todoTitle" type="text" name="title" onChange={handleTitleChange} value={todoTitle}/>
      <button>Add</button>
    </form>
  );
};

export default AddTodoForm;
