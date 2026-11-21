import { Moon, Sun } from "lucide-react";
import { StoryImage } from "./StoryImage";

interface HeroSectionProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onStartWriting: () => void;
}

const FOUR_PILLARS = [
  {
    index: "01",
    title: "Thế giới phép thuật",
    desc: "Đưa tên bé vào không gian cổ tích êm dịu phù hợp đúng độ tuổi.",
  },
  {
    index: "02",
    title: "Ẩn dụ không phán xét",
    desc: "Chuyển hóa sự kiện ban ngày thành thử thách nhẹ nhàng, không răn đe.",
  },
  {
    index: "03",
    title: "Vật phẩm bí mật",
    desc: "Bé tự tìm ra cách vượt qua bằng một phép màu ấm áp.",
  },
  {
    index: "04",
    title: "Lời ru khép mắt",
    desc: "Nhịp văn chậm dần ở đoạn cuối, thì thầm đưa bé vào giấc ngủ sâu.",
  },
];

export function HeroSection({
  isDark,
  onToggleTheme,
  onStartWriting,
}: HeroSectionProps) {
  return (
    <section id="top" className="border-b border-stone-300/60 dark:border-slate-800/80">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 pt-10 pb-12 lg:pt-14 lg:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-7 flex flex-col justify-between py-2">
            <div>
              <p className="text-xs sm:text-sm font-medium text-[#a36c1b] dark:text-[#e6b86a] tracking-wide mb-4">
                Truyện cổ tích trị liệu trước giờ ngủ · Viết riêng cho từng bé
              </p>

              <h1 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-[#f5efe6] leading-[1.15] [text-wrap:balance] max-w-2xl">
                Mỗi đêm một câu chuyện độc nhất, dỗ dành giấc mơ riêng của con.
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300/90 leading-relaxed max-w-[62ch]">
                Phụ huynh chỉ cần gửi lại tên bé, độ tuổi và một sự kiện nhỏ ban ngày. Bà Tiên Giấc Ngủ sẽ dệt nên bốn đoạn cổ tích êm ái, chuyển hóa nhẹ nhàng cảm xúc của con qua ẩn dụ dịu dàng trước khi tắt đèn.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onStartWriting}
                className="px-6 py-3 rounded-lg bg-[#c98a2c] dark:bg-[#e6b86a] text-white dark:text-[#0b1020] font-medium text-sm sm:text-base hover:bg-[#b57a22] dark:hover:bg-[#f0c77e] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                Kể chuyện cho bé ngay
              </button>

              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={isDark ? "Chuyển sang nền giấy ấm" : "Chuyển sang chế độ đọc đêm"}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg border border-stone-300 dark:border-slate-700 bg-white/60 dark:bg-[#131a2e] text-slate-800 dark:text-slate-200 text-sm font-medium hover:bg-white dark:hover:bg-[#19233d] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-[#e6b86a]" />
                    <span>Chế độ Sách giấy</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-[#a36c1b]" />
                    <span>Chế độ Đọc đêm</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="h-full min-h-[280px] lg:min-h-[380px] rounded-2xl overflow-hidden border border-stone-300/70 dark:border-slate-800 bg-[#131a2e]">
              <StoryImage
                src="/src/assets/images/storybook_cover_moon_1795254830982.jpg"
                alt="Minh họa cổ tích chiếc đèn lồng bay trên mái nhà yên ngủ dưới ánh trăng khuyết"
                caption="Chiếc đèn lồng cổ tích dưới trăng"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-stone-300/60 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FOUR_PILLARS.map((pillar) => (
            <div key={pillar.index} className="space-y-1.5">
              <div className="text-xs font-medium text-[#a36c1b] dark:text-[#e6b86a] tabular-nums">
                {pillar.index}. {pillar.title}
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
