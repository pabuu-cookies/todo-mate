"use client"

import { useState, useEffect } from "react"
import AuthPage from "./pages/AuthPage"
import Dashboard from "./pages/Dashboard"
import { authAPI } from "./services/api"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  // ✅ Auto-login if token exists
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token")
      if (!token) return

      try {
        // OPTIONAL: hit an API like /me or /profile to get user info
        const response = await authAPI.getProfile()
        setUser(response.user)
        setIsAuthenticated(true)
      } catch (error) {
        console.error("❌ Auto-login failed:", error.message)
        localStorage.removeItem("token")
      }
    }

    checkAuth()
  }, [])

  const handleLogin = async (credentials) => {
    try {
      const response = await authAPI.login(credentials)
      console.log("✅ Login successful:", response)

      setUser(response.user)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error.message)
    }
  }

  const handleSignup = async (userData) => {
    try {
      const response = await authAPI.signup(userData)
      console.log("✅ Signup successful:", response)

      setUser(response.user)
      setIsAuthenticated(true)
    } catch (error) {
      console.error("❌ Signup failed:", error.response?.data || error.message)
    }
  }

  const handleLogout = () => {
    authAPI.logout()
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {isAuthenticated ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : (
        <AuthPage onLogin={handleLogin} onSignup={handleSignup} />
      )}
      <ToastContainer position="bottom-center" autoClose={3000} />
    </div>
  )
}

export default App
