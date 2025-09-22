"use client"

import { cn } from "@/app/lib/utils"
import { Badge } from "@ui/badge"
import { Command, CommandGroup, CommandItem } from "@ui/command"
import { Command as CommandPrimitive } from "cmdk"
import { X } from "lucide-react"
import * as React from "react"

export type OptionType = Record<"value" | "label", string>

interface MultiSelectProps<T> {
  options: T[]
  value?: T[]
  optionsLimitShow?: number
  placeholder?: string
  onChange?: (value: T[]) => void
  selected: T[]
  setSelected: React.Dispatch<React.SetStateAction<T[]>>
  creatable?: boolean // permite criar itens customizados
}

export function MultiSelect({
  options,
  placeholder,
  optionsLimitShow,
  selected,
  setSelected,
  creatable = false,
}: MultiSelectProps<OptionType>) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [open, setOpen] = React.useState(false)
  const [inputValue, setInputValue] = React.useState("")
  const [allOptions, setAllOptions] = React.useState<OptionType[]>(options)

  React.useEffect(() => {
    setAllOptions(options)
  }, [options])

  const handleUnselect = React.useCallback(
    (option: OptionType) => {
      setSelected((prev) => prev.filter((s) => s.value !== option.value))
    },
    [setSelected]
  )

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current
      if (input) {
        if (
          (e.key === "Delete" || e.key === "Backspace") &&
          input.value === ""
        ) {
          setSelected((prev) => {
            const newSelected = [...prev]
            newSelected.pop()
            return newSelected
          })
        }
        if (e.key === "Escape") input.blur()
      }
    },
    [setSelected]
  )

  // filtra opções que ainda não foram selecionadas
  const selectables = allOptions.filter(
    (option) => !selected.some((s) => s.value === option.value)
  )

  // sanitiza valores para evitar erros do cmdk
  const sanitizedInput = inputValue.replace(/["'`\\]/g, "").trim()

  return (
    <Command
      onKeyDown={handleKeyDown}
      className="overflow-visible bg-transparent"
    >
      <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex gap-1 flex-wrap">
          {selected.map((option) => (
            <Badge key={option.value} variant="secondary">
              {option.label}
              <button
                className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleUnselect(option)
                }}
                onMouseDown={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                }}
                onClick={() => handleUnselect(option)}
              >
                <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
              </button>
            </Badge>
          ))}

          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={(text) => {
              const sanitizedText = text.replace(/["'`\\]/g, "")
              setInputValue(sanitizedText)
            }}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className={cn(
              "bg-transparent outline-none placeholder:text-muted-foreground gap-4 flex-1",
              selected.length && "mt-3"
            )}
          />
        </div>
      </div>

      <div className="relative mt-2">
        {open && (selectables.length > 0 || (creatable && sanitizedInput)) && (
          <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
            {selectables.length > 0 && (
              <CommandGroup className="h-48 overflow-auto">
                {selectables.map(
                  (option, i) =>
                    i < (optionsLimitShow ?? selectables.length) && (
                      <CommandItem
                        key={option.value}
                        onMouseDown={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                        }}
                        onSelect={() => {
                          setInputValue("")
                          setSelected((prev) => [...prev, option])
                        }}
                        className="cursor-pointer"
                      >
                        {option.label}
                      </CommandItem>
                    )
                )}
              </CommandGroup>
            )}

            {/* Criar opção customizada */}
            {creatable &&
              sanitizedInput &&
              !allOptions.some((o) => o.value === sanitizedInput) && (
                <CommandGroup>
                  <CommandItem
                    onMouseDown={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                    }}
                    onSelect={() => {
                      const newOption = {
                        label: inputValue,
                        value: sanitizedInput,
                      }
                      setAllOptions((prev) => [...prev, newOption])
                      setSelected((prev) => [...prev, newOption])
                      setInputValue("")
                      setOpen(false)
                    }}
                    className="cursor-pointer font-medium"
                  >
                    {`Adicionar '${inputValue}'`}
                  </CommandItem>
                </CommandGroup>
              )}

            {selectables.length > (optionsLimitShow ?? selectables.length) && (
              <div className="pl-2 py-2 text-center text-xs text-muted-foreground">
                {selectables.length} opções totais...
              </div>
            )}
          </div>
        )}
      </div>
    </Command>
  )
}
