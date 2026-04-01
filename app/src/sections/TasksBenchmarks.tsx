import { useState, useEffect, useRef } from 'react';
import { 
  Target, 
  MessageSquare, 
  BarChart3, 
  TrendingUp, 
  CheckCircle, 
  Brain,
  Eye,
  FileText,
  Layers,
  Sparkles,
  ArrowRight,
  Cpu,
  GitBranch,
  Zap,
  Award,
  Search,
  RefreshCw,
  Scale,
  Trophy
} from 'lucide-react';

// Training Tasks & Applications
const trainingTasks = [
  {
    category: 'Supervised Fine-Tuning',
    icon: Target,
    color: '#4d6bfa',
    tasks: [
      { name: 'SFT', fullName: 'Supervised Fine-Tuning', desc: 'Standard instruction tuning on step-by-step annotations' },
      { name: 'TTS', fullName: 'Test-Time Scaling', desc: 'Generate multiple reasoning paths at inference' },
    ],
  },
  {
    category: 'Preference Optimization',
    icon: Scale,
    color: '#22c55e',
    tasks: [
      { name: 'PPO', fullName: 'Proximal Policy Optimization', desc: 'RL-based optimization with outcome rewards' },
      { name: 'DPO', fullName: 'Direct Preference Optimization', desc: 'Direct preference learning without explicit reward model' },
      { name: 'GRPO', fullName: 'Group Relative Policy Optimization', desc: 'Group-based relative policy optimization' },
      { name: 'KTO', fullName: 'Kahneman-Tversky Optimization', desc: 'Human-aware loss function for alignment' },
    ],
  },
  {
    category: 'Reward Modeling',
    icon: Award,
    color: '#f59e0b',
    tasks: [
      { name: 'ORM', fullName: 'Outcome Reward Model', desc: 'Binary/graded rewards for final answer correctness' },
      { name: 'PRM', fullName: 'Process Reward Model', desc: 'Fine-grained step-by-step error diagnosis', highlight: true },
    ],
  },
];

// Model capabilities showcase
const capabilities = [
  {
    icon: Brain,
    title: 'Step-by-Step Reasoning',
    desc: 'Models learn to decompose complex remote sensing analysis into 6 logical thinking stages',
  },
  {
    icon: Search,
    title: 'Fine-grained Error Diagnosis',
    desc: 'PRM training enables identifying which specific thinking step contains errors',
  },
  {
    icon: RefreshCw,
    title: 'Self-Reflection',
    desc: 'Confidence scoring trains models to recognize their own limitations and uncertainties',
  },
  {
    icon: Zap,
    title: 'Multi-Task Generalization',
    desc: 'Single dataset supports diverse training paradigms from SFT to advanced RLHF',
  },
];

