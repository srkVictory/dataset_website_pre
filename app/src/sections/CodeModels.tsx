import { useState, useEffect, useRef } from 'react';
import { Terminal, Download, Github, BookOpen, Cpu, Copy, Check } from 'lucide-react';

const setupSteps = [
  {
    title: 'Clone Repository',
    command: 'git clone https://github.com/levir-mf/dataset.git',
  },
  {
    title: 'Install Dependencies',
    command: 'pip install -r requirements.txt',
  },
  {
    title: 'Download Dataset',
    command: 'python scripts/download_data.py',
  },
  {
    title: 'Run Evaluation',
    command: 'python eval.py --config configs/baseline.yaml',
  },
];

const models = [
  { name: 'ChangeFormer', params: '45M', checkpoint: 'changeformer_best.pth', size: '180MB' },
  { name: 'BIT', params: '32M', checkpoint: 'bit_best.pth', size: '128MB' },
  { name: 'STAN', params: '28M', checkpoint: 'stan_best.pth', size: '112MB' },
  { name: 'IFN', params: '38M', checkpoint: 'ifn_best.pth', size: '152MB' },
];

export default function CodeModels() {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
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

  const copyCommand = (command: string, index: number) => {
    navigator.clipboard.writeText(command);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section id="code" ref={sectionRef} className="py-24 relative">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4d6bfa]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title">Code & Models</h2>
          <p className="section-subtitle">
            Quick start guides and pre-trained model checkpoints
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Environment Setup */}
          <div
            className={`space-y-6 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4d6bfa]/20 to-[#4353fa]/10 flex items-center justify-center">
                <Terminal className="w-6 h-6 text-[#4d6bfa]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Environment Setup</h3>
                <p className="text-sm text-[#b4bcd0]">Python 3.8+ and PyTorch 1.10+</p>
              </div>
            </div>

            <div className="space-y-4">
              {setupSteps.map((step, index) => (
                <div
                  key={step.title}
                  className={`p-4 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${200 + index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{step.title}</span>
                    <button
                      onClick={() => copyCommand(step.command, index)}
                      className="p-1.5 rounded-lg hover:bg-[#4d6bfa]/10 transition-colors"
                    >
                      {copiedIndex === index ? (
                        <Check className="w-4 h-4 text-green-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-[#b4bcd0]" />
                      )}
                    </button>
                  </div>
                  <code className="block p-3 rounded-lg bg-[#04070a] text-sm text-[#4d6bfa] font-mono overflow-x-auto">
                    {step.command}
                  </code>
                </div>
              ))}
            </div>

            {/* OpenCD Integration */}
            <div className="p-6 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="w-5 h-5 text-[#4d6bfa]" />
                <h4 className="font-semibold text-white">OpenCD Integration</h4>
              </div>
              <p className="text-sm text-[#b4bcd0] mb-4">
                Our dataset is officially integrated with the OpenCD framework for seamless benchmarking.
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#4d6bfa] hover:underline"
              >
                View Integration Guide
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Pre-trained Models */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4d6bfa]/20 to-[#4353fa]/10 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-[#4d6bfa]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Pre-trained Models</h3>
                <p className="text-sm text-[#b4bcd0]">Baseline model checkpoints</p>
              </div>
            </div>

            <div className="space-y-3">
              {models.map((model, index) => (
                <div
                  key={model.name}
                  className={`p-4 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50 hover:border-[#4d6bfa]/50 transition-all duration-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-white">{model.name}</h4>
                      <div className="flex items-center gap-4 mt-1 text-xs text-[#b4bcd0]">
                        <span>{model.params} parameters</span>
                        <span>{model.size}</span>
                      </div>
                    </div>
                    <a
                      href="#"
                      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#4d6bfa]/10 text-[#4d6bfa] hover:bg-[#4d6bfa]/20 transition-colors text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Requirements */}
            <div className="p-6 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50">
              <h4 className="font-semibold text-white mb-4">System Requirements</h4>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Python', value: '≥ 3.8' },
                  { label: 'PyTorch', value: '≥ 1.10' },
                  { label: 'CUDA', value: '≥ 11.0' },
                  { label: 'RAM', value: '≥ 16GB' },
                ].map((req) => (
                  <div key={req.label} className="flex justify-between text-sm">
                    <span className="text-[#b4bcd0]">{req.label}:</span>
                    <span className="text-white font-medium">{req.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
