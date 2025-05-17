"use client"

const FilterButtons = ({ filter, onFilterChange, counts }) => {
  const filters = [
    { id: "all", label: "All", count: counts.total },
    { id: "active", label: "Active", count: counts.remaining },
    { id: "completed", label: "Completed", count: counts.completed },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(({ id, label, count }) => (
        <button
          key={id}
          onClick={() => onFilterChange(id)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            filter === id ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  )
}

export default FilterButtons
