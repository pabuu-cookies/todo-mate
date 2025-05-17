"use client"

import { useState } from "react"
import { Plus } from "lucide-react"

const AddTodoForm = ({ onAddTodo }) => {
  const [text, setText] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!text.trim()) {
      setError("Task cannot be empty")
      return
    }

    onAddTodo(text)
    setText("")
    setError("")
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => {
            setText(e.target.value)
            if (error) setError("")
          }}
          placeholder="Add a new task..."
          className={`flex-1 px-4 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500`}
        />
        <button
          type="submit"
          className="flex items-center justify-center p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </form>
  )
}

export default AddTodoForm
