import { useEffect, useRef, useState } from 'react';
import {
  Users,
  Gavel,
  Award,
  BarChart3,
  CheckCircle,
  Brain,
  GitCompare,
  ShieldCheck,
  TrendingUp,
  Zap,
  Target,
  Eye,
  Scale,
  GitBranch
} from 'lucide-react';

const models = [
  { name: 'ChatGPT 4.1', provider: 'OpenAI', color: '#10a37f', desc: 'Advanced multimodal reasoning' },
  { name: 'Gemini 2.5 Pro', provider: 'Google', color: '#4285f4', desc: 'Strong visual understanding' },
  { name: 'Qwen 2.5 VL 7B', provider: 'Alibaba', color: '#5a3fc0', desc: 'Bilingual capability' },
  { name: 'LLaVA 7B', provider: 'Open-source', color: '#ff6b6b', desc: 'Open-source specialist' },
  { name: 'QVQ', provider: 'Alibaba', color: '#f59e0b', desc: 'Visual reasoning focus' },
];

const judges = [
  {
    name: 'Judge-1 VLM',
    type: 'Gemini 3.1 Pro',
    icon: Gavel,
    color: '#4285f4',
    features: ['Step-by-step evaluation', 'Hallucination detection', 'Visual-grounded scoring'],
  },
  {
    name: 'Judge-2 LMM',
    type: 'DeepSeek-R1',
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

// Benchmark Results Data
const benchmarkResults = {
  experiment1: {
    title: 'Change Detection Accuracy',
    subtitle: 'CDA, CC-L1, CC-L2 Metrics',
    icon: Target,
    color: '#4d6bfa',
    headers: ['Model', 'CDA', 'CC-L1', 'CC-L2'],
    data: [
      { model: 'LLaVA-OneVision', cda: 50.235, ccl1: 0.68, ccl2: 0.23 },
      { model: 'InternVL3-8B', cda: 51.65, ccl1: 10.03, ccl2: 0.28 },
      { model: 'Qwen2.5-VL-7B', cda: 49.965, ccl1: 0.42, ccl2: 0.25 },
      { model: 'MiMo-V2-Flash', cda: 49.095, ccl1: 5.06, ccl2: 0.96 },
      { model: 'QVQ-Max', cda: 50.425, ccl1: 11.09, ccl2: 0.76 },
      { model: 'SkySense', cda: 78.735, ccl1: 2.80, ccl2: 0.10 },
    ],
  },
  experiment2: {
    title: 'Entailment & Hallucination Analysis',
    subtitle: 'Visual, Logic, Conclusion Entailment & Hallucination Rate',
    icon: Scale,
    color: '#22c55e',
    headers: ['Model', 'Visual', 'Logic', 'Conclusion', 'Hallu. Rate'],
    data: [
      { model: 'Qwen', visual: 45.80, logic: 73.05, conclusion: 47.47, hallu: 0.31 },
      { model: 'LLaVA', visual: 41.56, logic: 67.92, conclusion: 40.02, hallu: 0.74 },
      { model: 'MiMo', visual: 38.06, logic: 65.22, conclusion: 37.80, hallu: 0.16, highlight: true },
      { model: 'QVQ', visual: 43.48, logic: 72.27, conclusion: 40.68, hallu: 0.31 },
      { model: 'SkySense', visual: 29.87, logic: 59.72, conclusion: 29.40, hallu: 1.05 },
      { model: 'InterVL', visual: 37.51, logic: 61.24, conclusion: 11.05, hallu: 16.98 },
    ],
  },
  experiment3: {
    title: 'Multi-dimensional Quality Scoring',
    subtitle: 'Visual Perception, Logic, Application, Depth, Coherence',
    icon: Eye,
    color: '#f59e0b',
    headers: ['Model', 'Perception', 'Logic', 'Rule', 'Depth', 'CoT', 'Overall'],
    data: [
      { model: 'LLaVA-OneVision', perception: 2.04, logic: 1.92, rule: 1.49, depth: 1.98, cot: 2.00, overall: 9.42 },
      { model: 'InternVL3-8B', perception: 1.72, logic: 1.76, rule: 1.56, depth: 1.72, cot: 1.87, overall: 8.64 },
      { model: 'Qwen2.5-VL', perception: 1.80, logic: 1.70, rule: 1.52, depth: 1.72, cot: 1.60, overall: 8.33 },
      { model: 'MiMo-V2-Flash', perception: 2.13, logic: 2.00, rule: 1.90, depth: 2.20, cot: 2.25, overall: 10.47 },
      { model: 'QVQ-Max', perception: 2.35, logic: 2.26, rule: 1.95, depth: 2.38, cot: 2.52, overall: 11.45, highlight: true },
      { model: 'SkySense', perception: 1.56, logic: 1.50, rule: 1.15, depth: 1.53, cot: 1.52, overall: 7.25 },
    ],
  },
};

export default function ModelEvaluation() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'models' | 'judges' | 'metrics'>('metrics');
  const [activeExperiment, setActiveExperiment] = useState<1 | 2 | 3>(1);
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

  const currentExperiment = benchmarkResults[`experiment${activeExperiment}` as keyof typeof benchmarkResults];

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
            Decoupled Multi-Agent Criterion System
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Unique dataset with <strong className="text-white">382284 multi-model annotations</strong> and 
            comprehensive judge evaluations for training robust reward models and detecting hallucinations
          </p>
        </div>

        {/* Stats Row */}
        <div
          className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { value: '5', label: 'VLM Models', icon: Brain, color: '#4d6bfa' },
            { value: '3', label: 'Judge Systems', icon: Gavel, color: '#22c55e' },
            { value: '327K+', label: 'Reasoning Trajectories', icon: GitBranch, color: '#a855f7' },
            { value: '382K+', label: 'Judge Annotations', icon: BarChart3, color: '#f59e0b' },
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
            { id: 'metrics', label: 'Benchmark Results', icon: BarChart3 },
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
                <span className="text-4xl mb-2">🎯</span>
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

          {/* Benchmark Results Tab */}
          {activeTab === 'metrics' && (
            <div className="space-y-6">
              {/* Experiment Selector */}
              <div className="flex flex-wrap justify-center gap-3">
                {[1, 2, 3].map((exp) => {
                  const expData = benchmarkResults[`experiment${exp}` as keyof typeof benchmarkResults];
                  return (
                    <button
                      key={exp}
                      onClick={() => setActiveExperiment(exp as 1 | 2 | 3)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl text-left transition-all ${
                        activeExperiment === exp
                          ? 'bg-[#4d6bfa]/20 border border-[#4d6bfa] text-white'
                          : 'bg-[#161b22]/60 border border-[#2a2d47]/50 text-[#b4bcd0] hover:border-[#4d6bfa]/30'
                      }`}
                    >
                      <expData.icon 
                        className="w-5 h-5" 
                        style={{ color: activeExperiment === exp ? expData.color : '#6e7681' }} 
                      />
                      <div>
                        <div className="text-sm font-medium">{expData.title}</div>
                        <div className="text-xs opacity-70">{expData.subtitle}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Description */}
              <p className="text-center text-[#b4bcd0] text-sm max-w-3xl mx-auto">
                We report metrics across Stage I–III for six models. Strong perception and strong structured reasoning are not the same capability—Geo-BC exposes that gap.
              </p>

              {/* Results Table */}
              <div className="rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50 overflow-hidden">
                {/* Table Header */}
                <div className="flex items-center gap-3 p-4 border-b border-[#2a2d47]/50 bg-gradient-to-r from-[#4d6bfa]/10 to-transparent">
                  <currentExperiment.icon className="w-6 h-6" style={{ color: currentExperiment.color }} />
                  <div>
                    <h4 className="font-semibold text-white">{currentExperiment.title}</h4>
                    <p className="text-xs text-[#6e7681]">{currentExperiment.subtitle}</p>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#2a2d47]/30">
                        {currentExperiment.headers.map((header, idx) => (
                          <th 
                            key={header} 
                            className={`py-3 px-4 text-left text-xs font-medium text-[#6e7681] uppercase tracking-wider ${
                              idx === 0 ? 'w-[180px]' : ''
                            }`}
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {currentExperiment.data.map((row, idx) => (
                        <tr 
                          key={idx} 
                          className={`border-b border-[#2a2d47]/20 last:border-b-0 transition-colors hover:bg-[#4d6bfa]/5 ${
                            (row as any).highlight ? 'bg-[#4d6bfa]/10' : ''
                          }`}
                        >
                          {/* Model Name */}
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-white text-sm">{(row as any).model}</span>
                              {(row as any).highlight && (
                                <span className="px-1.5 py-0.5 text-[10px] rounded bg-[#4d6bfa] text-white font-medium">
                                  Best
                                </span>
                              )}
                            </div>
                          </td>
                          {/* Data Cells */}
                          {activeExperiment === 1 && (
                            <>
                              <td className="py-3 px-4 text-sm text-[#b4bcd0] font-mono">{(row as any).cda?.toFixed(3)}</td>
                              <td className="py-3 px-4 text-sm text-[#b4bcd0] font-mono">{(row as any).ccl1?.toFixed(2)}</td>
                              <td className="py-3 px-4 text-sm text-[#b4bcd0] font-mono">{(row as any).ccl2?.toFixed(2)}</td>
                            </>
                          )}
                          {activeExperiment === 2 && (
                            <>
                              <td className="py-3 px-4 text-sm text-[#b4bcd0] font-mono">{(row as any).visual?.toFixed(2)}</td>
                              <td className="py-3 px-4 text-sm text-[#b4bcd0] font-mono">{(row as any).logic?.toFixed(2)}</td>
                              <td className="py-3 px-4 text-sm text-[#b4bcd0] font-mono">{(row as any).conclusion?.toFixed(2)}</td>
                              <td className={`py-3 px-4 text-sm font-mono ${(row as any).hallu > 1 ? 'text-red-400' : 'text-[#b4bcd0]'}`}>
                                {(row as any).hallu?.toFixed(2)}
                              </td>
                            </>
                          )}
                          {activeExperiment === 3 && (
                            <>
                              <td className="py-3 px-4 text-sm text-[#b4bcd0] font-mono">{(row as any).perception?.toFixed(2)}</td>
                              <td className="py-3 px-4 text-sm text-[#b4bcd0] font-mono">{(row as any).logic?.toFixed(2)}</td>
                              <td className="py-3 px-4 text-sm text-[#b4bcd0] font-mono">{(row as any).rule?.toFixed(2)}</td>
                              <td className="py-3 px-4 text-sm text-[#b4bcd0] font-mono">{(row as any).depth?.toFixed(2)}</td>
                              <td className="py-3 px-4 text-sm text-[#b4bcd0] font-mono">{(row as any).cot?.toFixed(2)}</td>
                              <td className="py-3 px-4 text-sm text-white font-mono font-medium">{(row as any).overall?.toFixed(2)}</td>
                            </>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Metrics Description */}
              <div className="grid md:grid-cols-3 gap-4">
                {activeExperiment === 1 && (
                  <>
                    <div className="p-4 rounded-lg bg-[#161b22]/60 border border-[#2a2d47]/30">
                      <div className="text-sm font-medium text-white mb-1">CDA</div>
                      <div className="text-xs text-[#6e7681]">Change Detection Accuracy - Overall accuracy of detecting bi-temporal changes</div>
                    </div>
                    <div className="p-4 rounded-lg bg-[#161b22]/60 border border-[#2a2d47]/30">
                      <div className="text-sm font-medium text-white mb-1">CC-L1</div>
                      <div className="text-xs text-[#6e7681]">Change Caption L1 - Pixel-level change localization error</div>
                    </div>
                    <div className="p-4 rounded-lg bg-[#161b22]/60 border border-[#2a2d47]/30">
                      <div className="text-sm font-medium text-white mb-1">CC-L2</div>
                      <div className="text-xs text-[#6e7681]">Change Caption L2 - Higher-order change description accuracy</div>
                    </div>
                  </>
                )}
                {activeExperiment === 2 && (
                  <>
                    <div className="p-4 rounded-lg bg-[#161b22]/60 border border-[#2a2d47]/30">
                      <div className="text-sm font-medium text-white mb-1">Visual Entailment</div>
                      <div className="text-xs text-[#6e7681]">Measures visual grounding of claims in satellite imagery</div>
                    </div>
                    <div className="p-4 rounded-lg bg-[#161b22]/60 border border-[#2a2d47]/30">
                      <div className="text-sm font-medium text-white mb-1">Logic Entailment</div>
                      <div className="text-xs text-[#6e7681]">Evaluates causal reasoning and logical coherence</div>
                    </div>
                    <div className="p-4 rounded-lg bg-[#161b22]/60 border border-[#2a2d47]/30">
                      <div className="text-sm font-medium text-white mb-1">Hallucination Rate</div>
                      <div className="text-xs text-[#6e7681]">Percentage of ungrounded claims (lower is better)</div>
                    </div>
                  </>
                )}
                {activeExperiment === 3 && (
                  <>
                    <div className="p-4 rounded-lg bg-[#161b22]/60 border border-[#2a2d47]/30">
                      <div className="text-sm font-medium text-white mb-1">Visual & Logic</div>
                      <div className="text-xs text-[#6e7681]">Visual Perception and Spatiotemporal Logic reasoning scores</div>
                    </div>
                    <div className="p-4 rounded-lg bg-[#161b22]/60 border border-[#2a2d47]/30">
                      <div className="text-sm font-medium text-white mb-1">Rule & Depth</div>
                      <div className="text-xs text-[#6e7681]">Rule Application and Domain Depth expertise metrics</div>
                    </div>
                    <div className="p-4 rounded-lg bg-[#161b22]/60 border border-[#2a2d47]/30">
                      <div className="text-sm font-medium text-white mb-1">CoT & Overall</div>
                      <div className="text-xs text-[#6e7681]">Chain-of-Thought coherence and aggregate quality score</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
