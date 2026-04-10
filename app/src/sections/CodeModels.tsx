import { useState, useEffect, useRef } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

const setupSteps = [
  {
    title: 'Clone Repository',
    command: 'git clone https://github.com/kaynqi/Beyond-Captioning.git',
    note: '# Clone the repository',
  },
  {
    title: 'Download Dataset',
    command: 'python scripts/download_data.py',
    note: '# Download the dataset'
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

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Environment Setup */}
          <div
            className={`transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
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

            {/* Command Cards Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
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


        </div>
      </div>
    </section>
  );
}
