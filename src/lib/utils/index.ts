import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { createOllama } from 'ollama-ai-provider'
import { createOpenAI } from '@ai-sdk/openai'
import { google } from '@ai-sdk/google'
import { anthropic } from '@ai-sdk/anthropic'
import { CoreMessage } from 'ai'
import { customAlphabet } from 'nanoid'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getModel(useSubModel = false) {
  const ollamaBaseUrl = process.env.OLLAMA_BASE_URL + '/api'
  const ollamaModel = process.env.OLLAMA_MODEL
  const ollamaSubModel = process.env.OLLAMA_SUB_MODEL
  const openaiApiBase = process.env.OPENAI_API_BASE
  const openaiApiKey = process.env.OPENAI_API_KEY
  const openaiApiModel = process.env.OPENAI_API_MODEL || 'gpt-4o'
  const googleApiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  const anthropicApiKey = process.env.ANTHROPIC_API_KEY

  if (
    !(ollamaBaseUrl && ollamaModel) &&
    !openaiApiKey &&
    !googleApiKey &&
    !anthropicApiKey
  ) {
    throw new Error(
      'Missing environment variables for Ollama, OpenAI, Google or Anthropic'
    )
  }
  // Ollama
  if (ollamaBaseUrl && ollamaModel) {
    const ollama = createOllama({ baseURL: ollamaBaseUrl })

    if (useSubModel && ollamaSubModel) {
      return ollama(ollamaSubModel)
    }

    return ollama(ollamaModel)
  }

  if (googleApiKey) {
    return google('models/gemini-1.5-pro-latest')
  }

  if (anthropicApiKey) {
    return anthropic('claude-3-5-sonnet-20240620')
  }

  // Fallback to OpenAI instead

  const openai = createOpenAI({
    baseURL: openaiApiBase, // optional base URL for proxies etc.
    apiKey: openaiApiKey, // optional API key, default to env property OPENAI_API_KEY
    organization: '' // optional organization
  })

  return openai.chat(openaiApiModel)
}

/**
 * Takes an array of AIMessage and modifies each message where the role is 'tool'.
 * Changes the role to 'assistant' and converts the content to a JSON string.
 * Returns the modified messages as an array of CoreMessage.
 *
 * @param aiMessages - Array of AIMessage
 * @returns modifiedMessages - Array of modified messages
 */
export function transformToolMessages(messages: CoreMessage[]): CoreMessage[] {
  return messages.map(message =>
    message.role === 'tool'
      ? {
        ...message,
        role: 'assistant',
        content: JSON.stringify(message.content),
        type: 'tool'
      }
      : message
  ) as CoreMessage[]
}




export const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
) // 7-character random string

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init)

  if (!res.ok) {
    const json = await res.json()
    if (json.error) {
      const error = new Error(json.error) as Error & {
        status: number
      }
      error.status = res.status
      throw error
    } else {
      throw new Error('An unexpected error occurred')
    }
  }

  return res.json()
}

export function formatDate(input: string | number | Date): string {
  const date = new Date(input)
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })
}

export const formatNumber = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(value)

export const runAsyncFnWithoutBlocking = (
  fn: (...args: any) => Promise<any>
) => {
  fn()
}

export const sleep = (ms: number) =>
  new Promise(resolve => setTimeout(resolve, ms))

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')

export enum ResultCode {
  InvalidCredentials = 'INVALID_CREDENTIALS',
  InvalidSubmission = 'INVALID_SUBMISSION',
  UserAlreadyExists = 'USER_ALREADY_EXISTS',
  UnknownError = 'UNKNOWN_ERROR',
  UserCreated = 'USER_CREATED',
  UserLoggedIn = 'USER_LOGGED_IN'
}

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
  case ResultCode.InvalidCredentials:
    return 'Invalid credentials!'
  case ResultCode.InvalidSubmission:
    return 'Invalid submission, please try again!'
  case ResultCode.UserAlreadyExists:
    return 'User already exists, please log in!'
  case ResultCode.UserCreated:
    return 'User created, welcome!'
  case ResultCode.UnknownError:
    return 'Something went wrong, please try again!'
  case ResultCode.UserLoggedIn:
    return 'Logged in!'
  }
}



export const getValueFromStorage = (key: string, defaultValue?: any) => {
  const storedValue = localStorage.getItem(key);
  if (storedValue === null) {
    return defaultValue;
  }
  try {
    return JSON.parse(storedValue);
  } catch (error) {
    console.error("Error parsing stored value:", error);
    return defaultValue;
  }
};