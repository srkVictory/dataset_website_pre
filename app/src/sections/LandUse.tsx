import { useEffect, useRef, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
import { ArrowRight, TrendingUp, Filter } from 'lucide-react';

// 变化类型统计数据 - 展示从一种地类变化到另一种地类的实例数量
const changeTypeData = [
{ 
    from: '水浇地', 
    to: '人为扰动用地', 
    count: 2588, 
    color: '#4d6bfa',
    description: 'Irrigated farmland to human disturbance'
  },
  { 
    from: '人为扰动用地', 
    to: '其他建设用地', 
    count: 2474, 
    color: '#22c55e',
    description: 'Human disturbance to other construction'
  },
  { 
    from: '其他草地', 
    to: '人为扰动用地', 
    count: 923, 
    color: '#a855f7',
    description: 'Grassland to human disturbance'
  },
  { 
    from: '人为扰动用地', 
    to: '水浇地', 
    count: 562, 
    color: '#3b82f6',
    description: 'Human disturbance to irrigated farmland'
  },
  { 
    from: '河湖库塘', 
    to: '人为扰动用地', 
    count: 557, 
    color: '#14b8a6',
    description: 'Water body to human disturbance'
  },
  { 
    from: '有林地', 
    to: '人为扰动用地', 
    count: 491, 
    color: '#f59e0b',
    description: 'Forest to human disturbance'
  },
  { 
    from: '水浇地', 
    to: '其他建设用地', 
    count: 324, 
    color: '#ef4444',
    description: 'Irrigated farmland to other construction'
  },
  { 
    from: '人为扰动用地', 
    to: '城市建设用地', 
    count: 297, 
    color: '#06b6d4',
    description: 'Human disturbance to urban construction'
  },
  { 
    from: '其他草地', 
    to: '河湖库塘', 
    count: 193, 
    color: '#8b5cf6',
    description: 'Grassland to water body'
  },
  { 
    from: '水浇地', 
    to: '河湖库塘', 
    count: 140, 
    color: '#ec4899',
    description: 'Irrigated farmland to water body'
  }
];

// 按变化大类分组统计
const categorySummary = [
  { 
    category: '城市化变化', 
    total: 5820, 
    percentage: 74.6,
    color: '#4d6bfa',
    types: ['耕地→建筑', '林地→建筑', '草地→建筑', '水域及水利设施用地→建筑']
  },
  { 
    category: '生态退化', 
    total: 90, 
    percentage: 1.2,
    color: '#ef4444',
    types: ['草地→耕地', '林地→耕地', '园地→耕地']
  },
  { 
    category: '人为扰动', 
    total: 743, 
    percentage: 9.5,
    color: '#f59e0b',
    types: ['建设用地→交通运输用地', '草地→水域及水利设施用地', '水域及水利设施用地→交通运输用地']
  },
  { 
    category: '生态修复', 
    total: 1093, 
    percentage: 14.0,
    color: '#22c55e',
    types: ['建设用地→水域及水利设施用地', '建设用地→草地', '耕地→水域及水利设施用地', '建设用地→林地']
  },
  { 
    category: '其他变化', 
    total: 59, 
    percentage: 0.8,
    color: '#6b7280',
    types: ['其他类型']
  },
];

export default function LandUse() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [animatedCounts, setAnimatedCounts] = useState<number[]>(changeTypeData.map(() => 0));
  const [animatedTotals, setAnimatedTotals] = useState<number[]>(categorySummary.map(() => 0));
  const [activeView, setActiveView] = useState<'detail' | 'summary'>('detail');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate counts
          changeTypeData.forEach((item, index) => {
            let current = 0;
            const target = item.count;
            const increment = target / 40;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              setAnimatedCounts((prev) => {
                const newCounts = [...prev];
                newCounts[index] = Math.floor(current);
                return newCounts;
              });
            }, 25);
          });
          // Animate category totals
          categorySummary.forEach((item, index) => {
            let current = 0;
            const target = item.total;
            const increment = target / 40;
            const timer = setInterval(() => {
              current += increment;
              if (current >= target) {
                current = target;
                clearInterval(timer);
              }
              setAnimatedTotals((prev) => {
                const newTotals = [...prev];
                newTotals[index] = Math.floor(current);
                return newTotals;
              });
            }, 25);
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

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: any[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-[#161b22] border border-[#2a2d47] rounded-lg p-4 shadow-xl max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-white">{data.from}</span>
            <ArrowRight className="w-4 h-4 text-[#4d6bfa]" />
            <span className="text-sm font-medium text-white">{data.to}</span>
          </div>
          <p className="text-xs text-[#b4bcd0] mb-2">{data.description}</p>
          <p className="text-lg font-bold text-[#4d6bfa]">{data.count.toLocaleString()} instances</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="land-use" ref={sectionRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4d6bfa]/10 border border-[#4d6bfa]/30 mb-6">
            <ArrowRight className="w-4 h-4 text-[#4d6bfa]" />
            <span className="text-sm font-medium text-[#4d6bfa]">Land Use Taxonomy</span>
          </div>
          <h2 className="section-title">Land Use Change Distribution</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Based on GB/T 21010-2017 national land-use classification standard, 
            covering 14 major land-use categories with 1:4 positive-negative sample ratio 
            for robust change detection evaluation
          </p>
        </div>

        {/* View Toggle */}
        <div
          className={`flex justify-center gap-4 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={() => setActiveView('detail')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeView === 'detail'
                ? 'bg-[#4d6bfa] text-white shadow-lg shadow-[#4d6bfa]/25'
                : 'bg-[#161b22] text-[#b4bcd0] border border-[#2a2d47] hover:border-[#4d6bfa]/50'
            }`}
          >
            <Filter className="w-4 h-4" />
            Detailed Changes
          </button>
          <button
            onClick={() => setActiveView('summary')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeView === 'summary'
                ? 'bg-[#4d6bfa] text-white shadow-lg shadow-[#4d6bfa]/25'
                : 'bg-[#161b22] text-[#b4bcd0] border border-[#2a2d47] hover:border-[#4d6bfa]/50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Category Summary
          </button>
        </div>

        {activeView === 'detail' ? (
          /* Detailed Change Types View */
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Bar Chart */}
            <div
              className={`lg:col-span-3 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
              }`}
            >
              <div className="p-6 rounded-2xl bg-[#161b22]/50 border border-[#2a2d47]/50">
                <h3 className="text-lg font-semibold text-white mb-6">Inter-Class Transition Statistics</h3>
                <div className="h-[500px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={changeTypeData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#2a2d47" horizontal={false} />
                      <XAxis 
                        type="number" 
                        stroke="#6b7280"
                        fontSize={12}
                        tickFormatter={(value) => value.toLocaleString()}
                      />
                      <YAxis 
                        type="category" 
                        dataKey="from"
                        stroke="#b4bcd0"
                        fontSize={11}
                        width={70}
                        tickFormatter={(value, index) => `${value}→${changeTypeData[index]?.to || ''}`}
                      />
                      <RechartsTooltip content={<CustomTooltip />} />
                      <Bar 
                        dataKey="count" 
                        radius={[0, 4, 4, 0]}
                        onMouseEnter={(_, index) => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        {changeTypeData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            opacity={hoveredIndex === null || hoveredIndex === index ? 1 : 0.5}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Change Type List */}
            <div className="lg:col-span-2 space-y-3 max-h-[600px] overflow-y-auto pr-2">
              {changeTypeData.map((change, index) => (
                <div
                  key={`${change.from}-${change.to}`}
                  className={`group p-4 rounded-xl bg-[#161b22]/50 border border-[#2a2d47]/50 hover:border-[#4d6bfa]/50 transition-all duration-500 cursor-pointer ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                  } ${hoveredIndex === index ? 'border-[#4d6bfa]/50 bg-[#4d6bfa]/5' : ''}`}
                  style={{
                    transitionDelay: `${300 + index * 50}ms`,
                    transitionTimingFunction: 'var(--ease-out-expo)',
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: change.color }}
                      />
                      <span className="text-sm text-[#b4bcd0]">{change.from}</span>
                      <ArrowRight className="w-3 h-3 text-[#4d6bfa]" />
                      <span className="text-sm text-[#b4bcd0]">{change.to}</span>
                    </div>
                    <div
                      className="text-lg font-bold font-['Poppins']"
                      style={{ color: change.color }}
                    >
                      {animatedCounts[index]?.toLocaleString() || 0}
                    </div>
                  </div>
                  <p className="text-xs text-[#6b7280]">{change.description}</p>
                  <div className="mt-2 h-1 bg-[#2a2d47]/50 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${((animatedCounts[index] || 0) / 1000) * 100}%`,
                        backgroundColor: change.color,
                        transitionTimingFunction: 'var(--ease-out-expo)',
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Category Summary View */
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Summary Cards */}
            <div className="space-y-4">
              {categorySummary.map((category, index) => (
                <div
                  key={category.category}
                  className={`group p-6 rounded-2xl bg-[#161b22]/50 border border-[#2a2d47]/50 hover:border-[#4d6bfa]/50 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${200 + index * 100}ms`,
                    transitionTimingFunction: 'var(--ease-out-expo)',
                  }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <h4 className="text-lg font-semibold text-white">{category.category}</h4>
                    </div>
                    <div className="text-right">
                      <div
                        className="text-2xl font-bold font-['Poppins']"
                        style={{ color: category.color }}
                      >
                        {animatedTotals[index]?.toLocaleString() || 0}
                      </div>
                      <div className="text-sm text-[#b4bcd0]">{category.percentage}%</div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-2 bg-[#2a2d47]/50 rounded-full overflow-hidden mb-3">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${category.percentage}%`,
                        backgroundColor: category.color,
                        transitionTimingFunction: 'var(--ease-out-expo)',
                      }}
                    />
                  </div>

                  {/* Change Types */}
                  <div className="flex flex-wrap gap-2">
                    {category.types.map((type) => (
                      <span
                        key={type}
                        className="px-2 py-1 text-xs rounded-full bg-[#2a2d47]/50 text-[#b4bcd0]"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Stats */}
            <div
              className={`p-8 rounded-2xl bg-gradient-to-br from-[#4d6bfa]/20 to-[#4353fa]/10 border border-[#4d6bfa]/30 transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
            >
              <h3 className="text-xl font-semibold text-white mb-8">Taxonomy Distribution</h3>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 rounded-xl bg-[#161b22]/50">
                  <div className="text-4xl font-bold text-[#4d6bfa] font-['Poppins'] mb-2">
                    7,430
                  </div>
                  <div className="text-sm text-[#b4bcd0]">Valid Change Instances</div>
                </div>
                <div className="text-center p-6 rounded-xl bg-[#161b22]/50">
                  <div className="text-4xl font-bold text-[#22c55e] font-['Poppins'] mb-2">
                    10
                  </div>
                  <div className="text-sm text-[#b4bcd0]">Change Types</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 rounded-xl bg-[#161b22]/50">
                  <span className="text-[#b4bcd0]">Primary Transition</span>
                  <span className="text-white font-medium">Irrigated Land → Human Disturbance</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-[#161b22]/50">
                  <span className="text-[#b4bcd0]">Dominant Category</span>
                  <span className="text-white font-medium">Urbanization (74.6%)</span>
                </div>
                <div className="flex justify-between items-center p-4 rounded-xl bg-[#161b22]/50">
                  <span className="text-[#b4bcd0]">Intra-Class Filtered</span>
                  <span className="text-white font-medium">~80% negative samples</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Stats */}
        <div
          className={`mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { label: 'Source Land Types', value: '12+' },
            { label: 'Target Land Types', value: '12+' },
            { label: 'Change Combinations', value: '60+' },
            { label: 'Annotated Pixels', value: '2.5M+' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-[#161b22]/30 border border-[#2a2d47]/30"
            >
              <div className="text-2xl font-bold text-white font-['Poppins'] mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-[#b4bcd0]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
