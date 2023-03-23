import React from 'react'

const ToDoForm = ({value,handleChange,handleAdd}) => {
  return (
    <div>
        
      <form>
        <label htmlFor="todo">Add a todo</label>
        <input type="text" value={value} onChange={handleChange} />
        <button onClick={handleAdd}>Add</button>
      </form>

    </div>
  )
}

export default ToDoForm