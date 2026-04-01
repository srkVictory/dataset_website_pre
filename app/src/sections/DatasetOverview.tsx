import { useEffect, useRef, useState } from 'react';
import { CheckCircle, Satellite, Scan, Eye, Map } from 'lucide-react';

const sensors = [
  {
    name: 'GF-1',
    fullName: 'Gaofen-1',
    icon: Satellite,
    resolution: '2m / 8m / 16m',
    bands: 'PAN + Multispectral',
    coverage: '60km × 60km',
    description: 'High-resolution optical satellite with multi-spectral imaging capabilities for detailed land observation.',
    features: ['2m panchromatic', '8m multispectral', '4-day revisit'],
  },
  {
    name: 'GF-2',
    fullName: 'Gaofen-2',
    icon: Eye,
    resolution: '0.8m / 3.2m',
    bands: 'PAN + Multispectral',
    coverage: '45km × 45km',
    description: 'Sub-meter resolution satellite providing ultra-high-definition imagery for precise change detection.',
    features: ['0.8m panchromatic', '3.2m multispectral', '5-day revisit'],
  },
  {
    name: 'GF-6',
    fullName: 'Gaofen-6',
    icon: Scan,
    resolution: '2m / 8m',
    bands: 'PAN + Multispectral',
    coverage: '90km × 90km',
    description: 'Wide-swath imaging satellite designed for large-area coverage and agricultural monitoring.',
    features: ['Wide field of view', '2m panchromatic', 'Agriculture focus'],
  },
  {
    name: 'GF-7',
    fullName: 'Gaofen-7',
    icon: Map,
    resolution: '0.65m / 2.6m',
    bands: 'PAN + Multispectral',
    coverage: '20km × 20km',
    description: 'Stereo mapping satellite for high-precision topographic mapping and 3D reconstruction.',
    features: ['0.65m panchromatic', 'Stereo imaging', 'Mapping focus'],
  },
];

const features = [
  'Six-step chain-of-thought annotations with per-step scoring',
  'Five VLM models × Three Judges evaluation framework',
  'Supports SFT, PPO, DPO, GRPO, KTO training paradigms',
  'Process Reward Model (PRM) ready with step-level rewards',
  'Hallucination detection and uncertainty quantification',
  '50,000+ bi-temporal image pairs with GB/T 21010-2017 taxonomy',
];

export default function DatasetOverview() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4d6bfa]/10 border border-[#4d6bfa]/30 mb-6">
            <span className="text-sm font-medium text-[#4d6bfa]">Dataset Overview</span>
          </div>
          <h2 className="section-title">
            A Dataset for Multimodal <span className="gradient-text">Reasoning & Understanding</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div
            className={`space-y-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <p className="text-lg text-[#b4bcd0] leading-relaxed">
              Geo-BC reformulates bi-temporal remote sensing change analysis as a <span className="text-white font-semibold">multimedia reasoning task</span> 
              rather than a captioning task. Our dataset pioneers structured reasoning annotations 
              for remote sensing change analysis, featuring 50,000+ annotated image pairs with 
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

            {/* Sensor Summary */}
            <div className="pt-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4d6bfa]/20 to-[#4353fa]/10 flex items-center justify-center">
                  <Satellite className="w-5 h-5 text-[#4d6bfa]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">4</div>
                  <div className="text-sm text-[#b4bcd0]">Sensor Types</div>
                </div>
              </div>
              <p className="text-sm text-[#b4bcd0]">
                GF-1, GF-2, GF-6, GF-7 · Multi-source Gaofen satellite imagery providing complementary spatial resolutions and coverage scales
              </p>
            </div>
          </div>

          {/* Right - Sensor Cards Grid */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {sensors.map((sensor, index) => (
                <div
                  key={sensor.name}
                  className={`group relative p-4 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50 hover:border-[#4d6bfa]/50 transition-all duration-500 hover:-translate-y-2 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: `${400 + index * 100}ms`,
                    transitionTimingFunction: 'var(--ease-out-expo)',
                  }}
                >
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4d6bfa]/20 to-[#4353fa]/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      <sensor.icon className="w-5 h-5 text-[#4d6bfa]" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white font-['Poppins']">
                        {sensor.name}
                      </div>
                      <div className="text-xs text-[#b4bcd0]">{sensor.fullName}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-[#b4bcd0] mb-3 leading-relaxed line-clamp-2">
                    {sensor.description}
                  </p>

                  {/* Specs */}
                  <div className="space-y-1 mb-3">
                    <div className="flex justify-between text-xs">
                      <span className="text-[#6e7681]">Resolution:</span>
                      <span className="text-[#b4bcd0] font-medium">{sensor.resolution}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-[#6e7681]">Coverage:</span>
                      <span className="text-[#b4bcd0] font-medium">{sensor.coverage}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="flex flex-wrap gap-1">
                    {sensor.features.slice(0, 2).map((feature) => (
                      <span
                        key={feature}
                        className="px-1.5 py-0.5 text-[10px] rounded-full bg-[#4d6bfa]/10 text-[#4d6bfa] border border-[#4d6bfa]/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[#4d6bfa]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
