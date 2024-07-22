import {
  Book,
  Bot,
  Code2,
  FileBox,
  LifeBuoy,
  MessagesSquare,
  Settings2,
  SquareTerminal,
  SquareUser,
  Tent,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Link from "next/link"
const navItems = [
  { label: "Search", icon: <Search className="size-5" /> , href: "/search"},
  { label: "Playground", icon: <SquareTerminal className="size-5" />, href: "/playground"},
  {
    label: "Assistant",
    icon: <Bot className="size-5" />,
    href: "/assistant",
  },
  { label: "Chat", icon: <MessagesSquare className="size-5" />, href: "/chat" },
  { label: "Prompt", icon: <FileBox className="size-5" /> , href: "/prompt"},
  // { label: "API", icon: <Code2 className="size-5" /> , href : "/api" },
  // { label: "Documentation", icon: <Book className="size-5" /> , href: "/docs"},
  { label: "Settings", icon: <Settings2 className="size-5" /> , href: "/settings" },
]

type NavItem = typeof navItems[number]
// todo
export function Nav({currentPath}: {currentPath: NavItem["href"]}) {


  return (<aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
    <div className="border-b p-4">
      <Link href={'/'}>
        <Button variant="outline" size="icon" aria-label="Home">
          <Tent className="size-5 fill-foreground" />
        </Button>
      </Link>
    </div>
    <nav className="grid gap-1 p-4">{navItems.map((item) => (
      <Tooltip key={item.label}>
        <TooltipTrigger asChild>
          <Link href={item.href}>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-lg ${item.href === currentPath ? 'bg-mute' : ''}`}
              aria-label={item.label}
            >
              {item.icon}
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
          {item.label}
        </TooltipContent>
      </Tooltip>
    ))}
    </nav>
    <nav className="mt-auto grid gap-1 p-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="mt-auto rounded-lg"
            aria-label="Help"
          >
            <LifeBuoy className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
            Help
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="mt-auto rounded-lg"
            aria-label="Account"
          >
            <SquareUser className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" sideOffset={5}>
            Account
        </TooltipContent>
      </Tooltip>
    </nav>
  </aside>)
}
