import { useEffect, useRef, useState } from "react";
import { BedsideReaderModal } from "./components/BedsideReaderModal";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { StoryAtelier } from "./components/StoryAtelier";
import { StoryLibrary } from "./components/StoryLibrary";
import { StructureGuide } from "./components/StructureGuide";
import {
  DAYTIME_PRESETS,
  INITIAL_SAMPLE_STORY,
  WORLD_THEMES,
} from "./data/presets";
import type { GeneratedStory, StoryRequest } from "./types/story";

const STORAGE_KEY = "ba-tien-giac-ngu:saved-stories-v1";

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [formState, setFormState] = useState<StoryRequest>({
    childName: "Đạt",
    childAge: 6,
    daytimeBehavior: DAYTIME_PRESETS[0].daytimeBehavior,
    worldTheme: WORLD_THEMES[0],
  });

  const [currentStory, setCurrentStory] = useState<GeneratedStory>(
    INITIAL_SAMPLE_STORY
  );
  const [isSampleStory, setIsSampleStory] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [bedsideOpen, setBedsideOpen] = useState(false);

  const [savedStories, setSavedStories] = useState<GeneratedStory[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as GeneratedStory[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedStories));
    } catch {
      // Ignore storage quota errors
    }
  }, [savedStories]);

  const scrollToAtelier = () => {
    const el = document.getElementById("atelier");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      nameInputRef.current?.focus();
    }, 350);
  };

  const handleGenerateStory = async (req: StoryRequest) => {
    setErrorMessage(null);
    setIsGenerating(true);

    try {
      const res = await fetch("/api/story", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req),
      });

      const data = (await res.json()) as GeneratedStory & { error?: string };

      if (!res.ok) {
        throw new Error(
          data.error || "Không thể sáng tác câu chuyện lúc này. Vui lòng thử lại."
        );
      }

      setCurrentStory(data);
      setIsSampleStory(false);
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : "Đã có lỗi kết nối khi sáng tác truyện.";
      setErrorMessage(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  const isCurrentSaved = savedStories.some((s) => s.id === currentStory.id);

  const handleToggleSave = (storyToSave: GeneratedStory) => {
    setSavedStories((prev) => {
      const exists = prev.some((item) => item.id === storyToSave.id);
      if (exists) {
        return prev.filter((item) => item.id !== storyToSave.id);
      }
      return [storyToSave, ...prev];
    });
  };

  const handleSelectSavedStory = (story: GeneratedStory) => {
    setCurrentStory(story);
    setIsSampleStory(false);
    setErrorMessage(null);
    const el = document.getElementById("atelier");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleDeleteSavedStory = (id: string) => {
    setSavedStories((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNewStoryClick={scrollToAtelier} />

      <main className="flex-1">
        <HeroSection
          isDark={isDark}
          onToggleTheme={() => setIsDark((prev) => !prev)}
          onStartWriting={scrollToAtelier}
        />

        <StoryAtelier
          nameInputRef={nameInputRef}
          formState={formState}
          onChangeForm={setFormState}
          onGenerate={handleGenerateStory}
          isGenerating={isGenerating}
          errorMessage={errorMessage}
          story={currentStory}
          isSampleStory={isSampleStory}
          isSaved={isCurrentSaved}
          onToggleSave={handleToggleSave}
          onOpenBedsideReader={() => setBedsideOpen(true)}
        />

        <StructureGuide />

        <StoryLibrary
          stories={savedStories}
          activeStoryId={currentStory.id}
          onSelectStory={handleSelectSavedStory}
          onDeleteStory={handleDeleteSavedStory}
        />
      </main>

      <footer className="border-t border-stone-300/60 dark:border-slate-800/80 py-8">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p className="font-display text-sm text-slate-700 dark:text-slate-300">
            Bà Tiên Giấc Ngủ
          </p>
          <p>
            Mỗi câu chuyện viết riêng cho một giấc mơ êm ái của trẻ thơ.
          </p>
        </div>
      </footer>

      <BedsideReaderModal
        story={currentStory}
        isOpen={bedsideOpen}
        onClose={() => setBedsideOpen(false)}
      />
    </div>
  );
}
