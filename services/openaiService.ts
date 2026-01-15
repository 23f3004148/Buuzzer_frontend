import { AIProvider, InterviewResponse, UserPreferences } from "../types";
import { buildSystemPrompt, buildUserPrompt } from "./aiPrompts";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

const getToken = (): string | null => {
  const stored = sessionStorage.getItem("buuzzer_token");
  if (stored) return stored;
  const legacy = localStorage.getItem("buuzzer_token");
  if (legacy) {
    sessionStorage.setItem("buuzzer_token", legacy);
    localStorage.removeItem("buuzzer_token");
    return legacy;
  }
  return null;
};

const base64Encode = (value: string): string => {
  if (typeof globalThis.btoa !== "function") {
    throw new Error("Base64 encoder not available in this environment.");
  }
  const encoder = new TextEncoder();
  const bytes = encoder.encode(value);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return globalThis.btoa(binary);
};

export type OpenAIStreamHandlers = {
  onToken: (token: string) => void;
  onComplete: () => void;
  onError: (message: string) => void;
};

const mapProviderToBackend = (provider: AIProvider): "openai" | "gemini" | "deepseek" => {
  switch (provider) {
    case "GEMINI":
      return "gemini";
    case "DEEPSEEK":
      return "deepseek";
    case "OPENAI":
    default:
      return "openai";
  }
};

export const streamInterviewResponse = (
  provider: AIProvider,
  transcriptSnippet: string,
  preferences: UserPreferences,
  history: InterviewResponse[] = [],
  handlers: OpenAIStreamHandlers
): EventSource | null => {
  const token = getToken();
  if (!token) {
    handlers.onError("Not authenticated. Please login again.");
    return null;
  }

  const systemPrompt = buildSystemPrompt(preferences, history);
  const userPrompt = buildUserPrompt(transcriptSnippet);

  const backendProvider = mapProviderToBackend(provider);

  const payload = {
    provider: backendProvider,
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ]
  };

  const encodedPayload = encodeURIComponent(base64Encode(JSON.stringify(payload)));
  const streamUrl = `${API_BASE}/api/ai/stream?payload=${encodedPayload}&token=${encodeURIComponent(token)}`;

  const eventSource = new EventSource(streamUrl);

  eventSource.onmessage = (event) => {
    const raw = event.data;

    let parsed: any;
    try {
      parsed = JSON.parse(raw);
    } catch {
      // Raw non-JSON sentinel from OpenAI/DeepSeek like [DONE] or [ERROR...]
      if (raw === "[DONE]") {
        handlers.onComplete();
        eventSource.close();
        return;
      }
      if (typeof raw === "string" && raw.startsWith("[ERROR]")) {
        handlers.onError(raw.replace(/^\[ERROR\]\s*/, ""));
        eventSource.close();
        return;
      }
      handlers.onError("Malformed stream payload.");
      eventSource.close();
      return;
    }

    // Our backend may wrap tokens or errors as a JSON string
    if (typeof parsed === "string") {
      if (parsed === "[DONE]") {
        handlers.onComplete();
        eventSource.close();
        return;
      }
      if (parsed.startsWith("[ERROR]")) {
        handlers.onError(parsed.replace(/^\[ERROR\]\s*/, ""));
        eventSource.close();
        return;
      }
      handlers.onToken(parsed);
      return;
    }

    // Direct passthrough of OpenAI / DeepSeek SSE chunk
    const token = parsed?.choices?.[0]?.delta?.content;
    if (typeof token === "string" && token.length > 0) {
      handlers.onToken(token);
    }
  };

  eventSource.onerror = (event) => {
    const message = (event as Event & { message?: string }).message || "Stream connection failed.";
    handlers.onError(message);
    eventSource.close();
  };

  return eventSource;
};
