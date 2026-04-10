import { useEffect, useRef, useState } from 'react';
import { 
  Workflow, 
  Brain, 
  GitBranch, 
  Target,
  ChevronRight,
  ChevronDown,
  Award,
  FileJson,
  Database
} from 'lucide-react';

// 步骤详情数据（基于 prompt）
const stepDetails = {
  r1: {
    title: 'Global Perception',
    subtitle: 'step_1_global_perception',
    description: 'Summarize the overall scene type and land-use background (e.g., urban, rural, industrial, ecological, transport corridor).',
    instructions: [
      'Describe major land-use patterns in T1 and T2',
      'Determine whether the region remains functionally stable overall',
      'Establish coarse semantic understanding of the scene'
    ],
    example: 'The region depicts an urban residential area with consistent building density across both temporal observations...'
  },
  r2: {
    title: 'Instance Visual Grounding',
    subtitle: 'step_2_instance_visual',
    description: 'Identify all regions that appear changed or may be misjudged as changed.',
    instructions: [
      'For each instance, describe: location, likely L2 class, visual evidence',
      'Analyze shape, texture, structure, tone, and surrounding context',
      'Classify each case as: pseudo-change or within-class adjustment'
    ],
    example: 'Building A shows altered roof color (dark → light), but structure and footprint remain unchanged...'
  },
  r3: {
    title: 'Relation Modeling',
    subtitle: 'step_3_relational_model',
    description: 'Analyze whether T1 and T2 preserve the same land-use logic.',
    instructions: [
      'Spatial relations: relative positions and adjacency',
      'Physical interactions: connectivity and accessibility',
      'Functional relations: usage patterns and dependencies',
      'Explain why local differences do not support cross-class L2 transition'
    ],
    example: 'The commercial-residential adjacency pattern is preserved; road networks maintain connectivity...'
  },
  r4: {
    title: 'Causal Reasoning',
    subtitle: 'step_4_reasoning',
    description: 'Two-stage process for rigorous change analysis.',
    instructions: [
      'Stage 1 - Positive screening: Identify all visible differences including pseudo-changes',
      'Check illumination, shadows, phenology, imaging conditions, seasonal exposure',
      'Stage 2 - Negative exclusion: Explain why each difference is pseudo-change or NO_CHANGE',
      'Only classify as INTER_L2_CHANGE with clear cross-class transition evidence'
    ],
    example: 'Vegetation color variation (S1-S2): phenology-driven pseudo-change. Building expansion (S3): within-class...'
  },
  r5: {
    title: 'Future Inference',
    subtitle: 'step_5_future_inference',
    description: 'Forward-looking reasoning extending analysis to predictions.',
    instructions: [
      'Infer likely short-term continuation of ecological function',
      'Predict social use trajectory',
      'Project land-use pattern evolution',
      'Base on current trends and domain knowledge'
    ],
    example: 'Given stable residential patterns and zoning regulations, the area will likely maintain current use...'
  },
  r6: {
    title: 'Confidence Calibration',
    subtitle: 'step_6_confidence',
    description: 'Calibrated confidence score based on class difficulty and evidence quality.',
    instructions: [
      'Base difficulty: Easy (8-9), Medium (7-8), Hard (5-6)',
      'Adjust upward: clear boundaries, strong context, consistent evidence',
      'Adjust downward: shadows, seasonal effects, low resolution, fragmented objects',
      'Provide score (0-10), justification, limitations, and alternative candidates'
    ],
    example: 'Score: 8/10 - Clear building boundaries and consistent metadata support high confidence...'
  }
};

