import { useEffect, useRef, useState } from 'react';
import {
  BarChart3,
  ChevronDown,
  ChevronUp,
  Eye,
  Award,
  Scale,
  Brain,
  Network,
  Lightbulb,
  Telescope,
  ShieldCheck,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Sparkles,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Image Comparison Component
function ImageCompare({ t1Image, t2Image, sampleId }: { t1Image: string; t2Image: string; sampleId: string }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  return (
    <div className="relative bg-[#161b22]">
      <div
        ref={containerRef}
        className="relative aspect-[4/3] cursor-ew-resize select-none"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
      >
        {/* T2 Image (Bottom layer) */}
        <img
          src={t2Image}
          alt={`Sample ${sampleId} T2`}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* T1 Image (Top layer with clip) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={t1Image}
            alt={`Sample ${sampleId} T1`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* Slider Line */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
            <div className="flex gap-0.5">
              <ChevronLeft className="w-4 h-4 text-[#04070a]" />
              <ChevronRight className="w-4 h-4 text-[#04070a]" />
            </div>
          </div>
        </div>
        {/* Labels */}
        <div className="absolute top-3 left-3 px-2 py-1 rounded bg-[#04070a]/80 backdrop-blur-sm text-xs font-medium text-white">
          T1 (Before)
        </div>
        <div className="absolute top-3 right-3 px-2 py-1 rounded bg-[#04070a]/80 backdrop-blur-sm text-xs font-medium text-white">
          T2 (After)
        </div>
      </div>
      <p className="py-2 text-center text-xs text-[#b4bcd0]">
        Drag slider to compare · Sample {sampleId}
      </p>
    </div>
  );
}

// Complete sample data with full reasoning feedback
const sampleData = [
  {
    task_id: "00299",
    has_valid_chosen: true,
    chosen: {
      model_name: "gpt41_answer_change",
      answer_score: 10.0,
      process_score: 8.57,
      is_positive_sample: true,
      detailed_scores: {
        step_1: 9.0,
        step_2: 6.0,
        step_3: 8.0,
        step_4_logic: 9.0,
        step_4_rule: 10.0,
        step_5: 9.0,
        step_6: 9.0
      },
      reasoning_feedback: {
        vlm_feedback: {
          hallucination_flag: true,
          step_1_reasoning: "The model thoroughly and accurately describes the global context, identifying the riverbank, the mosaic of agricultural and forested land, and correctly noting the general shift from cultivated land to bare or disturbed earth in the central-right area.",
          step_1_score: 9,
          step_2_reasoning: "While the transition from green cropland (T1) to lighter rectangular bare plots (T2) is correctly observed, the model hallucinates specific features like 'pronounced linear excavation marks' and 'staging areas' in T2 that are not visibly corroborated, over-interpreting the scene as an artificial excavation site.",
          step_2_score: 6
        },
        lmm_feedback: {
          step_3_reasoning: "The model provides plausible spatial and relational logic, describing contiguity and adjacency, but could be more detailed regarding absolute/relative positioning.",
          step_3_score: 8,
          step_4_logic_score: 9,
          step_4_reasoning: "The CoT effectively identifies true changes vs. pseudo-changes and correctly applies taxonomy rules to confirm an inter-class change, though with minor terminological inaccuracy.",
          step_5_reasoning: "The future inference is grounded in the current analysis and reflects realistic trends of land-use change impacts.",
          step_5_score: 9
        },
        rule_feedback: {
          answer_match_score: 10,
          answer_reasoning: "The final answer is a strict semantic match with the GT, correctly identifying the cross-category change.",
          is_positive_sample: true,
          step_4_rule_reasoning: "The model correctly identifies an INTER_L2_CHANGE by transitioning from 'Irrigated Land' to 'Human-Disturbed Land: Artificial Excavation Land,' adhering to Level 1/Level 2 taxonomy rules without violation.",
          step_4_rule_score: 10,
          step_6_reasoning: "The model demonstrates solid academic rigor, clearly identifying textural and spectral differences, acknowledging potential ambiguities, and noting limitations regarding the permanence and intended use of the land.",
          step_6_score: 9
        }
      }
    },
    rejected: [
      {
        model_name: "gemini_answer_change",
        answer_score: 10.0,
        process_score: 6.71,
        is_positive_sample: true,
        detailed_scores: {
          step_1: 0.0,
          step_2: 0.0,
          step_3: 9.0,
          step_4_logic: 10.0,
          step_4_rule: 10.0,
          step_5: 9.0,
          step_6: 9.0
        },
        reasoning_feedback: {
          vlm_feedback: {
            hallucination_flag: false,
            step_1_reasoning: "Missing - VLM evaluation not available for this model response.",
            step_1_score: 0,
            step_2_reasoning: "Missing - VLM evaluation not available for this model response.",
            step_2_score: 0
          },
          lmm_feedback: {
            step_3_reasoning: "The model's relational analysis is logically sound and physically plausible, correctly inferring spatial fragmentation, physical alteration of topography/hydrology, and a functional shift from agriculture to construction, which aligns with the visual and categorical evidence.",
            step_3_score: 9,
            step_4_logic_score: 10,
            step_4_reasoning: "The CoT is rigorous: the positive chain correctly identifies true physical changes while dismissing phenological variation as a pseudo-change; the negative chain accurately applies the taxonomy to filter an intra-class change and confirm valid inter-class changes (Cropland->Construction Land).",
            step_5_reasoning: "The future inference is grounded and plausible, logically extending the current state (excavation for construction) to a probable trajectory of cropland loss and intensified development, which is a common real-world pattern.",
            step_5_score: 9
          },
          rule_feedback: {
            answer_match_score: 10,
            answer_reasoning: "The final answer strictly matches the Ground Truth classification of the key change from 'Irrigated Land' to 'Human-Disturbed Land'.",
            is_positive_sample: true,
            step_4_rule_reasoning: "The model correctly identifies a transition from 'Irrigated Land' to 'Human-Disturbed Land', which involves an effective Level 2 semantic shift according to the taxonomy.",
            step_4_rule_score: 10,
            step_6_reasoning: "The model demonstrates strong academic rigor by clearly distinguishing the visual changes and explaining the rationale behind the classification. It acknowledges potential ambiguity concerning the final use and suggests an alternative candidate ('Ponds').",
            step_6_score: 9
          }
        }
      },
      {
        model_name: "llava_answer_change",
        answer_score: 10.0,
        process_score: 6.0,
        is_positive_sample: true,
        detailed_scores: {
          step_1: 4.0,
          step_2: 8.0,
          step_3: 4.0,
          step_4_logic: 3.0,
          step_4_rule: 10.0,
          step_5: 5.0,
          step_6: 8.0
        },
        reasoning_feedback: {
          vlm_feedback: {
            hallucination_flag: true,
            step_1_reasoning: "The description of the overall landscape composition, including the mix of agriculture and natural areas, matches the visual context well. However, the model explicitly fabricates the presence of a 'red outline,' resulting in a significant penalty for hallucination.",
            step_1_score: 4,
            step_2_reasoning: "The model accurately details the transformation from green vegetation to bare soil in the central-right quadrants, correctly grounding the texture and spectral shifts. While grounded well, it loses minor points for missing the prominent opposite change (bare earth to green vegetation) located just north of the mentioned area.",
            step_2_score: 8
          },
          lmm_feedback: {
            step_3_reasoning: "The model's output describes generic thematic relationships and consequences but lacks any concrete application of the required spatial logic, such as analyzing the 9-grid absolute positioning of the changed area or its specific dense relationships (adjacent to what, containing what) with its immediate neighbors.",
            step_3_score: 4,
            step_4_logic_score: 3,
            step_4_reasoning: "While the CoT mentions identifying 'true change' and filtering 'pseudo-change,' it provides no specific evidence or logical steps for how these distinctions were made. Crucially, it incorrectly states the change as 'irrigated cropland to artificial excavation land,' with the latter not being a valid Level 2 class in the provided taxonomy, demonstrating a failure to correctly execute the negative chain.",
            step_5_reasoning: "The future impacts listed are plausible generic consequences of land conversion to construction or excavation but are not grounded in or derived from the specific spatial, relational, or causal analysis claimed in the preceding steps, making them weakly supported inferences.",
            step_5_score: 5
          },
          rule_feedback: {
            answer_match_score: 10,
            answer_reasoning: "The model's final answer strictly matches the Ground Truth with a correct cross-class semantic shift.",
            is_positive_sample: true,
            step_4_rule_reasoning: "The model identifies a cross-class transition from 'Irrigated Land' (1.2) under 'Cropland' (1) to 'Artificial Excavation Land' within 'Construction Land' (5.3), adhering strictly to the Level 1/Level 2 taxonomy rules.",
            step_4_rule_score: 10,
            step_6_reasoning: "The model demonstrates strong academic rigor with clear evidence supporting the change. However, it could benefit from a deeper examination of limitations like the resolution's impact.",
            step_6_score: 8
          }
        }
      },
      {
        model_name: "qvq_answer_change",
        answer_score: 10.0,
        process_score: 6.0,
        is_positive_sample: true,
        detailed_scores: {
          step_1: 1.0,
          step_2: 1.0,
          step_3: 6.0,
          step_4_logic: 8.0,
          step_4_rule: 10.0,
          step_5: 8.0,
          step_6: 8.0
        },
        reasoning_feedback: {
          vlm_feedback: {
            hallucination_flag: true,
            step_1_reasoning: "The ground truth indicates no valid change instances, yet the model incorrectly claims a transformation to artificial excavation land and falsely describes the post-image geometries as irregular.",
            step_1_score: 1,
            step_2_reasoning: "Although the model correctly notes the spectral shift from green to brown, it exhibits severe visual hallucination by describing the perfectly rectangular plots in T2 as 'irregular polygons with jagged edges'.",
            step_2_score: 1
          },
          lmm_feedback: {
            step_3_reasoning: "The relational model is logically sound and physically possible but lacks explicit use of rigorous spatial logic (e.g., 9-grid positioning) and dense relationship details, making it somewhat high-level.",
            step_3_score: 6,
            step_4_logic_score: 8,
            step_4_reasoning: "The CoT effectively rules out pseudo-changes and correctly identifies an inter-class change by referencing the taxonomy, though it uses a category name not explicitly in the taxonomy (but inferable as Human-Disturbed Land).",
            step_5_reasoning: "The future inference is plausible and grounded in the current land-use change, drawing on real-world ecological and management concepts.",
            step_5_score: 8
          },
          rule_feedback: {
            answer_match_score: 10,
            answer_reasoning: "The final answer strictly matches the GT by identifying the specific cross-secondary-class change.",
            is_positive_sample: true,
            step_4_rule_reasoning: "The model correctly identified a cross-Level 2 change from 'Irrigated Land' to 'Human-Disturbed Land', which are distinct categories within the taxonomy.",
            step_4_rule_score: 10,
            step_6_reasoning: "The model exhibits strong academic rigor and confidence in spectral and structural analysis, although it acknowledges the ambiguity in the classification and discusses limitations and alternative candidates appropriately.",
            step_6_score: 8
          }
        }
      },
      {
        model_name: "qwen_answer_change",
        answer_score: 0.0,
        process_score: 3.86,
        is_positive_sample: false,
        detailed_scores: {
          step_1: 8.0,
          step_2: 1.0,
          step_3: 4.0,
          step_4_logic: 2.0,
          step_4_rule: 3.0,
          step_5: 3.0,
          step_6: 6.0
        },
        reasoning_feedback: {
          vlm_feedback: {
            hallucination_flag: true,
            step_1_reasoning: "The model provides a generally accurate global description, identifying the scene as agricultural land (croplands, paddy fields) adjacent to a river. The minor contradiction between 'coastal region' and 'riverbanks' slightly detracts from an otherwise solid summary.",
            step_1_score: 8,
            step_2_reasoning: "The model severely hallucinates by referencing 'red outlines' which do not exist in the provided images. Furthermore, it incorrectly interprets typical agricultural/vegetative shifts (fields changing between green and bare soil) as 'excavation activity' and 'artificial alteration'.",
            step_2_score: 1
          },
          lmm_feedback: {
            step_3_reasoning: "The spatial reasoning is superficial and lacks the specific, rigorous application of the required 9-grid or relative positioning analysis; the functional inferences (e.g., 'past reliance on floodwater management') are speculative and not demonstrably derived from the provided context.",
            step_3_score: 4,
            step_4_logic_score: 2,
            step_4_reasoning: "The CoT fails the core evaluation criteria: the 'positive chain' generically mentions filtering 'pseudo-changes' but provides no specific, logical justification tied to imagery. Crucially, the 'negative chain' is entirely absent—it does not reference the [Land-Use Taxonomy Rules] at all to check for intra-class vs. inter-class changes.",
            step_5_reasoning: "The future inference is a generic, non-specific statement about urban expansion trends and is not grounded in the preceding change analysis, specific land-use conversions, or real-world physical constraints derived from the scenario.",
            step_5_score: 3
          },
          rule_feedback: {
            answer_match_score: 0,
            answer_reasoning: "The final answer 'INTER_L2_CHANGE' does not strictly match any defined category in the taxonomy.",
            is_positive_sample: false,
            step_4_rule_reasoning: "The model identifies a potential Level 2 semantic shift, but it lacks specificity in clearly discriminating between appropriate categories within the taxonomy, leading to ambiguity.",
            step_4_rule_score: 3,
            step_6_reasoning: "Exhibits academic rigor with robust visual evidence and acknowledges potential ambiguities, but offers no alternative candidates, reducing rigor.",
            step_6_score: 6
          }
        }
      }
    ]
  },
  {
    task_id: "00300",
    has_valid_chosen: true,
    chosen: {
      model_name: "gemini_answer_change",
      answer_score: 9.5,
      process_score: 8.2,
      detailed_scores: {
        step_1: 8.0,
        step_2: 8.5,
        step_3: 8.0,
        step_4_logic: 8.0,
        step_4_rule: 10.0,
        step_5: 8.0,
        step_6: 8.5
      },
      reasoning_feedback: {
        vlm_feedback: {
          hallucination_flag: false,
          step_1_reasoning: "Excellent global context description. The model accurately identifies the urban expansion pattern and correctly notes the transformation from agricultural to residential areas.",
          step_1_score: 8,
          step_2_reasoning: "Strong visual grounding with precise localization of changed areas and accurate description of texture and structural changes.",
          step_2_score: 8.5
        },
        lmm_feedback: {
          step_3_reasoning: "Comprehensive relational analysis connecting spatial patterns with functional changes and infrastructure development.",
          step_3_score: 8,
          step_4_logic_score: 8,
          step_4_reasoning: "Clear logical progression distinguishing true changes from seasonal variations with strong evidence-based reasoning.",
          step_5_reasoning: "Thoughtful future projections based on current development trends and urban planning patterns.",
          step_5_score: 8
        },
        rule_feedback: {
          answer_match_score: 9,
          answer_reasoning: "High semantic alignment with ground truth, correctly classifying the L2 change from Cropland to Residential.",
          is_positive_sample: true,
          step_4_rule_reasoning: "Proper application of taxonomy rules with clear identification of the inter-class transition.",
          step_4_rule_score: 10,
          step_6_reasoning: "Appropriate confidence calibration with clear acknowledgment of uncertainty factors.",
          step_6_score: 8.5
        }
      }
    },
    rejected: [
      {
        model_name: "qwen_answer_change",
        answer_score: 7.5,
        process_score: 6.2,
        is_positive_sample: false,
        detailed_scores: {
          step_1: 6.0,
          step_2: 7.0,
          step_3: 5.0,
          step_4_logic: 6.0,
          step_4_rule: 8.0,
          step_5: 6.0,
          step_6: 7.0
        },
        reasoning_feedback: {
          vlm_feedback: {
            hallucination_flag: false,
            step_1_reasoning: "Reasonable global description but lacks specific details about the landscape composition and change patterns.",
            step_1_score: 6,
            step_2_reasoning: "Adequate visual identification but misses some key structural changes and boundary definitions.",
            step_2_score: 7
          },
          lmm_feedback: {
            step_3_reasoning: "Superficial relational analysis that misses critical spatial relationships between new constructions and existing infrastructure.",
            step_3_score: 5,
            step_4_logic_score: 6,
            step_4_reasoning: "Logic chain is present but lacks depth in distinguishing true changes from background variations.",
            step_5_reasoning: "Future predictions are generic and not specifically grounded in observed development patterns.",
            step_5_score: 6
          },
          rule_feedback: {
            answer_match_score: 7,
            answer_reasoning: "Partial match with ground truth, correct general category but imprecise L2 classification.",
            is_positive_sample: false,
            step_4_rule_reasoning: "Taxonomy application is correct but lacks precision in category boundaries.",
            step_4_rule_score: 8,
            step_6_reasoning: "Moderate confidence assessment with some acknowledgment of limitations.",
            step_6_score: 7
          }
        }
      },
      {
        model_name: "qvq_answer_change",
        answer_score: 8.0,
        process_score: 6.8,
        is_positive_sample: true,
        detailed_scores: {
          step_1: 7.0,
          step_2: 7.5,
          step_3: 6.0,
          step_4_logic: 7.0,
          step_4_rule: 9.0,
          step_5: 6.5,
          step_6: 7.5
        },
        reasoning_feedback: {
          vlm_feedback: {
            hallucination_flag: false,
            step_1_reasoning: "Good scene understanding with accurate identification of land use types, though slightly less detailed than top performers.",
            step_1_score: 7,
            step_2_reasoning: "Solid visual grounding with correct change localization and reasonable texture descriptions.",
            step_2_score: 7.5
          },
          lmm_feedback: {
            step_3_reasoning: "Acceptable relational modeling but lacks the depth in spatial analysis and connectivity assessment.",
            step_3_score: 6,
            step_4_logic_score: 7,
            step_4_reasoning: "Reasonable logic chain with proper pseudo-change filtering but could strengthen the reasoning evidence.",
            step_5_reasoning: "Future inference is plausible but somewhat generic and not strongly connected to specific observed changes.",
            step_5_score: 6.5
          },
          rule_feedback: {
            answer_match_score: 8,
            answer_reasoning: "Good alignment with ground truth taxonomy classification.",
            is_positive_sample: true,
            step_4_rule_reasoning: "Correct application of taxonomy with proper inter-class identification.",
            step_4_rule_score: 9,
            step_6_reasoning: "Appropriate confidence with reasonable limitation acknowledgment.",
            step_6_score: 7.5
          }
        }
      }
    ]
  },
  {
    task_id: "00301",
    has_valid_chosen: true,
    chosen: {
      model_name: "gpt41_answer_change",
      answer_score: 10.0,
      process_score: 9.1,
      detailed_scores: {
        step_1: 9.5,
        step_2: 9.0,
        step_3: 9.0,
        step_4_logic: 9.0,
        step_4_rule: 10.0,
        step_5: 9.0,
        step_6: 9.5
      },
      reasoning_feedback: {
        vlm_feedback: {
          hallucination_flag: false,
          step_1_reasoning: "Outstanding scene understanding with comprehensive description of the coastal wetland environment and its ecological significance.",
          step_1_score: 9.5,
          step_2_reasoning: "Precise identification of specific changes including pond consolidation and infrastructure development with accurate visual evidence.",
          step_2_score: 9.0
        },
        lmm_feedback: {
          step_3_reasoning: "Excellent spatial relationship modeling connecting hydrological changes with ecological impacts.",
          step_3_score: 9,
          step_4_logic_score: 9,
          step_4_reasoning: "Rigorous reasoning chain with clear distinction between natural variations and anthropogenic changes.",
          step_5_reasoning: "Well-grounded predictions about ecosystem evolution based on observed transformation patterns.",
          step_5_score: 9
        },
        rule_feedback: {
          answer_match_score: 10,
          answer_reasoning: "Perfect alignment with ground truth classification.",
          is_positive_sample: true,
          step_4_rule_reasoning: "Flawless application of wetland taxonomy with correct L1/L2 categorization.",
          step_4_rule_score: 10,
          step_6_reasoning: "Exceptional self-assessment with appropriate confidence and clear limitation acknowledgment.",
          step_6_score: 9.5
        }
      }
    },
    rejected: [
      {
        model_name: "gemini_answer_change",
        answer_score: 9.0,
        process_score: 7.8,
        is_positive_sample: true,
        detailed_scores: {
          step_1: 8.0,
          step_2: 8.0,
          step_3: 7.0,
          step_4_logic: 8.0,
          step_4_rule: 9.0,
          step_5: 7.0,
          step_6: 8.0
        },
        reasoning_feedback: {
          vlm_feedback: {
            hallucination_flag: false,
            step_1_reasoning: "Good scene understanding but slightly less comprehensive in ecological context description.",
            step_1_score: 8,
            step_2_reasoning: "Accurate visual identification but misses some subtle changes in the wetland boundaries.",
            step_2_score: 8
          },
          lmm_feedback: {
            step_3_reasoning: "Adequate relational modeling but could strengthen the connection between hydrological and ecological factors.",
            step_3_score: 7,
            step_4_logic_score: 8,
            step_4_reasoning: "Solid logic chain with proper filtering but reasoning depth could be improved.",
            step_5_reasoning: "Future predictions are reasonable but somewhat less specific than top response.",
            step_5_score: 7
          },
          rule_feedback: {
            answer_match_score: 9,
            answer_reasoning: "Good taxonomy alignment with minor imprecision in category boundaries.",
            is_positive_sample: true,
            step_4_rule_reasoning: "Correct taxonomy application but slightly less rigorous in rule justification.",
            step_4_rule_score: 9,
            step_6_reasoning: "Good confidence assessment with appropriate limitations noted.",
            step_6_score: 8
          }
        }
      }
    ]
  }
];

const steps = [
  {
    id: 'step_1',
    key: 'step_1',
    label: 'Global Perception',
    labelZh: '全局感知',
    icon: Eye,
    color: '#4d6bfa',
    judge: 'vlm_feedback',
    judgeLabel: 'Judge-1 VLM',
    desc: 'Scene understanding and context awareness'
  },
  {
    id: 'step_2',
    key: 'step_2',
    label: 'Instance Visual',
    labelZh: '实例视觉',
    icon: FileText,
    color: '#22c55e',
    judge: 'vlm_feedback',
    judgeLabel: 'Judge-1 VLM',
    desc: 'Change localization and visual evidence'
  },
  {
    id: 'step_3',
    key: 'step_3',
    label: 'Relational Model',
    labelZh: '关系建模',
    icon: Network,
    color: '#f59e0b',
    judge: 'lmm_feedback',
    judgeLabel: 'Judge-2 LMM',
    desc: 'Spatial and semantic relationship modeling'
  },
  {
    id: 'step_4',
    key: 'step_4',
    label: 'Reasoning',
    labelZh: '逻辑推理',
    icon: Brain,
    color: '#ec4899',
    judge: 'combined',
    judgeLabel: 'Judge-2 & Judge-3',
    desc: 'Logical coherence and taxonomy application'
  },
  {
    id: 'step_5',
    key: 'step_5',
    label: 'Future Inference',
    labelZh: '未来推断',
    icon: Telescope,
    color: '#8b5cf6',
    judge: 'lmm_feedback',
    judgeLabel: 'Judge-2 LMM',
    desc: 'Trend prediction and impact assessment'
  },
  {
    id: 'step_6',
    key: 'step_6',
    label: 'Confidence',
    labelZh: '置信度评估',
    icon: ShieldCheck,
    color: '#06b6d4',
    judge: 'rule_feedback',
    judgeLabel: 'Judge-3 Rule',
    desc: 'Self-assessment and limitation awareness'
  }
];

const judges = [
  { id: 'vlm_feedback', name: 'Judge-1 VLM', color: '#4285f4', icon: Eye, desc: 'Visual perception evaluation' },
  { id: 'lmm_feedback', name: 'Judge-2 LMM', color: '#22c55e', icon: Brain, desc: 'Reasoning quality check' },
  { id: 'rule_feedback', name: 'Judge-3 Rule', color: '#f59e0b', icon: Scale, desc: 'Taxonomy validation' }
];

const models = [
  { id: 'gpt41_answer_change', name: 'GPT-4.1', color: '#10a37f' },
  { id: 'gemini_answer_change', name: 'Gemini', color: '#4285f4' },
  { id: 'llava_answer_change', name: 'LLaVA', color: '#ff6b6b' },
  { id: 'qwen_answer_change', name: 'Qwen-VL', color: '#5a3fc0' },
  { id: 'qvq_answer_change', name: 'QVQ', color: '#f59e0b' }
];

export default function AnnotationProcess() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeSample, setActiveSample] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [expandedModels, setExpandedModels] = useState<string[]>([]);
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

  const currentSample = sampleData[activeSample];
  const currentStep = steps[activeStep];

  const getStepScore = (modelData: any, stepKey: string) => {
    if (stepKey === 'step_4') {
      const logic = modelData.detailed_scores['step_4_logic'] || 0;
      const rule = modelData.detailed_scores['step_4_rule'] || 0;
      return ((logic + rule) / 2).toFixed(1);
    }
    return modelData.detailed_scores[stepKey] ?? 0;
  };

  const toggleModel = (modelName: string) => {
    setExpandedModels(prev =>
      prev.includes(modelName)
        ? prev.filter(m => m !== modelName)
        : [...prev, modelName]
    );
  };

  // Render detailed feedback for any model
  const renderFeedback = (modelData: any, stepKey: string, isRejected: boolean = false) => {
    if (!modelData.reasoning_feedback) {
      return <p className="text-sm text-[#6e7681]">No evaluation data available</p>;
    }

    const feedback = modelData.reasoning_feedback;
    const isStep4 = stepKey === 'step_4';

    // Helper to get score display class
    const getScoreClass = (score: number) => {
      if (score >= 8) return 'text-[#22c55e]';
      if (score >= 5) return 'text-[#f59e0b]';
      return 'text-[#ef4444]';
    };

    // Render Judge-1 VLM feedback (Steps 1-2)
    const renderVLMFeedback = () => {
      const vlm = feedback.vlm_feedback;
      if (!vlm) return null;

      const reasoningKey = `${stepKey}_reasoning`;
      const scoreKey = `${stepKey}_score`;
      const reasoning = vlm[reasoningKey];
      const score = vlm[scoreKey];

      if (reasoning === undefined && score === undefined) return null;

      return (
        <div className="p-3 rounded-lg bg-[#4285f4]/10 border border-[#4285f4]/30 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="w-4 h-4 text-[#4285f4]" />
            <span className="text-sm font-medium text-[#4285f4]">Judge-1 VLM</span>
            {score !== undefined && (
              <span className={`text-sm font-bold ml-auto ${getScoreClass(score)}`}>{score}/10</span>
            )}
          </div>
          {vlm.hallucination_flag && (
            <div className="flex items-center gap-1.5 mb-2 text-xs text-[#ef4444]">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Hallucination detected</span>
            </div>
          )}
          {reasoning && <p className="text-sm text-[#b4bcd0]">{reasoning}</p>}
        </div>
      );
    };

    // Render Judge-2 LMM feedback (Steps 3-5)
    const renderLMMFeedback = () => {
      const lmm = feedback.lmm_feedback;
      if (!lmm) return null;

      const reasoningKey = isStep4 ? 'step_4_reasoning' : `${stepKey}_reasoning`;
      const scoreKey = isStep4 ? 'step_4_logic_score' : `${stepKey}_score`;
      const reasoning = lmm[reasoningKey];
      const score = lmm[scoreKey];

      if (reasoning === undefined && score === undefined) return null;

      return (
        <div className="p-3 rounded-lg bg-[#22c55e]/10 border border-[#22c55e]/30 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-[#22c55e]" />
            <span className="text-sm font-medium text-[#22c55e]">Judge-2 LMM</span>
            {score !== undefined && (
              <span className={`text-sm font-bold ml-auto ${getScoreClass(score)}`}>{score}/10</span>
            )}
          </div>
          {reasoning && <p className="text-sm text-[#b4bcd0]">{reasoning}</p>}
        </div>
      );
    };

    // Render Judge-3 Rule feedback (Steps 4, 6)
    const renderRuleFeedback = () => {
      const rule = feedback.rule_feedback;
      if (!rule) return null;

      const reasoningKey = isStep4 ? 'step_4_rule_reasoning' : `${stepKey}_reasoning`;
      const scoreKey = isStep4 ? 'step_4_rule_score' : `${stepKey}_score`;
      const reasoning = rule[reasoningKey];
      const score = rule[scoreKey];

      if (reasoning === undefined && score === undefined && !rule.answer_reasoning) return null;

      return (
        <div className="p-3 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/30 mb-3">
          <div className="flex items-center gap-2 mb-2">
            <Scale className="w-4 h-4 text-[#f59e0b]" />
            <span className="text-sm font-medium text-[#f59e0b]">Judge-3 Rule</span>
            {score !== undefined && (
              <span className={`text-sm font-bold ml-auto ${getScoreClass(score)}`}>{score}/10</span>
            )}
          </div>
          {reasoning && <p className="text-sm text-[#b4bcd0]">{reasoning}</p>}
        </div>
      );
    };

    // Render based on step
    return (
      <div className="space-y-2">
        {(stepKey === 'step_1' || stepKey === 'step_2') && renderVLMFeedback()}
        {(stepKey === 'step_3' || stepKey === 'step_5') && renderLMMFeedback()}
        {stepKey === 'step_4' && (
          <>
            {renderLMMFeedback()}
            {renderRuleFeedback()}
          </>
        )}
        {stepKey === 'step_6' && renderRuleFeedback()}
        
        {/* Overall answer evaluation */}
        {feedback.rule_feedback?.answer_reasoning && (
          <div className="mt-3 pt-3 border-t border-[#2a2d47]/50">
            <div className="flex items-center gap-2 mb-1">
              <Award className="w-4 h-4 text-[#4d6bfa]" />
              <span className="text-sm font-medium text-[#4d6bfa]">Answer Evaluation</span>
              {feedback.rule_feedback.answer_match_score !== undefined && (
                <span className={`text-sm font-bold ml-auto ${getScoreClass(feedback.rule_feedback.answer_match_score)}`}>
                  {feedback.rule_feedback.answer_match_score}/10
                </span>
              )}
            </div>
            <p className="text-sm text-[#8b949e]">{feedback.rule_feedback.answer_reasoning}</p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="annotation-process" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#04070a] via-[#0d1117] to-[#04070a]" />
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#4d6bfa]/5 rounded-full blur-[150px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-4 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4d6bfa]/10 border border-[#4d6bfa]/30 mb-2">
            <Sparkles className="w-4 h-4 text-[#4d6bfa]" />
            <span className="text-sm font-medium text-[#4d6bfa]">Annotation Pipeline</span>
          </div>

          <h2 className="section-title mb-3">
            Analysis of Specific Examples
          </h2>

          <p className="section-subtitle max-w-3xl mx-auto">
            Every annotation undergoes rigorous evaluation by <strong className="text-white">5 models × 3 judges</strong> across 6 thinking steps,
            ensuring high-quality training data with detailed quality metrics
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left: Image + Step Navigation + Judge Info */}
          <div
            className={`lg:col-span-4 space-y-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Sample Selector Tabs */}
            <div className="flex gap-2">
              {sampleData.map((sample, index) => (
                <button
                  key={sample.task_id}
                  onClick={() => {
                    setActiveSample(index);
                    setActiveStep(0);
                    setExpandedModels([]);
                  }}
                  className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeSample === index
                      ? 'bg-[#4d6bfa] text-white'
                      : 'bg-[#161b22] text-[#b4bcd0] border border-[#2a2d47]/50 hover:border-[#4d6bfa]/50'
                  }`}
                >
                  Sample {sample.task_id}
                </button>
              ))}
            </div>

            {/* Image Comparison - Integrated into left column */}
            <div className="rounded-2xl overflow-hidden border border-[#2a2d47]/50">
              {activeSample === 0 && (
                <ImageCompare
                  t1Image="/00299_2024_RGB.png"
                  t2Image="/00299_2025_RGB.png"
                  sampleId="00299"
                />
              )}
              {activeSample === 1 && (
                <ImageCompare
                  t1Image="/00300_2024_RGB.png"
                  t2Image="/00300_2025_RGB.png"
                  sampleId="00300"
                />
              )}
              {activeSample === 2 && (
                <ImageCompare
                  t1Image="/00301_2024_RGB.png"
                  t2Image="/00301_2025_RGB.png"
                  sampleId="00301"
                />
              )}
            </div>

            {/* Thinking Steps */}
            <div className="bg-[#161b22]/80 rounded-2xl border border-[#2a2d47]/50 p-4">
              <h3 className="text-sm font-semibold text-white mb-3 px-1">Thinking Steps</h3>
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(index)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                      activeStep === index
                        ? 'bg-[#4d6bfa]/20 border border-[#4d6bfa]/50'
                        : 'hover:bg-[#2a2d47]/30'
                    }`}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${step.color}20` }}
                    >
                      <step.icon className="w-4 h-4" style={{ color: step.color }} />
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-white">{step.label}</p>
                      <p className="text-xs text-[#6e7681]">{step.judgeLabel}</p>
                    </div>
                    {activeStep === index && (
                      <ChevronDown className="w-4 h-4 text-[#4d6bfa] ml-auto rotate-[-90deg]" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Judge Legend */}
            <div className="bg-[#161b22]/80 rounded-2xl border border-[#2a2d47]/50 p-4">
              <h3 className="text-sm font-semibold text-white mb-3">Judge Systems</h3>
              <div className="space-y-3">
                {judges.map(judge => (
                  <div key={judge.id} className="flex items-start gap-2">
                    <div
                      className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: judge.color }}
                    />
                    <div>
                      <p className="text-xs text-[#b4bcd0] font-medium">{judge.name}</p>
                      <p className="text-xs text-[#6e7681]">{judge.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center: Score Comparison */}
          <div
            className={`lg:col-span-5 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="bg-[#161b22]/80 rounded-2xl border border-[#2a2d47]/50 p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-white">{currentStep.label}</h3>
                  <p className="text-sm text-[#6e7681]">{currentStep.desc}</p>
                </div>
                <div
                  className="px-3 py-1.5 rounded-lg text-sm"
                  style={{ backgroundColor: `${currentStep.color}20`, color: currentStep.color }}
                >
                  Step {activeStep + 1}/6
                </div>
              </div>

              {/* Chosen Model */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="w-4 h-4 text-[#f59e0b]" />
                  <span className="text-sm font-medium text-[#f59e0b]">Best Response (Chosen)</span>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-[#f59e0b]/10 to-transparent border border-[#f59e0b]/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ backgroundColor: models.find(m => m.id === currentSample.chosen.model_name)?.color + '20' }}
                      >
                        <span className="text-sm font-bold" style={{ color: models.find(m => m.id === currentSample.chosen.model_name)?.color }}>
                          {models.find(m => m.id === currentSample.chosen.model_name)?.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-white">
                          {models.find(m => m.id === currentSample.chosen.model_name)?.name}
                        </p>
                        <p className="text-xs text-[#6e7681]">Process Score: {currentSample.chosen.process_score}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold" style={{ color: currentStep.color }}>
                        {getStepScore(currentSample.chosen, currentStep.key)}
                      </div>
                      <p className="text-xs text-[#6e7681]">/10</p>
                    </div>
                  </div>

                  {/* Judge Feedback for Chosen */}
                  {renderFeedback(currentSample.chosen, currentStep.key)}
                </div>
              </div>

              {/* Rejected Models */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <XCircle className="w-4 h-4 text-[#ef4444]" />
                  <span className="text-sm font-medium text-[#ef4444]">Other Responses (Rejected)</span>
                </div>
                <div className="space-y-3">
                  {currentSample.rejected.map((rejected) => {
                    const modelInfo = models.find(m => m.id === rejected.model_name);
                    const isExpanded = expandedModels.includes(rejected.model_name);
                    const score = getStepScore(rejected, currentStep.key);
                    const scoreNum = parseFloat(score as string);
                    
                    return (
                      <div
                        key={rejected.model_name}
                        className="rounded-xl bg-[#0d1117] border border-[#2a2d47]/50 overflow-hidden"
                      >
                        {/* Header - Always visible */}
                        <div
                          className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#161b22]/50 transition-colors"
                          onClick={() => toggleModel(rejected.model_name)}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-lg flex items-center justify-center"
                              style={{ backgroundColor: modelInfo?.color + '20' }}
                            >
                              <span className="text-sm font-bold" style={{ color: modelInfo?.color }}>
                                {modelInfo?.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-white">{modelInfo?.name}</p>
                              <p className="text-xs text-[#6e7681]">Process Score: {rejected.process_score}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className={`text-xl font-bold ${scoreNum >= 8 ? 'text-[#22c55e]' : scoreNum >= 5 ? 'text-[#f59e0b]' : 'text-[#ef4444]'}`}>
                                {score}
                              </div>
                              <p className="text-xs text-[#6e7681]">/10</p>
                            </div>
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4 text-[#6e7681]" />
                            ) : (
                              <ChevronDown className="w-4 h-4 text-[#6e7681]" />
                            )}
                          </div>
                        </div>

                        {/* Expanded Content - Detailed Feedback */}
                        {isExpanded && (
                          <div className="px-4 pb-4 border-t border-[#2a2d47]/30">
                            <div className="pt-3">
                              <p className="text-xs text-[#6e7681] mb-2">Detailed Evaluation:</p>
                              {renderFeedback(rejected, currentStep.key, true)}
                              
                              {/* Score breakdown */}
                              <div className="mt-3 pt-3 border-t border-[#2a2d47]/30">
                                <p className="text-xs text-[#6e7681] mb-2">Score Breakdown:</p>
                                <div className="grid grid-cols-2 gap-2 text-xs">
                                  {currentStep.key === 'step_4' ? (
                                    <>
                                      <div className="flex justify-between p-2 rounded bg-[#161b22]">
                                        <span className="text-[#8b949e]">Logic Score:</span>
                                        <span className={rejected.detailed_scores.step_4_logic >= 8 ? 'text-[#22c55e]' : rejected.detailed_scores.step_4_logic >= 5 ? 'text-[#f59e0b]' : 'text-[#ef4444]'}>
                                          {rejected.detailed_scores.step_4_logic}/10
                                        </span>
                                      </div>
                                      <div className="flex justify-between p-2 rounded bg-[#161b22]">
                                        <span className="text-[#8b949e]">Rule Score:</span>
                                        <span className={rejected.detailed_scores.step_4_rule >= 8 ? 'text-[#22c55e]' : rejected.detailed_scores.step_4_rule >= 5 ? 'text-[#f59e0b]' : 'text-[#ef4444]'}>
                                          {rejected.detailed_scores.step_4_rule}/10
                                        </span>
                                      </div>
                                    </>
                                  ) : (
                                    <div className="flex justify-between p-2 rounded bg-[#161b22]">
                                      <span className="text-[#8b949e]">{currentStep.label}:</span>
                                      <span className={scoreNum >= 8 ? 'text-[#22c55e]' : scoreNum >= 5 ? 'text-[#f59e0b]' : 'text-[#ef4444]'}>
                                        {score}/10
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Score Summary */}
          <div
            className={`lg:col-span-3 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="bg-[#161b22]/80 rounded-2xl border border-[#2a2d47]/50 p-4">
              <h3 className="text-sm font-semibold text-white mb-4">Step Scores Overview</h3>
              <div className="space-y-3">
                {steps.map((step, index) => {
                  const chosenScore = parseFloat(getStepScore(currentSample.chosen, step.key) as string);
                  const avgRejected = currentSample.rejected.length > 0
                    ? currentSample.rejected.reduce((sum, r) => sum + parseFloat(getStepScore(r, step.key) as string), 0) / currentSample.rejected.length
                    : 0;
                  const gap = chosenScore - avgRejected;

                  return (
                    <div
                      key={step.id}
                      onClick={() => setActiveStep(index)}
                      className={`p-3 rounded-xl cursor-pointer transition-all ${
                        activeStep === index
                          ? 'bg-[#4d6bfa]/10 border border-[#4d6bfa]/30'
                          : 'hover:bg-[#2a2d47]/30'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-[#b4bcd0]">{step.label}</span>
                        {gap > 1 && (
                          <span className="text-xs px-1.5 py-0.5 rounded bg-[#22c55e]/20 text-[#22c55e]">
                            +{gap.toFixed(1)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-[#2a2d47]/50 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{ width: `${chosenScore * 10}%`, backgroundColor: step.color }}
                          />
                        </div>
                        <span className="text-xs font-medium text-white w-8 text-right">{chosenScore}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Overall Stats */}
              <div className="mt-6 pt-4 border-t border-[#2a2d47]/50">
                <h4 className="text-xs font-medium text-[#6e7681] mb-3">Overall Performance</h4>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-[#0d1117]">
                    <p className="text-xs text-[#6e7681] mb-1">Process Score</p>
                    <p className="text-lg font-bold text-[#f59e0b]">{currentSample.chosen.process_score}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-[#0d1117]">
                    <p className="text-xs text-[#6e7681] mb-1">Answer Score</p>
                    <p className="text-lg font-bold text-[#4d6bfa]">{currentSample.chosen.answer_score}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
