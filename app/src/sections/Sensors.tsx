import { useEffect, useRef, useState } from 'react';
import { Satellite, Scan, Eye, Map } from 'lucide-react';

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

export default function Sensors() {
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
    <section ref={sectionRef} className="py-24 relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4d6bfa]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title">Sensor & Satellite Information</h2>
          <p className="section-subtitle">
            Our dataset integrates remote sensing data from multiple sources
          </p>
        </div>

        {/* Sensor Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sensors.map((sensor, index) => (
            <div
              key={sensor.name}
              className={`group relative p-6 rounded-2xl bg-[#161b22]/80 border border-[#2a2d47]/50 hover:border-[#4d6bfa]/50 transition-all duration-500 hover:-translate-y-3 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                transitionTimingFunction: 'var(--ease-out-expo)',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#4d6bfa]/20 to-[#4353fa]/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                  <sensor.icon className="w-7 h-7 text-[#4d6bfa]" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white font-['Poppins']">
                    {sensor.name}
                  </div>
                  <div className="text-xs text-[#b4bcd0]">{sensor.fullName}</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#b4bcd0] mb-4 leading-relaxed">
                {sensor.description}
              </p>

              {/* Specs */}
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-[#b4bcd0]">Resolution:</span>
                  <span className="text-white font-medium">{sensor.resolution}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#b4bcd0]">Bands:</span>
                  <span className="text-white font-medium">{sensor.bands}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#b4bcd0]">Coverage:</span>
                  <span className="text-white font-medium">{sensor.coverage}</span>
                </div>
              </div>

              {/* Features */}
              <div className="flex flex-wrap gap-2">
                {sensor.features.map((feature) => (
                  <span
                    key={feature}
                    className="px-2 py-1 text-xs rounded-full bg-[#4d6bfa]/10 text-[#4d6bfa] border border-[#4d6bfa]/30"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4d6bfa]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
