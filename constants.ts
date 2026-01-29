
import { DailyScenario, RandomEvent } from './types';

export const INITIAL_TOTAL = 200000;
export const TOTAL_DAYS = 7;

export const DAYS_OF_WEEK = [
  'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'
];

export const SCENARIOS: DailyScenario[] = [
  {
    day: 1,
    question: "Sáng thứ Hai đầu tuần, bạn muốn ăn gì?",
    option1: { label: "Xôi gấc 15k", description: "Tiết kiệm & no lâu", cost: 15000, category: 'essential' },
    option2: { label: "Phở bò 45k", description: "Hào hứng đầu tuần", cost: 45000, category: 'hobbies' }
  },
  {
    day: 2,
    question: "Tan học, các bạn rủ đi uống trà sữa...",
    option1: { label: "Uống nước lọc", description: "Khỏe mạnh & miễn phí", cost: 0, category: 'essential' },
    option2: { label: "Trà sữa full topping", description: "Vui vẻ cùng bạn bè", cost: 35000, category: 'hobbies' }
  },
  {
    day: 3,
    question: "Bạn cần mua vở mới để ghi bài.",
    option1: { label: "Vở thường 10k", description: "Chất lượng đủ dùng", cost: 10000, category: 'essential' },
    option2: { label: "Vở lò xo xịn 30k", description: "Ghi chép cảm hứng hơn", cost: 30000, category: 'hobbies' }
  },
  {
    day: 4,
    question: "Trưa nay nắng gắt, bạn di chuyển thế nào?",
    option1: { label: "Đi bộ dưới bóng cây", description: "Rèn luyện sức bền", cost: 0, category: 'essential' },
    option2: { label: "Đi Grab cùng bạn", description: "Mát mẻ & nhanh chóng", cost: 25000, category: 'hobbies' }
  },
  {
    day: 5,
    question: "Tiệm sách có bán truyện tranh tập mới!",
    option1: { label: "Đọc ké bạn", description: "Chờ đợi là hạnh phúc", cost: 0, category: 'hobbies' },
    option2: { label: "Mua ngay 25k", description: "Sở hữu bộ sưu tập", cost: 25000, category: 'hobbies' }
  },
  {
    day: 6,
    question: "Chiều thứ Bảy rảnh rỗi, bạn làm gì?",
    option1: { label: "Ở nhà xem TV", description: "Bình yên & không tốn kém", cost: 0, category: 'essential' },
    option2: { label: "Đi xem phim 80k", description: "Giải trí cực đỉnh", cost: 80000, category: 'hobbies' }
  },
  {
    day: 7,
    question: "Chủ Nhật rồi, bạn muốn mua gì cho tối nay?",
    option1: { label: "Mì tôm 5k", description: "Dành tiền cho tuần sau", cost: 5000, category: 'essential' },
    option2: { label: "Gà rán 60k", description: "Thưởng cho bản thân", cost: 60000, category: 'hobbies' }
  }
];

export const EVENTS: RandomEvent[] = [
  { description: 'Xe đạp bị thủng lốp cần vá gấp.', amount: -20000, type: 'bad' },
  { description: 'Bạn nhặt được 20k trước cổng trường.', amount: 20000, type: 'good' },
  { description: 'Phải đóng quỹ lớp đột xuất cho phong trào.', amount: -30000, type: 'bad' },
  { description: 'Bà ngoại sang chơi và cho tiền ăn bánh.', amount: 50000, type: 'good' },
  { description: 'Lỡ tay làm hỏng bút của bạn, phải đền.', amount: -15000, type: 'bad' },
  { description: 'Được anh trai trả lại tiền mua hộ đồ hôm trước.', amount: 30000, type: 'good' },
  { description: 'Hôm nay trời đẹp, không có biến cố gì.', amount: 0, type: 'neutral' },
  { description: 'Bạn được khao một ly nước mía!', amount: 0, type: 'neutral' }
];
