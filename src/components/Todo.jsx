import React, { useState } from 'react'
import clsx from 'clsx';
import { GrFormClose, GrFormEdit, GrFormCheckmark } from "react-icons/gr"
import { useTodoLayerValue } from "../context/TodoContext";

function Todo({todo}) {
  const[{ }, dispatch] = useTodoLayerValue();
  const [editable, setEditable] = useState(false);
  const[content, setContent] = useState(todo.content);

  const removeTodo = todoId => {
    dispatch({
      type: "REMOVE_TODO",
      payload: todoId,
    })
  } 
  
  const complateTodo = todoId => {
    dispatch({
      type: "COMPLATE_TODO",
      payload: todoId,
    })
  }
  
  const updateTodo = ({todoId, newValue}) => {
    dispatch({
      type: "UPDATE_TODO",
      payload: {
        todoId,
        newValue,
      },
    })
  } 

  const todoStyle = clsx({
    ["todo-row"]: true,
    ["completed"]: todo.isComplated,
  })

  return (
    <div className={todoStyle}>
      <div onClick={() => (editable ? '' : complateTodo(todo.id)) }>
        {editable ? 
          (<input type="text" className='todo-input-edit' value={content} onChange={event => setContent(event.target.value)}/>)
          : 
          todo.content 
        }
      </div>

      <div className="todo-icons">
        <GrFormClose className="todo-icon" onClick={() => removeTodo(todo.id)}/>
        {
          editable ? <GrFormCheckmark className="todo-icon" onClick={() => {
            updateTodo({
              todoId: todo.id,
              newValue: content,
            })
            setContent("");
            setEditable(false);
          }}/> :
          <GrFormEdit className="todo-icon" onClick={(() => setEditable(true))}/> 
        }
      </div>
    </div>
  )
}

export default Todo;