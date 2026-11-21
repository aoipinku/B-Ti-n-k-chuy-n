import { useEffect, useRef, useState } from "react";
import {
  Bookmark,
  BookmarkCheck,
  Check,
  Copy,
  Maximize2,
  Pause,
  Play,
  RotateCcw,
  Volume2,
} from "lucide-react";
import { DAYTIME_PRESETS, WORLD_THEMES } from "../data/presets";
import type { GeneratedStory, StoryPreset, StoryRequest } from "../types/story";

interface StoryAtelierProps {
  nameInputRef: React.RefObject<HTMLInputElement | null>;
  formState: StoryRequest;
  onChangeForm: (next: StoryRequest) => void;
  onGenerate: (req: StoryRequest) => Promise<void>;
  isGenerating: boolean;
  errorMessage: string | null;
  story: GeneratedStory;
  isSampleStory: boolean;
  isSaved: boolean;
  onToggleSave: (story: GeneratedStory) => void;
  onOpenBedsideReader: () => void;
}

function highlightChildName(paragraph: string, childName: string) {
  const cleanName = childName.trim();
  if (!cleanName) return paragraph;
  const escaped = cleanName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = paragraph.split(regex);

  return parts.map((part, idx) => {
    if (part.toLowerCase() === cleanName.toLowerCase()) {
      return (
        <span
          key={idx}
          className="font-semibold text-[#9e6514] dark:text-[#f0c77e]"
        >
          {part}
        </span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
}

export function StoryAtelier({
  nameInputRef,
  formState,
  onChangeForm,
  onGenerate,
  isGenerating,
  errorMessage,
  story,
  isSampleStory,
  isSaved,
  onToggleSave,
  onOpenBedsideReader,
}: StoryAtelierProps) {
  const [copied, setCopied] = useState(false);
  const [audioLoading, setAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioSrc, setAudioSrc] = useState<string | null>(null);
  const [audioStoryId, setAudioStoryId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioStoryId && audioStoryId !== story.id) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      setIsPlaying(false);
      setAudioSrc(null);
      setAudioError(null);
    }
  }, [story.id, audioStoryId]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onGenerate(formState);
  };

  const applyPreset = (preset: StoryPreset) => {
    onChangeForm({
      childName: preset.childName,
      childAge: preset.childAge,
      daytimeBehavior: preset.daytimeBehavior,
      worldTheme: preset.worldTheme,
    });
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(story.formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback textarea copy if clipboard API blocked
      const el = document.createElement("textarea");
      el.value = story.formattedText;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleToggleAudio = async () => {
    setAudioError(null);

    if (audioSrc && audioStoryId === story.id && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    setAudioLoading(true);
    try {
      const narrationText = `${story.title.replace("🌙 ", "")}.\n\n${story.paragraphs.join(
        "\n\n"
      )}\n\n${story.closingLine.replace("✨ ", "")}`;

      const res = await fetch("/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: narrationText, voiceName: "Kore" }),
      });

      const data = (await res.json()) as {
        audioBase64?: string;
        mimeType?: string;
        error?: string;
      };

      if (!res.ok || !data.audioBase64) {
        throw new Error(data.error || "Không thể tạo giọng đọc lúc này.");
      }

      const dataUrl = `data:${data.mimeType || "audio/wav"};base64,${data.audioBase64}`;
      setAudioSrc(dataUrl);
      setAudioStoryId(story.id);

      setTimeout(async () => {
        if (audioRef.current) {
          audioRef.current.src = dataUrl;
          await audioRef.current.play();
          setIsPlaying(true);
        }
      }, 40);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Đã có lỗi khi tạo giọng đọc kể chuyện.";
      setAudioError(msg);
    } finally {
      setAudioLoading(false);
    }
  };

  return (
    <section id="atelier" className="py-14 lg:py-20 border-b border-stone-300/60 dark:border-slate-800/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-medium text-[#a36c1b] dark:text-[#e6b86a] tracking-wide mb-2">
              Xưởng sáng tác cổ tích cá nhân hóa
            </p>
            <h2 className="font-display text-2xl sm:text-4xl font-semibold tracking-tight text-slate-900 dark:text-[#f5efe6] [text-wrap:balance]">
              Gửi đôi dòng về bé, nhận lại trang truyện đêm nay
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 max-w-md">
            Mỗi câu chuyện có đúng 4 đoạn liền mạch, gọi tên bé ít nhất 3 lần và giữ nhịp điệu êm dịu ở đoạn kết.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Form Column */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-5 rounded-2xl border border-stone-300/80 dark:border-slate-800 bg-white/80 dark:bg-[#131a2e] p-6 sm:p-7 space-y-6"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="childName"
                    className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    1. Tên của bé
                  </label>
                  <input
                    ref={nameInputRef}
                    id="childName"
                    type="text"
                    required
                    maxLength={40}
                    value={formState.childName}
                    onChange={(e) =>
                      onChangeForm({ ...formState, childName: e.target.value })
                    }
                    placeholder="Ví dụ: Đạt"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 dark:border-slate-700 bg-[#faf7f0] dark:bg-[#0d1324] text-slate-900 dark:text-[#f5efe6] placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/60"
                  />
                </div>

                <div>
                  <label
                    htmlFor="childAge"
                    className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
                  >
                    2. Tuổi bé
                  </label>
                  <div className="flex items-center rounded-lg border border-stone-300 dark:border-slate-700 bg-[#faf7f0] dark:bg-[#0d1324] overflow-hidden">
                    <button
                      type="button"
                      aria-label="Giảm tuổi"
                      onClick={() =>
                        onChangeForm({
                          ...formState,
                          childAge: Math.max(1, formState.childAge - 1),
                        })
                      }
                      className="px-3 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-stone-200/70 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      −
                    </button>
                    <input
                      id="childAge"
                      type="number"
                      min={1}
                      max={14}
                      value={formState.childAge}
                      onChange={(e) =>
                        onChangeForm({
                          ...formState,
                          childAge: Math.min(14, Math.max(1, Number(e.target.value) || 6)),
                        })
                      }
                      className="w-full text-center bg-transparent text-slate-900 dark:text-[#f5efe6] text-sm font-medium tabular-nums focus:outline-none py-2.5"
                    />
                    <button
                      type="button"
                      aria-label="Tăng tuổi"
                      onClick={() =>
                        onChangeForm({
                          ...formState,
                          childAge: Math.min(14, formState.childAge + 1),
                        })
                      }
                      className="px-3 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-stone-200/70 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="daytimeBehavior"
                  className="block text-sm font-medium text-slate-800 dark:text-slate-200 mb-1.5"
                >
                  3. Hành vi hoặc sự kiện ban ngày cần &ldquo;trị liệu&rdquo;
                </label>
                <textarea
                  id="daytimeBehavior"
                  rows={4}
                  required
                  maxLength={500}
                  value={formState.daytimeBehavior}
                  onChange={(e) =>
                    onChangeForm({ ...formState, daytimeBehavior: e.target.value })
                  }
                  placeholder="Ví dụ: Hôm nay Đạt hơi cáu gắt khi phải tắt TV đi ngủ đúng giờ, hoặc con buồn vì làm đổ tháp xếp hình..."
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 dark:border-slate-700 bg-[#faf7f0] dark:bg-[#0d1324] text-slate-900 dark:text-[#f5efe6] placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500/60"
                />
              </div>

              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
                  Gợi ý tình huống thường gặp (nhấn để điền nhanh):
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {DAYTIME_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className="text-left px-3 py-2 rounded-lg border border-stone-300/80 dark:border-slate-700/80 bg-[#faf7f0]/80 dark:bg-[#0d1324]/70 hover:border-amber-500/60 dark:hover:border-amber-400/50 text-xs text-slate-700 dark:text-slate-300 transition-colors truncate cursor-pointer"
                      title={preset.daytimeBehavior}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mb-2">
                  4. Bối cảnh thế giới phép thuật
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {WORLD_THEMES.map((theme) => {
                    const active = formState.worldTheme === theme;
                    return (
                      <button
                        key={theme}
                        type="button"
                        onClick={() => onChangeForm({ ...formState, worldTheme: theme })}
                        className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors truncate cursor-pointer ${
                          active
                            ? "bg-[#c98a2c] dark:bg-[#e6b86a] text-white dark:text-[#0b1020]"
                            : "bg-stone-100 dark:bg-[#0d1324] text-slate-700 dark:text-slate-300 hover:bg-stone-200/80 dark:hover:bg-[#19233d]"
                        }`}
                      >
                        {theme}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {errorMessage && (
              <div
                role="alert"
                className="p-3.5 rounded-lg border border-rose-400/50 bg-rose-500/10 text-rose-700 dark:text-rose-200 text-xs leading-relaxed"
              >
                {errorMessage}
              </div>
            )}

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={isGenerating}
                className="flex-1 px-5 py-3 rounded-lg bg-[#c98a2c] dark:bg-[#e6b86a] text-white dark:text-[#0b1020] font-semibold text-sm hover:bg-[#b57a22] dark:hover:bg-[#f0c77e] disabled:opacity-60 disabled:cursor-not-allowed transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                {isGenerating ? "Bà Tiên đang dệt truyện..." : "Sáng tác truyện cho bé"}
              </button>

              <button
                type="button"
                onClick={() =>
                  onChangeForm({
                    childName: "Đạt",
                    childAge: 6,
                    daytimeBehavior: "",
                    worldTheme: WORLD_THEMES[0],
                  })
                }
                aria-label="Làm mới biểu mẫu"
                title="Làm mới biểu mẫu"
                className="p-3 rounded-lg border border-stone-300 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-[#19233d] transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right Storybook Manuscript Column */}
          <div className="lg:col-span-7 rounded-2xl border border-stone-300/80 dark:border-slate-800 bg-[#fffcf6] dark:bg-[#131a2e] p-6 sm:p-10">
            {/* Quiet manuscript header & toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-stone-200 dark:border-slate-800">
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span>{isSampleStory ? "Bản đọc mẫu" : "Truyện vừa sáng tác"}</span>
                <span aria-hidden="true">·</span>
                <span>
                  {story.childName} ({story.childAge} tuổi)
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">Tên bé: {story.nameCount} lần</span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={handleToggleAudio}
                  disabled={audioLoading}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-[#1a2340] disabled:opacity-60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {audioLoading ? (
                    <>
                      <Volume2 className="w-3.5 h-3.5 animate-pulse text-[#c98a2c] dark:text-[#e6b86a]" />
                      <span>Đang tạo giọng...</span>
                    </>
                  ) : isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-[#c98a2c] dark:text-[#e6b86a]" />
                      <span>Tạm dừng</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-[#c98a2c] dark:text-[#e6b86a]" />
                      <span>Nghe kể chuyện</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onOpenBedsideReader}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-[#1a2340] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Đọc tắt đèn</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-300 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-[#1a2340] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Đã sao chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Sao chép</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onToggleSave(story)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSaved
                      ? "bg-[#c98a2c]/15 dark:bg-[#e6b86a]/15 text-[#9e6514] dark:text-[#e6b86a] border border-[#c98a2c]/40 dark:border-[#e6b86a]/40"
                      : "border border-stone-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-stone-100 dark:hover:bg-[#1a2340]"
                  }`}
                >
                  {isSaved ? (
                    <>
                      <BookmarkCheck className="w-3.5 h-3.5" />
                      <span>Đã lưu</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>Lưu truyện</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {audioError && (
              <div
                role="alert"
                className="mt-4 p-3 rounded-lg border border-rose-400/50 bg-rose-500/10 text-rose-700 dark:text-rose-200 text-xs"
              >
                {audioError}
              </div>
            )}

            <audio
              ref={audioRef}
              onEnded={() => setIsPlaying(false)}
              onPause={() => setIsPlaying(false)}
              onPlay={() => setIsPlaying(true)}
              className="hidden"
            />

            {audioSrc && audioStoryId === story.id && (
              <div className="mt-5 flex items-center justify-between gap-4 px-4 py-2.5 rounded-lg bg-stone-100/80 dark:bg-[#0d1324] text-xs text-slate-600 dark:text-slate-300">
                <span>Giọng đọc thì thầm trước giờ ngủ</span>
                <audio
                  controls
                  src={audioSrc}
                  className="h-8 max-w-[260px]"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>
            )}

            {/* Exact Formatted Story Content */}
            <article className="pt-8 pb-6 relative">
              {isGenerating && (
                <div className="mb-6 p-4 rounded-xl bg-amber-500/10 text-sm text-[#9e6514] dark:text-[#f0c77e]">
                  Bà Tiên Giấc Ngủ đang thắp đèn lồng và viết bốn đoạn truyện riêng cho {formState.childName || "bé"}...
                </div>
              )}

              <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-slate-900 dark:text-[#f5efe6] mb-7">
                {story.title}
              </h3>

              <div className="space-y-6 font-story text-[16px] sm:text-[17px] leading-[1.85] text-slate-800 dark:text-[#e9e1d2]">
                {story.paragraphs.map((paragraph, idx) => (
                  <p
                    key={idx}
                    className={`${idx === 0 ? "story-dropcap" : ""} ${
                      idx === 3 ? "text-slate-700 dark:text-[#d8cfbe]" : ""
                    }`}
                  >
                    {highlightChildName(paragraph, story.childName)}
                  </p>
                ))}
              </div>

              <p className="mt-8 pt-6 border-t border-stone-200/80 dark:border-slate-800/80 font-story italic text-lg sm:text-xl text-[#9e6514] dark:text-[#e6b86a]">
                {story.closingLine}
              </p>
            </article>

            {/* Clean Parent Reflection Below Hairline */}
            <div className="mt-4 pt-6 border-t border-stone-200 dark:border-slate-800 space-y-2.5">
              <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Ghi chú trị liệu dành riêng cho phụ huynh · Vật phẩm bí mật:{" "}
                <span className="text-slate-800 dark:text-slate-200">
                  {story.magicalObject}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {story.metaphorNote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
