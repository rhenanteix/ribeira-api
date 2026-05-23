import OpenAI from "openai";
import { env } from "../../config/env";

const openaiClient = new OpenAI({
    apiKey: env.OPENAI_API_KEY
});

export { openaiClient }
