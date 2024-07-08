'use client'
// import { Metadata } from "next"
// import Image from "next/image"
import { useHotkeys } from 'react-hotkeys-hook';
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"

import { Button } from "@/components/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

// import { CodeViewer } from "./components/code-viewer"
// import { PresetActions } from "./components/preset-actions"
// import { PresetSave } from "./components/preset-save"
import { PresetSelector } from "./components/preset-selector"
import { PresetShare } from "./components/preset-share"

import { presets } from "./data/presets"
import {apiCallZoomGateway} from "@/lib/api-requests"
import { useState } from "react"
import { MessageComp } from "./components/message-content"
import { ReloadIcon } from "@radix-ui/react-icons"
import * as StoreAtom from "@/lib/store/atom"
import { useAtom } from "jotai";
import {ModelConfig} from "./ModelConfig"
import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { ScrollArea } from '@/components/ui/scroll-area';
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard';
import { IconCheck, IconCopy } from '@/components/icons';
import { Share } from 'lucide-react';
import { Nav } from '@/components/nav';



function formatGatewayResponse(response: any) {
  const result = response?.data?.result
  if(result === undefined) {
    toast.error(`Error calling the models`)
  }
  if (typeof result === 'string') {
    return result
  } else if (typeof result === 'object' && result[0]) {
    return result.reduce((acc: string, cur: string) => acc + cur, '')
  } 
  return result
}

