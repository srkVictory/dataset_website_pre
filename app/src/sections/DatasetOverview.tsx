import { useEffect, useRef, useState } from 'react';
import { Camera, CheckCircle } from 'lucide-react';

const datasetStats = [
  { icon: Camera, label: 'Sensor Types', value: '4', detail: 'GF-1, GF-2, GF-6, GF-7' },
];

const features = [
  'Six-step chain-of-thought annotations with per-step scoring',
  'Five VLM models × Three Judges evaluation framework',
  'Supports SFT, PPO, DPO, GRPO, KTO training paradigms',
  'Process Reward Model (PRM) ready with step-level rewards',
  'Hallucination detection and uncertainty quantification',
  '109,224 bi-temporal image pairs with GB/T 21010-2017 taxonomy',
];

export default function DatasetOverview() {
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState<number[]>(datasetStats.map(() => 0));
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#4d6bfa]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div
            className={`space-y-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4d6bfa]/10 border border-[#4d6bfa]/30">
              <span className="text-sm font-medium text-[#4d6bfa]">Dataset Overview</span>
            </div>

            <div>
              <h2 className="section-title">
                A Dataset for Multimodal
                <br />
                <span className="gradient-text">Reasoning & Understanding</span>
              </h2>
            </div>

            <p className="text-lg text-[#b4bcd0] leading-relaxed">
              Geo-BC reformulates bi-temporal remote sensing change analysis as a <span className="text-white font-semibold">multimedia reasoning task</span> 
              rather than a captioning task. Our dataset pioneers structured reasoning annotations 
              for remote sensing change analysis, featuring 109,224 annotated image pairs with 
              six-stage thinking processes and comprehensive evaluations by three specialized judge systems.
            </p>

            <div className="grid sm:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div
                  key={index}
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

          {/* Right Stats */}
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
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#4d6bfa]/20 to-[#4353fa]/10 flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 mx-auto">
                  <stat.icon className="w-8 h-8 text-[#4d6bfa]" />
                </div>

                <div className="text-4xl md:text-5xl font-bold text-white mb-2 glow-text text-center">
                  {stat.value.includes('m') || stat.value.includes('-')
                    ? stat.value
                    : `${counters[index]}${stat.value.replace(/[0-9]/g, '')}`}
                </div>

                <div className="text-base font-medium text-white mb-2 text-center">
                  {stat.label}
                </div>

                <div className="text-sm text-[#b4bcd0] text-center">{stat.detail}</div>

                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4d6bfa]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* Data Sources Info */}
        <div
          className={`mt-16 p-6 rounded-2xl bg-[#161b22]/30 border border-[#2a2d47]/50 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h4 className="text-lg font-semibold text-white mb-4">Multi-Source Satellite Data</h4>
          <p className="text-[#b4bcd0] text-sm mb-4">
            The dataset is constructed from multi-source Gaofen satellite imagery, providing complementary 
            spatial resolutions and coverage scales for fine-grained land-use change interpretation.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { name: 'GF-1', res: '2m/8m/16m', cov: '60km×60km' },
              { name: 'GF-2', res: '0.8m/3.2m', cov: '45km×45km' },
              { name: 'GF-6', res: '2m/8m', cov: '90km×90km' },
              { name: 'GF-7', res: '0.65m/2.6m', cov: '20km×20km' },
            ].map((sensor, idx) => (
              <div key={idx} className="px-4 py-2 bg-[#161b22]/50 rounded-lg border border-[#2a2d47]/50">
                <span className="font-semibold text-white text-sm">{sensor.name}</span>
                <span className="text-[#b4bcd0] text-xs ml-2">{sensor.res} · {sensor.cov}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
