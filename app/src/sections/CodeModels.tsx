import { useState, useEffect, useRef } from 'react';
import { Terminal, Github, BookOpen, Cpu, Copy, Check, AlertCircle } from 'lucide-react';

const setupSteps = [
  {
    title: 'Clone Repository',
    command: 'git clone https://github.com/levir-mf/dataset.git',
    note: '# Coming soon - Repository under preparation',
  },
  {
    title: 'Install Dependencies',
    command: 'pip install -r requirements.txt',
    note: '# Coming soon - Requirements pending release',
  },
  {
    title: 'Download Dataset',
    command: 'python scripts/download_data.py',
    note: '# Coming soon - Dataset release in progress',
  },
  {
    title: 'Run Evaluation',
    command: 'python eval.py --config configs/baseline.yaml',
    note: '# Coming soon - Evaluation scripts pending',
  },
];



export default function CodeModels() {
  const [isVisible, setIsVisible] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [showAlert, setShowAlert] = useState(false);
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

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

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

            {/* Coming Soon Notice */}
            <div className="p-4 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/30">
              <div className="flex items-center gap-2 text-[#f59e0b]">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Coming Soon</span>
              </div>
              <p className="text-xs text-[#b4bcd0] mt-1">
                Code repository and scripts will be released upon paper acceptance
              </p>
            </div>

            <div className="space-y-4 opacity-60">
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
                  <div className="space-y-1">
                    <code className="block p-3 rounded-lg bg-[#04070a] text-sm text-[#4d6bfa] font-mono overflow-x-auto">
                      {step.command}
                    </code>
                    <code className="block text-xs text-[#f59e0b] font-mono">
                      {step.note}
                    </code>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Right Column: System Requirements + Integration */}
          <div
            className={`space-y-6 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {/* System Requirements */}
            <div className="p-6 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4d6bfa]/20 to-[#4353fa]/10 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-[#4d6bfa]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">System Requirements</h3>
                  <p className="text-xs text-[#b4bcd0]">Minimum hardware & software specs</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Python', value: '≥ 3.8', icon: '🐍' },
                  { label: 'PyTorch', value: '≥ 1.10', icon: '🔥' },
                  { label: 'CUDA', value: '≥ 11.0', icon: '⚡' },
                  { label: 'RAM', value: '≥ 16GB', icon: '💾' },
                  { label: 'GPU VRAM', value: '≥ 24GB', icon: '🎮' },
                  { label: 'Storage', value: '~500GB', icon: '💿' },
                ].map((req, index) => (
                  <div 
                    key={req.label} 
                    className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0d1117]/50 border border-[#2a2d47]/30"
                    style={{ transitionDelay: `${300 + index * 50}ms` }}
                  >
                    <span className="text-base">{req.icon}</span>
                    <div>
                      <span className="text-[10px] text-[#6e7681] block">{req.label}</span>
                      <span className="text-xs text-white font-medium font-mono">{req.value}</span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 p-3 rounded-lg bg-[#4d6bfa]/5 border border-[#4d6bfa]/20">
                <p className="text-[11px] text-[#b4bcd0] leading-relaxed">
                  <span className="text-[#4d6bfa] font-medium">Recommended:</span> NVIDIA A100 or H100 GPUs for optimal performance.
                </p>
              </div>
            </div>

            {/* OpenCD Integration */}
            <div className="p-6 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#22c55e]/20 to-[#16a34a]/10 flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-[#22c55e]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">OpenCD Integration</h3>
                  <p className="text-xs text-[#b4bcd0]">Change Detection Framework</p>
                </div>
              </div>
              <p className="text-sm text-[#b4bcd0] mb-4 leading-relaxed">
                Compatible with OpenCD framework for standardized change detection experiments. Supports various backbone architectures and evaluation protocols.
              </p>
              <div className="flex gap-2 mb-4">
                <span className="px-2 py-1 rounded bg-[#22c55e]/10 text-[#22c55e] text-xs">BIT</span>
                <span className="px-2 py-1 rounded bg-[#22c55e]/10 text-[#22c55e] text-xs">ChangeFormer</span>
                <span className="px-2 py-1 rounded bg-[#22c55e]/10 text-[#22c55e] text-xs">STAN</span>
              </div>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#22c55e] hover:underline"
              >
                View Integration Guide
                <Github className="w-4 h-4" />
              </a>
            </div>

            {/* Quick Links */}
            <div className="p-5 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50">
              <h4 className="text-sm font-semibold text-white mb-3">Quick Links</h4>
              <div className="space-y-2">
                <a href="#" className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1117]/50 border border-[#2a2d47]/30 hover:border-[#4d6bfa]/30 transition-colors group">
                  <span className="text-sm text-[#b4bcd0] group-hover:text-white">Dataset Documentation</span>
                  <span className="text-[#4d6bfa]">→</span>
                </a>
                <a href="#" className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1117]/50 border border-[#2a2d47]/30 hover:border-[#4d6bfa]/30 transition-colors group">
                  <span className="text-sm text-[#b4bcd0] group-hover:text-white">API Reference</span>
                  <span className="text-[#4d6bfa]">→</span>
                </a>
                <a href="#" className="flex items-center justify-between p-2.5 rounded-lg bg-[#0d1117]/50 border border-[#2a2d47]/30 hover:border-[#4d6bfa]/30 transition-colors group">
                  <span className="text-sm text-[#b4bcd0] group-hover:text-white">Model Zoo</span>
                  <span className="text-[#4d6bfa]">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
