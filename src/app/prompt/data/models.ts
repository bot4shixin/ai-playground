export const types = ["Zoom", "Claude", "GPT-4", "GPT-3.5","GPT-3", "Gemini","Codex", "Others"] as const

export type ModelType = (typeof types)[number]

export interface Model<Type = string> {
  // id: string
  name: string
  description: string
  strengths?: string
  type: Type
}

export const models: Model<ModelType>[] = [

  {
    "name": "gpt-3.5-turbo",
    "description": "An advanced version of the GPT-3.5 model with enhanced performance and capabilities.",
    "type": "GPT-3.5",
    "strengths": "Improved performance in various tasks, including complex intent, cause and effect understanding, creative generation, search, and summarization."
  },


  {
    name: "text-davinci-003",
    description:
      "Most capable GPT-3 model. Can do any task the other models can do, often with higher quality, longer output and better instruction-following. Also supports inserting completions within text.",
    type: "GPT-3",
    strengths:
      "Complex intent, cause and effect, creative generation, search, summarization for audience",
  },
  {
    name: "text-curie-001",
    description: "Very capable, but faster and lower cost than Davinci.",
    type: "GPT-3",
    strengths:
      "Language translation, complex classification, sentiment, summarization",
  },
  {
    name: "text-babbage-001",
    description: "Capable of straightforward tasks, very fast, and lower cost.",
    type: "GPT-3",
    strengths: "Moderate classification, semantic search",
  },
  {
    name: "text-ada-001",
    description:
      "Capable of very simple tasks, usually the fastest model in the GPT-3 series, and lowest cost.",
    type: "GPT-3",
    strengths:
      "Parsing text, simple classification, address correction, keywords",
  },
  {
    name: "code-davinci-002",
    description:
      "Most capable Codex model. Particularly good at translating natural language to code. In addition to completing code, also supports inserting completions within code.",
    type: "Codex",
  },
  {
    name: "code-cushman-001",
    description:
      "Almost as capable as Davinci Codex, but slightly faster. This speed advantage may make it preferable for real-time applications.",
    type: "Codex",
    strengths: "Real-time application where low-latency is preferable",
  },
   
  {
    "name": "gpt-3.5-turbo-0301",
    "description": "A specific version of the GPT-3.5 Turbo model released on March 1st, with potentially updated features or improvements.",
    "type": "GPT-3.5",
    "strengths": "Similar to GPT-3.5 Turbo, with possible enhancements or adjustments made after March 1st."
  },
  {
    "name": "gpt-3.5-turbo-0613",
    "description": "A specific version of the GPT-3.5 Turbo model released on June 13th, with potentially updated features or improvements.",
    "type": "GPT-3.5",
    "strengths": "Similar to GPT-3.5 Turbo, with possible enhancements or adjustments made after June 13th."
  },
  {
    "name": "gpt-3.5-turbo-16k",
    "description": "An advanced version of the GPT-3.5 Turbo model with a larger parameter size of 16k.",
    "type": "GPT-3.5",
    "strengths": "Improved performance and capability due to the larger parameter size, suitable for more complex tasks."
  },
  {
    "name": "gpt-3.5-turbo-16k-0613",
    "description": "A specific version of the GPT-3.5 Turbo 16k model released on June 13th, with potentially updated features or improvements.",
    "type": "GPT-3.5",
    "strengths": "Similar to GPT-3.5 Turbo 16k, with possible enhancements or adjustments made after June 13th."
  },
  {
    "name": "gpt-4",
    "description": "The next generation of the GPT series, offering even more advanced language processing capabilities.",
    "type": "GPT-4",
    "strengths": "Expected to surpass GPT-3 in performance, offering improved capabilities in various language tasks."
  },
  {
    "name": "gpt-4-0314",
    "description": "A specific version of the GPT-4 model released on March 14th, with potentially updated features or improvements.",
    "type": "GPT-4",
    "strengths": "Similar to GPT-4, with possible enhancements or adjustments made after March 14th."
  },
  {
    "name": "gpt-4-0613",
    "description": "A specific version of the GPT-4 model released on June 13th, with potentially updated features or improvements.",
    "type": "GPT-4",
    "strengths": "Similar to GPT-4, with possible enhancements or adjustments made after June 13th."
  },
  {
    "name": "gpt-4-32k",
    "description": "An advanced version of the GPT-4 model with a larger parameter size of 32k.",
    "type": "GPT-4",
    "strengths": "Improved performance and capability due to the larger parameter size, suitable for more complex tasks."
  },
  {
    "name": "gpt-4-32k-0314",
    "description": "A specific version of the GPT-4 32k model released on March 14th, with potentially updated features or improvements.",
    "type": "GPT-4",
    "strengths": "Similar to GPT-4 32k, with possible enhancements or adjustments made after March 14th."
  },
  {
    "name": "gpt-4-32k-0613",
    "description": "A specific version of the GPT-4 32k model released on June 13th, with potentially updated features or improvements.",
    "type": "GPT-4",
    "strengths": "Similar to GPT-4 32k, with possible enhancements or adjustments made after June 13th."
  },
  {
    "name": "claude-v1.0",
    "description": "An LLM model named Claude, version 1.0.",
    "type": "Claude",
    "strengths": "Capabilities specific to the Claude model, which could include various language processing tasks."
  },
  {
    "name": "claude-v1",
    "description": "An earlier version of the Claude LLM model.",
    "type": "Claude",
    "strengths": "Capabilities specific to the Claude model, which could include various language processing tasks."
  },
  {
    "name": "claude-v1-100k",
    "description": "An enhanced version of the Claude v1 model with a larger parameter size of 100k.",
    "type": "Claude",
    "strengths": "Improved performance and capability due to the larger parameter size, suitable for more complex tasks."
  },
  {
    "name": "claude-instant-v1.0",
    "description": "An instant version of the Claude LLM model, version 1.0.",
    "type": "Claude",
    "strengths": "Capabilities specific to the Claude Instant model, which could include various language processing tasks."
  },
  {
    "name": "claude-instant-v1",
    "description": "An earlier version of the Claude Instant LLM model.",
    "type": "Claude",
    "strengths": "Capabilities specific to the Claude Instant model, which could include various language processing tasks."
  },
  {
    "name": "claude-instant-v1-100k",
    "description": "An enhanced instant version of the Claude Instant v1 model with a larger parameter size of 100k.",
    "type": "Claude",
    "strengths": "Improved performance and capability due to the larger parameter size, suitable for more complex tasks."
  },
  {
    "name": "claude-instant-v1.1",
    "description": "An updated instant version of the Claude Instant LLM model, version 1.1.",
    "type": "Claude",
    "strengths": "Capabilities specific to the Claude Instant model, which could include various language processing tasks."
  },
  {
    "name": "claude-instant-v1.1-100k",
    "description": "An enhanced instant version of the Claude Instant v1.1 model with a larger parameter size of 100k.",
    "type": "Claude",
    "strengths": "Improved performance and capability due to the larger parameter size, suitable for more complex tasks."
  },
  {
    "name": "claude-v1.2",
    "description": "An updated version of the Claude LLM model, version 1.2.",
    "type": "Claude",
    "strengths": "Capabilities specific to the Claude model, which could include various language processing tasks."
  },
  {
    "name": "claude-v1.3",
    "description": "An updated version of the Claude LLM model, version 1.3.",
    "type": "Claude",
    "strengths": "Capabilities specific to the Claude model, which could include various language processing tasks."
  },
  {
    "name": "claude-v1.3-100k",
    "description": "An enhanced version of the Claude v1.3 model with a larger parameter size of 100k.",
    "type": "Claude",
    "strengths": "Improved performance and capability due to the larger parameter size, suitable for more complex tasks."
  },
  {
    "name": "claude-2",
    "description": "The second version of the Claude LLM model.",
    "type": "Claude",
    "strengths": "Capabilities specific to the Claude model, which could include various language processing tasks."
  },
  {
    "name": "claude-2.0",
    "description": "An updated version of the Claude LLM model, version 2.0.",
    "type": "Claude",
    "strengths": "Capabilities specific to the Claude model, which could include various language processing tasks."
  },

  {
    "name": "gemini-pro",
    "description": "An advanced LLM model with capabilities tailored for professional use, possibly including specialized language processing tasks.",
    "type": "Gemini",
    "strengths": "Capabilities specific to professional use, which could include advanced language processing tasks."
  },
  {
    "name": "text-unicorn@001",
    "description": "An LLM model named Text Unicorn, version 001.",
    "type": "Others",
    "strengths": "Capabilities specific to the Text Unicorn model, which could include various language processing tasks."
  }
]
