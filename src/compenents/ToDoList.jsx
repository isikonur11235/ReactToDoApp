import React from 'react'

const ToDoList = ({todos,editIndex,editValue,handleEditChange,handleSave,handleDelete,handleEdit}) => {
  return (
    <div>
        <ul>
        {todos.map((todo, index) => (
          <li key={todo.id}>
            {editIndex === index ? (
              <div>
                <input type="text" value={editValue} onChange={handleEditChange} />
                <button onClick={handleSave}>Save</button>
              </div>
            ) : (
              <div>
                {todo.title}
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
                <button onClick={() => handleEdit(index)}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ToDoList