"use client"

import { LogOut, User } from "lucide-react"

const Header = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-purple-600">TaskMate</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="bg-purple-100 p-2 rounded-full">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <span className="text-gray-700 font-medium hidden sm:inline-block">{user?.name || "User"}</span>
            </div>

            <button
              onClick={onLogout}
              className="flex items-center space-x-1 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline-block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
