import { StoryImage } from "./StoryImage";

const FOUR_ACTS = [
  {
    step: "Đoạn 01",
    heading: "Bước vào thế giới phép thuật",
    detail:
      "Mở đầu bằng khung cảnh dịu dàng, thân thiện với lứa tuổi của bé. Tên bé xuất hiện ngay như nhân vật chính bước vào một thế giới lấp lánh đom đóm, mây bông hoặc ánh trăng.",
  },
  {
    step: "Đoạn 02",
    heading: "Thử thách ẩn dụ thay lời phán xét",
    detail:
      "Sự kiện ban ngày (cáu gắt, nấn ná chưa chịu ngủ, ngại chia sẻ...) được hóa thân thành một chú thú nhỏ hoặc đám mây nhỏ đang lúng túng. Không có lời trách móc nào.",
  },
  {
    step: "Đoạn 03",
    heading: "Bí mật hoặc vật phẩm ma thuật",
    detail:
      "Bé tự khám phá một vật phẩm dịu kỳ — như chiếc lọ đựng sương trăng hay hạt bồ công anh bạc — để giúp bạn nhỏ trong truyện vượt qua thử thách một cách êm ái.",
  },
  {
    step: "Đoạn 04",
    heading: "Lời ru chậm rãi khép mi mắt",
    detail:
      "Câu văn dài hơn, nhịp chậm xuống như hơi thở đều. Mọi hình ảnh chuyển về tĩnh lặng trước khi khép lại bằng câu kết cố định gợi nụ cười bình yên.",
  },
];

const SAFETY_RULES = [
  "Tuyệt đối không dùng yếu tố kinh dị, bóng tối dọa nạt hay bạo lực.",
  "Tên riêng của bé luôn xuất hiện tự nhiên ít nhất 3 lần trong câu chuyện.",
  "Mọi hành vi chưa ngoan đều được ôm ấp qua ẩn dụ, không nói thẳng \"con hư\".",
  "Đoạn kết giữ âm điệu thì thầm, giúp nhịp tim và hơi thở của bé lắng dịu.",
];

export function StructureGuide() {
  return (
    <section
      id="structure"
      className="py-14 lg:py-20 border-b border-stone-300/60 dark:border-slate-800/80"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 space-y-16">
        {/* Part 1: 4-Paragraph Rhythm + Secret Item Artwork */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-5">
            <div className="h-full min-h-[280px] rounded-2xl overflow-hidden border border-stone-300/70 dark:border-slate-800 bg-[#131a2e]">
              <StoryImage
                src="/src/assets/images/storybook_lantern_secret_1795254831925.jpg"
                alt="Minh họa lọ thủy tinh đựng ánh sao và hoa bồ công anh bạc trong khu rừng đêm"
                caption="Vật phẩm bí mật trong rừng đêm"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center">
            <p className="text-xs font-medium text-[#a36c1b] dark:text-[#e6b86a] tracking-wide mb-2">
              Nghệ thuật kể chuyện trước giờ ngủ
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-[#f5efe6] [text-wrap:balance] mb-8">
              Nhịp điệu 4 đoạn đưa cảm xúc ban ngày về bến bình yên
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
              {FOUR_ACTS.map((act) => (
                <div
                  key={act.step}
                  className="pt-4 border-t border-stone-300/70 dark:border-slate-800"
                >
                  <div className="text-xs font-medium text-[#a36c1b] dark:text-[#e6b86a] tabular-nums mb-1">
                    {act.step}
                  </div>
                  <h3 className="font-display text-base font-semibold text-slate-900 dark:text-[#f5efe6] mb-1.5">
                    {act.heading}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {act.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Part 2: Parent Guide & 4 Constraints + Dream Boat Artwork */}
        <div
          id="guide"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch pt-4"
        >
          <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1">
            <p className="text-xs font-medium text-[#a36c1b] dark:text-[#e6b86a] tracking-wide mb-2">
              Góc phụ huynh · Cam kết an toàn tâm lý
            </p>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900 dark:text-[#f5efe6] [text-wrap:balance] mb-5">
              Vì sao truyện ẩn dụ dịu dàng hơn lời nhắc nhở lúc nửa đêm?
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300/90 leading-relaxed mb-6">
              Trước giờ ngủ, vùng cảm xúc của trẻ nhỏ rất nhạy cảm. Khi phụ huynh đọc lên một câu chuyện cổ tích mà nhân vật chính mang tên con, bé được tự giải quyết vấn đề trong không gian an toàn tuyệt đối mà không cảm thấy bị phê bình.
            </p>

            <ul className="space-y-3 border-t border-stone-300/70 dark:border-slate-800 pt-5">
              {SAFETY_RULES.map((rule, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                >
                  <span className="text-xs font-semibold tabular-nums text-[#a36c1b] dark:text-[#e6b86a] mt-0.5">
                    0{i + 1}.
                  </span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="h-full min-h-[260px] rounded-2xl overflow-hidden border border-stone-300/70 dark:border-slate-800 bg-[#131a2e]">
              <StoryImage
                src="/src/assets/images/storybook_dream_boat_1795254831660.jpg"
                alt="Minh họa con thuyền trăng khuyết chở em bé ngủ ngon trên mặt hồ lấp lánh sao đêm"
                caption="Con thuyền trăng khuyết trên hồ sao"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
