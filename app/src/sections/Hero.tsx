// 导入React hooks和图标组件
import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Database, ChevronDown } from 'lucide-react';

// Hero组件 - 页面首屏展示
export default function Hero() {
  // 状态：滑块位置、拖拽状态、可见性
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // 组件挂载时触发入场动画
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 鼠标按下和释放事件
  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  // 鼠标移动更新滑块位置
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  // 触摸移动事件
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.touches[0].clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  // 平滑滚动到指定区域
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-start overflow-hidden pt-20"
    >
      {/* 背景网格图案 */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(77, 107, 250, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(77, 107, 250, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* 动画渐变光晕背景 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4d6bfa]/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#4353fa]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧内容区域 */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
          >
            {/* 标题区域 */}
            <div className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-white font-['Poppins'] leading-[1.1] tracking-tight">
                  Beyond Captioning:
                </h1>
                <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold gradient-text font-['Poppins'] leading-[1.1] tracking-tight">
                  A Preference-Aligned Benchmark
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-[#b4bcd0] font-light max-w-2xl leading-relaxed">
                for Fine-Grained Reasoning and Spatiotemporal Geo-World Understanding
              </p>
            </div>

            {/* 项目描述 */}
            <div className="space-y-4 max-w-xl">
              <p className="text-base text-[#b4bcd0] leading-relaxed">
                Remote sensing change captioning has made strong progress in describing visible differences between bi-temporal images, but most existing benchmarks mainly reward surface-level descriptions such as "new buildings appeared" or "vegetation decreased." They provide limited support for evaluating whether a model can reason over spatial evidence, apply semantic rules, reject pseudo-changes, and align predictions with geographic expert judgment. Geo-BC is designed to fill this gap.
              </p>
              <p className="text-base text-[#b4bcd0] leading-relaxed">
                Geo-BC reframes bi-temporal change analysis from free-form caption generation to structured change interpretation. Instead of only asking what changed, Geo-BC asks whether a model can:
              </p>
              <ul className="text-base text-[#b4bcd0] leading-relaxed space-y-1 pl-4">
                <li className="flex items-start gap-2">
                  <span className="text-[#4d6bfa] mt-1">•</span>
                  <span>localize relevant evidence,</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4d6bfa] mt-1">•</span>
                  <span>reason over spatial and semantic relations,</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4d6bfa] mt-1">•</span>
                  <span>determine whether the change is valid under a land-use taxonomy,</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4d6bfa] mt-1">•</span>
                  <span>filter out task-irrelevant variation,</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#4d6bfa] mt-1">•</span>
                  <span>and calibrate confidence under ambiguity.</span>
                </li>
              </ul>
            </div>

            {/* 操作链接 */}
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="https://github.com/kaynqi/Beyond-Captioning"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#b4bcd0] hover:text-white transition-colors group"
              >
                <Database className="w-4 h-4 group-hover:text-[#4d6bfa] transition-colors" />
                GitHub Repository
              </a>
              <button
                onClick={() => scrollToSection('#download')}
                className="flex items-center gap-2 text-sm text-[#b4bcd0] hover:text-white transition-colors group"
              >
                <ArrowRight className="w-4 h-4 group-hover:text-[#4d6bfa] transition-colors" />
                Download Dataset
              </button>
            </div>
          </div>

          {/* 右侧交互式图片对比组件 */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#2a2d47]/50">
              {/* 图片容器，支持拖拽交互 */}
              <div
                ref={containerRef}
                className="relative aspect-square cursor-ew-resize select-none"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onMouseMove={handleMouseMove}
                onTouchMove={handleTouchMove}
                onTouchStart={handleMouseDown}
                onTouchEnd={handleMouseUp}
              >
                {/* T2背景图片 */}
                <img
                  src="/00500_2025_RGB.png"
                  alt="T2 Satellite Image"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* T1前景图片 */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                >
                  <img
                    src="/00500_2024_RGB.png"
                    alt="T1 Satellite Image"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>

                {/* 滑块分割线 */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                >
                  {/* 滑块手柄 */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
                    <div className="flex gap-1">
                      <ChevronDown className="w-4 h-4 text-[#04070a] rotate-90" />
                      <ChevronDown className="w-4 h-4 text-[#04070a] -rotate-90" />
                    </div>
                  </div>
                </div>

                {/* 图片标签 */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#04070a]/80 backdrop-blur-sm text-sm font-medium text-white">
                  T1
                </div>
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-[#04070a]/80 backdrop-blur-sm text-sm font-medium text-white">
                  T2
                </div>
              </div>
            </div>

            {/* 图片说明文字 */}
            <p className="mt-4 text-center text-sm text-[#b4bcd0]">
              Drag the slider to compare bi-temporal images
            </p>

            {/* 业务需求洞察 */}
            <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-[#4d6bfa]/10 via-[#4d6bfa]/5 to-transparent border border-[#4d6bfa]/20">
              <p className="text-sm text-[#b4bcd0] leading-relaxed">
                <span className="text-white font-medium">Traditional RSCC</span> approaches that simply describe "what changed" fall short in real-world applications. 
                <span className="text-[#4d6bfa] font-medium"> Geo-BC</span> enables <span className="text-white">rule-based structured reasoning</span> to filter out irrelevant variations and focus on changes that truly matter under domain-specific constraints.
              </p>
            </div>

            {/* 土地利用应用需求 */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { 
                  icon: '🏙️', 
                  title: 'Urban Planning', 
                  desc: 'Distinguish legal urban expansion from illegal construction under zoning rules',
                  color: '#4d6bfa'
                },
                { 
                  icon: '🌾', 
                  title: 'Agriculture', 
                  desc: 'Verify crop compliance with land-use planning and subsidy policies',
                  color: '#22c55e'
                },
              ].map((app) => (
                <div 
                  key={app.title}
                  className="p-3 rounded-xl bg-[#161b22]/60 border border-[#2a2d47]/50 hover:border-[#4d6bfa]/30 transition-all group"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl">{app.icon}</span>
                    <div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-[#4d6bfa] transition-colors">
                        {app.title}
                      </h4>
                      <p className="text-[11px] text-[#6e7681] mt-0.5 leading-tight">
                        {app.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 装饰性光晕元素 */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#4d6bfa]/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#4353fa]/15 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* 数据集构建流程与统计 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-auto pb-6 pt-4">
        <div className="grid lg:grid-cols-12 gap-4">
          
          {/* 左侧：流程图 (占8列) */}
          <div
            className={`lg:col-span-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0.9s', transitionTimingFunction: 'var(--ease-out-expo)' }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-[#4d6bfa]/20 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#4d6bfa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white">Dataset Construction Pipeline</h3>
            </div>
            
            {/* 流程图图片 */}
            <div className="rounded-xl bg-[#161b22]/80 border border-[#2a2d47]/50 p-2 mb-3">
              <img 
                src="/construction_flow.png" 
                alt="Dataset Construction Flow" 
                className="w-full h-auto rounded-lg"
              />
            </div>
            
            {/* 流程图注 */}
            <div className="bg-[#161b22]/40 rounded-lg p-3 border border-[#2a2d47]/30">
              <p className="text-[11px] text-[#b4bcd0] leading-relaxed">
                The diagram illustrates how bi-temporal remote sensing input data and auxiliary segmentation metadata are processed through a structured reasoning pipeline: this pipeline encompasses global perception, instance grounding, dense relation completion, standards-driven semantic filtering, future-state inference, and uncertainty-aware confidence scoring. Finally, expert-in-the-loop validation is incorporated to support downstream model training and performance evaluation.
              </p>
            </div>
          </div>

          {/* 右侧：Definitions + Stats (占4列) */}
          <div
            className={`lg:col-span-4 transition-all duration-700 flex flex-col gap-3 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '1.0s', transitionTimingFunction: 'var(--ease-out-expo)' }}
          >
            {/* Definitions */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded bg-[#8b5cf6]/20 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Definitions</h3>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-[#161b22]/80 border border-[#2a2d47]/50 hover:border-[#4d6bfa]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded bg-[#4d6bfa]/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-[#4d6bfa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                      </svg>
                    </div>
                    <span className="text-[11px] text-white font-medium">Sample</span>
                  </div>
                  <p className="text-[10px] text-[#b4bcd0] leading-relaxed pl-7">Bi-temporal image pair with metadata, semantic query, and rule context.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#161b22]/80 border border-[#2a2d47]/50 hover:border-[#22c55e]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded bg-[#22c55e]/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                    </div>
                    <span className="text-[11px] text-white font-medium">Reasoning Trajectory</span>
                  </div>
                  <p className="text-[10px] text-[#b4bcd0] leading-relaxed pl-7">A complete six-step reasoning path from perception to conclusion.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-[#161b22]/80 border border-[#2a2d47]/50 hover:border-[#f59e0b]/30 transition-colors">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-5 h-5 rounded bg-[#f59e0b]/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <span className="text-[11px] text-white font-medium">Judge Comment</span>
                  </div>
                  <p className="text-[10px] text-[#b4bcd0] leading-relaxed pl-7">Evaluation statements from decoupled multi-judge system.</p>
                </div>
              </div>
            </div>
            
            {/* Release Accounting */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded bg-[#ec4899]/20 flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-[#ec4899]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Release Accounting</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 rounded-lg bg-[#161b22]/80 border border-[#2a2d47]/50 text-center">
                  <div className="text-base font-semibold text-[#4d6bfa] font-['Poppins']">109,224</div>
                  <div className="text-[9px] text-[#b4bcd0]">Final Samples</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#161b22]/80 border border-[#2a2d47]/50 text-center">
                  <div className="text-base font-semibold text-[#4d6bfa] font-['Poppins']">327,672</div>
                  <div className="text-[9px] text-[#b4bcd0]">Trajectories</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#161b22]/80 border border-[#2a2d47]/50 text-center">
                  <div className="text-base font-semibold text-[#4d6bfa] font-['Poppins']">382,284</div>
                  <div className="text-[9px] text-[#b4bcd0]">Comments</div>
                </div>
                <div className="p-2.5 rounded-lg bg-[#161b22]/80 border border-[#2a2d47]/50 text-center">
                  <div className="text-base font-semibold text-[#4d6bfa] font-['Poppins']">39,646</div>
                  <div className="text-[9px] text-[#b4bcd0]">Pro Subset</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
