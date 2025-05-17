import { CheckCircle, Circle, ListTodo } from "lucide-react"

const TodoStats = ({ stats }) => {
  return (
    <div className="flex flex-wrap gap-4 mt-2">
      <div className="flex items-center space-x-1 text-white/80">
        <ListTodo className="h-4 w-4" />
        <span className="text-sm">Total: {stats.total}</span>
      </div>

      <div className="flex items-center space-x-1 text-white/80">
        <CheckCircle className="h-4 w-4" />
        <span className="text-sm">Completed: {stats.completed}</span>
      </div>

      <div className="flex items-center space-x-1 text-white/80">
        <Circle className="h-4 w-4" />
        <span className="text-sm">Remaining: {stats.remaining}</span>
      </div>
    </div>
  )
}

export default TodoStats
