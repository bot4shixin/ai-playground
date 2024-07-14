import { LLM_Params } from "@/types";
import { NextResponse } from "next/server";
import { CustomModel } from "@/types";

export async function POST(request: Request) {
  try {
    const json= await request.json();
    const { messages, model, task_id, user_name, temperature, top_p, max_tokens, choices, apiPath= process.env.GATEWAY_API, apiSecret  = process.env.GATEWAY_TOKEN} = json as LLM_Params & CustomModel;

    if (!apiPath) {
      throw new Error("apiPath are required");
    }
    const res = await fetch(apiPath, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiSecret}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messages,
        model, 
        task_id, 
        top_p,
        choices,
        user_name,  
        temperature,
      })  
    }).then(res => res.json()).catch(err => {
      console.log(JSON.stringify(err));
    });


    const json_response = {
      data: res,
      status: 200,
    };

    return new NextResponse(JSON.stringify(json_response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    const error_response = {
      status: "error",
      message: error.message,
    };
    return new NextResponse(JSON.stringify(error_response), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
