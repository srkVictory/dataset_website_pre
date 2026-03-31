import { useEffect, useRef, useState } from 'react';
import { Calendar, Github, FileText, Award, ArrowUpRight } from 'lucide-react';

const newsItems = [
  {
    date: '2024-12-15',
    type: 'release',
    icon: Github,
    iconColor: 'text-green-400',
    bgColor: 'bg-green-400/10',
    title: 'Dataset v1.0 Released',
    description: 'Initial release of LEVIR-MF dataset with 1002+ image pairs and annotations.',
    link: '#download',
  },
  {
    date: '2024-11-28',
    type: 'paper',
    icon: FileText,
    iconColor: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    title: 'Paper Accepted at IEEE TGRS',
    description: 'Our paper "LEVIR-MF: A Multi-modal Change Detection Dataset" has been accepted.',
    link: 'https://arxiv.org',
  },
  {
    date: '2024-10-20',
    type: 'code',
    icon: Github,
    iconColor: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    title: 'OpenCD Integration',
    description: 'Official integration with OpenCD framework for easy model benchmarking.',
    link: 'https://github.com',
  },
  {
    date: '2024-09-15',
    type: 'award',
    icon: Award,
    iconColor: 'text-yellow-400',
    bgColor: 'bg-yellow-400/10',
    title: 'Best Dataset Award',
    description: 'Received the Best Remote Sensing Dataset Award at IGARSS 2024.',
    link: '#',
  },
];

export default function News() {
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

  return (
    <section ref={sectionRef} className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="section-title">News & Updates</h2>
          <p className="section-subtitle">Latest developments and announcements</p>
        </div>

        {/* News Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsItems.map((item, index) => (
            <a
              key={item.title}
              href={item.link}
              className={`group relative p-6 rounded-2xl bg-[#161b22]/50 border border-[#2a2d47]/50 hover:border-[#4d6bfa]/50 transition-all duration-500 hover:-translate-y-2 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{
                transitionDelay: `${index * 100}ms`,
                transitionTimingFunction: 'var(--ease-out-expo)',
              }}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
              >
                <item.icon className={`w-6 h-6 ${item.iconColor}`} />
              </div>

              {/* Date */}
              <div className="flex items-center gap-2 text-sm text-[#b4bcd0] mb-3">
                <Calendar className="w-4 h-4" />
                {item.date}
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#4d6bfa] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#b4bcd0] leading-relaxed">
                {item.description}
              </p>

              {/* Arrow */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="w-5 h-5 text-[#4d6bfa]" />
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4d6bfa]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
