import React from "react"
export function Input({ className = "", ...props }) {
  return (
    <input
      className={`px-4 py-2 rounded-md bg-transparent border focus:outline-none focus:ring-2 focus:ring-cyan-400 text-white ${className}`}
      {...props}
    />
  )
}