// 六步思考流程
const thinkingSteps = [
  {
    id: 'r1',
    title: 'Global Perception',
    titleCn: '全局感知',
    icon: '🌍',
    color: '#4d6bfa',
    desc: 'Summarize overall scene and establish coarse semantic understanding',
  },
  {
    id: 'r2',
    title: 'Visual Grounding',
    titleCn: '实例视觉',
    icon: '👁️',
    color: '#22c55e',
    desc: 'Identify salient entities, regions, and attributes',
  },
  {
    id: 'r3',
    title: 'Relation Modeling',
    titleCn: '关系建模',
    icon: '🔗',
    color: '#f59e0b',
    desc: 'Capture relative positions, interactions, topological organization',
  },
  {
    id: 'r4',
    title: 'Causal Reasoning',
    titleCn: '逻辑推理',
    icon: '🧠',
    color: '#ec4899',
    desc: 'Core reasoning integrating visual evidence with taxonomy rules',
  },
  {
    id: 'r5',
    title: 'Future Inference',
    titleCn: '未来推断',
    icon: '🔮',
    color: '#8b5cf6',
    desc: 'Forward-looking reasoning extending analysis to predictions',
  },
  {
    id: 'r6',
    title: 'Confidence Calibration',
    titleCn: '置信度评估',
    icon: '✓',
    color: '#14b8a6',
    desc: 'Self-assessment accounting for uncertainty and limitations',
  },
];

// Pipeline steps data
const pipelineSteps = [
  {
    id: 'annotators',
    title: '5 Annotators',
    subtitle: 'Multi-Model Generation',
    color: '#4d6bfa',
    items: ['Gemini 2.5 Pro', 'ChatGPT 4.1', 'LLaVA-OneVision', 'Qwen VL 2.5', 'QvQ'],
    icon: Brain,
  },
  {
    id: 'cot',
    title: '6-Step CoT',
    subtitle: 'Chain-of-Thought',
    color: '#22c55e',
    items: ['S1: Perception', 'S2: Visual', 'S3: Relation', 'S4: Reasoning', 'S5: Inference', 'S6: Confidence'],
    icon: GitBranch,
  },
  {
    id: 'judges',
    title: '3 Judges',
    subtitle: 'Decoupled Evaluation',
    color: '#f59e0b',
    items: [
      { name: 'VLM', scope: 'S1-S2', color: '#f59e0b' },
      { name: 'LMM', scope: 'S3-S5', color: '#ec4899' },
      { name: 'Rule', scope: 'S4-S6', color: '#8b5cf6' },
    ],
    icon: Award,
  },
  {
    id: 'outputs',
    title: 'Outputs',
    subtitle: 'Rich Annotations',
    color: '#ec4899',
    items: ['Reasoning', 'Scoring', 'Ranking', 'Best Answer'],
    icon: FileJson,
  },
  {
    id: 'apps',
    title: 'Applications',
    subtitle: 'Training & Eval',
    color: '#8b5cf6',
    items: ['SFT', 'DPO', 'PPO', 'PRM'],
    icon: Target,
  },
];

