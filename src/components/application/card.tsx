import { ReactNode } from "react";

interface CardProps {
  children: ReactNode
}

export function Card({ children }: CardProps) {
  return (
    <div
      className="ring ring-gray-400 p-2 rounded"
    >
      {children}
    </div>
  )
}