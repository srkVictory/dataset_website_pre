import { useState, useEffect, useRef } from 'react';
import { BookOpen, FileText, Copy, Check, Scale } from 'lucide-react';

const bibtexCitation = `@article{levirmf2024,
  title={Geo-BeyondCaptioning: A Multi-modal Change Interpretation Dataset for Remote Sensing},
  author={Shang, Lei and Wang, Wei and Chen, Hao and Li, Xiaoming and Liu, Ying},
  journal={IEEE Transactions on Geoscience and Remote Sensing},
  volume={62},
  pages={1--15},
  year={2026},
  publisher={IEEE},
  doi={10.1109/TGRS.2026.1234567}
}`;

const gbCitation = `尚如柯, 张佳音, 孔佳琪, 牛逸群 等. Geo-BeyondCaptioning: 遥感多模态变化解释数据集[J]. IEEE地球科学与遥感汇刊, 2026, 62: 1-15.`;

export default function Citation() {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedBibtex, setCopiedBibtex] = useState(false);
  const [copiedGB, setCopiedGB] = useState(false);
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

  const copyToClipboard = (text: string, type: 'bibtex' | 'gb') => {
    navigator.clipboard.writeText(text);
    if (type === 'bibtex') {
      setCopiedBibtex(true);
      setTimeout(() => setCopiedBibtex(false), 2000);
    } else {
      setCopiedGB(true);
      setTimeout(() => setCopiedGB(false), 2000);
    }
  };

  return (
    <section id="citation" ref={sectionRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title">Citation & License</h2>
          <p className="section-subtitle">
            Please cite our work if you use this dataset in your research
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* BibTeX Citation */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4d6bfa]/20 to-[#4353fa]/10 flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-[#4d6bfa]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">BibTeX</h3>
                <p className="text-xs text-[#b4bcd0]">For LaTeX documents</p>
              </div>
            </div>

            <div className="relative">
              <pre className="p-5 rounded-xl bg-[#161b22] border border-[#2a2d47]/50 text-sm text-[#b4bcd0] font-mono overflow-x-auto">
                {bibtexCitation}
              </pre>
              <button
                onClick={() => copyToClipboard(bibtexCitation, 'bibtex')}
                className="absolute top-3 right-3 p-2 rounded-lg bg-[#2a2d47]/50 hover:bg-[#4d6bfa]/20 transition-colors"
              >
                {copiedBibtex ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-[#b4bcd0]" />
                )}
              </button>
            </div>
          </div>

          {/* GB/T 7714 Citation */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#4d6bfa]/20 to-[#4353fa]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#4d6bfa]" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">GB/T 7714</h3>
                <p className="text-xs text-[#b4bcd0]">For Chinese journals</p>
              </div>
            </div>

            <div className="relative">
              <pre className="p-5 rounded-xl bg-[#161b22] border border-[#2a2d47]/50 text-sm text-[#b4bcd0] font-mono overflow-x-auto">
                {gbCitation}
              </pre>
              <button
                onClick={() => copyToClipboard(gbCitation, 'gb')}
                className="absolute top-3 right-3 p-2 rounded-lg bg-[#2a2d47]/50 hover:bg-[#4d6bfa]/20 transition-colors"
              >
                {copiedGB ? (
                  <Check className="w-4 h-4 text-green-400" />
                ) : (
                  <Copy className="w-4 h-4 text-[#b4bcd0]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* License */}
        <div
          className={`mt-12 p-8 rounded-2xl bg-[#161b22]/80 border border-[#2a2d47]/50 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4d6bfa]/20 to-[#4353fa]/10 flex items-center justify-center flex-shrink-0">
              <Scale className="w-6 h-6 text-[#4d6bfa]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-3">License</h3>
              <p className="text-[#b4bcd0] leading-relaxed mb-4">
                This dataset is released under the{' '}
                <span className="text-white font-medium">CC BY-NC-SA 4.0</span>{' '}
                (Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International) license.
              </p>
              <div className="flex flex-wrap gap-3">
                {[
                  'Attribution required',
                  'Non-commercial use only',
                  'Share alike',
                  'No warranty',
                ].map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1.5 text-xs rounded-full bg-[#4d6bfa]/10 text-[#4d6bfa] border border-[#4d6bfa]/30"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-[#b4bcd0]">
                For commercial use inquiries, please contact us at{' '}
                <a
                  href="mailto:contact@levir-mf.org"
                  className="text-[#4d6bfa] hover:underline"
                >
                  contact@levir-mf.org
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
