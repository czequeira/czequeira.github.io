import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isPrimary?: boolean
}

export function Button({isPrimary, ...props}: ButtonProps) {
  return <button
    className={`px-4 py-2 rounded ring-2 cursor-pointer ring-amber-800 ${
      isPrimary ? 'text-white bg-amber-800' : 'text-amber-800'
    }`}
    {...props}
  />
}