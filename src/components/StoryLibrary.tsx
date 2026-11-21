import { useMemo, useState } from "react";
import { BookOpen, Trash2 } from "lucide-react";
import type { GeneratedStory } from "../types/story";

interface StoryLibraryProps {
  stories: GeneratedStory[];
  activeStoryId: string;
  onSelectStory: (story: GeneratedStory) => void;
  onDeleteStory: (id: string) => void;
}

export function StoryLibrary({
  stories,
  activeStoryId,
  onSelectStory,
  onDeleteStory,
}: StoryLibraryProps) {
  const [childFilter, setChildFilter] = useState<string>("Tất cả");

  const childNames = useMemo(() => {
    const unique = Array.from(new Set(stories.map((s) => s.childName)));
    return ["Tất cả", ...unique];
  }, [stories]);

  const filteredStories = useMemo(() => {
    if (childFilter === "Tất cả") return stories;
    return stories.filter((s) => s.childName === childFilter);
  }, [stories, childFilter]);

  return (
    <section id="library" className="py-14 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-xs font-medium text-[#a36c1b] dark:text-[#e6b86a] tracking-wide mb-2">
              Tủ sách đêm lưu giữ kỷ niệm
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-[#f5efe6]">
              Những câu chuyện đã kể cho bé
            </h2>
          </div>

          {stories.length > 0 && childNames.length > 2 && (
            <div className="flex items-center gap-1 p-1 rounded-lg bg-stone-200/70 dark:bg-[#131a2e] border border-stone-300/60 dark:border-slate-800">
              {childNames.map((name) => (
                <button
                  key={name}
                  type="button"
                  onClick={() => setChildFilter(name)}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    childFilter === name
                      ? "bg-white dark:bg-[#1d2745] text-slate-900 dark:text-[#f5efe6] shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          )}
        </div>

        {filteredStories.length === 0 ? (
          <div className="rounded-2xl border border-stone-300/70 dark:border-slate-800 bg-white/60 dark:bg-[#131a2e]/70 p-10 text-center">
            <BookOpen className="w-7 h-7 mx-auto mb-3 text-slate-400 dark:text-slate-500" />
            <p className="font-display text-lg text-slate-800 dark:text-slate-200 mb-1">
              Tủ sách đêm chưa có truyện nào được lưu
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Sau khi sáng tác một câu chuyện mới, phụ huynh hãy nhấn &ldquo;Lưu truyện&rdquo; để giữ lại đọc vào những tối tiếp theo.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((item) => {
              const isSelected = item.id === activeStoryId;
              const dateLabel = new Date(item.createdAt).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              });

              return (
                <div
                  key={item.id}
                  className={`rounded-2xl border p-6 flex flex-col justify-between transition-colors ${
                    isSelected
                      ? "border-[#c98a2c] dark:border-[#e6b86a] bg-white dark:bg-[#161f38]"
                      : "border-stone-300/80 dark:border-slate-800 bg-white/75 dark:bg-[#131a2e]"
                  }`}
                >
                  <div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mb-2.5">
                      <span className="font-medium text-[#9e6514] dark:text-[#e6b86a]">
                        {item.childName} · {item.childAge} tuổi
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{dateLabel}</span>
                    </div>

                    <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-[#f5efe6] mb-2">
                      {item.worldTitle}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                      Tình huống: {item.daytimeBehavior}
                    </p>

                    <p className="font-story text-sm text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {item.paragraphs[0]}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-stone-200 dark:border-slate-800 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => onSelectStory(item)}
                      className="text-xs font-semibold text-[#9e6514] dark:text-[#e6b86a] hover:underline underline-offset-4 cursor-pointer"
                    >
                      Mở đọc lại truyện
                    </button>

                    <button
                      type="button"
                      onClick={() => onDeleteStory(item.id)}
                      aria-label={`Xóa truyện của ${item.childName}`}
                      className="p-1.5 rounded-md text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
