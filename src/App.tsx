import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, Pagination } from '@mui/material';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  text: string;
  category: string;
  priority: '🔴' | '🟡' | '🟢';
}

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string, category: string, priority: '🔴' | '🟡' | '🟢') => {
    const newTodo: Todo = { id: uuidv4(), text, category, priority };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = selectedCategory === 'All'
    ? todos
    : todos.filter(todo => todo.category === selectedCategory);

  const pageCount = Math.ceil(filteredTodos.length / itemsPerPage);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const paginatedTodos = filteredTodos.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  return (
    <Container maxWidth="md">
      <Box mt={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Todo App
        </Typography>
        <TodoForm onAdd={addTodo} />
        <FormControl fullWidth variant="outlined" sx={{ mt: 2 }}>
          <InputLabel id="category-filter-label">Category</InputLabel>
          <Select
            labelId="category-filter-label"
            id="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value as string)}
            label="Category"
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="General">General</MenuItem>
            <MenuItem value="Personal">Personal</MenuItem>
            {/* Add more categories as needed */}
          </Select>
        </FormControl>
        <TodoList todos={paginatedTodos} onDelete={deleteTodo} />
        <Pagination
          count={pageCount}
          page={page}
          onChange={handleChangePage}
          sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        />
      </Box>
    </Container>
  );
}

export default App;
