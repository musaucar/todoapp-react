import React, { useState ,useEffect, useRef } from "react";
import { useTodoLayerValue } from "./context/TodoContext";
import Todolist from "./components/TodoList"
import { type } from "@testing-library/user-event/dist/type";
import "./App.css"

const App = () => {
  const [{ todos }, dispatch] = useTodoLayerValue();
  const [content, setContent] = useState("");

  const inputRef = useRef(null);
  useEffect(() =>{
    inputRef.current.focus();
  }, [])

  const handleSubmit= (event) => {
    event.preventDefault();

    if(!content && content.length < 1) return;

    const newTodo = {
      id: Math.floor(Math.random() * 43432343),
      content,
      isComplated: false,
    };

    dispatch({
      type: "ADD_TODO",
      payload: newTodo,
    });

    setContent(' ');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="todo-form"> 
        <input type="text" className="todo-input" ref={inputRef} onChange={(event) => setContent(event.target.value)} value={content}/>
        <button className="todo-button">
          Ekle  
        </button>
      </form>

      {/* Todo Listesi */}
      <Todolist todos = {todos}/>
    </div>
  )
};

export default App;
