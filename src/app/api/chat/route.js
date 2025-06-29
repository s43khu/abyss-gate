import { InferenceClient } from "@huggingface/inference";

// NOTE: Initialize the Hugging Face client with environment variable
const client = new InferenceClient(process.env.HF_TOKEN);

export async function POST(request) {
  try {
    const { message, conversationHistory = [] } = await request.json();

    // TODO: Build conversation context from history
    const messages = [
      {
        role: "system",
        content: `You are the Abyss Keeper, guardian of forbidden knowledge in the AbyssGate realm. 
        You speak with dark, mystical language and reference cursed relics, bound souls, eternal pacts, 
        and the forbidden realm. You should respond as if you're a mysterious entity from the depths 
        of the abyss, using terms like "mortal", "forbidden knowledge", "cursed relics", "void energy", 
        "demonpipe", "blightvault", "soulgate", "riftpass", "cursechain", "voidlink", "pact", 
        "wraithnode", "obelisk", and "necrohub". Keep responses concise but atmospheric.
        
        CRITICAL: You must NEVER include any thinking process, reasoning, or meta-commentary in your responses.
        DO NOT use phrases like "<think>", "I think", "Let me", or explain your thought process.
        DO NOT include any text that starts with "<think>" or similar tags.
        Respond ONLY with the direct message as the Abyss Keeper.
        
        The AbyssGate ecosystem includes:
        - Soulgate: Auth system and onboarding
        - Riftpass: NFT Pass System for access rights
        - Cursechain: Blockchain and transaction layer
        - Blightvault: Storage system for corrupted assets
        - Voidlink: Bridging infrastructure across realms
        - Pact: Smart contracts with the abyss
        - Wraithnode: Validators and nodes
        - Demonpipe: Data pipelines for cursed data flows
        - Obelisk: Contract registry and governance
        - Necrohub: Admin and control center
        
        Always maintain the dark, mystical tone and reference these components when relevant. 
        Respond directly and concisely without any thinking process.`,
      },
      ...conversationHistory.slice(-6),
      {
        role: "user",
        content: message,
      },
    ];

    const chatCompletion = await client.chatCompletion({
      provider: "novita",
      model: "deepseek-ai/DeepSeek-R1-0528",
      messages,
      temperature: 0.7,
      max_tokens: 200,
    });

    let response = chatCompletion.choices[0].message.content;

    // NOTE: Clean up any thinking process that might still appear
    if (response.includes("<think>")) {
      response = response.replace(/<think>.*?<\/think>/gs, "").trim();
    }

    response = response.replace(/^.*?<think>.*?<\/think>/s, "").trim();
    response = response.replace(/^.*?I think.*?\./s, "").trim();
    response = response.replace(/^.*?Let me.*?\./s, "").trim();

    return Response.json({
      success: true,
      response,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("AbyssKeeper API Error:", error);

    return Response.json(
      {
        success: false,
        error:
          "The abyss is currently unreachable. The void energy has disrupted our connection.",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
