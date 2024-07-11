export const types = ['openai','anthropic','google','mistral'] as const

export type ModelType = (typeof types)[number]

export interface Model<Type = string> {
  // id: string
  name: string
  description: string
  strengths?: string
  type: Type
  context_length: number
}

export const models: Model<ModelType>[] = [
  {
    "name": "gpt-3.5-turbo",
    "description": "gpt-3.5-turbo",
    "type": "openai",
    "context_length": 4096
  },
  {
    "name": "gpt-3.5-turbo-0301",
    "description": "gpt-3.5-turbo-0301",
    "type": "openai",
    "context_length": 4096
  },
  {
    "name": "gpt-3.5-turbo-0613",
    "description": "gpt-3.5-turbo-0613",
    "type": "openai",
    "context_length": 4096
  },
  {
    "name": "gpt-3.5-turbo-0125",
    "description": "gpt-3.5-turbo-0125",
    "type": "openai",
    "context_length": 16385
  },
  {
    "name": "gpt-3.5-turbo-16k",
    "description": "gpt-3.5-turbo-16k",
    "type": "openai",
    "context_length": 16384
  },
  {
    "name": "gpt-3.5-turbo-16k-0613",
    "description": "gpt-3.5-turbo-16k-0613",
    "type": "openai",
    "context_length": 16384
  },
  {
    "name": "gpt-3.5-turbo-1106",
    "description": "gpt-3.5-turbo-1106",
    "type": "openai",
    "context_length": 16385
  },
  {
    "name": "gpt-3.5-turbo-instruct",
    "description": "gpt-3.5-turbo-instruct",
    "type": "openai",
    "context_length": 4096
  },
  {
    "name": "gpt-4",
    "description": "gpt-4",
    "type": "openai",
    "context_length": 8192
  },
  {
    "name": "gpt-4-0314",
    "description": "gpt-4-0314",
    "type": "openai",
    "context_length": 8192
  },
  {
    "name": "gpt-4-0613",
    "description": "gpt-4-0613",
    "type": "openai",
    "context_length": 8192
  },
  {
    "name": "gpt-4-32k",
    "description": "gpt-4-32k",
    "type": "openai",
    "context_length": 32768
  },
  {
    "name": "gpt-4-32k-0314",
    "description": "gpt-4-32k-0314",
    "type": "openai",
    "context_length": 32768
  },
  {
    "name": "gpt-4-32k-0613",
    "description": "gpt-4-32k-0613",
    "type": "openai",
    "context_length": 32768
  },
  {
    "name": "gpt-4-1106-preview",
    "description": "gpt-4-1106-preview",
    "type": "openai",
    "context_length": 128000
  },
  {
    "name": "gpt-4-0125-preview",
    "description": "gpt-4-0125-preview",
    "type": "openai",
    "context_length": 128000
  },
  {
    "name": "gpt-4-turbo",
    "description": "gpt-4-turbo",
    "type": "openai",
    "context_length": 128000
  },
  {
    "name": "gpt-4-turbo-2024-04-09",
    "description": "gpt-4-turbo-2024-04-09",
    "type": "openai",
    "context_length": 128000
  },
  {
    "name": "gpt-4-turbo-preview",
    "description": "gpt-4-turbo-preview",
    "type": "openai",
    "context_length": 128000
  },
  {
    "name": "gpt-4o",
    "description": "gpt-4o",
    "type": "openai",
    "context_length": 128000
  },
  {
    "name": "gpt-4o-2024-05-13",
    "description": "gpt-4o-2024-05-13",
    "type": "openai",
    "context_length": 128000
  },
  {
    "name": "claude-v1.0",
    "description": "claude-v1.0",
    "type": "anthropic",
    "context_length": 9000
  },
  {
    "name": "claude-v1",
    "description": "claude-v1",
    "type": "anthropic",
    "context_length": 9000
  },
  {
    "name": "claude-v1-100k",
    "description": "claude-v1-100k",
    "type": "anthropic",
    "context_length": 100000
  },
  {
    "name": "claude-instant-v1.0",
    "description": "claude-instant-v1.0",
    "type": "anthropic",
    "context_length": 9000
  },
  {
    "name": "claude-instant-v1",
    "description": "claude-instant-v1",
    "type": "anthropic",
    "context_length": 9000
  },
  {
    "name": "claude-instant-v1-100k",
    "description": "claude-instant-v1-100k",
    "type": "anthropic",
    "context_length": 100000
  },
  {
    "name": "claude-instant-v1.1",
    "description": "claude-instant-v1.1",
    "type": "anthropic",
    "context_length": 9000
  },
  {
    "name": "claude-instant-v1.1-100k",
    "description": "claude-instant-v1.1-100k",
    "type": "anthropic",
    "context_length": 100000
  },
  {
    "name": "claude-v1.2",
    "description": "claude-v1.2",
    "type": "anthropic",
    "context_length": 9000
  },
  {
    "name": "claude-v1.3",
    "description": "claude-v1.3",
    "type": "anthropic",
    "context_length": 9000
  },
  {
    "name": "claude-v1.3-100k",
    "description": "claude-v1.3-100k",
    "type": "anthropic",
    "context_length": 100000
  },
  {
    "name": "claude-2",
    "description": "claude-2",
    "type": "anthropic",
    "context_length": 200000
  },
  {
    "name": "claude-2.0",
    "description": "claude-2.0",
    "type": "anthropic",
    "context_length": 100000
  },
  {
    "name": "claude-2.1",
    "description": "claude-2.1",
    "type": "anthropic",
    "context_length": 200000
  },
  {
    "name": "claude-3-opus-20240229",
    "description": "claude-3-opus-20240229",
    "type": "anthropic",
    "context_length": 200000
  },
  {
    "name": "claude-3-sonnet-20240229",
    "description": "claude-3-sonnet-20240229",
    "type": "anthropic",
    "context_length": 200000
  },
  {
    "name": "claude-3-haiku-20240307",
    "description": "claude-3-haiku-20240307",
    "type": "anthropic",
    "context_length": 200000
  },
  {
    "name": "claude-3-5-sonnet-20240620",
    "description": "claude-3-5-sonnet-20240620",
    "type": "anthropic",
    "context_length": 200000
  },
  {
    "name": "gemini-pro",
    "description": "gemini-pro",
    "type": "google",
    "context_length": 32768
  },
  {
    "name": "gemini-1.0-pro-002",
    "description": "gemini-1.0-pro-002",
    "type": "google",
    "context_length": 32768
  },
  {
    "name": "gemini-1.5-pro-preview-0409",
    "description": "gemini-1.5-pro-preview-0409",
    "type": "google",
    "context_length": 32768
  },
  {
    "name": "gemini-1.5-pro-preview-0514",
    "description": "gemini-1.5-pro-preview-0514",
    "type": "google",
    "context_length": 32768
  },
  {
    "name": "gemini-1.5-flash-preview-0514",
    "description": "gemini-1.5-flash-preview-0514",
    "type": "google",
    "context_length": 32768
  },
  {
    "name": "text-unicorn@001",
    "description": "text-unicorn@001",
    "type": "google",
    "context_length": 8192
  },
  {
    "name": "mistral-large-latest",
    "description": "mistral-large-latest",
    "type": "mistral",
    "context_length": 8000
  }
]
