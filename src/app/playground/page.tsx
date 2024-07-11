'use client'
// import { Metadata } from "next"
// import Image from "next/image"
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from "sonner";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { Button } from "@/components/ui/button"


import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

// import { CodeViewer } from "./components/code-viewer"
// import { PresetActions } from "./components/preset-actions"
// import { PresetSave } from "./components/preset-save"
import { PresetSelector } from "./components/preset-selector"
import { PresetShare } from "./components/preset-share"

import { presets } from "./data/presets"
import {apiCallCustomGateway} from "@/lib/api-requests"
import { useState } from "react"
import { MessageComp } from "./components/message-content"
import { ReloadIcon } from "@radix-ui/react-icons"
import * as StoreAtom from "@/lib/store/atom"
import { useAtom } from "jotai";
import {ModelConfig} from "./ModelConfig"
import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { Share } from 'lucide-react';
import { Nav } from '@/components/nav';

function BottomActions({
  className,
  loading,
  submit,
  startOver
}: {
  loading?: boolean;
  submit: () => void;
  startOver: () => void;
}& React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex items-center space-x-2">
      <Button onClick={submit} disabled={loading} className={className}>{
        loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      } Submit <span className="text-xs opacity-60 ml-2">(⌘ + i)</span></Button>
      {/* <Button variant="secondary">
        <span className="sr-only">Show history</span>
        <CounterClockwiseClockIcon className="h-4 w-4" />
      </Button> */}
      <Button onClick={startOver} disabled={loading} className={className}variant="outline" >{
      } Start Over <span className="ml-2 text-xs opacity-60">(⇧ + ⌘ + i)</span></Button>
    </div>
  );
}
function secondFormat(n: number | undefined | null ) {
  return ((n||0) / 1000).toFixed(3);
}
function formatGatewayResponse(response: any) {
  const result = response?.data?.result
  if(result === undefined) {
    toast.error(`Error calling the models`)
  }
  if (typeof result === 'string') {
    return result
  } else if (typeof result === 'object' && result[0]) {
    return result.reduce((acc: string, cur: string) => acc +cur, '')
  } 
  return result
}


