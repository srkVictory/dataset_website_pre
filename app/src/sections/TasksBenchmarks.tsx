import { useState, useEffect, useRef } from 'react';
import { 
  Target, 
  BarChart3, 
  TrendingUp, 
  CheckCircle, 
  ArrowRight,
  Cpu,
  GitBranch,
  Award,
  Scale,
  Layers,
  Database
} from 'lucide-react';

// Training Applications Categories
const trainingCategories = [
  {
    category: 'Supervised Fine-Tuning',
    icon: Target,
    color: '#4d6bfa',
    desc: 'Train models on high-quality chosen trajectories with step-by-step reasoning annotations',
    tasks: [
      { 
        name: 'SFT', 
        fullName: 'Supervised Fine-Tuning', 
        desc: 'Standard instruction tuning on top-ranked chosen trajectories with six-step reasoning annotations',
        detail: 'Using 7:1:2 train/val/test split with non-overlapping geographic locations'
      },
      { 
        name: 'Pro Subset', 
        fullName: 'Challenging Samples', 
        desc: '39,646 particularly difficult samples with balanced 1:1 positive-negative ratio for stress-testing',
        highlight: true
      },
    ],
  },
  {
    category: 'Preference Optimization',
    icon: Scale,
    color: '#22c55e',
    desc: 'Leverage chosen/rejected pairs for alignment without explicit reward models',
    tasks: [
      { 
        name: 'DPO', 
        fullName: 'Direct Preference Optimization', 
        desc: 'Direct preference learning using binary classification on chosen vs rejected pairs',
        detail: 'Trains on 327,672 inference trajectories with preference labels'
      },
      { 
        name: 'PPO', 
        fullName: 'Proximal Policy Optimization', 
        desc: 'RL-based optimization with KL divergence constraints for stable policy updates',
        detail: 'Uses ORM binary rewards (0/10) as outcome signals'
      },
      { 
        name: 'GRPO', 
        fullName: 'Group Relative Policy Optimization', 
        desc: 'Group-based relative optimization for efficient multi-model comparison',
        detail: 'Compares outputs from 5 different VLM generators'
      },
      { 
        name: 'KTO', 
        fullName: 'Kahneman-Tversky Optimization', 
        desc: 'Human-aware loss function that directly optimizes for human preference likelihood',
        detail: 'Accounts for the 1:4 positive-to-negative ratio in the dataset'
      },
    ],
  },
  {
    category: 'Reward Modeling',
    icon: Award,
    color: '#f59e0b',
    desc: 'Step-level dense rewards enable fine-grained process supervision',
    tasks: [
      { 
        name: 'ORM', 
        fullName: 'Outcome Reward Model', 
        desc: 'Binary answer score s_ans ∈ {0, 10} indicating final answer correctness',
        detail: 'Simple but effective for training with outcome-based RL'
      },
      { 
        name: 'PRM', 
        fullName: 'Process Reward Model', 
        desc: 'Step-by-step scoring using 382,284 evaluation statements from decoupled judges',
        highlight: true,
        detail: 'Process score s_proc = (s₁+s₂+s₃+s₄^logic+s₄^rule+s₅+s₆)/7'
      },
    ],
  },
];

// Dataset Statistics
const datasetStats = [
  { label: 'Training Set', value: '70%', desc: '76,457 samples', color: '#4d6bfa' },
  { label: 'Validation Set', value: '10%', desc: '10,922 samples', color: '#22c55e' },
  { label: 'Test Set', value: '20%', desc: '21,845 samples', color: '#f59e0b' },
  { label: 'Pro Subset', value: '39K', desc: 'Challenging samples', color: '#ec4899' },
];

