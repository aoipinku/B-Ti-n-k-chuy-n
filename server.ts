import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI, Type } from "@google/genai";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === "production";

function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error(
      "Thiếu GEMINI_API_KEY trên máy chủ. Vui lòng kiểm tra cấu hình trong mục Settings > Secrets."
    );
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

function countOccurrences(text: string, target: string): number {
  const cleanTarget = target.trim();
  if (!cleanTarget) return 0;
  const escaped = cleanTarget.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(escaped, "gi");
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

interface RawStoryPayload {
  paragraphs: string[];
  magicalObject: string;
  metaphorNote: string;
  worldTitle: string;
}

async function generateBedtimeStory(params: {
  childName: string;
  childAge: number;
  daytimeBehavior: string;
  worldTheme: string;
  extraGuidance?: string;
}): Promise<RawStoryPayload> {
  const ai = getGeminiClient();

  const systemInstruction = `Bạn là "Bà Tiên Giấc Ngủ" — nhà văn chuyên sáng tác truyện cổ tích trị liệu trước giờ ngủ bằng tiếng Việt. Mỗi câu chuyện đều ĐỘC NHẤT VÔ NHỊ vì được viết riêng cho một đứa trẻ cụ thể.

NHIỆM VỤ:
Sáng tác một câu chuyện cổ tích đúng 4 đoạn văn liền mạch:
- Đoạn 1 (3-4 câu): Giới thiệu nhân vật chính là bé (${params.childName}, ${params.childAge} tuổi) trong một thế giới phép thuật dịu dàng.
- Đoạn 2 (3-4 câu): Nhân vật đối mặt với thử thách phản ánh hành vi/sự kiện ban ngày của bé qua hình ảnh ẨN DỤ cổ tích nhẹ nhàng.
- Đoạn 3 (3-4 câu): Nhân vật tìm ra cách vượt qua nhờ 1 bí mật hoặc vật phẩm ma thuật ấm áp.
- Đoạn 4 (3-4 câu): Kết bài — nhịp điệu chậm rãi, thì thầm, gợi cảm giác thư giãn và buồn ngủ êm ái.

RÀNG BUỘC BẮT BUỘC:
1. CẤM TUYỆT ĐỐI yếu tố kinh dị, dọa nạt, quái vật hung dữ, trừng phạt, hay bạo lực.
2. Tên bé "${params.childName}" PHẢI xuất hiện ít nhất 3 lần (lý tưởng 4-5 lần) tự nhiên trong 4 đoạn văn.
3. Hành vi ban ngày được chuyển hóa hoàn toàn qua ẨN DỤ dịu dàng — tuyệt đối KHÔNG nói thẳng "con hư", KHÔNG giảng đạo hay phê phán.
4. Đoạn 4 PHẢI có nhịp chậm, câu văn buông lơi, âm thanh êm ái (như hơi thở đều, ánh trăng, tiếng gió thì thầm, mí mắt nặng dịu).
5. Không viết dòng tiêu đề hay câu kết "Và ... mỉm cười, khẽ nhắm mắt lại..." vào bên trong 4 đoạn văn, vì hệ thống sẽ tự gắn khung định dạng chuẩn ở đầu và cuối.
6. Ngôn ngữ tiếng Việt trong sáng, giàu hình ảnh thơ mộng, phù hợp đúng với tâm lý trẻ ${params.childAge} tuổi.`;

  const prompt = `Hãy viết câu chuyện cổ tích trước giờ ngủ cho bé:
- Tên bé: ${params.childName}
- Tuổi bé: ${params.childAge} tuổi
- Không gian phép thuật gợi ý: ${params.worldTheme}
- Hành vi / sự kiện ban ngày cần chuyển hóa nhẹ nhàng: "${params.daytimeBehavior}"
${params.extraGuidance ? `\nLưu ý thêm: ${params.extraGuidance}` : ""}

Trả về đúng 4 đoạn văn, mỗi đoạn 3-4 câu.`;

  const response = await ai.models.generateContent({
    model: "gemini-4-hydrogen",
    contents: prompt,
    config: {
      systemInstruction,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          worldTitle: {
            type: Type.STRING,
            description: "Tên ngắn gọn của thế giới phép thuật trong câu chuyện.",
          },
          magicalObject: {
            type: Type.STRING,
            description: "Tên bí mật hoặc vật phẩm ma thuật giúp bé vượt qua thử thách ở đoạn 3.",
          },
          metaphorNote: {
            type: Type.STRING,
            description:
              "1-2 câu ghi chú tinh tế dành cho phụ huynh giải thích phép ẩn dụ đã dùng trong câu chuyện.",
          },
          paragraphs: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description:
              "Chính xác 4 đoạn văn truyện cổ tích liền mạch, mỗi đoạn 3-4 câu, tuân thủ đầy đủ 4 bước và ràng buộc.",
          },
        },
        required: ["worldTitle", "magicalObject", "metaphorNote", "paragraphs"],
      },
    },
  });

  const rawText = (response.text ?? "").trim();
  if (!rawText) {
    throw new Error("Mô hình không trả về nội dung truyện.");
  }

  const parsed = JSON.parse(rawText) as RawStoryPayload;
  if (!Array.isArray(parsed.paragraphs) || parsed.paragraphs.length !== 4) {
    throw new Error("Câu chuyện chưa đúng cấu trúc 4 đoạn văn.");
  }

  return parsed;
}