export default function TasksBenchmarks() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
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
            <span className="text-sm font-medium text-[#4d6bfa]">Training Methodologies</span>
          </div>
          <h2 className="section-title">
            Versatile <span className="gradient-text">Training Paradigms</span>
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            The structured annotation format supports comprehensive training methodologies 
            from supervised fine-tuning to preference-based reinforcement learning 
            with process-level reward modeling
          </p>
        </div>

        {/* Task Categories Tabs */}
        <div
          className={`flex flex-wrap justify-center gap-3 mb-10 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {trainingTasks.map((cat, index) => (
            <button
              key={cat.category}
              onClick={() => setActiveCategory(index)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeCategory === index
                  ? 'bg-[#4d6bfa] text-white shadow-lg shadow-[#4d6bfa]/30'
                  : 'bg-[#161b22]/80 text-[#b4bcd0] border border-[#2a2d47]/50 hover:border-[#4d6bfa]/50'
              }`}
            >
              <cat.icon className="w-4 h-4" />
              {cat.category}
            </button>
          ))}
        </div>

        {/* Active Tasks Display */}
        <div
          className={`mb-16 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid md:grid-cols-2 gap-4">
            {trainingTasks[activeCategory].tasks.map((task, index) => (
              <div
                key={task.name}
                className={`group relative p-6 rounded-2xl border transition-all duration-500 hover:-translate-y-1 ${
                  task.highlight
                    ? 'bg-gradient-to-br from-[#f59e0b]/10 to-[#161b22] border-[#f59e0b]/50'
                    : 'bg-[#161b22]/80 border-[#2a2d47]/50 hover:border-[#4d6bfa]/50'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Highlight Badge */}
                {task.highlight && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-2 py-1 rounded-full bg-[#f59e0b]/20 text-[#f59e0b] text-xs font-medium">
                    <Trophy className="w-3 h-3" />
                    Key Feature
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Task Icon */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${trainingTasks[activeCategory].color}20` }}
                  >
                    <span
                      className="text-lg font-bold"
                      style={{ color: trainingTasks[activeCategory].color }}
                    >
                      {task.name}
                    </span>
                  </div>

                  {/* Task Info */}
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-white mb-1">{task.fullName}</h4>
                    <p className="text-sm text-[#8b949e]">{task.desc}</p>
                  </div>
                </div>

                {/* Decorative corner */}
                <div
                  className="absolute bottom-0 right-0 w-24 h-24 rounded-tl-full opacity-10 group-hover:opacity-20 transition-opacity"
                  style={{ backgroundColor: trainingTasks[activeCategory].color }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* PRM Highlight Section */}
        <div
          className={`mb-16 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="p-8 rounded-2xl bg-gradient-to-br from-[#f59e0b]/10 via-[#161b22] to-[#161b22] border border-[#f59e0b]/30 relative overflow-hidden">
            {/* Background decoration */}
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

                <p className="text-[#b4bcd0] leading-relaxed mb-6">
                  Conventional outcome reward models provide only binary feedback on final answers. 
                  Our framework enables <strong className="text-white">fine-grained process supervision</strong> 
                  with per-step scalar rewards, facilitating precise credit assignment and 
                  intermediate error detection in multi-step reasoning chains.
                </p>

                <div className="space-y-3">
                  {[
                    'Per-step credit assignment for long-horizon reasoning',
                    'Hallucination detection at intermediate stages',
                    'Fine-grained feedback for targeted model improvement',
                    'Enhanced interpretability through step-wise evaluation',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-[#8b949e]">
                      <CheckCircle className="w-4 h-4 text-[#f59e0b] flex-shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual Diagram */}
              <div className="bg-[#0d1117] rounded-xl p-6 border border-[#2a2d47]/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-[#6e7681]">ORM vs PRM Comparison</span>
                </div>

                {/* ORM */}
                <div className="mb-6 p-4 rounded-lg bg-[#161b22] border border-[#2a2d47]/50">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full bg-[#6e7681]" />
                    <span className="text-sm font-medium text-[#b4bcd0]">ORM (Outcome)</span>
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
                  </div>
                  <div className="space-y-2">
                    {['Step 1', 'Step 2', 'Step 3', '...', 'Answer'].map((step, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="flex-1 h-6 rounded bg-[#2a2d47]/50 flex items-center px-2 text-xs text-[#b4bcd0]">{step}</div>
                        <div className={`w-12 h-6 rounded flex items-center justify-center text-xs font-medium ${
                          i === 2 ? 'bg-[#ef4444]/20 text-[#ef4444]' : 'bg-[#22c55e]/20 text-[#22c55e]'
                        }`}>
                          {i === 2 ? '✗' : '✓'}
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

        {/* Capabilities Grid */}
        <div
          className={`transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h3 className="text-xl font-semibold text-white text-center mb-8">
            Supported Research Applications
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilities.map((cap, index) => (
              <div
                key={cap.title}
                className="group p-6 rounded-xl bg-[#161b22]/50 border border-[#2a2d47]/50 hover:border-[#4d6bfa]/50 transition-all duration-300 hover:-translate-y-1"
                style={{ transitionDelay: `${400 + index * 50}ms` }}
              >
                <div className="w-12 h-12 rounded-lg bg-[#4d6bfa]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <cap.icon className="w-6 h-6 text-[#4d6bfa]" />
                </div>
                <h4 className="text-base font-semibold text-white mb-2">{cap.title}</h4>
                <p className="text-sm text-[#8b949e]">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className={`mt-12 text-center transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#4d6bfa] text-white font-medium hover:bg-[#4353fa] transition-colors shadow-lg shadow-[#4d6bfa]/30"
          >
            <TrendingUp className="w-5 h-5" />
            Access Training Code
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
