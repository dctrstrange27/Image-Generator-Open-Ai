import { NextResponse } from "@node_modules/next/server";
import {Configuration,OpenAIApi} from 'openai'

const configuration = new Configuration({
 // organization: "org-bERSrnjwwR9hi4dzgaokzIqM",
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req:Request,res:Response){
    // const {prompt} = await req.json();
  try {
    // const {prompt} = await req.json();
    const aiResponse = await openai.createImage({
        prompt:`a baby walking on moon`,
        n:2,
        size:'1024x1024',
    })
    console.log(aiResponse.data.data)
  } catch (error) {
     return NextResponse.json({error:error})
  }
 //return NextResponse.json({prompt:"hello world!"})
}
