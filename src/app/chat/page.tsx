import {
  Share,
} from "lucide-react"
import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'
import { AI } from '@/lib/chat/actions'
import { auth } from '@/auth'
import { Session } from '@/lib/types'
import { getMissingKeys } from '@/app/actions'
import { Button } from "@/components/ui/button"
import {Nav} from "@/components/nav"

export default async function Dashboard() {
  const id = nanoid()
  const session = (await auth()) as Session
  const missingKeys = await getMissingKeys()
  return (
    <div className="grid h-screen w-full pl-[69px]">
      <Nav currentPath="/chat"/>
      <div className="flex flex-col h-screen">
        <header className="sticky top-0 z-10 flex h-[69px] items-center gap-1 border-b bg-background px-4">
          <h1 className="text-xl font-semibold">Chat</h1>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto gap-1.5 text-sm"
          >
            <Share className="size-3.5" />
              Share
          </Button>
        </header>
        <main className="grid flex-1 overflow-auto p-2 md:grid-cols-2 lg:grid-cols-3">
          <div className="relative flex h-full min-h-[50vh] flex-col lg:col-span-3">
            <div className='flex-1 flex w-full h-full p-2 space-x-4 overflow-x-auto snap-x snap-mandatory md:snap-none md:overflow-y-hidden'>
              <div className="relative flex  overflow-hidden flex-shrink-0 md:flex-shrink md:min-w-[480px] snap-center rounded-md min-h-[250px] bg-background-100 w-full h-full border border-gray-alpha-400">
                <AI initialAIState={{ chatId: id, messages: [] }}>
                  <Chat id={id} session={session} missingKeys={missingKeys} />
                </AI>
              </div>
              <div className="relative flex  overflow-hidden flex-shrink-0 md:flex-shrink md:min-w-[480px] snap-center rounded-md min-h-[250px] bg-background-100 w-full h-full border border-gray-alpha-400">
                <AI initialAIState={{ chatId: id, messages: [] }}>
                  <Chat id={id} session={session} missingKeys={missingKeys} />
                </AI>
              </div>
              <div className="relative flex  overflow-hidden flex-shrink-0 md:flex-shrink md:min-w-[480px] snap-center rounded-md min-h-[250px] bg-background-100 w-full h-full border border-gray-alpha-400">
                <AI initialAIState={{ chatId: id, messages: [] }}>
                  <Chat id={id} session={session} missingKeys={missingKeys} />
                </AI>
              </div>
              <div className="relative flex  overflow-hidden flex-shrink-0 md:flex-shrink md:min-w-[480px] snap-center rounded-md min-h-[250px] bg-background-100 w-full h-full border border-gray-alpha-400">
                <AI initialAIState={{ chatId: id, messages: [] }}>
                  <Chat id={id} session={session} missingKeys={missingKeys} />
                </AI>
              </div>
  
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
  