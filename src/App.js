import './App.css';
import Header from './MyComponents/Header';
import { Todos } from './MyComponents/Todos';
import { AddTodo } from './MyComponents/AddTodo';
import {Footer} from './MyComponents/Footer';
import { About } from './MyComponents/About';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Home component now receives props
const Home = ({ todos, onDelete, addTodo }) => {
  return (
    <>
      <AddTodo addTodo={addTodo} />
      <Todos todos={todos} onDelete={onDelete} />
    </>
  );
};

function App() {
  let initTodo = localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : [];

  const [todos, setTodos] = useState(initTodo);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const onDelete = (todo) => {
    setTodos(todos.filter((e) => e !== todo));
  };

  const addTodo = (title, desc) => {
    let sno = todos.length === 0 ? 0 : todos[todos.length - 1].sno + 1;
    setTodos([...todos, { sno, title, desc }]);
  };

  return (
    <Router>
      <Header title="My Todos List" searchBar={false} />
      <Routes>
        {/* Pass todos, onDelete, and addTodo as props to Home */}
        <Route path="/" element={<Home todos={todos} onDelete={onDelete} addTodo={addTodo} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
