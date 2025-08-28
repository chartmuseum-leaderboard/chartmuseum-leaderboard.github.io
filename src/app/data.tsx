import { ModelData } from "@/components/Leaderboard";

export const scoresData: ModelData[] = [
  {
    model: "InternVL3-2B",
    Size: "2B",
    visual: 12.2,
    text: 30.1,
    synthesis: 13.5,
    "visual/text": 18.4,
    overall: 16.0,
    link: "https://huggingface.co/OpenGVLab/InternVL3-2B"
  },
  {
    model: "Qwen2.5-VL-3B",
    Size: "3B",
    visual: 16.7,
    text: 28.5,
    synthesis: 21.1,
    "visual/text": 26.5,
    overall: 21.0,
    link: "https://huggingface.co/Qwen/Qwen2.5-VL-3B-Instruct"
  },
  {
    model: "Qwen2.5-VL-7B",
    Size: "7B",
    visual: 19.4,
    text: 41.5,
    synthesis: 24.8,
    "visual/text": 36.3,
    overall: 26.8,
    link: "https://huggingface.co/Qwen/Qwen2.5-VL-7B-Instruct"
  },
  {
    model: "InternVL3-8B",
    Size: "8B",
    visual: 23.5,
    text: 42.3,
    synthesis: 24.8,
    "visual/text": 32.9,
    overall: 28.2,
    link: "https://huggingface.co/OpenGVLab/InternVL3-8B"
  },
  {
    model: "Bespoke-MiniChart-7B",
    Size: "7B",
    visual: 26.3,
    text: 54.5,
    synthesis: 32.3,
    "visual/text": 41.0,
    overall: 34.0,
    color: "#f472b6",
    link: "https://huggingface.co/bespokelabs/Bespoke-MiniChart-7B"
  },
  {
    model: "InternVL3-38B",
    Size: "38B",
    visual: 26.3,
    text: 52.0,
    synthesis: 30.8,
    "visual/text": 35.0,
    overall: 32.1,
    link: "https://huggingface.co/OpenGVLab/InternVL3-38B"
  },
  {
    model: "InternVL3-78B",
    Size: "78B",
    visual: 26.9,
    text: 59.3,
    synthesis: 34.6,
    "visual/text": 41.0,
    overall: 35.2,
    link: "https://huggingface.co/OpenGVLab/InternVL3-78B"
  },
  {
    model: "Qwen2.5-VL-32B",
    Size: "32B",
    visual: 29.0,
    text: 62.6,
    synthesis: 36.1,
    "visual/text": 46.2,
    overall: 38.1,
    link: "https://huggingface.co/Qwen/Qwen2.5-VL-32B-Instruct"
  },
  {
    model: "Pixtral-Large-124B",
    Size: "124B",
    visual: 31.6,
    text: 65.9,
    synthesis: 36.1,
    "visual/text": 40.6,
    overall: 38.5,
    color: "#db2777",
    link: "https://huggingface.co/mistralai/Pixtral-Large-Instruct-2411"
  },
  {
    model: "Qwen2.5-VL-72B",
    Size: "72B",
    visual: 30.4,
    text: 68.3,
    synthesis: 35.3,
    "visual/text": 42.3,
    overall: 38.5,
    color: "#a78bfa",
    link: "https://huggingface.co/Qwen/Qwen2.5-VL-72B-Instruct"
  },
  {
    model: "Gemini-1.5-Flash",
    Size: "-",
    visual: 22.7,
    text: 56.1,
    synthesis: 30.8,
    "visual/text": 36.3,
    overall: 31.1,
    link: "https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/1-5-flash"
  },
  {
    model: "Gemini-1.5-Pro",
    Size: "-",
    visual: 31.0,
    text: 65.9,
    synthesis: 43.6,
    "visual/text": 49.6,
    overall: 41.3,
    link: "https://cloud.google.com/vertex-ai/generative-ai/docs/models/gemini/1-5-pro"
  },
  {
    model: "GPT-4o",
    Size: "-",
    visual: 31.8,
    text: 65.9,
    synthesis: 45.1,
    "visual/text": 50.9,
    overall: 42.2,
    color: "#6d28d9",
    link: "https://openai.com/index/hello-gpt-4o/"
  },
  {
    model: "GPT-4.1",
    Size: "-",
    visual: 37.1,
    text: 78.9,
    synthesis: 53.4,
    "visual/text": 54.3,
    overall: 48.4,
    color: "#1a5419",
    link: "https://openai.com/index/gpt-4-1/"
  },
  {
    model: "GPT-4.1-mini",
    Size: "-",
    visual: 43.9,
    text: 80.5,
    synthesis: 48.1,
    "visual/text": 59.8,
    overall: 52.7,
    color: "#ddd6fe",
    link: "https://openai.com/index/gpt-4-1/"
  },
  {
    model: "Claude-3.5-Sonnet",
    Size: "-",
    visual: 45.7,
    text: 78.0,
    synthesis: 53.4,
    "visual/text": 61.5,
    overall: 54.4,
    color: "#fb923c",
    link: "https://www.anthropic.com/news/claude-3-5-sonnet"
  },
  {
    model: "Claude-3.7-Sonnet",
    Size: "-",
    visual: 50.6,
    text: 88.6,
    synthesis: 55.6,
    "visual/text": 69.2,
    overall: 60.3,
    color: "#bef264",
    link: "https://www.anthropic.com/news/claude-3-7-sonnet"
  },
  {
    model: "o3 (high)",
    Size: "-",
    visual: 50.4,
    text: 85.4,
    synthesis: 63.2,
    "visual/text": 69.7,
    overall: 60.9,
    color: "#9d174d",
    link: "https://openai.com/index/introducing-o3-and-o4-mini/"
  },
  {
    model: "o4-mini (high)",
    Size: "-",
    visual: 51.2,
    text: 86.2,
    synthesis: 66.2,
    "visual/text": 68.4,
    overall: 61.5,
    color: "#fb923c",
    link: "https://openai.com/index/introducing-o3-and-o4-mini/"
  },
  {
    model: "Claude-3.7-Sonnet (think)",
    Size: "-",
    visual: 52.5,
    text: 86.2,
    synthesis: 56.4,
    "visual/text": 71.8,
    overall: 61.7,
    color: "#f472b6",
    link: "https://www.anthropic.com/news/visible-extended-thinking"
  },
  {
    model: "Gemini-2.5-Pro",
    Size: "-",
    visual: 53.3,
    text: 87.8,
    synthesis: 64.7,
    "visual/text": 70.1,
    overall: 63.0,
    color: "#6d28d9",
    link: "https://deepmind.google/technologies/gemini/pro/"
  },
  {
    model: "GPT-5-mini (high)",
    Size: "-",
    visual: 52.6,
    text: 89.4,
    synthesis: 62.4,
    "visual/text": 73.5,
    overall: 63.3,
    color: "#ed2a1c",
    link: "https://openai.com/index/introducing-gpt-5/"
  },
  {
    model: "GPT-5 (high)",
    Size: "-",
    visual: 53.7,
    text: 88.6,
    synthesis: 64.7,
    "visual/text": 68.4,
    overall: 62.9,
    color: "#07871a",
    link: "https://openai.com/index/introducing-gpt-5/"
  },
  {
    model: "Claude-4-Sonnet",
    Size: "-",
    visual: 41.0,
    text: 82.1,
    synthesis: 52.6,
    "visual/text": 62.4,
    overall: 52.6,
    color: "#fcde79",
    link: "https://www.anthropic.com/news/claude-4"
  },
  {
    model: "Claude-4.1-Opus",
    Size: "-",
    visual: 50.4,
    text: 87.0,
    synthesis: 54.1,
    "visual/text": 66.2,
    overall: 59.1,
    color: "#d6c349",
    link: "https://www.anthropic.com/news/claude-opus-4-1"
  }
];