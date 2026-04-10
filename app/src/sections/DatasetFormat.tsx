import { useEffect, useRef, useState } from 'react';
import { 
  Brain, 
  Eye, 
  Network, 
  Lightbulb, 
  Telescope, 
  ShieldCheck,
  Code,
  Copy,
  Check,
  Layers,
  Workflow
} from 'lucide-react';

// 6步思考流程定义
const thinkingSteps = [
  {
    id: 'step_1',
    key: 'global_perception',
    label: 'Global Perception',
    labelZh: '全局感知',
    icon: Eye,
    color: '#4d6bfa',
    description: 'Understand the overall scene context and macro-level changes',
  },
  {
    id: 'step_2',
    key: 'instance_visual',
    label: 'Instance Visual',
    labelZh: '实例视觉',
    icon: Layers,
    color: '#22c55e',
    description: 'Identify and localize specific changed objects/regions',
  },
  {
    id: 'step_3',
    key: 'relational_model',
    label: 'Relational Model',
    labelZh: '关系建模',
    icon: Network,
    color: '#f59e0b',
    description: 'Model spatial and semantic relationships between entities',
  },
  {
    id: 'step_4',
    key: 'reasoning',
    label: 'Reasoning',
    labelZh: '逻辑推理',
    icon: Brain,
    color: '#ec4899',
    description: 'Perform multi-hop reasoning about change causes and effects',
  },
  {
    id: 'step_5',
    key: 'future_inference',
    label: 'Future Inference',
    labelZh: '未来推断',
    icon: Telescope,
    color: '#8b5cf6',
    description: 'Predict potential future developments based on changes',
  },
  {
    id: 'step_6',
    key: 'confidence',
    label: 'Confidence Assessment',
    labelZh: '置信度评估',
    icon: ShieldCheck,
    color: '#06b6d4',
    description: 'Self-evaluate certainty and identify limitations',
  },
];

// JSON格式示例
const jsonExample = `{
  "thought_process": {
    "step_1_global_perception": "The scene shows a rural area with agricultural fields and scattered buildings. The overall landscape has undergone significant transformation...",
    "step_2_instance_visual": "Key changes include: (1) New construction site in the north, (2) Expanded road network, (3) Deforested area of ~2.3 hectares...",
    "step_3_relational_model": "The construction site is adjacent to the expanded road, suggesting infrastructure development. The deforestation correlates with...",
    "step_4_reasoning": "Based on the patterns observed, this appears to be urban expansion driven by population growth. The proximity to the highway indicates...",
    "step_5_future_inference": "Given the current development rate, the remaining forested area may be converted within 3-5 years. New residential zones are likely...",
    "step_6_confidence": {
      "score": 0.92,
      "justification": "High-resolution imagery provides clear evidence of changes. Multiple verification sources support the conclusions.",
      "limitations": "Cloud cover in T2 image slightly obscures eastern boundary",
      "alternative_l2_candidates": ["Industrial development", "Agricultural expansion"]
    }
  },
  "answer": "A new residential construction project has begun in the northern part of the scene, accompanied by road infrastructure expansion..."
}`;

