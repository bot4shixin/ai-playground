import { Transcript } from "src/types";
import { toast } from "sonner";
import {LLM_Params} from "src/types";
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
export async function getMyFinishedTrans(userId: string) : Promise<any> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/query-transcripts?userId=${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(response).then(
    (data) => data
  );
}

export async function getAnalyticOverview() : Promise<any> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/analytic/overview`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(response).then(
    (data) => data
  );
}

export async function apiUpdateTranscriptScore(
  userId: string,scores: any, answers: any
): Promise<any> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/score-transcript`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      scores,
      answers
    }),
  });
  return handleResponse<ApiResponse>(response).then(
    (data) => data.data
  );
}

export async function apiCreateTranscript(
  transcripts: Transcript[]
): Promise<any> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/score-transcript`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(transcripts),
  });
  // todo
  return handleResponse<ApiResponse>(response).then(
    (data) => data.data
  );
}

export async function apiGetTranscripts({
  userId,
}: {
  userId: string;
}
): Promise<any> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/query-transcripts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
    }),

  });

  return handleResponse<ApiResponse>(response).then(
    (data) => data.data
  );
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


export async function apiAdminMarkTranscript(taskId: number): Promise<any> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/admin/mark-transcript`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      taskId,
    }),
  });

  return handleResponse<ApiResponse>(response).then(
    (response) => {
      return response
    }
  );
}


export async function apiAnalyticTranscript(): Promise<any> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/analytic/transcript`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // userId,
      // profile,
    }),
  });

  return handleResponse<ApiResponse>(response).then(
    (response) => {
      return response
    }
  );
}

export async function apiGetAllUsers(): Promise<any> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return handleResponse<ApiResponse>(response).then(
    (response) => {
      return response
    }
  );
}

export async function apiUpdateUserPermissions(userId: string, permissions: string): Promise<any> {
  const response = await fetch(`${SERVER_ENDPOINT}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userId,
      permissions,
    }),
  });

  return handleResponse<ApiResponse>(response).then(
    (response) => {
      return response
    }
  );
}


export async function apiCallZoomGateway({
  messages, model,
  task_id, user_name, temperature, top_p, max_tokens, choices
}: LLM_Params): Promise<ApiResponse<unknown>> {
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
    }),
  });

  return handleResponse<ApiResponse>(response).then(
    (response) => {
      return response
    }
  );
}