"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import TodoList from "../components/dashboard/TodoList"
import AddTodoForm from "../components/dashboard/AddTodoForm"
import FilterButtons from "../components/dashboard/FilterButtons"
import TodoStats from "../components/dashboard/TodoStats"
import Header from "../components/dashboard/Header"
import { todoAPI } from "../services/api"
import { toast } from "react-toastify"

const Dashboard = ({ user, onLogout }) => {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState("all")

  useEffect(() => {
  const fetchTodos = async () => {
    try {
      const data = await todoAPI.getAllTodos()
      setTodos(data)
    } catch (error) {
      console.error("❌ Failed to fetch todos:", error)
      toast.error("Failed to fetch your task.")
    }
  }

  fetchTodos()
}, [])


  const addTodo = async (text) => {
  try {
    const newTodo = await todoAPI.createTodo({ text })
    setTodos([...todos, newTodo])
  } catch (error) {
    console.error("❌ Failed to add todo:", error)
    toast.error("Failed to add task.")
  }
}

  const toggleTodo = async (id) => {
  const todo = todos.find((t) => t._id === id)
  if (!todo) return

  try {
    const updatedTodo = await todoAPI.updateTodo(id, {
      completed: !todo.completed,
    })
    const newTodos = todos.map((t) => (t._id === id ? updatedTodo : t))
    setTodos(newTodos)
    if (!todo.completed) { // was just marked as completed
      const remaining = newTodos.filter((t) => !t.completed).length
      const toastMessage =
    remaining === 0
      ? "All tasks completed. Time to relax ✨"
      : `Only ${remaining} left — you're on a roll 🔥`
  toast.success(`Task marked as done. ${toastMessage}`)
    }
  } catch (error) {
    console.error("❌ Failed to toggle todo:", error)
    toast.error("Failed to update task.")
  }
}

  const deleteTodo = async (id) => {
  try {
    await todoAPI.deleteTodo(id)
    setTodos(todos.filter((todo) => todo._id !== id))
  } catch (error) {
    console.error("❌ Failed to delete todo:", error)
    toast.error("Failed to delete task.")
  }
}

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed
    if (filter === "completed") return todo.completed
    return true
  })

  const stats = {
    total: todos.length,
    completed: todos.filter((todo) => todo.completed).length,
    remaining: todos.filter((todo) => !todo.completed).length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header user={user} onLogout={onLogout} />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 bg-purple-600 text-white">
              <h1 className="text-2xl font-bold">My Tasks</h1>
              <TodoStats stats={stats} />
            </div>

            <div className="p-6">
              <AddTodoForm onAddTodo={addTodo} />

              <div className="mt-6">
                <FilterButtons filter={filter} onFilterChange={setFilter} counts={stats} />
              </div>

              <div className="mt-6">
                <TodoList todos={filteredTodos} onToggle={toggleTodo} onDelete={deleteTodo} />
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  )
}

export default Dashboard
