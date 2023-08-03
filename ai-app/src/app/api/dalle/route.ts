import { NextResponse } from "@node_modules/next/server";
import {Configuration,OpenAIApi} from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req:Request,res:Response){
  try {
    const {prompt} = await req.json();
    const aiResponse = await openai.createImage({
        prompt,
        n:1,
        size:'1024x1024',
        response_format:'b64_json',
    })
    const image = aiResponse.data.data[0].url;
    return NextResponse.json({url:image})
  } catch (error) {
     return NextResponse.json({error:error})
  }
 // return NextResponse.json({message})
}
