import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HF_TOKEN);

const abyssFallbackMessages = [
  "<🤔> The void rejects your query, mortal.",
  "<🌀> Speak plainly or be consumed.",
  "<😶> *silent abyssal static*",
  "<💀> Even wraiths find this unclear.",
  "<⚰️> The blightvault demands better phrasing.",
];

export async function POST(request) {
  try {
    const {
      message,
      conversationHistory = [],
      nsfwEnabled,
    } = await request.json();

    const chatCompletion = await client.chatCompletion({
      provider: "novita",
      model: "meta-llama/Llama-3.1-8B-Instruct",
      messages: [
        {
          role: "system",
          content: nsfwEnabled
            ? process.env.NSFW_CONTENT
            : process.env.SFW_CONTENT,
        },
        ...conversationHistory.slice(-4),
        { role: "user", content: message },
      ],
      temperature: 0.2,
      max_tokens: 100, // Hard limit
    });

    let response = chatCompletion.choices[0]?.message?.content?.trim() || "";

    // Fallback if empty
    if (!response) {
      response =
        abyssFallbackMessages[
          Math.floor(Math.random() * abyssFallbackMessages.length)
        ];
    }

    return Response.json({
      success: true,
      response: response.split("\n")[0], // Take only first line
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        success: false,
        error: "<💥> The demonpipe has ruptured.",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
