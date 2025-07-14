import React from "react"
import { useState } from "react"

export function Tabs({ children, defaultValue, className = "" }) {
  const [activeTab, setActiveTab] = useState(defaultValue)
  return (
    <div className={className}>
      {children.map((child) =>
        child.type.name === "TabsList"
          ? React.cloneElement(child, { activeTab, setActiveTab })
          : child.type.name === "TabsContent"
          ? React.cloneElement(child, { activeTab })
          : child
      )}
    </div>
  )
}

export function TabsList({ children, activeTab, setActiveTab, className = "" }) {
  return (
    <div className={className}>
      {children.map((child) =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  )
}

export function TabsTrigger({ value, children, activeTab, setActiveTab, className = "" }) {
  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 rounded-md ${activeTab === value ? "font-bold" : "opacity-70"} ${className}`}
    >
      {children}
    </button>
  )
}

export function TabsContent({ value, activeTab, children, className = "" }) {
  if (value !== activeTab) return null
  return <div className={className}>{children}</div>
}
