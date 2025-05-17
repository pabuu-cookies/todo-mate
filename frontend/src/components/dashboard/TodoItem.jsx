"use client"

import { motion } from "framer-motion"
import { Trash, Check, Circle } from "lucide-react"

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-3 bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow group">
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onToggle(todo._id)}
          className={`flex-shrink-0 w-6 h-6 rounded-full border ${
            todo.completed
              ? "bg-purple-600 border-purple-600 text-white"
              : "border-gray-300 text-transparent hover:border-purple-600"
          } flex items-center justify-center transition-colors`}
        >
          {todo.completed ? (
            <Check className="h-4 w-4" />
          ) : (
            <Circle className="h-4 w-4 opacity-0 group-hover:opacity-30" />
          )}
        </button>

        <span className={`${todo.completed ? "text-gray-400 line-through" : "text-gray-700"} transition-colors`}>
          {todo.text}
        </span>
      </div>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onDelete(todo._id)}
        className="text-gray-400 hover:text-red-500 transition-colors"
        aria-label="Delete task"
      >
        <Trash className="h-5 w-5" />
      </motion.button>
    </div>
  )
}

export default TodoItem
