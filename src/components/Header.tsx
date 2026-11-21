interface HeaderProps {
  onNewStoryClick: () => void;
}

export function Header({ onNewStoryClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-stone-300/60 dark:border-slate-800/80 bg-[#f6f1e7]/92 dark:bg-[#0b1020]/92 backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-8">
        <a
          href="#top"
          className="font-display text-lg sm:text-xl font-semibold tracking-tight text-slate-900 dark:text-[#f5efe6] whitespace-nowrap shrink-0"
        >
          Bà Tiên Giấc Ngủ
        </a>

        <nav
          aria-label="Điều hướng chính"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300"
        >
          <a
            href="#atelier"
            className="hover:text-slate-950 dark:hover:text-amber-200 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Sáng tác truyện
          </a>
          <a
            href="#structure"
            className="hover:text-slate-950 dark:hover:text-amber-200 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Nhịp 4 đoạn
          </a>
          <a
            href="#library"
            className="hover:text-slate-950 dark:hover:text-amber-200 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Tủ sách đêm
          </a>
          <a
            href="#guide"
            className="hover:text-slate-950 dark:hover:text-amber-200 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
          >
            Góc phụ huynh
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onNewStoryClick}
            className="px-4 py-2 text-xs sm:text-sm font-medium rounded-lg bg-[#c98a2c] dark:bg-[#e6b86a] text-white dark:text-[#0b1020] hover:bg-[#b57a22] dark:hover:bg-[#f0c77e] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
          >
            Viết truyện mới
          </button>
        </div>
      </div>
    </header>
  );
}
