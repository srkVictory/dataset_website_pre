import { useEffect, useRef, useState } from 'react';
import {
  Users,
  Gavel,
  Award,
  BarChart3,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Brain,
  GitCompare,
  ShieldCheck,
  TrendingUp,
  Zap
} from 'lucide-react';

const models = [
  { name: 'GPT-4.1', provider: 'OpenAI', color: '#10a37f', desc: 'Advanced multimodal reasoning' },
  { name: 'Gemini', provider: 'Google', color: '#4285f4', desc: 'Strong visual understanding' },
  { name: 'Qwen-VL', provider: 'Alibaba', color: '#5a3fc0', desc: 'Bilingual capability' },
  { name: 'LLaVA', provider: '开源社区', color: '#ff6b6b', desc: 'Open-source specialist' },
  { name: 'QVQ', provider: 'Qwen系列', color: '#f59e0b', desc: 'Visual reasoning focus' },
];

const judges = [
  {
    name: 'Judge-1 VLM',
    type: 'Gemini-based',
    icon: Gavel,
    color: '#4285f4',
    features: ['Step-by-step evaluation', 'Hallucination detection', 'Visual-grounded scoring'],
  },
  {
    name: 'Judge-2 LMM',
    type: 'DeepSeek-based',
    icon: ShieldCheck,
    color: '#22c55e',
    features: ['Multi-modal assessment', 'Reasoning quality check', 'Cross-model comparison'],
  },
  {
    name: 'Judge-3 Rule',
    type: 'Rule-based + GPT-4o',
    icon: Award,
    color: '#f59e0b',
    features: ['Structured evaluation', 'Consistency checking', 'Reference-based scoring'],
  },
];

const evaluationMetrics = [
  {
    step: 'Step 1',
    name: 'Global Perception',
    criteria: 'Scene understanding accuracy, context awareness',
  },
  {
    step: 'Step 2',
    name: 'Instance Visual',
    criteria: 'Change localization precision, visual evidence',
  },
  {
    step: 'Step 3-5',
    name: 'Reasoning Chain',
    criteria: 'Logical coherence, causal inference quality',
  },
  {
    step: 'Step 6',
    name: 'Confidence & Reflection',
    criteria: 'Self-awareness, limitation acknowledgment',
  },
];

