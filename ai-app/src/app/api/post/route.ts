import connectMongoDB from "@lib/mongodb";
import { NextResponse } from "@node_modules/next/server";
import Post from "@models/Post";

export async function POST(req:Request,res:Response){
  try {
    const {name,prompt,photo} = await req.json();
    if(!{name,prompt,photo}){
      return NextResponse.json({error:"Missing payloads!"})
    }
    await connectMongoDB();
    await Post.create({name,prompt,photo});
    return NextResponse.json({messsage:"Post Created!"},{status:201})
  
  } catch (error) {
      throw new Error("error creating post!")
  }
  // return NextResponse.json({message:"hell world!"})
}
