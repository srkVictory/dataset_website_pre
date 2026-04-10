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

        {/* Three Column Layout */}
        <div
          className={`grid grid-cols-12 gap-5 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left: Annotator Models */}
          <div className="col-span-3 flex flex-col">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Users className="w-4 h-4 text-[#4d6bfa]" />
              Annotator Models
            </h3>
            <div className="flex-1 p-4 rounded-2xl bg-[#161b22]/60 border border-[#2a2d47]/50">
              <div className="space-y-2">
                {models.map((model) => (
                  <div
                    key={model.name}
                    className="p-3 rounded-xl bg-[#0d1117]/50 hover:bg-[#0d1117] transition-all"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-7 h-7 rounded flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: `${model.color}20`, color: model.color }}
                      >
                        {model.name.charAt(0)}
                      </div>
                      <span className="text-xs font-medium text-white">{model.name}</span>
                    </div>
                    <p className="text-[10px] text-[#6e7681]">{model.provider}</p>
                    <p className="text-[10px] text-[#8b949e] mt-1 leading-tight">{model.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center: Judge Systems */}
          <div className="col-span-6">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Gavel className="w-4 h-4 text-[#22c55e]" />
              Judge Systems
              <span className="text-xs font-normal text-[#6e7681] ml-2">Decoupled Multi-Agent Evaluation</span>
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {/* Judge 1: VLM */}
              <div className="p-4 rounded-2xl bg-[#161b22]/80 border border-[#4d6bfa]/30 hover:border-[#4d6bfa] transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4d6bfa]/20 flex items-center justify-center">
                    <Eye className="w-5 h-5 text-[#4d6bfa]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Judge-1 VLM</h4>
                    <p className="text-[10px] text-[#4d6bfa]">Gemini 3.1 Pro</p>
                  </div>
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-[#4d6bfa]/10 text-[10px] text-[#4d6bfa] mb-2">Scope: S1-S2</span>
                <p className="text-xs text-[#8b949e] leading-relaxed mb-3">
                  Expert Vision-Language Judge specializing in Remote Sensing. Evaluates <strong className="text-white">visual perception accuracy</strong> and detects hallucinations.
                </p>
                <div className="p-2.5 rounded-lg bg-[#0d1117]/50">
                  <p className="text-[10px] text-[#6e7681] mb-1.5">Evaluation Focus:</p>
                  <ul className="text-[10px] text-[#8b949e] space-y-1">
                    <li>• Step 1: Global scene & visual-semantic coupling</li>
                    <li>• Step 2: Instance grounding (color, texture, shape)</li>
                    <li className="text-red-400/80">• Hallucination detection & penalty</li>
                  </ul>
                </div>
              </div>

              {/* Judge 2: LMM */}
              <div className="p-4 rounded-2xl bg-[#161b22]/80 border border-[#22c55e]/30 hover:border-[#22c55e] transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#22c55e]/20 flex items-center justify-center">
                    <GitBranch className="w-5 h-5 text-[#22c55e]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Judge-2 LMM</h4>
                    <p className="text-[10px] text-[#22c55e]">DeepSeek-R1</p>
                  </div>
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-[#22c55e]/10 text-[10px] text-[#22c55e] mb-2">Scope: S3-S5</span>
                <p className="text-xs text-[#8b949e] leading-relaxed mb-3">
                  Spatial-Temporal Logic Judge. Evaluates <strong className="text-white">reasoning chains</strong>, spatial relations, and future inferences based on taxonomy rules.
                </p>
                <div className="p-2.5 rounded-lg bg-[#0d1117]/50">
                  <p className="text-[10px] text-[#6e7681] mb-1.5">Evaluation Focus:</p>
                  <ul className="text-[10px] text-[#8b949e] space-y-1">
                    <li>• Step 3: Spatial logic (9-grid) & relations</li>
                    <li>• Step 4: Positive/Negative chain filtering</li>
                    <li>• Step 5: Future inference grounding</li>
                  </ul>
                </div>
              </div>

              {/* Judge 3: Rule */}
              <div className="p-4 rounded-2xl bg-[#161b22]/80 border border-[#f59e0b]/30 hover:border-[#f59e0b] transition-all">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center">
                    <Scale className="w-5 h-5 text-[#f59e0b]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Judge-3 Rule</h4>
                    <p className="text-[10px] text-[#f59e0b]">Rule + GPT-4o</p>
                  </div>
                </div>
                <span className="inline-block px-2 py-0.5 rounded-full bg-[#f59e0b]/10 text-[10px] text-[#f59e0b] mb-2">Scope: S4,S6,Ans</span>
                <p className="text-xs text-[#8b949e] leading-relaxed mb-3">
                  Strict Rule-Based Compliance Judge — an <strong className="text-white">inflexible AI prosecutor</strong>. Validates Level 2 taxonomy adherence and answer correctness.
                </p>
                <div className="p-2.5 rounded-lg bg-[#0d1117]/50">
                  <p className="text-[10px] text-[#6e7681] mb-1.5">Evaluation Focus:</p>
                  <ul className="text-[10px] text-[#8b949e] space-y-1">
                    <li>• Step 4: Level 2 semantic shift validation</li>
                    <li>• Step 6: Academic rigor & limitations</li>
                    <li className="text-red-400/80">• Answer Match: HARD 0/10 metric</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Dataset Stats */}
          <div className="col-span-3 flex flex-col">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#ec4899]" />
              Dataset Scale
            </h3>
            <div className="flex-1 space-y-3">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#4d6bfa]/20 to-[#161b22] border border-[#4d6bfa]/30">
                <div className="text-2xl font-bold text-white mb-1">327K+</div>
                <div className="text-xs text-[#8b949e]">Reasoning Trajectories</div>
                <p className="text-[10px] text-[#6e7681] mt-1">Six-step CoT with per-step evaluations</p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#22c55e]/20 to-[#161b22] border border-[#22c55e]/30">
                <div className="text-2xl font-bold text-white mb-1">382K+</div>
                <div className="text-xs text-[#8b949e]">Review Comments</div>
                <p className="text-[10px] text-[#6e7681] mt-1">Detailed judge feedback with scoring</p>
              </div>

              <div className="p-4 rounded-2xl bg-gradient-to-br from-[#f59e0b]/20 to-[#161b22] border border-[#f59e0b]/30">
                <div className="text-2xl font-bold text-white mb-1">109K</div>
                <div className="text-xs text-[#8b949e]">Final Samples</div>
                <p className="text-[10px] text-[#6e7681] mt-1">After quality filtering & validation</p>
              </div>

              <div className="p-3 rounded-xl bg-[#161b22]/60 border border-[#2a2d47]/50">
                <div className="flex items-center justify-center gap-3 text-[10px]">
                  <span className="text-white font-medium">5 Models</span>
                  <span className="text-[#2a2d47]">×</span>
                  <span className="text-white font-medium">3 Judges</span>
                  <span className="text-[#2a2d47]">=</span>
                  <span className="text-[#4d6bfa] font-medium">15 Evals</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