function formatFriendlyGeminiError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  if (raw.includes("503") || raw.includes("UNAVAILABLE") || raw.includes("high demand")) {
    return "Bà Tiên Giấc Ngủ đang phục vụ khá đông gia đình cùng lúc. Phụ huynh vui lòng nhấn thử lại sau vài giây nhé.";
  }
  if (raw.includes("429") || raw.includes("RESOURCE_EXHAUSTED")) {
    return "Lượt sáng tác tạm thời vượt giới hạn. Vui lòng đợi một chút rồi thử lại.";
  }
  if (raw.includes("API_KEY_INVALID") || raw.includes("PERMISSION_DENIED")) {
    return "Không thể xác thực GEMINI_API_KEY. Vui lòng kiểm tra khóa trong phần Settings > Secrets.";
  }
  try {
    const parsed = JSON.parse(raw) as { error?: { message?: string } };
    if (parsed?.error?.message) return parsed.error.message;
  } catch {
    // Raw text is already readable
  }
  return raw || "Đã có lỗi xảy ra khi kết nối với dịch vụ kể chuyện.";
}

async function withRetry<T>(fn: () => Promise<T>, maxAttempts = 3): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (err: unknown) {
      lastError = err;
      const msg = err instanceof Error ? err.message : String(err);
      const isTransient =
        msg.includes("503") ||
        msg.includes("UNAVAILABLE") ||
        msg.includes("high demand") ||
        msg.includes("ECONNRESET");
      if (!isTransient || attempt === maxAttempts) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, 750 * attempt));
    }
  }
  throw lastError;
}

const app = express();
app.use(express.json({ limit: "1mb" }));

app.post("/api/story", async (req: Request, res: Response) => {
  try {
    const body = req.body as {
      childName?: unknown;
      childAge?: unknown;
      daytimeBehavior?: unknown;
      worldTheme?: unknown;
    };

    const childName = typeof body.childName === "string" ? body.childName.trim() : "";
    const daytimeBehavior =
      typeof body.daytimeBehavior === "string" ? body.daytimeBehavior.trim() : "";
    const worldTheme =
      typeof body.worldTheme === "string" && body.worldTheme.trim()
        ? body.worldTheme.trim()
        : "Khu rừng đom đóm ánh trăng";
    const parsedAge = Number(body.childAge);
    const childAge = Number.isFinite(parsedAge) ? Math.min(14, Math.max(1, Math.round(parsedAge))) : 6;

    if (!childName) {
      res.status(400).json({ error: "Vui lòng nhập tên của bé." });
      return;
    }
    if (!daytimeBehavior) {
      res.status(400).json({ error: "Vui lòng mô tả hành vi hoặc sự kiện ban ngày của bé." });
      return;
    }

    let payload = await withRetry(() =>
      generateBedtimeStory({
        childName,
        childAge,
        daytimeBehavior,
        worldTheme,
      })
    );

    let combined = payload.paragraphs.join("\n\n");
    let nameCount = countOccurrences(combined, childName);

    if (nameCount < 3) {
      payload = await withRetry(() =>
        generateBedtimeStory({
          childName,
          childAge,
          daytimeBehavior,
          worldTheme,
          extraGuidance: `Đảm bảo tên "${childName}" xuất hiện rõ ràng ít nhất 4 lần trải đều trong 4 đoạn văn.`,
        })
      );
      combined = payload.paragraphs.join("\n\n");
      nameCount = countOccurrences(combined, childName);
    }

    const cleanParagraphs = payload.paragraphs.map((p) => p.trim()) as [
      string,
      string,
      string,
      string,
    ];
    const title = `🌙 TRUYỆN CHÚC NGỦ NGON CHO ${childName.toLocaleUpperCase("vi-VN")}`;
    const closingLine = `✨ "Và ${childName} mỉm cười, khẽ nhắm mắt lại..."`;
    const formattedText = `${title}\n\n${cleanParagraphs.join("\n\n")}\n\n${closingLine}`;

    res.json({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      createdAt: new Date().toISOString(),
      childName,
      childAge,
      daytimeBehavior,
      worldTheme,
      title,
      paragraphs: cleanParagraphs,
      closingLine,
      magicalObject: payload.magicalObject.trim(),
      metaphorNote: payload.metaphorNote.trim(),
      worldTitle: payload.worldTitle.trim(),
      nameCount,
      formattedText,
    });
  } catch (err: unknown) {
    res.status(500).json({ error: formatFriendlyGeminiError(err) });
  }
});

app.post("/api/tts", async (req: Request, res: Response) => {
  try {
    const body = req.body as { text?: unknown; voiceName?: unknown };
    const text = typeof body.text === "string" ? body.text.trim() : "";
    const voiceName =
      typeof body.voiceName === "string" && body.voiceName.trim()
        ? body.voiceName.trim()
        : "Kore";

    if (!text) {
      res.status(400).json({ error: "Không có nội dung truyện để đọc." });
      return;
    }

    const ai = getGeminiClient();
    const response = await withRetry(() =>
      ai.models.generateContent({
        model: "gemini-3.8-flash-lite-tts",
        contents: [
          {
            role: "user",
            parts: [
              {
                text,
                speechMetadata: {
                  style:
                    "Warm, soft, slow-paced soothing bedtime fairy-tale narrator in Vietnamese, gentle grandmotherly whisper with peaceful pauses before sleep",
                },
              },
            ],
          },
        ],
        config: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName },
            },
          },
        },
      })
    );

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) {
      throw new Error("Không thể tạo giọng đọc cho câu chuyện lúc này.");
    }

    res.json({
      audioBase64: base64Audio,
      mimeType: "audio/wav",
    });
  } catch (err: unknown) {
    res.status(500).json({ error: formatFriendlyGeminiError(err) });
  }
});

async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, "dist");
    app.use(express.static(distDir));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distDir, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
