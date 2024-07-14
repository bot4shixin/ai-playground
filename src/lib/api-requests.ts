import { toast } from "sonner";
import {CustomModel, LLM_Params} from "src/types";
import { getValueFromStorage } from "@/lib/utils";
export type ErrorResponse = {
  status: string;
  message: string;
};

export type ApiResponse<T = unknown> = {
  status: string;
  data: T;
};

const SERVER_ENDPOINT = process.env.NEXT_PUBLIC_SERVER_ENDPOINT || "http://localhost:4236";

async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message: string = isJson
      ? data.message || response.statusText
      : response.statusText;
    toast.error(`${message}`, {
      position: "top-center"}
    )
    throw new Error(message);
  }
  return data as T;
}
export async function apiUpdateProfile(userId: string, profile: any): Promise<any> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      profile,
    }),
  });

  return handleResponse<ApiResponse>(response).then(
    (response) => response.data
  );
}

export async function apiCallCustomGateway({
  messages, model,
  task_id, user_name, temperature, top_p, max_tokens, choices
}: LLM_Params): Promise<ApiResponse<unknown>> {
  const models = getValueFromStorage("aiCustomModels");
  const defaultModel = models.find((m: CustomModel) => m.isDefault);
  const {apiPath = process.env.GATEWAY_TOKEN, apiSecret = process.env.GATEWAY_TOKEN} = defaultModel
  const response = await fetch(`${SERVER_ENDPOINT}/api/gateway`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messages,
      model, 
      task_id, 
      top_p,
      max_tokens,
      choices,
      user_name,  
      temperature,
      apiPath,
      apiSecret
    }),
  });

  return handleResponse<ApiResponse>(response).then(
    (response) => {
      return response
    }
  );
}