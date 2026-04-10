import { useEffect, useRef, useState } from 'react';
import { BarChart3, ChevronDown } from 'lucide-react';

const tableData = {
  tab1: {
    title: 'Five Standard Models: Change vs. No-Change (All Samples)',
    headers: ['REASONING STEP', 'CHANGE (N=9,805)', 'NO-CHANGE (N=9,900)', 'COMBINED (N=19,705)'],
    rows: [
      ['Step 1: Global Perception', '74.1 ± 27.4', '81.1 ± 33.3', '77.6 ± 30.7'],
      ['Step 2: Instance Visual', '101.1 ± 49.1', '116.1 ± 75.6', '108.6 ± 64.2'],
      ['Step 3: Relational Model', '82.3 ± 34.5', '81.5 ± 39.3', '81.9 ± 37.0'],
      ['Step 4: Reasoning', '139.2 ± 93.1', '134.7 ± 96.0', '137.0 ± 94.6'],
      ['Step 5: Future Inference', '29.6 ± 6.1', '31.3 ± 6.1', '30.5 ± 6.2'],
      ['Step 6: Confidence', '65.4 ± 24.6', '75.4 ± 26.5', '70.4 ± 26.0'],
    ]
  },
  tab2: {
    title: 'Five Standard Models: High-Quality Samples (Preference-Aligned)',
    headers: ['REASONING STEP', 'CHANGE (N=1,961)', 'NO-CHANGE (N=1,980)', 'COMBINED (N=3,941)'],
    rows: [
      ['Step 1: Global Perception', '102.0 ± 18.5', '117.8 ± 18.7', '109.9 ± 20.2'],
      ['Step 2: Instance Visual', '152.2 ± 40.6', '208.7 ± 62.9', '180.6 ± 60.0'],
      ['Step 3: Relational Model', '120.3 ± 29.9', '130.0 ± 27.9', '125.2 ± 29.3'],
      ['Step 4: Reasoning', '247.4 ± 83.2', '255.9 ± 89.7', '251.7 ± 86.6'],
      ['Step 5: Future Inference', '32.8 ± 4.7', '30.9 ± 4.1', '31.9 ± 4.5'],
      ['Step 6: Confidence', '90.7 ± 21.0', '104.6 ± 15.5', '97.7 ± 19.7'],
    ],
    note: 'High-quality samples selected through preference alignment show more consistent reasoning lengths with lower standard deviations.'
  },
  tab3: {
    title: 'Three Human Judges: High-Quality Samples (Decoupled Evaluation)',
    headers: ['EVALUATION MODULE / STEP', 'CHANGE (N=1,877)', 'NO-CHANGE (N=1,973)', 'COMBINED (N=3,850)'],
    rows: [
      ['VLM Feedback (Visual-Language)', '', '', ''],
      ['Step 1: Global Perception', '27.2 ± 13.8', '55.5 ± 6.7', '41.7 ± 17.8'],
      ['Step 2: Instance Visual', '35.6 ± 18.2', '57.8 ± 6.4', '47.0 ± 17.5'],
      ['LMM Feedback (Spatiotemporal Logic)', '', '', ''],
      ['Step 3: Relational Model', '37.6 ± 7.6', '36.4 ± 7.2', '37.0 ± 7.4'],
      ['Step 4: Reasoning', '46.4 ± 9.9', '46.1 ± 8.9', '46.2 ± 9.4'],
      ['Step 5: Future Inference', '30.8 ± 5.7', '30.4 ± 5.7', '30.6 ± 5.7'],
      ['Rule Feedback (Standards Compliance)', '', '', ''],
      ['Step 4: Rule Reasoning', '25.8 ± 5.2', '24.3 ± 4.6', '25.1 ± 4.9'],
      ['Step 6: Confidence', '24.7 ± 5.2', '24.5 ± 5.3', '24.6 ± 5.3'],
    ],
    note: 'Judge feedback shows shorter reasoning lengths as evaluators focus on key assessment criteria rather than comprehensive explanations.'
  }
};