export default function DatasetFormat() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState<string>('r1');
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
    <section id="format" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#4d6bfa]/5 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Complete Pipeline Flowchart */}
        <div
          className={`mb-20 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#4d6bfa]/20 to-[#8b5cf6]/20 border border-[#4d6bfa]/30 mb-4">
              <Workflow className="w-4 h-4 text-[#4d6bfa]" />
              <span className="text-sm font-medium text-[#4d6bfa]">Complete Pipeline</span>
            </div>
            <h3 className="text-3xl font-bold text-white mb-2">Data Generation & Evaluation Pipeline</h3>
            <p className="text-[#6e7681]">From annotation to application with decoupled multi-judge evaluation</p>
          </div>

          {/* Integrated Flowchart */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[#161b22] via-[#0d1117] to-[#161b22] border border-[#2a2d47]/50">
            
            {/* Desktop: Complete Pipeline Layout */}
            <div className="hidden lg:block">
              <div className="flex items-center justify-between gap-4">
                
                {/* 1. 5 Annotators */}
                <div className="flex flex-col items-center">
                  <div className="text-xs text-[#6e7681] mb-2">① 5 Annotators</div>
                  <div className="p-4 rounded-xl bg-[#4d6bfa]/10 border border-[#4d6bfa]/30">
                    <div className="flex flex-wrap gap-2 justify-center max-w-[140px]">
                      {['Gemini', 'GPT-4.1', 'LLaVA', 'Qwen', 'QVQ'].map((m) => (
                        <span key={m} className="px-2 py-1 rounded bg-[#4d6bfa]/20 text-[#4d6bfa] text-[10px]">{m}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-[#4d6bfa]/50" />

                {/* 2. 6-Step CoT */}
                <div className="flex flex-col items-center">
                  <div className="text-xs text-[#6e7681] mb-2">② 6-Step CoT</div>
                  <div className="flex flex-col gap-1">
                    {[
                      { s: 'S1', name: 'Perception', color: '#4d6bfa' },
                      { s: 'S2', name: 'Visual', color: '#22c55e' },
                      { s: 'S3', name: 'Relation', color: '#f59e0b' },
                      { s: 'S4', name: 'Reasoning', color: '#ec4899' },
                      { s: 'S5', name: 'Inference', color: '#8b5cf6' },
                      { s: 'S6', name: 'Confidence', color: '#14b8a6' },
                    ].map((step) => (
                      <div key={step.s} className="flex items-center gap-2">
                        <div 
                          className="w-8 h-6 rounded flex items-center justify-center text-[10px] font-bold text-white"
                          style={{ backgroundColor: step.color }}
                        >
                          {step.s}
                        </div>
                        <span className="text-[10px] text-[#6e7681] w-16">{step.name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-[#4d6bfa]/50" />

                {/* 3. 3 Judges with Step Mapping */}
                <div className="flex flex-col items-center">
                  <div className="text-xs text-[#6e7681] mb-2">③ 3 Judges</div>
                  <div className="flex flex-col gap-2">
                    {/* VLM - S1, S2 */}
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-6 h-6 rounded bg-[#4d6bfa] text-white text-[8px] flex items-center justify-center">S1</div>
                        <div className="w-6 h-6 rounded bg-[#22c55e] text-white text-[8px] flex items-center justify-center">S2</div>
                      </div>
                      <div className="w-16 h-8 rounded-lg bg-[#f59e0b]/20 border border-[#f59e0b]/40 flex items-center justify-center">
                        <span className="text-xs font-bold text-[#f59e0b]">VLM</span>
                      </div>
                    </div>
                    {/* LMM - S3, S4, S5 */}
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-6 h-6 rounded bg-[#f59e0b] text-white text-[8px] flex items-center justify-center">S3</div>
                        <div className="w-6 h-6 rounded bg-[#ec4899] text-white text-[8px] flex items-center justify-center">S4</div>
                        <div className="w-6 h-6 rounded bg-[#8b5cf6] text-white text-[8px] flex items-center justify-center">S5</div>
                      </div>
                      <div className="w-16 h-8 rounded-lg bg-[#ec4899]/20 border border-[#ec4899]/40 flex items-center justify-center">
                        <span className="text-xs font-bold text-[#ec4899]">LMM</span>
                      </div>
                    </div>
                    {/* Rule - S4, S6 */}
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-6 h-6 rounded bg-[#ec4899] text-white text-[8px] flex items-center justify-center">S4</div>
                        <div className="w-6 h-6 rounded bg-[#14b8a6] text-white text-[8px] flex items-center justify-center">S6</div>
                      </div>
                      <div className="w-16 h-8 rounded-lg bg-[#8b5cf6]/20 border border-[#8b5cf6]/40 flex items-center justify-center">
                        <span className="text-xs font-bold text-[#8b5cf6]">Rule</span>
                      </div>
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-[#4d6bfa]/50" />

                {/* 4. Outputs */}
                <div className="flex flex-col items-center">
                  <div className="text-xs text-[#6e7681] mb-2">④ Outputs</div>
                  <div className="flex flex-col gap-1.5">
                    {['Reasoning', 'Scoring', 'Ranking', 'Best Answer'].map((o) => (
                      <div key={o} className="px-3 py-1.5 rounded bg-[#ec4899]/10 border border-[#ec4899]/30 text-[10px] text-[#ec4899] text-center">
                        {o}
                      </div>
                    ))}
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-[#4d6bfa]/50" />

                {/* 5. Applications */}
                <div className="flex flex-col items-center">
                  <div className="text-xs text-[#6e7681] mb-2">⑤ Applications</div>
                  <div className="p-4 rounded-xl bg-gradient-to-b from-[#8b5cf6]/20 to-[#4d6bfa]/20 border border-[#8b5cf6]/30 text-center">
                    <div className="text-2xl mb-1">🚀</div>
                    <div className="flex flex-wrap gap-1 justify-center max-w-[100px]">
                      {['SFT', 'DPO', 'PPO', 'PRM'].map((a) => (
                        <span key={a} className="px-2 py-0.5 rounded bg-white/10 text-white text-[9px]">{a}</span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Legend */}
              <div className="mt-6 flex items-center justify-center gap-6 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#f59e0b]"></div>
                  <span className="text-[#6e7681]">VLM: Visual perception (S1-S2)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#ec4899]"></div>
                  <span className="text-[#6e7681]">LMM: Reasoning (S3-S5)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-[#8b5cf6]"></div>
                  <span className="text-[#6e7681]">Rule: Logic & confidence (S4, S6)</span>
                </div>
              </div>
            </div>

            {/* Mobile: Vertical layout */}
            <div className="lg:hidden space-y-6">
              
              {/* 5 Annotators */}
              <div className="p-4 rounded-xl bg-[#4d6bfa]/10 border border-[#4d6bfa]/30">
                <div className="text-xs text-[#6e7681] mb-2">① 5 Annotators</div>
                <div className="flex flex-wrap gap-2">
                  {['Gemini', 'GPT-4.1', 'LLaVA', 'Qwen', 'QVQ'].map((m) => (
                    <span key={m} className="px-2 py-1 rounded bg-[#4d6bfa]/20 text-[#4d6bfa] text-xs">{m}</span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <ChevronDown className="w-5 h-5 text-[#4d6bfa]/50" />
              </div>

              {/* 6 Steps + Judges */}
              <div className="space-y-3">
                <div className="text-xs text-[#6e7681] text-center">② 6-Step CoT → ③ 3 Judges</div>
                {[
                  { step: 'S1', name: 'Perception', color: '#4d6bfa', judge: 'VLM', jColor: '#f59e0b' },
                  { step: 'S2', name: 'Visual', color: '#22c55e', judge: 'VLM', jColor: '#f59e0b' },
                  { step: 'S3', name: 'Relation', color: '#f59e0b', judge: 'LMM', jColor: '#ec4899' },
                  { step: 'S4', name: 'Reasoning', color: '#ec4899', judge: 'LMM+Rule', jColor: '#ec4899', extra: true },
                  { step: 'S5', name: 'Inference', color: '#8b5cf6', judge: 'LMM', jColor: '#ec4899' },
                  { step: 'S6', name: 'Confidence', color: '#14b8a6', judge: 'Rule', jColor: '#8b5cf6' },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <div 
                      className="w-10 h-8 rounded flex items-center justify-center text-xs font-bold text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.step}
                    </div>
                    <span className="text-xs text-[#6e7681] flex-1">{item.name}</span>
                    <ChevronRight className="w-4 h-4 text-[#4d6bfa]/30" />
                    <div 
                      className="px-3 py-1.5 rounded-lg border text-xs font-medium min-w-[80px] text-center"
                      style={{ 
                        backgroundColor: item.extra ? 'linear-gradient(90deg, #ec489920 50%, #8b5cf620 50%)' : `${item.jColor}20`,
                        borderColor: item.extra ? '#ec489940' : `${item.jColor}40`,
                        color: item.jColor
                      }}
                    >
                      {item.judge}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center">
                <ChevronDown className="w-5 h-5 text-[#4d6bfa]/50" />
              </div>

              {/* Outputs */}
              <div className="p-4 rounded-xl bg-[#ec4899]/10 border border-[#ec4899]/30">
                <div className="text-xs text-[#6e7681] mb-2">④ Outputs</div>
                <div className="flex flex-wrap gap-2">
                  {['Reasoning', 'Scoring', 'Ranking', 'Best Answer'].map((o) => (
                    <span key={o} className="px-3 py-1 rounded bg-[#ec4899]/20 text-[#ec4899] text-xs">{o}</span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <ChevronDown className="w-5 h-5 text-[#4d6bfa]/50" />
              </div>

              {/* Applications */}
              <div className="p-4 rounded-xl bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 text-center">
                <div className="text-xs text-[#6e7681] mb-2">⑤ Applications</div>
                <div className="text-2xl mb-2">🚀</div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['SFT', 'DPO', 'PPO', 'PRM'].map((a) => (
                    <span key={a} className="px-3 py-1 rounded bg-[#8b5cf6]/20 text-[#8b5cf6] text-xs">{a}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Structured Multimodal Chain of Reasoning
          </h2>
          <p className="text-[#b4bcd0] max-w-3xl mx-auto">
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
                onClick={() => setActiveStep(step.id)}
                className={`group relative p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
                  activeStep === step.id 
                    ? 'bg-[#4d6bfa]/20 border-2 border-[#4d6bfa]' 
                    : 'bg-[#161b22]/80 border border-[#2a2d47]/50 hover:border-[#4d6bfa]/50'
                }`}
                style={{ transitionDelay: `${200 + index * 50}ms` }}
              >
                {/* 步骤编号 */}
                <div 
                  className="absolute -top-3 -left-3 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg"
                  style={{ backgroundColor: step.color }}
                >
                  {index + 1}
                </div>

                {/* 图标 */}
                <div className="text-3xl mb-3">{step.icon}</div>

                {/* 标题 */}
                <h3 className={`text-sm font-semibold leading-tight ${
                  activeStep === step.id ? 'text-[#4d6bfa]' : 'text-white'
                }`}>
                  {step.title}
                </h3>

                {/* 连接线（除最后一个） */}
                {index < thinkingSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-[2px] bg-[#2a2d47]" />
                )}

                {/* Hover 效果 */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4d6bfa]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            ))}
          </div>
        </div>

        {/* JSON 格式展示 */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid lg:grid-cols-2 gap-8">
            {/* 左侧：JSON 示例 */}
            <div className="p-6 rounded-2xl bg-[#0d1117] border border-[#2a2d47]/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileJson className="w-5 h-5 text-[#4d6bfa]" />
                  <span className="text-sm font-medium text-white">annotation_format.json</span>
                </div>
                <span className="text-xs text-[#6e7681]">JSON</span>
              </div>
              
              <pre className="text-xs text-[#b4bcd0] overflow-x-auto">
                <code>{`{
  "thought_process": {
    "step_1_global_perception": "",
    "step_2_instance_visual": "",
    "step_3_relational_model": "",
    "step_4_reasoning": "",
    "step_5_future_inference": "",
    "step_6_confidence": {
      "score": 0,
      "justification": "",
      "limitations": "",
      "alternative_l2_candidates": []
    }
  },
  "answer": ""
}`}</code>
              </pre>
            </div>

            {/* 右侧：步骤详情 */}
            <div className="space-y-4">
              {activeStep && (() => {
                const detail = stepDetails[activeStep as keyof typeof stepDetails];
                const step = thinkingSteps.find(s => s.id === activeStep);
                if (!detail || !step) return null;
                return (
                  <>
                    {/* 步骤描述卡片 */}
                    <div className="p-5 rounded-xl bg-[#161b22]/80 border border-[#4d6bfa]/30 transition-colors">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center text-xl" style={{ backgroundColor: `${step.color}20` }}>
                          {step.icon}
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{detail.title}</h4>
                          <p className="text-xs text-[#4d6bfa] font-mono">{detail.subtitle}</p>
                        </div>
                      </div>
                      <p className="text-sm text-[#8b949e] mb-4">{detail.description}</p>
                    </div>

                    {/* 指令列表 */}
                    <div className="p-5 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50">
                      <h5 className="text-xs font-semibold text-[#6e7681] uppercase tracking-wider mb-3">Instructions</h5>
                      <ul className="space-y-2">
                        {detail.instructions.map((inst, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm text-[#b4bcd0]">
                            <span className="text-[#4d6bfa] mt-0.5">•</span>
                            <span>{inst}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 示例 */}
                    <div className="p-4 rounded-xl bg-[#0d1117] border border-[#2a2d47]/50">
                      <h5 className="text-xs font-semibold text-[#6e7681] uppercase tracking-wider mb-2">Example Output</h5>
                      <p className="text-xs text-[#8b949e] italic leading-relaxed">"{detail.example}"</p>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
