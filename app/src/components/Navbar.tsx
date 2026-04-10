// 导入React hooks和图标组件
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

// BC Logo Component
const BCLogo = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="navBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#161b22"/>
        <stop offset="100%" stopColor="#0d1117"/>
      </linearGradient>
      <linearGradient id="navTextGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4d6bfa"/>
        <stop offset="100%" stopColor="#4353fa"/>
      </linearGradient>
    </defs>
    <rect x="2" y="2" width="28" height="28" rx="4" fill="url(#navBgGrad)" stroke="#2a2d47" strokeWidth="1"/>
    <text x="16" y="16" fontSize="14" fontWeight="700" fill="url(#navTextGrad)" textAnchor="middle" dominantBaseline="central" dy="1">BC</text>
  </svg>
);

// 导航链接配置
const navLinks = [
  { name: 'Home', href: '#home' },
  { 
    name: 'Dataset', 
    href: '#dataset',
    dropdown: [
      { name: 'Introduction', href: '#dataset-intro' },
      { name: '6-Step Format', href: '#format' },
      { name: 'Multi-Model Evaluation', href: '#evaluation' },
      { name: 'Land Use', href: '#land-use' },
      { name: 'Download', href: '#download' },
    ]
  },
  { 
    name: 'Tasks & Benchmarks', 
    href: '#tasks',
    dropdown: [
      { name: 'Training Methods', href: '#tasks' },
      { name: 'Model Evaluation', href: '#evaluation' },
      { name: 'Annotation Process', href: '#annotation-process' },
      // { name: 'Leaderboard', href: '#leaderboard' }, // 暂时注释，等待数据集完全公布后恢复
    ]
  },
  { name: 'Code & Models', href: '#code' },
  { name: 'Citation', href: '#citation' },
  { name: 'Team', href: '#team' },
];

// 导航栏组件
export default function Navbar() {
  // 状态：滚动状态、移动端菜单、当前下拉菜单
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // 监听滚动事件，超过50px时改变样式
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 平滑滚动到指定锚点
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#04070a]/85 backdrop-blur-xl border-b border-[#2a2d47]/50'
          : 'bg-transparent'
      }`}
      style={{ transitionTimingFunction: 'var(--ease-out-expo)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo区域 */}
          <button
            onClick={() => scrollToSection('#home')}
            className="flex items-center gap-3 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#4d6bfa] to-[#4353fa] flex items-center justify-center transition-transform duration-300 group-hover:rotate-[5deg]">
              <BCLogo className="w-6 h-6" />
            </div>
            <span className="text-lg font-semibold text-white font-['Poppins'] hidden sm:block">
              Geo-BeyondCaptioning
            </span>
            <span className="text-lg font-semibold text-white font-['Poppins'] sm:hidden">
              Geo-BC
            </span>
          </button>

          {/* 桌面端导航菜单 */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => !link.dropdown && scrollToSection(link.href)}
                  className="px-4 py-2 text-sm font-medium text-[#b4bcd0] hover:text-white transition-colors duration-300 flex items-center gap-1 group"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#4d6bfa] transition-all duration-300 group-hover:w-full group-hover:left-0" />
                  </span>
                  {link.dropdown && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {/* 下拉菜单 */}
                {link.dropdown && activeDropdown === link.name && (
                  <div className="absolute top-full left-0 mt-2 w-56 py-2 bg-[#161b22]/95 backdrop-blur-xl rounded-xl border border-[#2a2d47]/50 shadow-2xl animate-fade-in">
                    {link.dropdown.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className="w-full px-4 py-2.5 text-left text-sm text-[#b4bcd0] hover:text-white hover:bg-[#4d6bfa]/10 transition-all duration-200"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 右侧CTA按钮组 */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollToSection('#download')}
              className="btn-secondary py-2.5 px-5 text-xs"
            >
              Download
            </button>
            <a
              href="https://github.com/kaynqi/Beyond-Captioning"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary py-2.5 px-5 text-xs"
            >
              GitHub
            </a>
          </div>

          {/* 移动端菜单切换按钮 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-white"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-[#04070a]/95 backdrop-blur-xl border-t border-[#2a2d47]/50 animate-fade-in">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <div key={link.name}>
                <button
                  onClick={() => !link.dropdown && scrollToSection(link.href)}
                  className="w-full text-left py-2 text-lg font-medium text-white"
                >
                  {link.name}
                </button>
                {link.dropdown && (
                  <div className="pl-4 mt-2 space-y-2">
                    {link.dropdown.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.href)}
                        className="w-full text-left py-2 text-sm text-[#b4bcd0]"
                      >
                        {item.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => scrollToSection('#download')}
                className="btn-secondary w-full"
              >
                Download
              </button>
              <a
                href="https://github.com/kaynqi/Beyond-Captioning"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full text-center"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
