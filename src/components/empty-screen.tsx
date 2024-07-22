import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/icons'

export function EmptyScreen() {
  return (
    <div className="mx-auto">
      <div className="flex flex-col gap-2  border-b bg-background p-4">
        <h1 className="text-md font-semibold mb-[2px]">
          Welcome to AI Chatbot!
        </h1>
      </div>
    </div>
  )
}