export default function ReasoningLength() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'tab1' | 'tab2' | 'tab3'>('tab1');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

  const tabs = [
    { id: 'tab1', label: 'All Samples', shortLabel: 'All' },
    { id: 'tab2', label: 'High-Quality (Models)', shortLabel: 'HQ Models' },
    { id: 'tab3', label: 'High-Quality (Judges)', shortLabel: 'HQ Judges' },
  ] as const;

  const currentData = tableData[activeTab];

  return (
    <section id="reasoning-length" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#8b5cf6]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 mb-6">
            <BarChart3 className="w-4 h-4 text-[#8b5cf6]" />
            <span className="text-sm font-medium text-[#8b5cf6]">Length Analysis</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Reasoning Length Analysis
          </h2>
          <p className="text-[#b4bcd0] max-w-3xl mx-auto">
            Statistical analysis of reasoning trajectory lengths across different model groups and sample types. Word count statistics (mean ± std) for each reasoning step.
          </p>
        </div>

        {/* Tab Navigation - Desktop */}
        <div
          className={`hidden md:flex justify-center mb-8 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex p-1 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-[#8b5cf6]/20 text-white border border-[#8b5cf6]/50'
                    : 'text-[#6e7681] hover:text-white hover:bg-[#2a2d47]/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Navigation - Mobile Dropdown */}
        <div
          className={`md:hidden mb-8 transition-all duration-700 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50 text-white"
            >
              <span>{tabs.find(t => t.id === activeTab)?.label}</span>
              <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 p-1 rounded-xl bg-[#161b22] border border-[#2a2d47]/50 z-10">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-2.5 rounded-lg text-sm font-medium text-left transition-all ${
                      activeTab === tab.id
                        ? 'bg-[#8b5cf6]/20 text-white'
                        : 'text-[#6e7681] hover:text-white hover:bg-[#2a2d47]/50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Table Container */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="rounded-2xl bg-[#161b22]/80 border border-[#2a2d47]/50 overflow-hidden">
            {/* Table Header */}
            <div className="p-6 border-b border-[#2a2d47]/50">
              <h3 className="text-lg font-semibold text-white">{currentData.title}</h3>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#0d1117]/50">
                    {currentData.headers.map((header, idx) => (
                      <th
                        key={idx}
                        className={`py-4 px-4 text-left text-xs font-semibold text-[#6e7681] uppercase tracking-wider ${
                          idx === 0 ? 'min-w-[200px]' : 'min-w-[140px]'
                        }`}
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {currentData.rows.map((row, rowIdx) => {
                    const isCategory = row[1] === '' && row[2] === '' && row[3] === '';
                    return (
                      <tr
                        key={rowIdx}
                        className={`border-b border-[#2a2d47]/30 ${
                          isCategory ? 'bg-[#4d6bfa]/5' : 'hover:bg-[#2a2d47]/20'
                        }`}
                      >
                        {row.map((cell, cellIdx) => (
                          <td
                            key={cellIdx}
                            className={`py-3 px-4 ${
                              isCategory
                                ? 'text-sm font-semibold text-[#4d6bfa]'
                                : cellIdx === 0
                                ? 'text-sm text-white font-medium'
                                : 'text-sm text-[#b4bcd0] font-mono'
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Note */}
            {currentData.note && (
              <div className="p-4 border-t border-[#2a2d47]/50 bg-[#0d1117]/30">
                <p className="text-sm text-[#6e7681]">{currentData.note}</p>
              </div>
            )}
          </div>
        </div>

        {/* Key Insights */}
        <div
          className={`mt-8 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="rounded-2xl bg-[#161b22]/60 border border-[#2a2d47]/50 p-6">
            <div className="flex items-center gap-2 mb-6">
              <svg className="w-5 h-5 text-[#8b5cf6]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
              </svg>
              <h4 className="text-lg font-semibold text-white">Key Insights</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
              <div className="flex gap-3">
                <span className="text-[#8b5cf6] mt-1">•</span>
                <p className="text-sm text-[#b4bcd0]"><strong className="text-white">Step 4 (Reasoning)</strong> has the highest word count (avg. 251-252 words), indicating complex semantic analysis</p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#8b5cf6] mt-1">•</span>
                <p className="text-sm text-[#b4bcd0]"><strong className="text-white">High-quality samples</strong> show lower variance, indicating more consistent reasoning patterns</p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#8b5cf6] mt-1">•</span>
                <p className="text-sm text-[#b4bcd0]"><strong className="text-white">Step 5 (Future Inference)</strong> is most concise (avg. 31-32 words), showing focused prediction</p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#8b5cf6] mt-1">•</span>
                <p className="text-sm text-[#b4bcd0]"><strong className="text-white">Judge feedback</strong> is 2-4× shorter than model reasoning, reflecting evaluation focus</p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#8b5cf6] mt-1">•</span>
                <p className="text-sm text-[#b4bcd0]"><strong className="text-white">No-change samples</strong> tend to have longer reasoning in Steps 1-2 due to explanation requirements</p>
              </div>
              <div className="flex gap-3">
                <span className="text-[#8b5cf6] mt-1">•</span>
                <p className="text-sm text-[#b4bcd0]"><strong className="text-white">Step 2 variance</strong> is highest across all categories, showing diverse visual descriptions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
