import { useState, useEffect, useRef } from 'react';
import { Download, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

const downloadOptions = [
  {
    name: 'Full Dataset',
    size: '~60 GB',
    format: 'PNG + JSON',

    description: 'Complete benchmark with 109,224 image pairs and 327,672 reasoning trajectories',
    includes: ['109,224 bi-temporal image pairs', 'Six-step chain-of-thought annotations', 'Step-level judge evaluations', '327K+ reasoning trajectories'],
    links: [
      { name: 'Direct Download', url: '#' },
      { name: 'HuggingFace', url: 'https://huggingface.co/datasets/your-org/geo-bc' },
      { name: 'Baidu Pan', url: 'https://pan.baidu.com/s/xxxx' },
    ],
  },
  {
    name: 'Sample Set',
    size: '~20 GB',
    format: 'PNG',

    description: 'Representative subset for exploratory analysis and development',
    includes: ['1,000 image pairs', 'Complete 6-step annotations', 'Judge evaluation samples', 'Metadata and taxonomy mappings'],
    links: [
      { name: 'Direct Download', url: '#' },
      { name: 'HuggingFace', url: 'https://huggingface.co/datasets/your-org/geo-bc' },
      { name: 'Baidu Pan', url: 'https://pan.baidu.com/s/xxxx' },
    ],
  },
  {
    name: 'Annotations Only',
    size: '~100 MB',
    format: 'JSON (Partial)',

    description: 'Structured reasoning annotations and evaluation data (partial release for reference)',
    includes: ['Six-step reasoning chains', 'Judge evaluation scores', 'Preference rankings', '382K+ evaluation statements'],
    links: [
      { name: 'Direct Download', url: '#' },
      { name: 'HuggingFace', url: 'https://huggingface.co/datasets/your-org/geo-bc' },
      { name: 'Baidu Pan', url: 'https://pan.baidu.com/s/xxxx' },
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
    <section id="download" ref={sectionRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title">Download Dataset</h2>
          <p className="section-subtitle">
            Get started with Geo-BeyondCaptioning for your research
          </p>
        </div>

        {/* Agreement */}
        <div
          className={`max-w-2xl mx-auto mb-12 p-6 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-start gap-4">
            <button
              onClick={() => setAgreed(!agreed)}
              className={`mt-1 w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                agreed
                  ? 'bg-[#4d6bfa] border-[#4d6bfa]'
                  : 'border-[#2a2d47] hover:border-[#4d6bfa]'
              }`}
            >
              {agreed && <CheckCircle className="w-3.5 h-3.5 text-white" />}
            </button>
            <div>
              <p className="text-sm text-[#b4bcd0] leading-relaxed">
                I agree to use this dataset for research purposes only and will cite the paper in any publications. I understand this dataset is licensed under CC BY-NC-SA 4.0.
              </p>
            </div>
          </div>
        </div>

        {/* Download Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {downloadOptions.map((option, index) => (
            <div
              key={option.name}
              className={`p-6 rounded-2xl bg-[#161b22]/80 border border-[#2a2d47]/50 transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              } ${agreed ? 'hover:border-[#4d6bfa]/50' : 'opacity-60'}`}
              style={{
                transitionDelay: `${200 + index * 100}ms`,
                transitionTimingFunction: 'var(--ease-out-expo)',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-1">{option.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-xs rounded-full bg-[#4d6bfa]/10 text-[#4d6bfa] border border-[#4d6bfa]/30">
                      {option.format}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white">{option.size}</div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#b4bcd0] mb-4 leading-relaxed">{option.description}</p>

              {/* Includes */}
              <div className="space-y-2 mb-6">
                {option.includes.map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-[#b4bcd0]">
                    <CheckCircle className="w-4 h-4 text-[#4d6bfa]" />
                    {item}
                  </div>
                ))}
              </div>

              {/* Download Links */}
              <div className="space-y-2">
                {option.links.map((link) => (
                  <a
                    key={link.name}
                    href={agreed ? link.url : '#'}
                    onClick={(e) => {
                      if (!agreed) {
                        e.preventDefault();
                        alert('Please agree to the terms before downloading.');
                        return;
                      }
                      e.preventDefault();
                      alert('The dataset is coming soon. Please check back later.');
                    }}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium transition-all ${
                      agreed
                        ? 'bg-[#4d6bfa] text-white hover:bg-[#4353fa]'
                        : 'bg-[#2a2d47] text-[#b4bcd0] cursor-not-allowed'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    {link.name}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          className={`mt-8 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 flex items-start gap-3 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-yellow-200/80 font-medium mb-1">
              The dataset is coming soon. Please check back later.
            </p>
            <p className="text-xs text-yellow-200/60">
              The dataset is constructed from multi-source Gaofen satellite imagery (GF-1/2/6/7). Please ensure adequate disk space and cite the paper when using this benchmark.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
