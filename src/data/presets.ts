import type { GeneratedStory, StoryPreset } from "../types/story";

export const WORLD_THEMES = [
  "Khu rừng đom đóm ánh trăng",
  "Thung lũng mây bông mềm",
  "Hồ trăng gương yên ả",
  "Ngôi làng đèn lồng giấy",
] as const;

export const DAYTIME_PRESETS: StoryPreset[] = [
  {
    id: "bedtime-delay",
    label: "Chưa muốn tắt TV đi ngủ",
    childName: "Đạt",
    childAge: 6,
    daytimeBehavior:
      "Buổi tối bé cứ nấn ná chưa chịu tắt tivi để lên giường đi ngủ, dù mắt đã bắt đầu dụi nhẹ.",
    worldTheme: "Khu rừng đom đóm ánh trăng",
  },
  {
    id: "frustration-blocks",
    label: "Cáu gắt khi xếp hình bị đổ",
    childName: "Đạt",
    childAge: 6,
    daytimeBehavior:
      "Ban ngày bé tức giận và ném khối gỗ khi tòa tháp xếp hình mãi không đứng vững.",
    worldTheme: "Thung lũng mây bông mềm",
  },
  {
    id: "sharing-toys",
    label: "Ngại chia sẻ đồ chơi với bạn",
    childName: "Minh Anh",
    childAge: 5,
    daytimeBehavior:
      "Ở lớp bé ôm chặt chiếc ô tô yêu thích và không muốn cho bạn chơi cùng.",
    worldTheme: "Ngôi làng đèn lồng giấy",
  },
  {
    id: "dark-room",
    label: "Hơi hồi hộp khi ngủ phòng riêng",
    childName: "Bông",
    childAge: 6,
    daytimeBehavior:
      "Bé mới tập ngủ giường riêng nên còn hơi bồn chồn mỗi khi đèn phòng tắt bớt.",
    worldTheme: "Hồ trăng gương yên ả",
  },
];

