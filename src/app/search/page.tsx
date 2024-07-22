import { Chat } from '@/components/search-chat'
import { generateId } from 'ai'
import { AI } from './actions'
import { AppStateProvider } from '@/lib/utils/app-state'
import {
  Share,
} from "lucide-react"
import { nanoid } from '@/lib/utils'

import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { Button } from "@/components/ui/button"
import {Nav} from "@/components/nav"
export const maxDuration = 60

export default async function Dashboard() {
  const id = nanoid()
  return (
    <div className="grid h-screen w-full pl-[69px]">
      <Nav currentPath="/chat"/>
      <div className="flex flex-col h-screen">
        <header className="sticky top-0 z-10 flex min-h-[69px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Search</h1>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5" />
              Share
          </Button>
        </header>
        <main className="">
          <AppStateProvider>
            <AI initialAIState={{ chatId: id, messages: [] }}>
              <Chat id={id}/>
            </AI>
          </AppStateProvider>
        </main>
      </div>
    </div>
  )
}
  