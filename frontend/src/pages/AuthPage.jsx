"use client"

import { useState } from "react"
import LoginForm from "../components/auth/LoginForm"
import SignupForm from "../components/auth/SignupForm"
import { motion, AnimatePresence } from "framer-motion"

const AuthPage = ({ onLogin, onSignup }) => {
  const [isLogin, setIsLogin] = useState(true)

  const toggleAuthMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left Section - Text Prompt */}
      <div className="bg-purple-600 flex items-center justify-center p-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md"
        >
          <h1 className="text-4xl font-bold mb-6">TaskMate</h1>
          <p className="text-xl mb-8">Organize your life, one task at a time.</p>
          <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm">
            <h2 className="text-2xl font-semibold mb-4">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </h2>
            <p className="mb-6">
              {isLogin
                ? "Sign up to start tracking your tasks and boost your productivity."
                : "Log in to continue managing your tasks and stay organized."}
            </p>
            <button
              onClick={toggleAuthMode}
              className="px-6 py-2 bg-white text-purple-600 rounded-full font-medium hover:bg-purple-100 transition-colors"
            >
              {isLogin ? "Sign up" : "Log in"}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Right Section - Dynamic Form */}
      <div className="flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <AnimatePresence mode="wait">
            {isLogin ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <LoginForm onLogin={onLogin} />
              </motion.div>
            ) : (
              <motion.div
                key="signup"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <SignupForm onSignup={onSignup} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default AuthPage