const buildInstructions = (prompt: string[]) => {
  const instructions = `meta_prompt = (
    """As a senior prompt engineer, your task is to optimize existing prompts to ensure they provide clear, """
    """specific instructions to the Language Model (LLM).\n"""
    """The optimized prompts should be designed to correctly interpret the input, generate the expected output, and match the golden result.\n"""
    """Consider the task at hand, whether it's summarizing text, categorizing text, identifying pronouns, generating titles, answering questions, """
    """analyzing sentiment, generating arguments, or comparing meanings, ensure the optimized prompts make effective use of provided variables, """
    """correctly process the input, and generate concise, relevant responses.\n"""
    """Be mindful of case sensitivity in the output and avoid generating verbose or unrelated content.\n"""
    """The prompts should not be too vague or open-ended, and should specify the type of response expected, whether it's a detailed argument, """
    """a single-word category, or a concise summary.\n"""
    """The prompts should also avoid common issues such as incorrectly identifying pronouns or failing to include certain details from the input.\n"""
    """Remember, the goal is to guide the LLM to generate the expected output as per the task requirements."""
    """<ORIGINAL PROMPT>\n${prompt}\n</ORIGINAL PROMPT>\n\n"""
    """The content wrapped by {{...}} in the prompt cannot be changed at all.\n"""
    """All content wrapped by {{...}} (including '{{' and '}}') should occur in the optimized prompt.\n"""
    """The optimized prompt should be wrapped in '<OPTIMIZED PROMPT>...</OPTIMIZED PROMPT>'.\n"""
    """You result:"""
  )`  
  return instructions
}
const roundTime = 5
export default function PlaygroundPage() {
  const [gpt4Model] = useAtom(StoreAtom.gpt4ModelAtom)
  const [temperature] = useAtom(StoreAtom.temperatureAtom)
  const [topP] = useAtom(StoreAtom.top_pAtom)
  const [maxTokens] = useAtom(StoreAtom.max_tokensAtom)
  const [prompt, setPrompt] = useAtom(StoreAtom.promptAtom)
  const [promptRes, setPromptRes] = useAtom(StoreAtom.promptResAtom)
  console.log(promptRes);
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 })

  const [loading, setLoading] = useState(false)

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
    setPromptRes(Array(5).fill(''))
  }

  const onCopy = (value: string) => {
    if (isCopied) return
    copyToClipboard(value)
  }
  const callZoomGateway = async (modelName: string, message: string) => {
    return apiCallZoomGateway({
      messages: [
        {
          role: "user",
          message,
        },
      ],
      model: modelName,
      task_id: "1234",
      user_name: "internal-playground-user",
      temperature: temperature,
      top_p: topP,
      max_tokens: maxTokens,
      choices: 1
    })
   
  }
  const callTwoModels = async () => {
    console.log(121);
    if (!prompt) return
    setLoading(true)
    setPromptRes(Array(5).fill(''))

    await optimizePrompt(roundTime, prompt).catch((e) => {
      toast.error(`Error calling the models ${JSON.stringify(e)}`)
      console.error(e)
    }).finally(() => {
      console.log('done2');
      setLoading(false)
    })
  }
  async function optimizePrompt(num_round:number, prompt: string) {
    let cur_task_prompt = buildInstructions(prompt.split('\n'));
    for (let i = 0; i < num_round; i++) {
      console.log(`\n${'*'.repeat(100)}\n 👇Optimizing Round: ${i + 1}`);
      const response = await callZoomGateway(gpt4Model.name, cur_task_prompt)
      const re = formatGatewayResponse(response).replace('<OPTIMIZED PROMPT>', '').replace('</OPTIMIZED PROMPT>', '').trim()
      const result = re.replace(/^"+|"+$/g, '').trim().replace(/^"+|"+$/g, '').trim().replace(/^"+|"+$/g, '').trim()
      console.log(result);
      setPromptRes((prev) => {
        return [result, ...prev].slice(0, 5)
      })
      cur_task_prompt = buildInstructions(re)
    }
    console.log('done');
    return cur_task_prompt;
  }


  return (
    <div className="grid h-screen w-full pl-[69px]">
      <Nav currentPath='/prompt'/>
      <div className="flex flex-col h-screen">
        <header className="sticky top-0 z-10 flex h-[69px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Meta Prompt</h1>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5" />
            Share
          </Button>
        </header>
        <div className="hidden flex-1 h-full flex-col md:flex">
          <div className="flex-1">
            <div className="container h-full p-4">
              <div className="grid h-full items-stretch gap-8 md:grid-cols-[1fr_200px]">
                <ModelConfig />
                <div className="md:order-1">
                  <div  className="mt-0 border-0 p-0">
                    <div className="flex flex-col space-y-4 h-full min-h-[600px] mb-6">
                      <div className="flex flex-1 flex-col space-y-2">
                        <Label htmlFor="input">Your Prompt</Label>
                        <Textarea
                          id="input"
                          placeholder="We is going to the market."
                          className="flex-1 min-h-[200px]"
                          value={prompt}
                          onChange={(e) => setPrompt(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* <div className="mt-[21px] rounded-md border bg-muted lg:min-h-[660px]" >
                      
                      <MessageComp content={modelOneRes} />
                       
                          
                    </div> */}
                    <div className="flex items-center space-x-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button onClick={callTwoModels} disabled={loading || !prompt} >
                            {
                              loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                            } Submit <span className="text-xs opacity-60 ml-2">(⌘ + i)</span>
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="h-[95vh] min-w-[95vw] auto-rows-min grid-rows-[66px_1fr] gap-0 pb-2">
                          <DialogHeader>
                            <DialogTitle>
                              <div className='flex items-center gap-2'>
                                Output { loading && <ReloadIcon className="ml-2 h-4 w-4 animate-spin" />}
                              </div>
                            </DialogTitle>
                            <DialogDescription>
                              Choose the best prompt from {roundTime} rounds
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid flex-1 overflow-auto pb-4">
                            <div className="relative flex flex-col lg:col-span-3">
                              <div className='flex-1 flex w-full space-x-4 overflow-x-auto snap-x snap-mandatory md:snap-none md:overflow-y-hidden'>
                                {promptRes.map((res, i) => {
                                  return (
                                    <div>
                                      <div className='text-lg flex justify-between items-center mb-1'>
                                        <span>Round: {promptRes.filter(i=>i).length - i > 0 ? promptRes.filter(i=>i).length - i : '-'}</span> 
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="text-xs focus-visible:ring-1 focus-visible:ring-slate-700 focus-visible:ring-offset-0"
                                          onClick={() => onCopy(res)}
                                        >
                                          {isCopied ? <IconCheck /> : <IconCopy />}
                                          <span className="sr-only">Copy code</span>
                                        </Button>
                                      </div>
                                  
                                      <div key={i} className="relative bg-muted overflow-hidden md:min-w-[480px] snap-center rounded-md min-h-[250px] bg-background-100 w-full h-full border border-gray-alpha-400">
                                        <MessageComp content={res} />
                                      </div>
                                    </div>
                              
                                  )})
                                }
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button onClick={startOver} disabled={loading} variant="outline" >
                           Start Over 
                        <span className="ml-2 text-xs opacity-60">(⇧ + ⌘ + i)</span>
                      </Button>
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
