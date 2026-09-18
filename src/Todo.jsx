import { useEffect, useState } from 'react'

const getStoredTodos = (initialTodos) => {
  if (typeof window === 'undefined') {
    return initialTodos
  }

  const savedTodos = window.localStorage.getItem('todo-items')
  return savedTodos ? JSON.parse(savedTodos) : initialTodos
}

const Todo = ({ initialTodos = [], className = '', style = {} }) => {
  const [todos, setTodos] = useState(() => getStoredTodos(initialTodos))
  const [input, setInput] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('todo-items', JSON.stringify(todos))
    }
  }, [todos])

  const handleAddTodo = () => {
    const trimmedValue = input.trim()

    if (!trimmedValue) {
      return
    }

    setTodos((currentTodos) => [
      ...currentTodos,
      {
        id: crypto.randomUUID ? crypto.randomUUID() : Date.now() + Math.random(),
        text: trimmedValue,
      },
    ])
    setInput('')
  }

  const handleDeleteTodo = (id) => {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id))
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo()
    }
  }

  return (
    <div className={`todo-container ${className}`.trim()} style={style}>
      <h1>Todo List</h1>

      <div className="todo-input-row">
        <input
          type="text"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Add a new task..."
          aria-label="Add a new todo"
        />
        <button type="button" onClick={handleAddTodo}>
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="todo-empty">No tasks yet. Add one above.</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span>{todo.text}</span>
              <button
                type="button"
                className="delete-button"
                onClick={() => handleDeleteTodo(todo.id)}
                aria-label={`Delete ${todo.text}`}
              >
                Delete
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default Todo
