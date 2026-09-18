import Todo from './Todo'
import './App.css'

function App() {
  const initialTodos = [
    { id: 1, text: 'Review project requirements' },
    { id: 2, text: 'Build the todo UI' },
    { id: 3, text: 'Push the finished app to GitHub' },
  ]

  return (
    <main className="app-shell">
      <Todo initialTodos={initialTodos} />
    </main>
  )
}

export default App
