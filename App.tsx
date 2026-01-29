
import React, { useState, useEffect, useMemo } from 'react';
import { 
  GameStatus, 
  Jars, 
  DailyScenario, 
  RandomEvent, 
  LogEntry 
} from './types';
import { 
  INITIAL_TOTAL, 
  TOTAL_DAYS, 
  DAYS_OF_WEEK, 
  SCENARIOS, 
  EVENTS 
} from './constants';

const App: React.FC = () => {
  const [status, setStatus] = useState<GameStatus>(GameStatus.START);
  const [day, setDay] = useState<number>(1);
  const [jars, setJars] = useState<Jars>({ essential: 80000, hobbies: 70000, savings: 50000 });
  const [initialBudget, setInitialBudget] = useState<Jars | null>(null);
  const [history, setHistory] = useState<LogEntry[]>([]);
  const [currentEvent, setCurrentEvent] = useState<LogEntry | null>(null);
  const [showEvent, setShowEvent] = useState<boolean>(false);

  const totalAllocated = jars.essential + jars.hobbies + jars.savings;
  const isBudgetValid = totalAllocated === INITIAL_TOTAL;

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  const startBudgeting = () => setStatus(GameStatus.BUDGETING);

  const confirmBudget = () => {
    if (isBudgetValid) {
      setInitialBudget({ ...jars });
      startDayTransition(1);
    }
  };

  const startDayTransition = (nextDay: number) => {
    setDay(nextDay);
    setStatus(GameStatus.TRANSITION);
    setTimeout(() => setStatus(GameStatus.PLAYING), 1200);
  };

  const handleChoice = (option: { label: string, cost: number, category: keyof Jars }) => {
    const tempJars = { ...jars };
    tempJars[option.category] -= option.cost;

    const event = EVENTS[Math.floor(Math.random() * EVENTS.length)];
    let eventAmt = event.amount;

    if (eventAmt < 0) {
      let costToCover = Math.abs(eventAmt);
      if (tempJars.savings >= costToCover) {
        tempJars.savings -= costToCover;
      } else {
        costToCover -= tempJars.savings;
        tempJars.savings = 0;
        if (tempJars.essential >= costToCover) {
          tempJars.essential -= costToCover;
        } else {
          costToCover -= tempJars.essential;
          tempJars.essential = 0;
          tempJars.hobbies -= costToCover;
        }
      }
    } else {
      tempJars.savings += eventAmt;
    }

    const log: LogEntry = {
      day,
      choiceLabel: option.label,
      choiceCost: option.cost,
      choiceCategory: option.category,
      eventDescription: event.description,
      eventAmount: event.amount,
      jarsAfter: { ...tempJars }
    };

    setCurrentEvent(log);
    setShowEvent(true);
  };

  const proceed = () => {
    if (!currentEvent) return;
    setJars(currentEvent.jarsAfter);
    setHistory(prev => [currentEvent, ...prev]);
    setShowEvent(false);

    if (day < TOTAL_DAYS) {
      startDayTransition(day + 1);
    } else {
      setStatus(GameStatus.SUMMARY);
    }
  };

  const totalBalance = jars.essential + jars.hobbies + jars.savings;

  const getAdvice = useMemo(() => {
    if (totalBalance < 0) return "Bạn đã chi tiêu quá đà và rơi vào cảnh nợ nần. Hãy học cách tiết chế nhu cầu cá nhân nhé!";
    if (jars.savings > (initialBudget?.savings || 0)) return "Bạn quản lý tài chính rất tốt! Không chỉ sống sót mà còn làm giàu thêm hũ tiết kiệm.";
    if (jars.essential < 0) return "Bạn đã để thói quen tiêu xài ảnh hưởng đến các nhu cầu cơ bản. Đây là một cảnh báo đỏ!";
    return "Bạn đã hoàn thành thử thách! Hãy chú ý hơn đến việc cân đối các hũ tiền trong tương lai.";
  }, [totalBalance, jars, initialBudget]);

  const JarCard = ({ name, amount, color, icon, initial }: { name: string, amount: number, color: string, icon: string, initial: number }) => {
    const fillPercent = Math.max(0, Math.min(100, (amount / initial) * 100));
    return (
      <div className="flex-1 bg-white rounded-3xl p-4 shadow-lg border-2 border-slate-50 flex flex-col items-center gap-3 relative overflow-hidden group">
        <div className={`absolute bottom-0 left-0 right-0 ${color} opacity-10 liquid-fill`} style={{ height: `${fillPercent}%` }} />
        <div className="text-4xl group-hover:scale-125 transition-transform duration-300 z-10">{icon}</div>
        <div className="text-center z-10">
          <div className="text-[10px] font-black uppercase text-slate-400 tracking-tighter">{name}</div>
          <div className={`text-sm font-black ${amount < 0 ? 'text-red-500' : 'text-slate-800'}`}>
            {formatMoney(amount)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center">
      <div className="max-w-6xl w-full bg-white/40 backdrop-blur-md rounded-[3rem] p-4 md:p-8 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.1)] border border-white/50 aspect-16-9-container flex flex-col md:flex-row gap-8">
        
        {/* Left/Main Side: Game Content */}
        <div className="flex-[2] flex flex-col relative bg-white rounded-[2.5rem] shadow-xl overflow-hidden border-4 border-white">
          
          {/* Progress Bar Top */}
          {(status === GameStatus.PLAYING || status === GameStatus.BUDGETING) && (
            <div className="absolute top-0 left-0 right-0 h-2 flex gap-1 z-20">
              {Array.from({ length: TOTAL_DAYS }).map((_, i) => (
                <div key={i} className={`flex-1 transition-colors duration-500 ${i + 1 < day ? 'bg-green-400' : i + 1 === day ? 'bg-sky-500 animate-pulse' : 'bg-slate-100'}`} />
              ))}
            </div>
          )}

          {/* Transition Screen */}
          {status === GameStatus.TRANSITION && (
            <div className="absolute inset-0 z-50 bg-sky-600 flex flex-col items-center justify-center text-white p-8">
              <div className="text-6xl mb-6 floating">📅</div>
              <h2 className="text-5xl font-black mb-2">{DAYS_OF_WEEK[day - 1]}</h2>
              <p className="text-sky-100 font-bold opacity-80">Mở mắt ra thôi Nam ơi!</p>
            </div>
          )}

          {/* Start Screen */}
          {status === GameStatus.START && (
            <div className="flex-1 p-12 flex flex-col items-center justify-center text-center gap-8 animate-in zoom-in duration-500">
              <div className="relative">
                <div className="text-9xl floating">🎒</div>
                <div className="absolute -top-4 -right-4 bg-yellow-400 text-white p-4 rounded-full shadow-lg border-4 border-white font-black">
                  Lớp 7
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-4xl font-black text-slate-800">Thử Thách Quản Lý 200K</h2>
                <p className="text-slate-500 text-lg leading-relaxed max-w-lg mx-auto">
                  Chào mừng Nam đến với thử thách tài chính đầu đời! Bạn có 7 ngày và 200.000đ. Hãy học cách cân đối chi tiêu và tiết kiệm nhé!
                </p>
              </div>
              <button onClick={startBudgeting} className="w-full max-w-sm py-5 bg-sky-500 hover:bg-sky-600 text-white rounded-3xl font-black text-2xl shadow-2xl shadow-sky-200 transition-all active:scale-95">
                BẮT ĐẦU NGAY!
              </button>
            </div>
          )}

          {/* Budgeting Screen */}
          {status === GameStatus.BUDGETING && (
            <div className="flex-1 p-8 md:p-12 flex flex-col gap-8 overflow-y-auto">
              <div className="text-center">
                <h2 className="text-3xl font-black mb-2">Lập Kế Hoạch Tuần</h2>
                <p className="text-slate-400 font-bold uppercase text-xs tracking-widest italic">Chia hũ tiền của bạn ngay nào</p>
              </div>

              <div className="grid gap-6">
                {[
                  { id: 'essential', label: 'Hũ Thiết Yếu (Ăn, Đi lại)', icon: '🍚', color: 'accent-emerald-500', bg: 'bg-emerald-50' },
                  { id: 'hobbies', label: 'Hũ Sở Thích (Chơi, Quà)', icon: '🎮', color: 'accent-pink-500', bg: 'bg-pink-50' },
                  { id: 'savings', label: 'Hũ Tiết Kiệm (Dự phòng)', icon: '💰', color: 'accent-amber-500', bg: 'bg-amber-50' }
                ].map((item) => (
                  <div key={item.id} className={`${item.bg} p-6 rounded-[2rem] border-2 border-white shadow-sm space-y-4 transition-transform hover:scale-[1.02]`}>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{item.icon}</span>
                        <span className="font-black text-slate-700">{item.label}</span>
                      </div>
                      <span className="text-xl font-black text-slate-900">{formatMoney(jars[item.id as keyof Jars])}</span>
                    </div>
                    <input 
                      type="range" min="0" max="200000" step="5000"
                      value={jars[item.id as keyof Jars]}
                      onChange={(e) => setJars({...jars, [item.id]: parseInt(e.target.value)})}
                      className={`w-full h-3 bg-white rounded-full appearance-none cursor-pointer shadow-inner ${item.color}`}
                    />
                  </div>
                ))}
              </div>

              <div className={`p-6 rounded-3xl border-4 flex items-center justify-between mt-auto ${isBudgetValid ? 'bg-green-500 border-green-200 text-white' : 'bg-red-50 border-red-200 text-red-600'}`}>
                <div>
                  <div className="text-xs font-black uppercase opacity-70">Tổng cộng phân bổ</div>
                  <div className="text-3xl font-black">{formatMoney(totalAllocated)}</div>
                </div>
                {isBudgetValid ? (
                  <button onClick={confirmBudget} className="bg-white text-green-600 px-8 py-4 rounded-2xl font-black text-lg shadow-xl hover:scale-105 active:scale-95 transition-all">
                    XÁC NHẬN ✅
                  </button>
                ) : (
                  <div className="text-right font-black max-w-[150px] leading-tight text-sm">
                    {totalAllocated > INITIAL_TOTAL ? 'Vượt quá 200k rồi!' : 'Vẫn còn tiền chưa chia!'}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Playing Screen */}
          {status === GameStatus.PLAYING && !showEvent && (
            <div className="flex-1 p-8 md:p-12 flex flex-col gap-8 animate-in fade-in duration-500">
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 bg-sky-100 rounded-[2rem] flex items-center justify-center text-5xl shadow-inner border-4 border-white">
                  👦
                </div>
                <div className="space-y-1">
                  <div className="text-sky-500 font-black uppercase text-sm tracking-widest">{DAYS_OF_WEEK[day - 1]}</div>
                  <h2 className="text-3xl font-black text-slate-800 leading-tight">{SCENARIOS[day - 1].question}</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">
                {[SCENARIOS[day - 1].option1, SCENARIOS[day - 1].option2].map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleChoice(opt)}
                    className={`relative p-8 rounded-[2.5rem] border-4 border-slate-50 text-left transition-all hover:scale-[1.03] hover:shadow-2xl active:scale-95 group overflow-hidden ${opt.category === 'essential' ? 'bg-emerald-50 hover:border-emerald-400' : 'bg-rose-50 hover:border-rose-400'}`}
                  >
                    <div className="absolute top-4 right-4 text-4xl opacity-10 group-hover:opacity-100 group-hover:rotate-12 transition-all">
                      {opt.category === 'essential' ? '🍚' : '🎮'}
                    </div>
                    <div className="flex flex-col h-full justify-between gap-4">
                      <div>
                        <div className={`text-xs font-black uppercase tracking-widest mb-1 ${opt.category === 'essential' ? 'text-emerald-500' : 'text-rose-500'}`}>
                          Dùng hũ {opt.category === 'essential' ? 'Thiết yếu' : 'Sở thích'}
                        </div>
                        <div className="text-2xl font-black text-slate-800 mb-2">{opt.label}</div>
                        <p className="text-slate-500 text-sm italic">{opt.description}</p>
                      </div>
                      <div className="text-2xl font-black text-red-600">
                        -{formatMoney(opt.cost)}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Event Overlay */}
          {showEvent && currentEvent && (
            <div className="flex-1 p-12 bg-amber-50 flex flex-col items-center justify-center text-center gap-8 animate-in zoom-in-95 duration-300">
              <div className="text-9xl floating">
                {currentEvent.eventAmount > 0 ? '🎁' : currentEvent.eventAmount < 0 ? '💥' : '🔔'}
              </div>
              <div className="space-y-4 max-w-md">
                <div className="inline-block bg-amber-400 text-white px-6 py-2 rounded-full font-black uppercase tracking-widest shadow-lg">
                  BIẾN CỐ BẤT NGỜ!
                </div>
                <h2 className="text-3xl font-black text-slate-800 leading-tight">"{currentEvent.eventDescription}"</h2>
              </div>
              
              <div className="bg-white p-8 rounded-[2.5rem] border-4 border-amber-200 shadow-xl w-full max-w-sm">
                <div className="text-xs font-black text-slate-400 uppercase mb-2 tracking-widest">Biến động ví</div>
                <div className={`text-4xl font-black ${currentEvent.eventAmount >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {currentEvent.eventAmount === 0 ? 'Mọi thứ vẫn ổn' : (currentEvent.eventAmount > 0 ? '+' : '-') + formatMoney(Math.abs(currentEvent.eventAmount))}
                </div>
              </div>

              <button onClick={proceed} className="w-full max-w-sm py-5 bg-slate-900 hover:bg-slate-800 text-white rounded-3xl font-black text-xl shadow-2xl active:scale-95 transition-all">
                TIẾP TỤC ĐI TIẾP
              </button>
            </div>
          )}

          {/* Summary Screen */}
          {status === GameStatus.SUMMARY && (
            <div className="flex-1 p-12 flex flex-col items-center justify-center text-center gap-8 overflow-y-auto">
              <div className="text-9xl">
                {totalBalance > 0 ? '🎉' : '🥀'}
              </div>
              <div className="space-y-2">
                <h2 className="text-4xl font-black">Kết Thúc Hành Trình!</h2>
                <div className="text-5xl font-black text-sky-600 tabular-nums">{formatMoney(totalBalance)}</div>
              </div>
              
              <div className="bg-slate-50 p-8 rounded-[2.5rem] max-w-lg border-4 border-white shadow-inner">
                <p className="text-lg text-slate-600 italic leading-relaxed">"{getAdvice}"</p>
              </div>

              <div className="grid grid-cols-2 gap-6 w-full max-w-md">
                <div className="bg-white p-4 rounded-3xl shadow-md border-2 border-slate-100">
                  <div className="text-[10px] font-black text-slate-400 uppercase">Tiết kiệm dự định</div>
                  <div className="text-lg font-black">{formatMoney(initialBudget?.savings || 0)}</div>
                </div>
                <div className="bg-white p-4 rounded-3xl shadow-md border-2 border-slate-100">
                  <div className="text-[10px] font-black text-slate-400 uppercase">Tiết kiệm thực tế</div>
                  <div className={`text-lg font-black ${jars.savings >= (initialBudget?.savings || 0) ? 'text-green-600' : 'text-red-500'}`}>
                    {formatMoney(jars.savings)}
                  </div>
                </div>
              </div>

              <button onClick={() => window.location.reload()} className="w-full max-w-sm py-5 bg-sky-500 hover:bg-sky-600 text-white rounded-3xl font-black text-xl shadow-2xl transition-all">
                CHƠI LẠI TUẦN MỚI
              </button>
            </div>
          )}
        </div>

        {/* Right Side: Status Sidebar (Visible Play/Summary) */}
        {(status === GameStatus.PLAYING || status === GameStatus.SUMMARY || status === GameStatus.TRANSITION) && (
          <div className="hidden lg:flex flex-col w-80 gap-6 animate-in slide-in-from-right-8 duration-700">
            
            {/* Jars Section */}
            <div className="bg-white/60 p-6 rounded-[2.5rem] shadow-lg border border-white flex flex-col gap-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2 mb-2">Trạng thái hũ tiền</h3>
              <JarCard name="Thiết yếu" amount={jars.essential} initial={initialBudget?.essential || 1} color="bg-emerald-400" icon="🍚" />
              <JarCard name="Sở thích" amount={jars.hobbies} initial={initialBudget?.hobbies || 1} color="bg-rose-400" icon="🎮" />
              <JarCard name="Tiết kiệm" amount={jars.savings} initial={initialBudget?.savings || 1} color="bg-amber-400" icon="💰" />
            </div>

            {/* Mini Log Section */}
            <div className="bg-white/60 p-6 rounded-[2.5rem] shadow-lg border border-white flex-1 overflow-hidden flex flex-col">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest ml-2 mb-4">Lịch sử chi tiêu</h3>
              <div className="flex-1 overflow-y-auto pr-2 space-y-3 scrollbar-none">
                {history.length === 0 && <div className="text-slate-300 text-center py-8 italic text-sm">Chưa có hoạt động</div>}
                {history.map((h, i) => (
                  <div key={i} className="bg-white/80 p-4 rounded-2xl shadow-sm border border-slate-100 text-xs flex justify-between items-center animate-in fade-in">
                    <div>
                      <div className="font-black text-slate-400 uppercase text-[9px]">Ngày {h.day}</div>
                      <div className="font-bold text-slate-700 truncate w-32">{h.choiceLabel}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-slate-800">{formatMoney(h.jarsAfter.essential + h.jarsAfter.hobbies + h.jarsAfter.savings)}</div>
                      <div className="text-[9px] font-bold text-slate-400">CÒN LẠI</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Decorative Floating Background Elements */}
      <div className="fixed top-10 left-10 text-8xl opacity-10 floating pointer-events-none select-none">✏️</div>
      <div className="fixed bottom-10 right-10 text-8xl opacity-10 floating pointer-events-none select-none" style={{ animationDelay: '1s' }}>📓</div>
      <div className="fixed top-1/2 right-4 text-6xl opacity-10 floating pointer-events-none select-none" style={{ animationDelay: '1.5s' }}>📐</div>

      <style>{`
        .scrollbar-none::-webkit-scrollbar { display: none; }
        input[type='range']::-webkit-slider-thumb {
          appearance: none;
          width: 28px;
          height: 28px;
          background: white;
          border: 6px solid currentColor;
          border-radius: 50%;
          box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
          cursor: pointer;
          transition: transform 0.2s;
        }
        input[type='range']::-webkit-slider-thumb:hover { transform: scale(1.1); }
      `}</style>
    </div>
  );
};

export default App;
