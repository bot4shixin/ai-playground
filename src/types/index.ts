import { type Icons } from "@/components/icons";

export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  description?: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface FooterItem {
  title: string;
  items: {
    title: string;
    href: string;
    external?: boolean;
  }[];
}

export type MainNavItem = NavItemWithOptionalChildren;

export type SidebarNavItem = NavItemWithChildren;


export type Transcript = {
  transcript_id: string | number;
  transcript: string;
  meeting_queries: MeetingQuery[];
};

type MeetingQuery = {
  query_id: number;
  query: string;
  answers: Answer[];
};

type Answer = {
  answer_id: number;
  answer: string;
  scores: Score[];
  human_evaluation: HumanEvaluation[];
};

type Score = {
  score_id: number;
  score_algorithm: string;
  model: string;
  score: number;
  justification: string;
};

type HumanEvaluation = {
  annotator_id: number;
  preferred_score_id: number;
  preference_justification: string;
  score: number;
  score_justification: string;
};


export interface TranscriptAnalyticTableData {
  taskId: number;
  createdAt: Date;
  amount: number;
  status: boolean;
  answersNum: number;
  process: {
    0: number;
    1: number;
    2: number;
  };
}

// [
//   {
//       role: "user",
//       message: "How is your day?"
//   },
//   {
//       role: "assistant",
//       message: "As an AI language model, I don't have the ability to experience emotions or have a physical day like humans do. However, I'm always here and ready to assist you with any questions or tasks you may have. How can I help you today?"
//   },
// ]
export type OpenAIMessage = {
  role: 'system' | 'user' | 'assistant' | 'function' | 'data' | 'tool';
  message: string;
};

export type LLM_Params = {
  messages: OpenAIMessage[];
  model: string
  task_id: string
  user_name: string
  temperature: number // vendor Range Default OpenAI 0-2 0.5 (our default) Anthropic 0-1 1.0 Zoom 0-2 1.0
  top_p: number  // An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. (Description taken from OpenAI) Either temperature or top_p should be altered but not both. 
  max_tokens: number // The maximum number of tokens to generate before stopping.
  choices: number,
}