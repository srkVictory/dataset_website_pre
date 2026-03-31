import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';

const sampleImages = [
  { src: '/sample-1.jpg', title: 'Industrial Area', location: 'Beijing, China' },
  { src: '/sample-2.jpg', title: 'Agricultural Fields', location: 'Jiangsu, China' },
  { src: '/sample-3.jpg', title: 'Coastal Region', location: 'Shandong, China' },
  { src: '/sample-4.jpg', title: 'Mountain Forest', location: 'Sichuan, China' },
  { src: '/sample-5.jpg', title: 'Urban Center', location: 'Shanghai, China' },
];

export default function DatasetGallery() {
  const [currentIndex, setCurrentIndex] = useState(0);
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % sampleImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + sampleImages.length) % sampleImages.length);
  };

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4d6bfa]/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title">Dataset Showcase</h2>
          <p className="section-subtitle">
            Explore sample image pairs from our collection
          </p>
        </div>

        {/* Carousel */}
        <div
          className={`relative transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Main Image */}
          <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden border border-[#2a2d47]/50">
            <img
              src={sampleImages[currentIndex].src}
              alt={sampleImages[currentIndex].title}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04070a]/80 via-transparent to-transparent" />

            {/* Info */}
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-2xl font-semibold text-white mb-1">
                {sampleImages[currentIndex].title}
              </h3>
              <p className="text-[#b4bcd0]">{sampleImages[currentIndex].location}</p>
            </div>

            {/* Zoom Icon */}
            <div className="absolute top-6 right-6">
              <button className="p-3 rounded-xl bg-[#04070a]/60 backdrop-blur-sm text-white hover:bg-[#4d6bfa]/80 transition-colors">
                <ZoomIn className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="p-3 rounded-xl bg-[#161b22] border border-[#2a2d47]/50 text-white hover:border-[#4d6bfa]/50 hover:bg-[#4d6bfa]/10 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {sampleImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-[#4d6bfa]'
                      : 'bg-[#2a2d47] hover:bg-[#4d6bfa]/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-3 rounded-xl bg-[#161b22] border border-[#2a2d47]/50 text-white hover:border-[#4d6bfa]/50 hover:bg-[#4d6bfa]/10 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="flex justify-center gap-3 mt-6">
            {sampleImages.map((image, index) => (
              <button
                key={image.src}
                onClick={() => setCurrentIndex(index)}
                className={`relative w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                  index === currentIndex
                    ? 'border-[#4d6bfa] scale-110'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
