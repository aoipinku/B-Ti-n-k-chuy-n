import { useEffect, useState } from "react";
import { Minus, Plus, X } from "lucide-react";
import type { GeneratedStory } from "../types/story";

interface BedsideReaderModalProps {
  story: GeneratedStory | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BedsideReaderModal({
  story,
  isOpen,
  onClose,
}: BedsideReaderModalProps) {
  const [fontSize, setFontSize] = useState(20);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !story) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Chế độ đọc tắt đèn"
      className="fixed inset-0 z-50 bg-[#070a14] text-[#e5dccb] overflow-y-auto"
    >
      <div className="max-w-3xl mx-auto px-6 py-8 sm:py-12 min-h-screen flex flex-col">
        <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div className="text-xs text-slate-400">
            Chế độ đọc tắt đèn · Nhịp đọc chậm bên giường bé
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFontSize((s) => Math.max(16, s - 2))}
              aria-label="Thu nhỏ cỡ chữ"
              className="p-2 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="text-xs tabular-nums text-slate-400 px-1.5">
              {fontSize}px
            </span>
            <button
              type="button"
              onClick={() => setFontSize((s) => Math.min(28, s + 2))}
              aria-label="Phóng to cỡ chữ"
              className="p-2 rounded-lg border border-slate-800 text-slate-300 hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng chế độ đọc"
              className="ml-3 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-800 text-xs font-medium text-slate-200 hover:bg-slate-900 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Đóng</span>
            </button>
          </div>
        </div>

        <article className="flex-1 py-10 sm:py-14 space-y-8">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#e6b86a]">
            {story.title}
          </h2>

          <div
            style={{ fontSize: `${fontSize}px` }}
            className="font-story leading-[1.9] space-y-7 text-[#e5dccb]/95"
          >
            {story.paragraphs.map((paragraph, idx) => (
              <p key={idx} className={idx === 3 ? "opacity-90" : ""}>
                {paragraph}
              </p>
            ))}
          </div>

          <p className="pt-6 border-t border-slate-800/80 font-story italic text-xl sm:text-2xl text-[#e6b86a]">
            {story.closingLine}
          </p>
        </article>
      </div>
    </div>
  );
}
