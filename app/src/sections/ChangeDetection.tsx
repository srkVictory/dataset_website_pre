import { useState, useEffect, useRef } from 'react';
import { Eye, Layers, Split, ChevronDown, Box } from 'lucide-react';

type ViewMode = 't1' | 't2' | 'mask' | 'compare' | 'mask-t1' | 'mask-t2';

export default function ChangeDetection() {
  const [viewMode, setViewMode] = useState<ViewMode>('compare');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
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

  const viewModes = [
    { id: 'compare' as ViewMode, label: 'Compare', icon: Split },
    { id: 't1' as ViewMode, label: 'T1 Image', icon: Eye },
    { id: 't2' as ViewMode, label: 'T2 Image', icon: Eye },
    { id: 'mask-t1' as ViewMode, label: 'T1 Semantic Mask', icon: Box },
    { id: 'mask-t2' as ViewMode, label: 'T2 Semantic Mask', icon: Layers },
  ];

  return (
    <section id="change-detection" ref={sectionRef} className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className={`space-y-8 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {/* Label */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4d6bfa]/10 border border-[#4d6bfa]/30">
              <span className="text-sm font-medium text-[#4d6bfa]">Change Detection</span>
            </div>

            {/* Title */}
            <h2 className="section-title">
              Visualizing
              <br />
              <span className="gradient-text">Landscape Changes</span>
            </h2>

            {/* Description */}
            <p className="text-lg text-[#b4bcd0] leading-relaxed">
              Compare bi-temporal images using our interactive visualization tool to observe changes over time. The change mask highlights areas of significant transformation.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                { icon: Split, text: 'Bi-temporal image comparison' },
                { icon: Layers, text: 'Semantic mask visualization (T1 & T2)' },
                { icon: Eye, text: 'Interactive slider control' },
              ].map((feature, index) => (
                <div
                  key={feature.text}
                  className={`flex items-center gap-4 transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="w-10 h-10 rounded-lg bg-[#4d6bfa]/10 flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-[#4d6bfa]" />
                  </div>
                  <span className="text-[#b4bcd0]">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* View Mode Buttons */}
            <div className="flex flex-wrap gap-3">
              {viewModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                    viewMode === mode.id
                      ? 'bg-[#4d6bfa] text-white'
                      : 'bg-[#161b22] text-[#b4bcd0] border border-[#2a2d47] hover:border-[#4d6bfa]/50'
                  }`}
                >
                  <mode.icon className="w-4 h-4" />
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          {/* Image Viewer */}
          <div
            className={`relative transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#2a2d47]/50">
              {/* Image Container */}
              <div
                ref={containerRef}
                className={`relative aspect-[4/3] select-none ${
                  viewMode === 'compare' ? 'cursor-ew-resize' : 'cursor-default'
                }`}
                onMouseDown={viewMode === 'compare' ? handleMouseDown : undefined}
                onMouseUp={viewMode === 'compare' ? handleMouseUp : undefined}
                onMouseLeave={viewMode === 'compare' ? handleMouseUp : undefined}
                onMouseMove={viewMode === 'compare' ? handleMouseMove : undefined}
                onTouchMove={viewMode === 'compare' ? handleTouchMove : undefined}
                onTouchStart={viewMode === 'compare' ? handleMouseDown : undefined}
                onTouchEnd={viewMode === 'compare' ? handleMouseUp : undefined}
              >
                {/* T2 Image (Background for compare, or direct view) */}
                {(viewMode === 'compare' || viewMode === 't2') && (
                  <img
                    src="/00124_2025_RGB.png"
                    alt="T2 Satellite Image"
                    className={`absolute inset-0 w-full h-full object-cover ${
                      viewMode === 't2' ? 'relative' : ''
                    }`}
                  />
                )}

                {/* T1 Image (Foreground with clip for compare) */}
                {viewMode === 'compare' && (
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                  >
                    <img
                      src="/00124_2024_RGB.png"
                      alt="T1 Satellite Image"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* T1 Only */}
                {viewMode === 't1' && (
                  <img
                    src="/00124_2024_RGB.png"
                    alt="T1 Satellite Image"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* T1 Semantic Mask */}
                {viewMode === 'mask-t1' && (
                  <img
                    src="/00124_2024_label.png"
                    alt="T1 Semantic Mask"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* T2 Semantic Mask */}
                {viewMode === 'mask-t2' && (
                  <img
                    src="/00124_2025_label.png"
                    alt="T2 Semantic Mask"
                    className="w-full h-full object-cover"
                  />
                )}

                {/* Slider Line (only for compare mode) */}
                {viewMode === 'compare' && (
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-lg z-10"
                    style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
                  >
                    {/* Slider Handle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center">
                      <div className="flex gap-0.5">
                        <ChevronDown className="w-4 h-4 text-[#04070a] rotate-90" />
                        <ChevronDown className="w-4 h-4 text-[#04070a] -rotate-90" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Labels */}
                {viewMode === 'compare' && (
                  <>
                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#04070a]/80 backdrop-blur-sm text-sm font-medium text-white z-10">
                      T1
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-[#04070a]/80 backdrop-blur-sm text-sm font-medium text-white z-10">
                      T2
                    </div>
                  </>
                )}
                {viewMode === 't1' && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#04070a]/80 backdrop-blur-sm text-sm font-medium text-white">
                    T1
                  </div>
                )}
                {viewMode === 't2' && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#04070a]/80 backdrop-blur-sm text-sm font-medium text-white">
                    T2
                  </div>
                )}
                {viewMode === 'mask-t1' && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#04070a]/80 backdrop-blur-sm text-sm font-medium text-white">
                    T1 Semantic Mask (Pre-change)
                  </div>
                )}
                {viewMode === 'mask-t2' && (
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-[#04070a]/80 backdrop-blur-sm text-sm font-medium text-white">
                    T2 Semantic Mask (Post-change)
                  </div>
                )}
              </div>
            </div>

            {/* Caption */}
            <p className="mt-4 text-center text-sm text-[#b4bcd0]">
              {viewMode === 'compare'
                ? 'Drag the slider to compare bi-temporal images'
                : viewMode === 'mask-t1'
                ? 'T1 semantic mask shows land cover categories before change'
                : viewMode === 'mask-t2'
                ? 'T2 semantic mask shows land cover categories after change'
                : `Viewing ${viewMode.toUpperCase()} image`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
