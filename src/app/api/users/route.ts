


import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId')
  // if (!userId) return NextResponse.json({
  //   status: 'failed'
  // })
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      permissions: true
    }
  });

 
  const json_response = {
    status: "success",
    data: users,
  };
  return NextResponse.json(json_response);
}


// add
export async function POST(request: Request) {
  try {
    const json: {
        userId: string,
        permissions: string
    } = await request.json();
    const { userId,  permissions} = json;
    const updatedProfile = await prisma.user.update({
      where: { id: userId },
      data: {
        permissions: permissions,
      },
    });


    const json_response = {
      profile: updatedProfile,
      status: "success",
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
