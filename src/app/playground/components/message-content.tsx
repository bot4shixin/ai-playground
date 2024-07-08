import React from 'react'
import {MemoizedReactMarkdown} from '@/components/markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { CodeBlock } from '@/components/ui/codeblock'
export const MessageComp = ({content}: {
    content: string
}) => {
  return (
    <MemoizedReactMarkdown
      className="mx-3 my-2 p-2 dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 overflow-scroll"
      remarkPlugins={[ remarkMath]}
      components={{
        p({ children }) {
          return <p className="mb-2 last:mb-0 ">{children}</p>
        },
        code({ node, inline, className, children, ...props }) {
          if (children.length) {
            if (children[0] == '▍') {
              return (
                <span className="mt-1 cursor-default animate-pulse">▍</span>
              )
            }

            children[0] = (children[0] as string).replace('`▍`', '▍')
          }

          const match = /language-(\w+)/.exec(className || '')

          if (inline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }

          return (
            <CodeBlock
              key={Math.random()}
              language={(match?.[1]) || ''}
              value={String(children).replace(/\n$/, '')}
              {...props}
            />
          )
        }
      }}
    >
      {content}
    </MemoizedReactMarkdown>)
}