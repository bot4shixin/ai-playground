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

import { useAtom } from "jotai"
import * as StoreAtom from "@/lib/store/atom"
import { TemperatureSelector } from "@/app/playground/components/temperature-selector"
import { TopPSelector } from "@/app/playground/components/top-p-selector"
import { MaxLengthSelector } from "@/app/playground/components/maxlength-selector"
import { SlidersHorizontal } from 'lucide-react';


export function ConfigSelector() {
  const [open, setOpen] = useState(false)
  const [temperature, setTemperature] = useAtom(StoreAtom.temperatureAtom)
  const [topP, setTopP] = useAtom(StoreAtom.top_pAtom)
  const [maxTokens, setMaxTokens] = useAtom(StoreAtom.max_tokensAtom)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <SlidersHorizontal className="h-4 w-4 shrink-0" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[250px] p-4">
        <TemperatureSelector value={[
          temperature
        ]} setValue={(v) => {
          setTemperature(v[0] || 0)
        }} />
        <TopPSelector value={[
          topP
        ]}  setValue={
          (v) => {
            setTopP(v[0] || 0)
          }
        }/>
        <MaxLengthSelector value={[
          maxTokens
        ]} setValue={
          (v) => {
            setMaxTokens(v[0] || 0)
          }
        }/>
      </PopoverContent>
    </Popover>
  )
}