// Six-step reasoning process
const reasoningSteps = [
  { step: 'r₁', name: 'Global Perception', desc: 'Summarize overall scene and establish coarse semantic understanding' },
  { step: 'r₂', name: 'Visual Grounding', desc: 'Identify salient entities, regions, and attributes' },
  { step: 'r₃', name: 'Relation Modeling', desc: 'Capture relative positions, interactions, topological organization' },
  { step: 'r₄', name: 'Causal Reasoning', desc: 'Core reasoning integrating visual evidence with taxonomy rules' },
  { step: 'r₅', name: 'Future Inference', desc: 'Forward-looking reasoning extending analysis to predictions' },
  { step: 'r₆', name: 'Confidence Calibration', desc: 'Self-assessment accounting for uncertainty and limitations' },
];

export default function TasksBenchmarks() {
  const [isVisible, setIsVisible] = useState(false);
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
    <section id="tasks" ref={sectionRef} className="py-24 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#4d6bfa]/5 via-[#04070a] to-[#04070a] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4d6bfa]/10 border border-[#4d6bfa]/30 mb-6">
            <Cpu className="w-4 h-4 text-[#4d6bfa]" />
            <span className="text-sm font-medium text-[#4d6bfa]">Training Applications</span>
          </div>
          <h2 className="section-title">
            Versatile <span className="gradient-text">Training Methods</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Our preference-aligned dataset enables diverse training objectives from supervised fine-tuning 
            to advanced <strong className="text-white">RLAIF</strong>, supporting both benchmark 
            evaluation and downstream applications in Earth observation
          </p>
        </div>

        {/* Dataset Split Stats */}
        <div
          className={`mb-12 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="p-6 rounded-2xl bg-[#161b22]/50 border border-[#2a2d47]/50">
            <div className="flex items-center gap-3 mb-6">
              <Database className="w-5 h-5 text-[#4d6bfa]" />
              <h3 className="text-lg font-semibold text-white">Dataset Split</h3>
              <span className="text-xs text-[#6e7681]">Non-overlapping geographic locations</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {datasetStats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-[#0d1117] border border-[#2a2d47]/30 text-center"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div 
                    className="text-2xl font-bold mb-1"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm text-white font-medium">{stat.label}</div>
                  <div className="text-xs text-[#6e7681]">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Training Applications */}
        <div className="space-y-10">
          {trainingCategories.map((cat, catIndex) => (
            <div
              key={cat.category}
              className={`transition-all duration-700 delay-${200 + catIndex * 100} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${cat.color}20` }}
                >
                  <cat.icon className="w-5 h-5" style={{ color: cat.color }} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{cat.category}</h3>
                  <p className="text-sm text-[#6e7681]">{cat.desc}</p>
                </div>
              </div>

              {/* Tasks Grid */}
              <div className={`grid gap-4 ${
                cat.tasks.length === 2 ? 'grid-cols-2' : 
                cat.tasks.length === 4 ? 'grid-cols-2 lg:grid-cols-4' : 
                'grid-cols-2 lg:grid-cols-3'
              }`}>
                {cat.tasks.map((task, taskIndex) => (
                  <div
                    key={task.name}
                    className={`group relative p-5 rounded-xl border transition-all duration-500 hover:-translate-y-1 ${
                      task.highlight
                        ? 'bg-gradient-to-br from-[#f59e0b]/10 to-[#161b22] border-[#f59e0b]/50'
                        : 'bg-[#161b22]/60 border-[#2a2d47]/50 hover:border-[#4d6bfa]/50'
                    }`}
                    style={{ transitionDelay: `${taskIndex * 50}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Task Icon */}
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${cat.color}20` }}
                      >
                        <span
                          className="text-sm font-bold"
                          style={{ color: cat.color }}
                        >
                          {task.name}
                        </span>
                      </div>

                      {/* Task Info */}
                      <div className="flex-1">
                        <h4 className="text-base font-medium text-white mb-1">{task.fullName}</h4>
                        <p className="text-sm text-[#8b949e] leading-relaxed">{task.desc}</p>
                      </div>
                    </div>

                    {/* Decorative corner */}
                    <div
                      className="absolute bottom-0 right-0 w-16 h-16 rounded-tl-full opacity-10 group-hover:opacity-20 transition-opacity"
                      style={{ backgroundColor: cat.color }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* PRM Highlight Section */}
        <div
          className={`mt-20 mb-16 transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#f59e0b]/10 via-[#161b22] to-[#161b22] border border-[#f59e0b]/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#f59e0b]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/20 flex items-center justify-center">
                    <GitBranch className="w-6 h-6 text-[#f59e0b]" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">Process Reward Model (PRM)</h3>
                    <p className="text-[#f59e0b]">Fine-grained Error Diagnosis</p>
                  </div>
                </div>

                <p className="text-[#b4bcd0] leading-relaxed mb-4">
                  Unlike traditional Outcome Reward Models (ORM) that only evaluate final answers with 
                  binary scores s<sub>ans</sub> ∈ {'{0, 10}'}, our six-stage chain-of-thought enables 
                  <strong className="text-white"> process-level supervision</strong> with scalar step scores.
                </p>

                <div className="p-4 rounded-lg bg-[#0d1117] border border-[#2a2d47]/50 mb-4">
                  <p className="text-xs text-[#6e7681] mb-2">Process Score Formula</p>
                  <p className="text-sm text-[#b4bcd0] font-mono">
                    s<sub>proc</sub> = (s₁ + s₂ + s₃ + s₄<sup>logic</sup> + s₄<sup>rule</sup> + s₅ + s₆) / 7
                  </p>
                </div>

                <div className="space-y-2">
                  {[
                    '382,284 step-level evaluation statements from 3 judges',
                    'Step 4 evaluated by both Logic Expert and Rule Judge',
                    'Precise identification of where reasoning goes wrong',
                    'Enables test-time scaling with step-level beam search',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-[#8b949e]">
                      <CheckCircle className="w-4 h-4 text-[#f59e0b] flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Comparison */}
              <div className="bg-[#0d1117] rounded-xl p-6 border border-[#2a2d47]/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-[#6e7681]">ORM vs PRM Comparison</span>
                </div>

                {/* ORM */}
                <div className="mb-6 p-4 rounded-lg bg-[#161b22] border border-[#2a2d47]/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#6e7681]" />
                    <span className="text-sm font-medium text-[#b4bcd0]">ORM (Outcome)</span>
                    <span className="ml-auto text-xs text-[#6e7681]">s<sub>ans</sub> ∈ {'{0, 10}'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-8 rounded bg-[#2a2d47]/50 flex items-center justify-center text-xs text-[#6e7681]">Process</div>
                    <ArrowRight className="w-4 h-4 text-[#6e7681]" />
                    <div className="flex-1 h-8 rounded bg-[#2a2d47]/50 flex items-center justify-center text-xs text-[#6e7681]">→ Answer</div>
                    <ArrowRight className="w-4 h-4 text-[#6e7681]" />
                    <div className="w-16 h-8 rounded bg-[#22c55e]/20 flex items-center justify-center text-xs text-[#22c55e] font-medium">✓/✗</div>
                  </div>
                  <p className="text-xs text-[#6e7681] mt-2">Only final answer is evaluated</p>
                </div>

                {/* PRM */}
                <div className="p-4 rounded-lg bg-gradient-to-r from-[#f59e0b]/10 to-transparent border border-[#f59e0b]/30">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                    <span className="text-sm font-medium text-white">PRM (Process)</span>
                    <span className="ml-auto text-xs text-[#f59e0b]">s<sub>proc</sub> ∈ [0, 10]</span>
                  </div>
                  <div className="space-y-2">
                    {['r₁: Global Perception', 'r₂: Visual Grounding', 'r₃: Relation Modeling', 'r₄: Causal Reasoning', '...'].map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="flex-1 h-6 rounded bg-[#2a2d47]/50 flex items-center px-2 text-xs text-[#b4bcd0]">{step}</div>
                        <div className={`w-10 h-6 rounded flex items-center justify-center text-xs font-medium ${
                          i === 3 ? 'bg-[#ef4444]/20 text-[#ef4444]' : 'bg-[#22c55e]/20 text-[#22c55e]'
                        }`}>
                          {i === 3 ? '5.2' : '8.5'}
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-[#f59e0b] mt-2">Each step evaluated independently</p>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