export const INITIAL_SAMPLE_STORY: GeneratedStory = {
  id: "sample-dat-6",
  createdAt: "2026-11-21T20:30:00.000Z",
  childName: "Đạt",
  childAge: 6,
  daytimeBehavior:
    "Buổi tối Đạt cứ nấn ná chưa chịu tắt tivi để lên giường đi ngủ, dù mắt đã bắt đầu dụi nhẹ.",
  worldTheme: "Khu rừng đom đóm ánh trăng",
  title: "🌙 TRUYỆN CHÚC NGỦ NGON CHO ĐẠT",
  paragraphs: [
    "Khi vầng trăng bạc vừa treo lên ngọn thông cao, cậu bé Đạt bước chân vào Khu Rừng Đom Đóm lấp lánh ánh vàng. Ở nơi ấy, những chiếc lá dương xỉ khẽ ngân nga như phím đàn và từng ngọn gió đêm thơm dịu mùi hoa bưởi. Các bạn sóc nhỏ đã khoác lên mình chiếc áo choàng rêu mềm để chuẩn bị cho chuyến tàu giấc mơ. Chỉ riêng Đạt vẫn còn háo hức nhìn theo những tia sáng rực rỡ nhảy múa trên mặt hồ chưa muốn rời bước.",
    "Chẳng bao lâu, Đạt gặp một chú đom đóm nhỏ tên là Tia Nắng cứ bay vòng quanh bông hoa chuông mà không chịu đậu xuống nghỉ. Tia Nắng sợ rằng nếu mình khép đôi cánh phát sáng lại, khu rừng sẽ bỏ lỡ mất một điệu nhảy thật vui. Thế nhưng bay mãi khiến đôi cánh nhỏ của chú dần trĩu xuống, còn ánh sáng vàng cũng nhòe đi trong làn sương mỏng. Nhìn Tia Nắng cứ cố mở to đôi mắt tròn xoe dù đã mỏi mệt, Đạt bỗng thấy lòng mình khẽ chùng lại thật dịu.",
    "Đúng lúc ấy, Bà Tiên Giấc Ngủ thả xuống tay Đạt một chiếc lọ thủy tinh nhỏ đựng đầy sương trăng mát lành. Bà khẽ bảo rằng những ánh sáng đẹp nhất không hề biến mất khi màn đêm buông, chúng chỉ nép vào bên trong chiếc lọ để ủ ấm cho ngày mai rực rỡ hơn. Đạt nhẹ nhàng nâng chiếc lọ lên, giúp Tia Nắng cất tia sáng cuối cùng vào giấc ngủ an lành trên cánh hoa. Lập tức, những hạt bụi sao dịu êm tỏa ra, ôm lấy bờ vai Đạt như một tấm chăn bông ấm áp.",
    "Khu rừng giờ đây chỉ còn tiếng suối chảy thật khẽ và nhịp thở đều đặn của cỏ cây đang say giấc. Đạt bước lên chiếc gối rêu êm ái, lắng nghe tiếng gió thì thầm từng lời ru thật chậm bên tai. Đôi mắt của Đạt dần trở nên nhẹ bỗng, ấm áp và bình yên dưới ánh đèn lồng vàng dịu. Cả bầu trời sao nghiêng mình thật thấp, giữ lại mọi giấc mơ ngọt ngào nhất cho riêng Đạt đêm nay.",
  ],
  closingLine: '✨ "Và Đạt mỉm cười, khẽ nhắm mắt lại..."',
  magicalObject: "Chiếc lọ thủy tinh đựng sương trăng",
  metaphorNote:
    "Sự nuối tiếc niềm vui cuối ngày được gửi gắm qua hình ảnh chú đom đóm chưa muốn khép cánh; chiếc lọ sương trăng giúp bé hiểu rằng dừng lại nghỉ ngơi chính là cách giữ gìn niềm vui cho ngày mai.",
  worldTitle: "Khu Rừng Đom Đóm ánh trăng",
  nameCount: 8,
  formattedText:
    '🌙 TRUYỆN CHÚC NGỦ NGON CHO ĐẠT\n\nKhi vầng trăng bạc vừa treo lên ngọn thông cao, cậu bé Đạt bước chân vào Khu Rừng Đom Đóm lấp lánh ánh vàng. Ở nơi ấy, những chiếc lá dương xỉ khẽ ngân nga như phím đàn và từng ngọn gió đêm thơm dịu mùi hoa bưởi. Các bạn sóc nhỏ đã khoác lên mình chiếc áo choàng rêu mềm để chuẩn bị cho chuyến tàu giấc mơ. Chỉ riêng Đạt vẫn còn háo hức nhìn theo những tia sáng rực rỡ nhảy múa trên mặt hồ chưa muốn rời bước.\n\nChẳng bao lâu, Đạt gặp một chú đom đóm nhỏ tên là Tia Nắng cứ bay vòng quanh bông hoa chuông mà không chịu đậu xuống nghỉ. Tia Nắng sợ rằng nếu mình khép đôi cánh phát sáng lại, khu rừng sẽ bỏ lỡ mất một điệu nhảy thật vui. Thế nhưng bay mãi khiến đôi cánh nhỏ của chú dần trĩu xuống, còn ánh sáng vàng cũng nhòe đi trong làn sương mỏng. Nhìn Tia Nắng cứ cố mở to đôi mắt tròn xoe dù đã mỏi mệt, Đạt bỗng thấy lòng mình khẽ chùng lại thật dịu.\n\nĐúng lúc ấy, Bà Tiên Giấc Ngủ thả xuống tay Đạt một chiếc lọ thủy tinh nhỏ đựng đầy sương trăng mát lành. Bà khẽ bảo rằng những ánh sáng đẹp nhất không hề biến mất khi màn đêm buông, chúng chỉ nép vào bên trong chiếc lọ để ủ ấm cho ngày mai rực rỡ hơn. Đạt nhẹ nhàng nâng chiếc lọ lên, giúp Tia Nắng cất tia sáng cuối cùng vào giấc ngủ an lành trên cánh hoa. Lập tức, những hạt bụi sao dịu êm tỏa ra, ôm lấy bờ vai Đạt như một tấm chăn bông ấm áp.\n\nKhu rừng giờ đây chỉ còn tiếng suối chảy thật khẽ và nhịp thở đều đặn của cỏ cây đang say giấc. Đạt bước lên chiếc gối rêu êm ái, lắng nghe tiếng gió thì thầm từng lời ru thật chậm bên tai. Đôi mắt của Đạt dần trở nên nhẹ bỗng, ấm áp và bình yên dưới ánh đèn lồng vàng dịu. Cả bầu trời sao nghiêng mình thật thấp, giữ lại mọi giấc mơ ngọt ngào nhất cho riêng Đạt đêm nay.\n\n✨ "Và Đạt mỉm cười, khẽ nhắm mắt lại..."',
};