export default function PlaygroundPage() {
  const [selectedModel1] = useAtom(StoreAtom.firstModelAtom)
  const [selectedModel2] = useAtom(StoreAtom.secondModelAtom)
  const [temperature] = useAtom(StoreAtom.temperatureAtom)
  const [topP] = useAtom(StoreAtom.top_pAtom)
  const [maxTokens] = useAtom(StoreAtom.max_tokensAtom)
  const [compareModel] = useAtom(StoreAtom.compareModelAtom)
  const [prompt, setPrompt] = useAtom(StoreAtom.promptAtom)
  const [instructions, setInstructions] = useAtom(StoreAtom.instructionsAtom)
  const [modelOneRes, setModelOneRes] = useAtom(StoreAtom.modelOneResAtom)
  const [modelTwoRes, setModelTwoRes] = useAtom(StoreAtom.modelTwoResAtom)
  const [loading, setLoading] = useState(false)
  const [modelResponseTime1, setModelResponseTime1] = useState('')
  const [modelResponseTime2, setModelResponseTime2] = useState('')

  useHotkeys(
    'mod+i',
    () => {
      callTwoModels()
    },
    {
      enableOnFormTags: ['textarea']
    }
  )
  useHotkeys(
    'shift+mod+i',
    () => {
      startOver()
    },
    {
      enableOnFormTags: ['textarea']
    }
  )
  const startOver = () => {
    setPrompt('')
    setInstructions('')
    setModelOneRes('')
    setModelTwoRes('')
  }
  const callZoomGateway = async (modelName: string) => {
    return apiCallCustomGateway({
      messages: [
        {
          role: "user",
          message: instructions
        },
        {
          role: "user",
          message: prompt
        },
        // {
        //   role: "user",
        //   message: "I prefer you can use Chinese to explain"
        // }
      ],
      model: modelName,
      task_id: "123",
      user_name: "internal-playground-user",
      temperature: temperature,
      top_p: topP,
      max_tokens: maxTokens,
      choices: 1
    })
   
  }
  const callTwoModels = async () => {
    if (!prompt) return
    setLoading(true)

    Promise.all([
      (performance.mark('start_api_call') && 
      callZoomGateway(selectedModel1.name).then((res1) => {
        setModelOneRes(() => {
          const re = formatGatewayResponse(res1)
          return re
        })
        performance.mark('end_api_call')
       
      })), 
      ( compareModel && performance.mark('start_api_call2')
       && callZoomGateway(selectedModel2.name).then((res2) => {
         setModelTwoRes(() => {
           const re = formatGatewayResponse(res2)
           return re
         })
         performance.mark('end_api_call2')
       }) )
    ]).catch((e) => {
      toast.error(`Error calling the models ${JSON.stringify(e)}`)
      console.error(e)
    }).finally(() => {
      setLoading(false)
      try {
        performance.measure('api_call_duration', 'start_api_call', 'end_api_call');
        const measure = performance.getEntriesByName('api_call_duration')[0];
        setModelResponseTime1(secondFormat(measure?.duration));
        performance.clearMarks('start_api_call');
        performance.clearMarks('end_api_call');
        performance.clearMeasures('api_call_duration');
        if (compareModel) {
          performance.measure('api_call_duration2', 'start_api_call2', 'end_api_call2');
          const measure2 = performance.getEntriesByName('api_call_duration2')[0];
          setModelResponseTime2(secondFormat(measure2?.duration));
          performance.clearMarks('start_api_call2');
          performance.clearMarks('end_api_call2');
          performance.clearMeasures('api_call_duration2');
        }
      } catch (error) {
        console.log('error', error);
      }
    })
  }


  return (
    <div className="grid h-screen w-full pl-[69px]">
      <Nav currentPath= "/playground"/>
      <div className="flex-1 flex flex-col h-screen">
        <header className="sticky top-0 z-10 flex min-h-[69px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Playground</h1>
          <div className="ml-auto flex space-x-2 sm:justify-end">
            <PresetSelector presets={presets} onChange={
              (preset) => {
                setPrompt(preset.content)
                setInstructions(preset.prompt)
              }

            }/>
            <div className="hidden space-x-2 md:flex">
              <PresetShare />
              <ThemeToggle />
            </div>
            {/* <PresetActions /> */}
          </div>
        </header>
        <div className="hidden h-full flex-col md:flex">
          <div className="flex-1">
            <div className="container h-full p-4">
              <div className="grid h-full items-stretch gap-6 md:grid-cols-[1fr_200px]">
                <ModelConfig />
                <div className="md:order-1">
                  <div  className="mt-0 border-0 p-0">
                    <div className="flex flex-col space-y-4">
                      <div className="grid h-full gap-6 lg:grid-cols-2">
                        <div className="flex flex-col space-y-4">
                          <div className="flex flex-col space-y-2">
                            <Label htmlFor="instructions"> System prompt</Label>
                            <Textarea
                              id="instructions"
                              value={instructions}
                              placeholder="Fix the grammar."
                              className="flex-1 min-h-[200px]"
                              onChange={(e) => setInstructions(e.target.value)}
                            />
                          </div>
                          <div className="flex flex-1 flex-col space-y-2">
                            <Label htmlFor="input">Input</Label>
                            <Textarea
                              id="input"
                              placeholder="We is going to the market."
                              className="flex-1 min-h-[200px]"
                              value={prompt}
                              onChange={(e) => setPrompt(e.target.value)}
                            />
                          </div>
                        </div>
                        <div className="mt-[21px] min-h-[400px] rounded-md border bg-muted lg:min-h-[660px]" >
                          <ResizablePanelGroup
                            direction="vertical"
                            className="rounded-lg w-full"
                          >
                            <ResizablePanel defaultSize={compareModel ? 50 : 100} className="!overflow-scroll">
                              {compareModel && <p className="flex justify-between mx-2"><span className="text-sm text-slate-400">{selectedModel1.name}: </span> <span className="text-sm text-rose-400">Duration: {modelResponseTime1}</span></p>}
                              <MessageComp content={modelOneRes} />
                            </ResizablePanel>
                            {
                              compareModel && <>
                                <ResizableHandle withHandle/>
                                <ResizablePanel defaultSize={50} className="!overflow-scroll">
                                  {compareModel && <p className="flex justify-between mx-2"><span className="text-sm text-slate-400">{selectedModel2.name}: </span> <span className="text-sm text-rose-400">Duration: {modelResponseTime2}</span></p>}
                                  <MessageComp content={modelTwoRes} />
                                </ResizablePanel>
                              </>
                            }
                          </ResizablePanelGroup>
                        </div>
                      </div>
                      <BottomActions submit={callTwoModels} loading={loading} startOver={startOver}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   
  )
}
