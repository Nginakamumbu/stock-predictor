import React from "react"
import { useState } from "react"

export function Select({ value, onValueChange, children }) {
  return children.map((child) =>
    React.cloneElement(child, { value, onValueChange })
  )
}

export function SelectTrigger({ children, onClick, className = "" }) {
  return (
    <button onClick={onClick} className={`px-4 py-2 rounded border ${className}`}>
      {children}
    </button>
  )
}

export function SelectValue({ children }) {
  return <span>{children}</span>
}

export function SelectContent({ children, className = "" }) {
  return <div className={`mt-2 border rounded bg-black text-white ${className}`}>{children}</div>
}

export function SelectItem({ value, children, onValueChange }) {
  return (
    <div
      onClick={() => onValueChange(value)}
      className="px-4 py-2 hover:bg-gray-700 cursor-pointer"
    >
      {children}
    </div>
  )
}
