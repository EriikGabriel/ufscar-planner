import * as React from "react"

import { cn } from "@lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  left?: React.ReactNode
  right?: React.ReactNode
  classNameGroup?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, left, right, classNameGroup, ...props }, ref) => {
    return (
      <div
        className={cn(
          "flex items-center gap-2 rounded-md",
          left && "pl-2",
          right && "pr-2",
          classNameGroup
        )}
      >
        {left}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full border rounded-md bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
            (left || right) && "border-0 focus-visible:ring-0",
            left && "pl-1",
            right && "pr-1",
            className
          )}
          ref={ref}
          {...props}
        />
        {right}
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
