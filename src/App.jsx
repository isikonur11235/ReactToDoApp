import { useState, useEffect } from 'react';
import ToDoForm from './compenents/ToDoForm';
import ToDoList from './compenents/ToDoList';

function App() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState('');





  const fetchTodos = async () => {
    const response = await fetch('http://localhost:3000/todos');
    const data = await response.json();
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

 

  const handleAdd = async (event) => {
    event.preventDefault();
    const response = await fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title: value }),
    });
    const data = await response.json();
    setTodos([...todos, data]);
    setValue('');
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE',
    });
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValue(todos[index].title);
  };

  const handleEditChange = (event) => {
    setEditValue(event.target.value);
  };

  const handleSave = async () => {
    const todo = todos[editIndex];
    const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...todo, title: editValue }),
    });
    const data = await response.json();
    const newTodos = [...todos];
    newTodos[editIndex] = data;
    setTodos(newTodos);
    setEditIndex(-1);
    setEditValue('');
  };




  return (
    <div>
      
      <ToDoForm value={value} handleChange={handleChange} handleAdd={handleAdd} />
      <ToDoList todos={todos} editIndex={editIndex} editValue={editValue} handleEditChange={handleEditChange} handleSave={handleSave} handleDelete={handleDelete} handleEdit={handleEdit} />
      
    </div>
  );
}

export default App;
