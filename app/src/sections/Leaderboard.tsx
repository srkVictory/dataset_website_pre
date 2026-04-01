import { useState, useEffect, useRef } from 'react';
import { Trophy, TrendingUp, Calendar, ExternalLink } from 'lucide-react';

const leaderboardData = [
  { rank: 1, model: 'ChangeFormer', f1: 0.8912, iou: 0.8234, accuracy: 0.9456, date: '2024-01-15', affiliation: 'NJU' },
  { rank: 2, model: 'BIT', f1: 0.8756, iou: 0.8012, accuracy: 0.9321, date: '2024-01-14', affiliation: 'CAS' },
  { rank: 3, model: 'STAN', f1: 0.8634, iou: 0.7890, accuracy: 0.9234, date: '2024-01-13', affiliation: 'THU' },
  { rank: 4, model: 'IFN', f1: 0.8543, iou: 0.7789, accuracy: 0.9187, date: '2024-01-12', affiliation: 'PKU' },
  { rank: 5, model: 'SNUNet', f1: 0.8498, iou: 0.7723, accuracy: 0.9123, date: '2024-01-11', affiliation: 'ZJU' },
  { rank: 6, model: 'DSIFN', f1: 0.8421, iou: 0.7654, accuracy: 0.9089, date: '2024-01-10', affiliation: 'FDU' },
  { rank: 7, model: 'FC-EF', f1: 0.8345, iou: 0.7567, accuracy: 0.9012, date: '2024-01-09', affiliation: 'WHU' },
  { rank: 8, model: 'FC-Siam-conc', f1: 0.8289, iou: 0.7498, accuracy: 0.8956, date: '2024-01-08', affiliation: 'HUST' },
];

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
    case 2:
      return 'bg-gray-400/20 text-gray-300 border-gray-400/50';
    case 3:
      return 'bg-orange-600/20 text-orange-400 border-orange-600/50';
    default:
      return 'bg-[#161b22] text-[#b4bcd0] border-[#2a2d47]';
  }
};

export default function Leaderboard() {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedScores, setAnimatedScores] = useState<number[][]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate scores
          leaderboardData.forEach((entry, rowIndex) => {
            const targets = [entry.f1, entry.iou, entry.accuracy];
            targets.forEach((target, colIndex) => {
              let current = 0;
              const increment = target / 30;
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                setAnimatedScores((prev) => {
                  const newScores = [...prev];
                  if (!newScores[rowIndex]) newScores[rowIndex] = [];
                  newScores[rowIndex][colIndex] = current;
                  return newScores;
                });
              }, 30);
            });
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="leaderboard" ref={sectionRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title">Leaderboard</h2>
          <p className="section-subtitle">
            Top performing models on Geo-BeyondCaptioning benchmark
          </p>
        </div>

        {/* Leaderboard Table */}
        <div
          className={`overflow-hidden rounded-2xl border border-[#2a2d47]/50 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 p-4 bg-[#161b22] border-b border-[#2a2d47]/50 text-sm font-medium text-[#b4bcd0]">
            <div className="col-span-1 text-center">Rank</div>
            <div className="col-span-3">Model</div>
            <div className="col-span-2 text-center">F1-Score</div>
            <div className="col-span-2 text-center">IoU</div>
            <div className="col-span-2 text-center">Accuracy</div>
            <div className="col-span-2 text-center">Date</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-[#2a2d47]/30">
            {leaderboardData.map((entry, index) => (
              <div
                key={entry.model}
                className={`grid grid-cols-12 gap-4 p-4 items-center transition-all duration-500 hover:bg-[#4d6bfa]/5 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}
                style={{
                  transitionDelay: `${300 + index * 80}ms`,
                  transitionTimingFunction: 'var(--ease-out-expo)',
                }}
              >
                {/* Rank */}
                <div className="col-span-1 flex justify-center">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold border ${getRankStyle(
                      entry.rank
                    )}`}
                  >
                    {entry.rank}
                  </div>
                </div>

                {/* Model */}
                <div className="col-span-3">
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-white">{entry.model}</span>
                    {entry.rank <= 3 && (
                      <Trophy className="w-4 h-4 text-yellow-400" />
                    )}
                  </div>
                  <div className="text-xs text-[#b4bcd0]">{entry.affiliation}</div>
                </div>

                {/* F1-Score */}
                <div className="col-span-2 text-center">
                  <span className="text-[#4d6bfa] font-bold font-['Poppins']">
                    {((animatedScores[index]?.[0] || 0)).toFixed(4)}
                  </span>
                </div>

                {/* IoU */}
                <div className="col-span-2 text-center">
                  <span className="text-[#22c55e] font-bold font-['Poppins']">
                    {((animatedScores[index]?.[1] || 0)).toFixed(4)}
                  </span>
                </div>

                {/* Accuracy */}
                <div className="col-span-2 text-center">
                  <span className="text-[#3b82f6] font-bold font-['Poppins']">
                    {((animatedScores[index]?.[2] || 0)).toFixed(4)}
                  </span>
                </div>

                {/* Date */}
                <div className="col-span-2 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm text-[#b4bcd0]">
                    <Calendar className="w-3 h-3" />
                    {entry.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Submit CTA */}
        <div
          className={`mt-8 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={() => alert('Online submission system under development. Stay tuned!')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4d6bfa] text-white font-medium hover:bg-[#4353fa] transition-colors cursor-pointer"
          >
            <TrendingUp className="w-5 h-5" />
            Submit Your Results
            <ExternalLink className="w-4 h-4" />
          </button>
          <p className="text-sm text-[#b4bcd0] mt-4">
            Online submission system under development
          </p>
        </div>
      </div>
    </section>
  );
}
