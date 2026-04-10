import { useState, useEffect, useRef } from 'react';
import { Download, ExternalLink, CheckCircle, Database, FileJson, HardDrive, Satellite, MapPin, BarChart3, Layers } from 'lucide-react';

const downloadOptions = [
  {
    name: 'Geo-BC Full Dataset',
    size: '~60 GB',
    format: 'PNG + JSON',
    description: 'A preference-aligned benchmark for fine-grained reasoning and spatiotemporal geo-world understanding.',
    stats: [
      { label: 'Image Pairs', value: '109,224', desc: 'Bi-temporal samples' },
      { label: 'Trajectories', value: '327,672', desc: 'Reasoning paths' },
      { label: 'Evaluations', value: '382,284', desc: 'Judge statements' },
      { label: 'Categories', value: '14', desc: 'Land-use types' },
    ],
    includes: [
      { label: '109,224 bi-temporal image pairs', icon: 'images' },
      { label: 'Six-step chain-of-thought annotations', icon: 'annotations' },
      { label: 'Step-level judge evaluations', icon: 'evaluations' },
      { label: '327K+ reasoning trajectories', icon: 'trajectories' },
    ],
    links: [
      { name: 'HuggingFace', url: 'https://huggingface.co/datasets/Kayn-kjq/Geo_BeyondCaptioning' },
    ],
  },
];

