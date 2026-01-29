
import { DailyScenario, RandomEvent } from './types';

export const INITIAL_TOTAL = 200000;
export const TOTAL_DAYS = 7;

export const DAYS_OF_WEEK = [
  'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'
];

export const SCENARIOS: DailyScenario[] = [
  {
    day: 1,
    question: "Ngày đầu tuần năng lượng, bạn định ăn sáng thế nào?",
    option1: { label: "Bánh mì dân tổ 15k", description: "Vừa rẻ vừa no bụng", cost: 15000, category: 'essential' },
    option2: { label: "Bát phở tái lăn 45k", description: "Tự thưởng đầu tuần xịn xò", cost: 45000, category: 'hobbies' }
  },
  {
    day: 2,
    question: "Tiết thể dục nóng nực, bạn muốn giải khát bằng gì?",
    option1: { label: "Nước lọc mang theo", description: "Tiết kiệm 100%", cost: 0, category: 'essential' },
    option2: { label: "Ly trà sữa trân châu 35k", description: "Sảng khoái tức thì", cost: 35000, category: 'hobbies' }
  },
  {
    day: 3,
    question: "Bạn phát hiện ra bộ đồ dùng học tập mới rất đẹp!",
    option1: { label: "Chỉ mua bút bi 5k", description: "Mua thứ thực sự cần", cost: 5000, category: 'essential' },
    option2: { label: "Mua cả set 40k", description: "Ghi chép thêm cảm hứng", cost: 40000, category: 'hobbies' }
  },
  {
    day: 4,
    question: "Chiều nay tan học sớm, bạn định đi đâu?",
    option1: { label: "Về nhà đọc sách", description: "Bình yên và miễn phí", cost: 0, category: 'essential' },
    option2: { label: "Vào net cùng bạn 20k", description: "Giải trí một chút", cost: 20000, category: 'hobbies' }
  },
  {
    day: 5,
    question: "Sắp tới sinh nhật mẹ, bạn định chuẩn bị gì?",
    option1: { label: "Tự tay làm thiệp", description: "Tấm lòng là chính", cost: 5000, category: 'essential' },
    option2: { label: "Mua bó hoa nhỏ 50k", description: "Tặng mẹ niềm vui bất ngờ", cost: 50000, category: 'hobbies' }
  },
  {
    day: 6,
    question: "Thứ Bảy máu chảy về đâu? Bạn muốn đi chơi không?",
    option1: { label: "Đi bộ ra công viên", description: "Hít thở khí trời", cost: 0, category: 'essential' },
    option2: { label: "Đi xem phim 80k", description: "Bom tấn mới ra mắt", cost: 80000, category: 'hobbies' }
  },
  {
    day: 7,
    question: "Chủ Nhật cuối tuần, bữa tối của bạn là...",
    option1: { label: "Cơm nhà mẹ nấu", description: "Vừa ngon vừa ấm cúng", cost: 0, category: 'essential' },
    option2: { label: "Order gà rán 65k", description: "Party cuối tuần tại gia", cost: 65000, category: 'hobbies' }
  }
];

export const EVENTS: RandomEvent[] = [
  { description: 'Xe đạp bị hỏng xích giữa đường.', amount: -20000, type: 'bad' },
  { description: 'Nhặt được 10k rơi ở sân trường.', amount: 10000, type: 'good' },
  { description: 'Phát sinh quỹ hội khỏe phù đổng.', amount: -15000, type: 'bad' },
  { description: 'Bà ngoại sang chơi cho tiền ăn quà.', amount: 40000, type: 'good' },
  { description: 'Lỡ tay làm mất chiếc tẩy mới mua.', amount: -5000, type: 'bad' },
  { description: 'Anh trai trả nợ tiền mua hộ đồ.', amount: 25000, type: 'good' },
  { description: 'Mua hộ đồ cho cô và được giữ tiền thừa.', amount: 15000, type: 'good' },
  { description: 'Bị hỏng bút mực, phải mua ngòi mới.', amount: -10000, type: 'bad' },
  { description: 'Bạn khao một phong kẹo cao su.', amount: 0, type: 'neutral' },
  { description: 'Trời mưa phải mua áo mưa nilon.', amount: -10000, type: 'bad' },
  { description: 'Được điểm 10, bố thưởng nóng!', amount: 30000, type: 'good' },
  { description: 'Quên không mang mũ bảo hiểm, bị phạt nhẹ.', amount: -20000, type: 'bad' },
  { description: 'Nhận được quà từ người bạn phương xa.', amount: 0, type: 'neutral' },
  { description: 'Tìm thấy tiền lẻ trong túi áo cũ.', amount: 5000, type: 'good' },
  { description: 'Bị hỏng quai dép tổ ong.', amount: -15000, type: 'bad' },
  { description: 'Hôm nay là một ngày thật bình yên.', amount: 0, type: 'neutral' }
];