export default function ModelEvaluation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'models' | 'judges' | 'metrics'>('models');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="evaluation" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04070a] via-[#0a0f1a] to-[#04070a]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#4d6bfa]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4d6bfa]/10 border border-[#4d6bfa]/30 mb-6">
            <GitCompare className="w-4 h-4 text-[#4d6bfa]" />
            <span className="text-sm font-medium text-[#4d6bfa]">Multi-Model Evaluation</span>
          </div>
          <h2 className="section-title">
            5 Models <span className="gradient-text">×</span> 3 Judges
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Unique dataset with <strong className="text-white">19,705 multi-model annotations</strong> and 
            comprehensive judge evaluations for training robust reward models and detecting hallucinations
          </p>
        </div>

        {/* Stats Row */}
        <div
          className={`grid grid-cols-3 gap-6 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '5', label: 'VLM Models', icon: Brain, color: '#4d6bfa' },
            { value: '3', label: 'Judge Systems', icon: Gavel, color: '#22c55e' },
            { value: '19K+', label: 'Evaluated Samples', icon: BarChart3, color: '#f59e0b' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-xl bg-[#161b22]/50 border border-[#2a2d47]/50"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div
                className="w-12 h-12 mx-auto mb-3 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div className="text-3xl font-bold text-white font-['Poppins']">{stat.value}</div>
              <div className="text-sm text-[#8b949e]">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div
          className={`flex justify-center gap-2 mb-10 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { id: 'models', label: 'Annotator Models', icon: Users },
            { id: 'judges', label: 'Judge Systems', icon: Gavel },
            { id: 'metrics', label: 'Evaluation Metrics', icon: BarChart3 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-[#4d6bfa] text-white shadow-lg shadow-[#4d6bfa]/30'
                  : 'bg-[#161b22]/80 text-[#b4bcd0] border border-[#2a2d47]/50 hover:border-[#4d6bfa]/50'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Models Tab */}
          {activeTab === 'models' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {models.map((model, index) => (
                <div
                  key={model.name}
                  className="group p-5 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50 hover:border-[#4d6bfa]/50 transition-all duration-300 hover:-translate-y-1"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${model.color}20` }}
                    >
                      <Brain className="w-5 h-5" style={{ color: model.color }} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white">{model.name}</h4>
                      <p className="text-xs text-[#6e7681]">{model.provider}</p>
                    </div>
                  </div>
                  <p className="text-sm text-[#8b949e]">{model.desc}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-[#4d6bfa]/10 text-[#4d6bfa]">
                      ~3,900 samples
                    </span>
                  </div>
                </div>
              ))}
              <div className="p-5 rounded-xl bg-gradient-to-br from-[#4d6bfa]/20 to-[#161b22] border border-[#4d6bfa]/30 flex flex-col justify-center items-center text-center">
                <Sparkles className="w-8 h-8 text-[#4d6bfa] mb-2" />
                <p className="text-sm text-[#b4bcd0]">
                  Multi-model diversity enables <strong className="text-white">ensemble learning</strong> and{' '}
                  <strong className="text-white">robustness training</strong>
                </p>
              </div>
            </div>
          )}

          {/* Judges Tab */}
          {activeTab === 'judges' && (
            <div className="grid md:grid-cols-3 gap-6">
              {judges.map((judge, index) => (
                <div
                  key={judge.name}
                  className="group p-6 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50 hover:border-[#4d6bfa]/50 transition-all duration-300"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${judge.color}20` }}
                  >
                    <judge.icon className="w-7 h-7" style={{ color: judge.color }} />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-1">{judge.name}</h4>
                  <p className="text-sm text-[#6e7681] mb-4">{judge.type}</p>
                  <ul className="space-y-2">
                    {judge.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#8b949e]">
                        <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: judge.color }} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          )}

          {/* Metrics Tab */}
          {activeTab === 'metrics' && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {evaluationMetrics.map((metric, index) => (
                  <div
                    key={metric.step}
                    className="p-5 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 rounded-lg bg-[#4d6bfa]/20 flex items-center justify-center text-sm font-bold text-[#4d6bfa]">
                        {metric.step}
                      </span>
                      <h4 className="font-semibold text-white">{metric.name}</h4>
                    </div>
                    <p className="text-sm text-[#8b949e] ml-11">{metric.criteria}</p>
                  </div>
                ))}
              </div>
              <div className="p-5 rounded-xl bg-gradient-to-r from-[#f59e0b]/10 to-transparent border border-[#f59e0b]/30">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-6 h-6 text-[#f59e0b]" />
                  <h4 className="font-semibold text-white">Hallucination Detection</h4>
                </div>
                <p className="text-sm text-[#b4bcd0]">
                  Each judge evaluates responses for <strong className="text-white">hallucination_flag</strong>, 
                  identifying claims not grounded in the visual evidence. This enables training models 
                  with better factuality and self-awareness.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Benefits */}
        <div
          className={`mt-12 grid md:grid-cols-4 gap-4 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { icon: Award, title: 'Reward Model Training', desc: 'Use judge scores to train PRM/ORM' },
            { icon: ShieldCheck, title: 'Hallucination Mitigation', desc: 'Detect and reduce false claims' },
            { icon: TrendingUp, title: 'Model Comparison', desc: 'Benchmark VLM performance' },
            { icon: Zap, title: 'Ensemble Methods', desc: 'Aggregate multi-model outputs' },
          ].map((item, index) => (
            <div
              key={item.title}
              className="p-4 rounded-lg bg-[#161b22]/50 border border-[#2a2d47]/30 text-center"
            >
              <item.icon className="w-6 h-6 text-[#4d6bfa] mx-auto mb-2" />
              <h5 className="text-sm font-medium text-white mb-1">{item.title}</h5>
              <p className="text-xs text-[#6e7681]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
