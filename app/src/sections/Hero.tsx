import { useState, useRef, useEffect } from 'react';
import { ArrowRight, FileText, Database, ChevronDown, BookOpen } from 'lucide-react';

export default function Hero() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
      {/* Background Grid Pattern */}
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

      {/* Animated Gradient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#4d6bfa]/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#4353fa]/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content Area */}
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
          >
            {/* Publication Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4d6bfa]/10 border border-[#4d6bfa]/30">
              <BookOpen className="w-4 h-4 text-[#4d6bfa]" />
              <span className="text-sm font-medium text-[#4d6bfa]">ACM Conference 2025</span>
            </div>

            {/* Title Area */}
            <div className="space-y-3">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                Beyond Captioning: A Preference-Aligned Benchmark
              </h1>
              <h2 className="text-xl md:text-2xl text-[#b4bcd0] font-light">
                for Fine-Grained Reasoning and Spatiotemporal Geo-World Understanding
              </h2>
            </div>

            {/* Abstract-style Description */}
            <div className="border-l-2 border-[#4d6bfa]/30 pl-4">
              <p className="text-base text-[#b4bcd0] leading-relaxed">
                A large-scale dataset featuring <span className="text-white font-semibold">109,224</span> annotated image pairs 
                with <span className="text-[#4d6bfa] font-semibold">six-stage chain-of-thought</span> reasoning. 
                Supports diverse training paradigms including SFT, PPO, DPO, GRPO, and fine-grained 
                Process Reward Modeling (PRM).
              </p>
            </div>

            {/* Key Stats */}
            <div className="flex flex-wrap gap-6">
              {[
                { value: '109K', label: 'Image Pairs' },
                { value: '328K', label: 'Reasoning Trajectories' },
                { value: '6-Step', label: 'Thinking Process' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="text-center"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="text-2xl md:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#b4bcd0]">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Primary Action Buttons */}
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

            {/* Quick Links */}
            <div className="flex flex-wrap items-center gap-4 pt-4 text-sm">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#b4bcd0] hover:text-white transition-colors"
              >
                <Database className="w-4 h-4" />
                GitHub Repository
              </a>
              <span className="text-[#2a2d47]">|</span>
              <button
                onClick={() => scrollToSection('#download')}
                className="text-[#b4bcd0] hover:text-white transition-colors"
              >
                Download Dataset
              </button>
            </div>
          </div>

          {/* Right Interactive Image Comparison */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#2a2d47]/50">
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
                <img
                  src="/00500_2025_RGB.png"
                  alt="T2 Satellite Image"
                  className="absolute inset-0 w-full h-full object-cover"
                />
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
                <div
                  className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                  style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
                    <div className="flex gap-1">
                      <ChevronDown className="w-4 h-4 text-[#04070a] rotate-90" />
                      <ChevronDown className="w-4 h-4 text-[#04070a] -rotate-90" />
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#04070a]/80 backdrop-blur-sm text-sm font-medium text-white">
                  T1
                </div>
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-[#04070a]/80 backdrop-blur-sm text-sm font-medium text-white">
                  T2
                </div>
              </div>
            </div>
            <p className="mt-4 text-center text-sm text-[#b4bcd0]">
              Drag slider to compare bi-temporal images
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-[#b4bcd0]" />
      </div>
    </section>
  );
}
