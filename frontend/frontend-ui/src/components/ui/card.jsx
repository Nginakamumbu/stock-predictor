import React from "react"
export function Card({ children, className = "" }) {
  return <div className={`rounded-lg p-4 ${className}`}>{children}</div>
}

export function CardHeader({ children }) {
  return <div className="mb-2">{children}</div>
}

export function CardTitle({ children, className = "" }) {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>
}

export function CardDescription({ children, className = "" }) {
  return <p className={`text-sm ${className}`}>{children}</p>
}

export function CardContent({ children, className = "" }) {
  return <div className={`mt-2 ${className}`}>{children}</div>
}
