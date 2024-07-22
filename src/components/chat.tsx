'use client'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import { useEffect, useState } from 'react'
import { useUIState, useAIState } from 'ai/rsc'
import { Message, Session } from '@/lib/types'
import { usePathname, useRouter } from 'next/navigation'
import { useScrollAnchor } from '@/lib/hooks/use-scroll-anchor'
import { toast } from 'sonner'
import { ModelSelector } from '@/app/playground/components/model-selector'
import { types, models } from '@/app/playground/data/models'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { ConfigSelector } from '@/app/playground/components/config-selector'

export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  session?: Session
  missingKeys: string[]
}

export function Chat({ id, className, session, missingKeys }: ChatProps) {
  const [selectedModel1, setSelectedModel1] = useState(models[0]!)
  const router = useRouter()
  const path = usePathname()
  const [input, setInput] = useState('')
  const [messages] = useUIState()
  const [aiState] = useAIState()

  const [_, setNewChatId] = useLocalStorage('newChatId', id)

  useEffect(() => {
    if (session?.user) {
      if (!path.includes('chat') && messages.length === 1) {
        window.history.replaceState({}, '', `/chat/${id}`)
      }
    }
  }, [id, path, session?.user, messages])

  useEffect(() => {
    const messagesLength = aiState.messages?.length
    if (messagesLength === 2) {
      router.refresh()
    }
  }, [aiState.messages, router])

  useEffect(() => {
    setNewChatId(id)
  })

  useEffect(() => {
    console.log(missingKeys, 'missingKeys');
    missingKeys.map(key => {
      toast.error(`Missing ${key} environment variable!`)
    })
  }, [missingKeys])

  const { messagesRef, scrollRef, visibilityRef, isAtBottom, scrollToBottom } =
  useScrollAnchor()
  useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        if (entry.target === messagesRef.current) {
          scrollToBottom();
        }
      }
    };
  
    const resizeObserver = new ResizeObserver(handleResize);
    if (messagesRef.current) {
      resizeObserver.observe(messagesRef.current);
    }
  
    return () => {
      if (messagesRef.current) {
        resizeObserver.unobserve(messagesRef.current);
      }
    };
  }, []);
  return (
    <div className='relative flex flex-col overflow-hidden flex-shrink-0 md:flex-shrink md:min-w-[480px] snap-center rounded-md min-h-[250px] bg-background-100 w-full h-full border border-gray-alpha-400'>
      <div className='flex justify-between p-4 border-b bg-muted/50'>
        <ModelSelector types={types} models={models} defaultValue={selectedModel1} emitSelectedModel={setSelectedModel1}/>
        <div className="flex items-center space-x-2">
          <Switch id="synced" />
          <Label htmlFor="synced" className='invisiable'>Synced</Label>

        </div>
        <div className="flex items-center space-x-2">
          <ConfigSelector />
        </div>
      </div>
      <div
        className="group w-full overflow-auto pl-0 peer-[[data-state=open]]:lg:pl-[250px] peer-[[data-state=open]]:xl:pl-[300px]"
        ref={scrollRef}
      >
        <div
          className={cn('pb-[200px]', className)}
          ref={messagesRef}
        >
          {messages.length ? (
            <ChatList messages={messages} isShared={false} session={session} />
          ) : ''}
          <div className="w-full h-px" ref={visibilityRef} />
        </div>
        <ChatPanel
          id={id}
          input={input}
          setInput={setInput}
          isAtBottom={isAtBottom}
          scrollToBottom={scrollToBottom}
        />
      </div>
    </div>
   
  )
}