export default function DownloadSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [agreed, setAgreed] = useState(false);
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
    <section id="download" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#4d6bfa]/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4d6bfa]/10 border border-[#4d6bfa]/20 mb-6">
            <Database className="w-4 h-4 text-[#4d6bfa]" />
            <span className="text-sm font-medium text-[#4d6bfa]">Dataset Release</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Download Dataset</h2>
          <p className="text-[#b4bcd0] max-w-xl mx-auto">
            Get started with Geo-BeyondCaptioning for your research
          </p>
        </div>

        {/* Agreement Card */}
        <div
          className={`max-w-3xl mx-auto mb-8 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div 
            onClick={() => setAgreed(!agreed)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 ${
              agreed 
                ? 'bg-[#4d6bfa]/10 border-[#4d6bfa]/40' 
                : 'bg-[#161b22]/60 border-[#2a2d47]/50 hover:border-[#4d6bfa]/30'
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`mt-0.5 w-6 h-6 rounded-lg flex items-center justify-center transition-all ${
                  agreed
                    ? 'bg-[#4d6bfa] scale-110'
                    : 'bg-[#2a2d47] border border-[#3d4155]'
                }`}
              >
                {agreed && <CheckCircle className="w-4 h-4 text-white" />}
              </div>
              <div>
                <p className={`text-sm leading-relaxed transition-colors ${agreed ? 'text-white' : 'text-[#b4bcd0]'}`}>
                  I agree to use this dataset for <span className="text-[#4d6bfa] font-medium">research purposes only</span> and will cite the paper in any publications. This dataset is licensed under CC BY-NC-SA 4.0.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dataset Overview */}
        <div className="max-w-7xl mx-auto mb-8">
          <div
            className={`p-6 rounded-2xl bg-gradient-to-r from-[#4d6bfa]/10 via-[#161b22] to-[#8b5cf6]/10 border border-[#2a2d47]/50 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-[#b4bcd0] leading-relaxed">
              <span className="text-white font-semibold">Geo-BC (Geo-BeyondCaptioning)</span> reformulates bi-temporal remote-sensing change analysis as a <span className="text-[#4d6bfa]">multimodal reasoning task</span> rather than a captioning task. It evaluates whether a model can perform grounded spatial, temporal, and causal reasoning over image pairs and natural-language queries. The dataset goes beyond basic object detection and caption generation, deeply integrating complex visual attributes with real-world land-use semantics.
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {downloadOptions[0].stats.map((stat, index) => (
              <div
                key={stat.label}
                className={`p-5 rounded-2xl bg-[#161b22]/80 border border-[#2a2d47]/50 text-center transition-all duration-700 hover:border-[#4d6bfa]/30 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${150 + index * 50}ms` }}
              >
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-[#4d6bfa] font-medium">{stat.label}</div>
                <div className="text-xs text-[#6e7681] mt-1">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Download Cards Grid */}
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
          {/* Main Dataset Card */}
          <div className="lg:col-span-2">
            {downloadOptions.map((option, index) => (
              <div
                key={option.name}
                className={`relative group h-full transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                } ${agreed ? '' : 'opacity-50'}`}
                style={{ transitionDelay: `${200 + index * 100}ms` }}
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4d6bfa] to-[#8b5cf6] rounded-3xl opacity-20 group-hover:opacity-40 blur transition-opacity" />
                
                <div className="relative h-full p-8 rounded-3xl bg-gradient-to-b from-[#161b22] to-[#0d1117] border border-[#2a2d47]/80">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4d6bfa]/20 to-[#8b5cf6]/20 flex items-center justify-center border border-[#4d6bfa]/20">
                        <FileJson className="w-7 h-7 text-[#4d6bfa]" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{option.name}</h3>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 mt-1.5 text-xs rounded-full bg-[#4d6bfa]/10 text-[#4d6bfa] border border-[#4d6bfa]/20">
                          {option.format}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-white">{option.size}</div>
                      <div className="text-xs text-[#6e7681] mt-0.5">compressed: ~30GB</div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-[#b4bcd0] mb-6 leading-relaxed">
                    {option.description}
                  </p>

                  {/* Features Grid */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {option.includes.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[#0d1117]/60 border border-[#2a2d47]/50">
                        <div className="w-8 h-8 rounded-lg bg-[#4d6bfa]/10 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-[#4d6bfa]" />
                        </div>
                        <span className="text-sm text-[#b4bcd0]">{item.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Download Button */}
                  <div>
                    {option.links.map((link) => (
                      <a
                        key={link.name}
                        href={agreed ? link.url : '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          if (!agreed) {
                            e.preventDefault();
                            alert('Please agree to the terms before downloading.');
                          }
                        }}
                        className={`flex items-center justify-center gap-3 w-full py-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
                          agreed
                            ? 'bg-gradient-to-r from-[#4d6bfa] to-[#4353fa] text-white hover:shadow-lg hover:shadow-[#4d6bfa]/30 hover:scale-[1.02] active:scale-[0.98]'
                            : 'bg-[#2a2d47] text-[#6e7681] cursor-not-allowed'
                        }`}
                      >
                        <Download className="w-5 h-5" />
                        Download from {link.name}
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Satellite Info Card */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="h-full p-6 rounded-3xl bg-[#161b22]/80 border border-[#2a2d47]/50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#f59e0b]/20 to-[#d97706]/10 flex items-center justify-center border border-[#f59e0b]/20">
                  <Satellite className="w-5 h-5 text-[#f59e0b]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Data Source</h3>
                  <p className="text-xs text-[#6e7681]">Multi-source satellite imagery</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="p-3 rounded-xl bg-[#0d1117]/60 border border-[#2a2d47]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-[#f59e0b]">GF-1</span>
                    <span className="text-xs text-[#6e7681]">2m/8m/16m</span>
                  </div>
                  <p className="text-xs text-[#6e7681]">60km × 60km coverage</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0d1117]/60 border border-[#2a2d47]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-[#22c55e]">GF-2</span>
                    <span className="text-xs text-[#6e7681]">0.8m/3.2m</span>
                  </div>
                  <p className="text-xs text-[#6e7681]">45km × 45km coverage</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0d1117]/60 border border-[#2a2d47]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-[#4d6bfa]">GF-6</span>
                    <span className="text-xs text-[#6e7681]">2m/8m</span>
                  </div>
                  <p className="text-xs text-[#6e7681]">90km × 90km coverage</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0d1117]/60 border border-[#2a2d47]/50">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-semibold text-[#ec4899]">GF-7</span>
                    <span className="text-xs text-[#6e7681]">0.65m/2.6m</span>
                  </div>
                  <p className="text-xs text-[#6e7681]">20km × 20km coverage</p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/20">
                <div className="flex items-start gap-2">
                  <HardDrive className="w-4 h-4 text-yellow-500/70 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-200/60">
                    All sensors include panchromatic and multispectral observations, enabling fine-grained land-use change interpretation across heterogeneous spatial scales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div
          className={`mt-12 max-w-7xl mx-auto grid md:grid-cols-3 gap-6 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="p-5 rounded-2xl bg-[#161b22]/60 border border-[#2a2d47]/50">
            <div className="w-10 h-10 rounded-xl bg-[#4d6bfa]/10 flex items-center justify-center mb-4">
              <BarChart3 className="w-5 h-5 text-[#4d6bfa]" />
            </div>
            <h4 className="text-white font-semibold mb-2">Process Supervision</h4>
            <p className="text-sm text-[#6e7681]">Six-step reasoning annotation framework with positive-negative dual-track logic and step-level process scoring.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#161b22]/60 border border-[#2a2d47]/50">
            <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5 text-[#22c55e]" />
            </div>
            <h4 className="text-white font-semibold mb-2">Rich Annotations</h4>
            <p className="text-sm text-[#6e7681]">Structured reasoning artifacts with aligned scoring signals from decoupled multi-judge framework.</p>
          </div>
          <div className="p-5 rounded-2xl bg-[#161b22]/60 border border-[#2a2d47]/50">
            <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/10 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-[#f59e0b]" />
            </div>
            <h4 className="text-white font-semibold mb-2">Real-world Focus</h4>
            <p className="text-sm text-[#6e7681]">Deliberately skewed toward difficult non-target cases with 1:4 positive-to-negative ratio for realistic scenarios.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
