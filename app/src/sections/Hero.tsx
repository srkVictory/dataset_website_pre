// 导入React hooks和图标组件
import { useState, useRef, useEffect } from 'react';
import { ArrowRight, FileText, Database, ChevronDown } from 'lucide-react';

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
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* 左侧内容区域 */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
          >
            {/* 标题区域 */}
            <div className="space-y-3">
              <div className="space-y-1">
                <h1 className="text-4xl md:text-5xl font-bold text-white font-['Poppins'] leading-tight">
                  Geo-Beyond
                </h1>
                <h1 className="text-4xl md:text-5xl font-bold gradient-text font-['Poppins'] leading-tight">
                  Captioning
                </h1>
              </div>
              <p className="text-lg md:text-xl text-[#b4bcd0] font-light">
                Remote Sensing Dataset for <span className="text-[#4d6bfa] font-medium">Chain-of-Thought</span> Training
              </p>
            </div>

            {/* 项目描述 */}
            <p className="text-lg text-[#b4bcd0] leading-relaxed max-w-xl">
              A pioneering dataset featuring <span className="text-white font-semibold">20000+</span> annotated image pairs with <span className="text-[#4d6bfa] font-semibold">6-step reasoning chains</span>. Supports diverse training paradigms including SFT, PPO, DPO, GRPO, KTO, and fine-grained Process Reward Modeling (PRM).
            </p>

            {/* 数据统计展示 */}
            <div className="flex flex-wrap gap-6">
              {[
                { value: '20000+', label: 'Image Pairs' },
                { value: '6-Step', label: 'Thinking Process' },
                { value: '8+', label: 'Training Methods' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-white font-['Poppins']">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#b4bcd0]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* 主要操作按钮 */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('#dataset')}
                className="btn-primary flex items-center gap-2 group"
              >
                Explore Dataset
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
              <a
                href="https://arxiv.org"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                View Paper
              </a>
            </div>

            {/* 快速链接区域 */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#b4bcd0] hover:text-white transition-colors"
              >
                <Database className="w-4 h-4" />
                GitHub Repository
              </a>
              <span className="text-[#2a2d47]">|</span>
              <button
                onClick={() => scrollToSection('#download')}
                className="flex items-center gap-2 text-sm text-[#b4bcd0] hover:text-white transition-colors"
              >
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

            {/* 装饰性光晕元素 */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#4d6bfa]/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-[#4353fa]/15 rounded-full blur-3xl" />
          </div>
        </div>
      </div>

      {/* 底部滚动指示器 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-[#b4bcd0]" />
      </div>
    </section>
  );
}
