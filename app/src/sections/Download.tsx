import { useState, useEffect, useRef } from 'react';
import { Download, FileArchive, FileJson, FileImage, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react';

const downloadOptions = [
  {
    name: 'Full Dataset',
    size: '12.5 GB',
    format: 'TIFF + JSON',
    icon: FileArchive,
    description: 'Complete dataset with all image pairs and annotations',
    includes: ['109,224 image pairs', 'Change masks', 'Text descriptions', 'Metadata'],
    links: [
      { name: 'Direct Download', url: '#' },
      { name: 'HuggingFace', url: '#' },
      { name: 'Baidu Pan', url: '#' },
    ],
  },
  {
    name: 'Sample Set',
    size: '500 MB',
    format: 'TIFF + JSON',
    icon: FileImage,
    description: 'Small sample for quick testing and exploration',
    includes: ['Sample image pairs', 'Sample masks', 'Sample descriptions'],
    links: [
      { name: 'Direct Download', url: '#' },
      { name: 'HuggingFace', url: '#' },
      { name: 'Baidu Pan', url: '#' },
    ],
  },
  {
    name: 'Annotations Only',
    size: '25 MB',
    format: 'JSON',
    icon: FileJson,
    description: 'Just the annotations without images',
    includes: ['Change masks', 'Text descriptions', 'Metadata'],
    links: [
      { name: 'Direct Download', url: '#' },
      { name: 'HuggingFace', url: '#' },
      { name: 'Baidu Pan', url: '#' },
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

        {/* Coming Soon Notice */}
        <div
          className={`max-w-3xl mx-auto mb-12 p-6 rounded-xl bg-blue-500/10 border border-blue-500/30 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">Coming Soon</h3>
              <p className="text-sm text-blue-200/80 leading-relaxed">
                The dataset is currently undergoing final preparation and quality assurance. 
                We expect to release it publicly in the near future. Please check back soon 
                or follow our GitHub repository for updates.
              </p>
            </div>
          </div>
        </div>

        {/* Agreement */}
        <div
          className={`max-w-2xl mx-auto mb-12 p-6 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50 transition-all duration-700 delay-200 ${
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
                transitionDelay: `${300 + index * 100}ms`,
                transitionTimingFunction: 'var(--ease-out-expo)',
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4d6bfa]/20 to-[#4353fa]/10 flex items-center justify-center">
                  <option.icon className="w-6 h-6 text-[#4d6bfa]" />
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-white">{option.size}</div>
                  <div className="text-xs text-[#b4bcd0]">{option.format}</div>
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-white mb-2">{option.name}</h3>
              <p className="text-sm text-[#b4bcd0] mb-4">{option.description}</p>

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
                  <button
                    key={link.name}
                    onClick={() => {
                      if (agreed) {
                        alert('The dataset is coming soon. Please check back later.');
                      } else {
                        alert('Please agree to the terms before downloading.');
                      }
                    }}
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-medium transition-all ${
                      agreed
                        ? 'bg-[#4d6bfa] text-white hover:bg-[#4353fa]'
                        : 'bg-[#2a2d47] text-[#b4bcd0] cursor-not-allowed'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    {link.name}
                    <ExternalLink className="w-4 h-4" />
                  </button>
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
          <p className="text-sm text-yellow-200/80">
            The full dataset requires approximately 60GB of free disk space.
          </p>
        </div>
      </div>
    </section>
  );
}
