import { MaxLengthSelector } from "./components/maxlength-selector"
import { TemperatureSelector } from "./components/temperature-selector"
import { TopPSelector } from "./components/top-p-selector"

import * as StoreAtom from "@/lib/store/atom"
import { useAtom } from "jotai";

import { Label } from "@/components/ui/label"
export const ModelConfig = () => {
  const [temperature, setTemperature] = useAtom(StoreAtom.temperatureAtom)
  const [topP, setTopP] = useAtom(StoreAtom.top_pAtom)
  const [maxTokens, setMaxTokens] = useAtom(StoreAtom.max_tokensAtom)
  return (
    <div className="hidden flex-col space-y-4 sm:flex md:order-2">
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
      <div className="pt-16 text-xs text-muted-foreground">
      </div>
    </div>
  )
}
