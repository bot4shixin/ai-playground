"use client"

import {useEffect, useRef, useState} from "react"
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import { PopoverProps } from "@radix-ui/react-popover"

import { cn } from "@/lib/utils"
import { useMutationObserver } from "@/hooks/use-mutation-observer"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Model, ModelType } from "@/app/playground/data/models"

interface ModelSelectorProps extends PopoverProps {
  types: readonly ModelType[]
  models: Model[]
  emitSelectedModel?: (model: Model<ModelType>) => void
  defaultValue: Model
}

export function ModelSelector({ models, defaultValue, emitSelectedModel, types, ...props }: ModelSelectorProps) {
  const [open, setOpen] = useState(false)
  const [selectedModel, setSelectedModel] = useState<Model>(defaultValue)
  const [peekedModel, setPeekedModel] = useState<Model>(defaultValue)
  useEffect(() => {
    setSelectedModel(defaultValue)
    setPeekedModel(defaultValue)
  }, [defaultValue])

  return (
    <div className="grid gap-2">
      
      <Popover open={open} onOpenChange={setOpen} {...props}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select a model"
            className="w-full justify-between"
          >
            {selectedModel ? selectedModel.name : "Select a model..."}
            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-[250px] p-0">
          <Command loop>
            <CommandList className="h-[var(--cmdk-list-height)] max-h-[400px]">
              <CommandInput placeholder="Search Models..." />
              <CommandEmpty>No Models found.</CommandEmpty>
              {types.map((type) => (
                <CommandGroup key={type} heading={type}>
                  {models
                    .filter((model) => model.type === type)
                    .map((model) => (
                      <ModelItem
                        key={model.name}
                        model={model}
                        isSelected={selectedModel?.name === model.name}
                        onPeek={(model) => setPeekedModel(model)}
                        onSelect={() => {
                          setSelectedModel(model)
                          // todo fix this as
                          emitSelectedModel?.(model as Model<ModelType>)
                          setOpen(false)
                        }}
                      />
                    ))}
                </CommandGroup>
              ))}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

interface ModelItemProps {
  model: Model
  isSelected: boolean
  onSelect: () => void
  onPeek: (model: Model) => void
}

function ModelItem({ model, isSelected, onSelect, onPeek }: ModelItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  useMutationObserver(ref, (mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes") {
        if (mutation.attributeName === "aria-selected") {
          onPeek(model)
        }
      }
    }
  })

  return (
    <CommandItem
      key={model.name}
      onSelect={onSelect}
      ref={ref}
      className="aria-selected:bg-primary aria-selected:text-primary-foreground"
    >
      {model.name}
      <CheckIcon
        className={cn(
          "ml-auto h-4 w-4",
          isSelected ? "opacity-100" : "opacity-0"
        )}
      />
    </CommandItem>
  )
}