// 数据格式区块组件
export default function DatasetFormat() {
  // 可见性、当前步骤和复制状态
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // IntersectionObserver 可见性检测
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

  // 复制功能处理
  const handleCopy = () => {
    navigator.clipboard.writeText(jsonExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="format" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* 背景效果 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04070a] via-[#0d1117] to-[#04070a]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4d6bfa]/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 区块标题 */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4d6bfa]/10 border border-[#4d6bfa]/30 mb-6">
            <Workflow className="w-4 h-4 text-[#4d6bfa]" />
            <span className="text-sm font-medium text-[#4d6bfa]">Structured Thinking Format</span>
          </div>
          <h2 className="section-title">
            Structured Multimodal Chain of Reasoning
          </h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Our dataset pioneers a structured reasoning format that enables models to learn 
            <strong className="text-white"> explicit thinking processes</strong> beyond simple answer generation
          </p>
        </div>

        {/* 思考步骤选择器 */}
        <div
          className={`mb-16 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {thinkingSteps.map((step, index) => (
              <div
                key={step.id}
                className={`relative p-4 rounded-xl border transition-all duration-300 cursor-pointer group ${
                  activeStep === index
                    ? 'bg-[#4d6bfa]/20 border-[#4d6bfa] shadow-lg shadow-[#4d6bfa]/20'
                    : 'bg-[#161b22]/80 border-[#2a2d47]/50 hover:border-[#4d6bfa]/50'
                }`}
                onClick={() => setActiveStep(index)}
              >
                {/* 步骤编号 */}
                <div
                  className="absolute -top-3 -left-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ backgroundColor: step.color }}
                >
                  {index + 1}
                </div>

                {/* 步骤图标 */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 mx-auto transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  <step.icon className="w-5 h-5" style={{ color: step.color }} />
                </div>

                {/* 步骤标签 */}
                <h4 className="text-sm font-semibold text-white text-center mb-1">{step.label}</h4>
                <p className="text-xs text-[#6e7681] text-center">{step.labelZh}</p>

                {/* 激活指示器 */}
                {activeStep === index && (
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#4d6bfa] rounded-full" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 详情和JSON示例 */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* 当前步骤详情 */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            <div className="p-8 rounded-2xl bg-gradient-to-br from-[#161b22] to-[#0d1117] border border-[#2a2d47]/50 h-full">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${thinkingSteps[activeStep].color}20` }}
                >
                  {(() => {
                    const Icon = thinkingSteps[activeStep].icon;
                    return <Icon className="w-7 h-7" style={{ color: thinkingSteps[activeStep].color }} />;
                  })()}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{thinkingSteps[activeStep].label}</h3>
                  <p className="text-[#6e7681]">{thinkingSteps[activeStep].labelZh}</p>
                </div>
              </div>

              <p className="text-[#b4bcd0] leading-relaxed text-lg mb-6">
                {thinkingSteps[activeStep].description}
              </p>

              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-[#4d6bfa]" />
                  Training Benefits
                </h4>
                <ul className="space-y-2">
                  {[
                    'Enables step-by-step reasoning capability',
                    'Improves model interpretability and debugging',
                    'Supports process supervision (PRM) training',
                    'Facilitates error analysis and refinement',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-[#8b949e]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#4d6bfa] mt-1.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* JSON代码示例 */}
          <div
            className={`transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="rounded-2xl bg-[#0d1117] border border-[#2a2d47]/50 overflow-hidden">
              {/* 代码块头部 */}
              <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-[#2a2d47]/50">
                <div className="flex items-center gap-2">
                  <Code className="w-4 h-4 text-[#4d6bfa]" />
                  <span className="text-sm text-[#b4bcd0]">annotation_format.json</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2a2d47]/50 hover:bg-[#4d6bfa]/20 text-xs text-[#b4bcd0] hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#22c55e]" />
                      <span className="text-[#22c55e]">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* 代码内容 */}
              <div className="p-4 overflow-x-auto">
                <pre className="text-xs leading-relaxed">
                  <code className="text-[#b4bcd0]">
                    <span className="text-[#ff7b72]">{'{'}</span>
                    {'\n'}  <span className="text-[#7ee787]">"thought_process"</span>
                    <span className="text-[#ff7b72]">: {'{'}</span>
                    {'\n'}    <span className="text-[#7ee787]">"step_1_global_perception"</span>
                    <span className="text-[#ff7b72]">:</span> <span className="text-[#a5d6ff]">"..."</span>
                    <span className="text-[#ff7b72]">,</span>
                    {'\n'}    <span className="text-[#7ee787]">"step_2_instance_visual"</span>
                    <span className="text-[#ff7b72]">:</span> <span className="text-[#a5d6ff]">"..."</span>
                    <span className="text-[#ff7b72]">,</span>
                    {'\n'}    <span className="text-[#7ee787]">"step_3_relational_model"</span>
                    <span className="text-[#ff7b72]">:</span> <span className="text-[#a5d6ff]">"..."</span>
                    <span className="text-[#ff7b72]">,</span>
                    {'\n'}    <span className="text-[#7ee787]">"step_4_reasoning"</span>
                    <span className="text-[#ff7b72]">:</span> <span className="text-[#a5d6ff]">"..."</span>
                    <span className="text-[#ff7b72]">,</span>
                    {'\n'}    <span className="text-[#7ee787]">"step_5_future_inference"</span>
                    <span className="text-[#ff7b72]">:</span> <span className="text-[#a5d6ff]">"..."</span>
                    <span className="text-[#ff7b72]">,</span>
                    {'\n'}    <span className="text-[#7ee787]">"step_6_confidence"</span>
                    <span className="text-[#ff7b72]">: {'{'}</span>
                    {'\n'}      <span className="text-[#7ee787]">"score"</span>
                    <span className="text-[#ff7b72]">:</span> <span className="text-[#79c0ff]">0.92</span>
                    <span className="text-[#ff7b72]">,</span>
                    {'\n'}      <span className="text-[#7ee787]">"justification"</span>
                    <span className="text-[#ff7b72]">:</span> <span className="text-[#a5d6ff]">"..."</span>
                    <span className="text-[#ff7b72]">,</span>
                    {'\n'}      <span className="text-[#7ee787]">"limitations"</span>
                    <span className="text-[#ff7b72]">:</span> <span className="text-[#a5d6ff]">"..."</span>
                    <span className="text-[#ff7b72]">,</span>
                    {'\n'}      <span className="text-[#7ee787]">"alternative_l2_candidates"</span>
                    <span className="text-[#ff7b72]">:</span> <span className="text-[#ff7b72]">[]</span>
                    {'\n'}    <span className="text-[#ff7b72]">{'}'}</span>
                    {'\n'}  <span className="text-[#ff7b72]">{'}'}</span>
                    <span className="text-[#ff7b72]">,</span>
                    {'\n'}  <span className="text-[#7ee787]">"answer"</span>
                    <span className="text-[#ff7b72]">:</span> <span className="text-[#a5d6ff]">"Final generated description..."</span>
                    {'\n'}<span className="text-[#ff7b72]">{'}'}</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* 关键优势部分 */}
        <div
          className={`mt-16 grid md:grid-cols-3 gap-6 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            {
              title: 'Process Supervision Ready',
              desc: 'Each thinking step can be independently evaluated, enabling fine-grained reward modeling (PRM)',
            },
            {
              title: 'Multi-Task Compatible',
              desc: 'Supports SFT, PPO, DPO, GRPO, KTO and other RLHF training paradigms',
            },
            {
              title: 'Self-Reflection Through Calibration',
              desc: 'We implement a preference-aligned confidence scoring mechanism that mitigates hallucination by making the model aware of and corrective about its limitations.',
            },
          ].map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-xl bg-[#161b22]/50 border border-[#2a2d47]/50 hover:border-[#4d6bfa]/30 transition-colors"
            >
              <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
              <p className="text-sm text-[#8b949e]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
