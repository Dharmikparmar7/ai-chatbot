import Error from 'next/error';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

export async function POST(req: Request, res: NextResponse, err: Error) {
  try {
    const body = await req.json()

    if (!body.messages || !Array.isArray(body.messages)) {
      return NextResponse.json({ output: "Invalid 'messages' property." }, { status: 400 });
    }

    const configuration = new Configuration({
      apiKey: body.apiKey,
    });

    const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: body.messages,
    });

    // console.log(completion.response.status);
    const theResponse = completion.data.choices[0].message;

    return NextResponse.json({ output: theResponse }, { status: 200 })
  } catch (err) {
    return NextResponse.json({
      output: {
        role: "assistant",
        content: "Internal Server Error",
      }
    }, { status: 500 });
  }
};