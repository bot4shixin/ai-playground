import { MaxLengthSelector } from "./components/maxlength-selector"
import { ModelSelector } from "./components/model-selector"
import { TemperatureSelector } from "./components/temperature-selector"
import { TopPSelector } from "./components/top-p-selector"
import { models, types } from "./data/models"
import { Checkbox } from "@/components/ui/checkbox"
import * as StoreAtom from "@/lib/store/atom"
import { useAtom } from "jotai";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Label } from "@/components/ui/label"
import { Separator } from "@radix-ui/react-separator"
export const ModelConfig = () => {
  const [selectedModel1, setSelectedModel1] = useAtom(StoreAtom.firstModelAtom)
  const [selectedModel2, setSelectedModel2] = useAtom(StoreAtom.secondModelAtom)
  const [temperature, setTemperature] = useAtom(StoreAtom.temperatureAtom)
  const [topP, setTopP] = useAtom(StoreAtom.top_pAtom)
  const [maxTokens, setMaxTokens] = useAtom(StoreAtom.max_tokensAtom)
  const [compareModel, setCompareModel] = useAtom(StoreAtom.compareModelAtom)
  return (
    <div className="hidden flex-col space-y-4 sm:flex md:order-2 mt-6">
      <HoverCard openDelay={200}>
        <HoverCardTrigger asChild>
          <Label htmlFor="model">Model</Label>
        </HoverCardTrigger>
        <HoverCardContent
          align="start"
          className="w-[260px] text-sm"
          side="left"
        >
            The model which will generate the completion. Some models are suitable
            for natural language tasks, others specialize in code. Learn more.
        </HoverCardContent>
      </HoverCard>
      <ModelSelector types={types} models={models} defaultValue={selectedModel1} emitSelectedModel={setSelectedModel1}/>
      <div >
        <div className="mb-4 flex items-center">
          <Checkbox id="terms" onCheckedChange={(v)=> setCompareModel(!!v)}/>
          <label
            htmlFor="terms"
            className="ml-2 text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
              Choose a model to compare 
          </label>
        </div>
        
        {compareModel && <ModelSelector types={types} models={models} defaultValue={selectedModel2} emitSelectedModel={setSelectedModel2}/>}
      </div>
      <Separator />
      <Label htmlFor="Configs">Configs:</Label>
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
