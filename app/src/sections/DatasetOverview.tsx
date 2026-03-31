import { useEffect, useRef, useState } from 'react';
import { Camera, CheckCircle } from 'lucide-react';

// 数据集统计信息
const datasetStats = [
  { icon: Camera, label: 'Sensor Types', value: '4', detail: 'GF-1, GF-2, GF-6, GF-7' },
];

// 特性列表
const features = [
  '6-step chain-of-thought annotations',
  '5 VLM models × 3 Judges evaluation system',
  'Supports SFT, PPO, DPO, GRPO, KTO training',
  'Process Reward Model (PRM) ready',
  'Hallucination detection & quality control',
  '20000+ bi-temporal image pairs',
];

// 数据集概览区块组件
export default function DatasetOverview() {
  // 可见性和计数器状态管理
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState<number[]>(datasetStats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  // IntersectionObserver 动画触发
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // 启动计数器动画
          datasetStats.forEach((stat, index) => {
            const target = parseInt(stat.value.replace(/\D/g, '')) || 0;
            if (target > 0) {
              let current = 0;
              const increment = target / 50;
              const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  current = target;
                  clearInterval(timer);
                }
                setCounters((prev) => {
                  const newCounters = [...prev];
                  newCounters[index] = Math.floor(current);
                  return newCounters;
                });
              }, 30);
            }
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
    <section
      id="dataset-intro"
      ref={sectionRef}
      className="py-24 relative"
    >
      {/* 背景装饰 */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#4d6bfa]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 左侧内容区域 */}
          <div
            className={`space-y-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* 标签 */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4d6bfa]/10 border border-[#4d6bfa]/30">
              <span className="text-sm font-medium text-[#4d6bfa]">About Dataset</span>
            </div>

            {/* 标题 */}
            <div>
              <h2 className="section-title">
                Geo-BeyondCaptioning: Multi-modal
                <br />
                <span className="gradient-text">Change Interpretation</span>
              </h2>
            </div>

            {/* 描述文本 */}
            <p className="text-lg text-[#b4bcd0] leading-relaxed">
              Our dataset pioneers <span className="text-white font-semibold">structured reasoning annotations</span> for remote sensing change analysis. Each sample includes a 6-step thinking process with <span className="text-white font-semibold">19,000+ multi-model annotations</span> from 5 VLMs and comprehensive evaluations by 3 judge systems. Compatible with modern training paradigms including PRM, PPO, DPO, GRPO, and KTO.
            </p>

            {/* 特性列表 */}
            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div
                  key={feature}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${300 + index * 50}ms` }}
                >
                  <CheckCircle className="w-5 h-5 text-[#4d6bfa] flex-shrink-0" />
                  <span className="text-sm text-[#b4bcd0]">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧统计卡片 */}
          <div className="flex justify-center">
            {datasetStats.map((stat, index) => (
              <div
                key={stat.label}
                className={`group relative p-8 rounded-2xl bg-[#161b22]/80 border border-[#2a2d47]/50 hover:border-[#4d6bfa]/50 transition-all duration-500 hover:-translate-y-2 max-w-xs w-full ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  transitionTimingFunction: 'var(--ease-out-expo)',
                }}
              >
                {/* 图标 */}
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#4d6bfa]/20 to-[#4353fa]/10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 mx-auto">
                  <stat.icon className="w-8 h-8 text-[#4d6bfa]" />
                </div>

                {/* 数值显示 */}
                <div className="text-4xl md:text-5xl font-bold text-white font-['Poppins'] mb-2 glow-text text-center">
                  {stat.value.includes('m') || stat.value.includes('-')
                    ? stat.value
                    : `${counters[index]}${stat.value.replace(/[0-9]/g, '')}`}
                </div>

                {/* 标签 */}
                <div className="text-base font-medium text-white mb-2 text-center">
                  {stat.label}
                </div>

                {/* 详情显示 */}
                <div className="text-sm text-[#b4bcd0] text-center">{stat.detail}</div>

                {/* 发光效果 */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4d6bfa]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
